'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    User as FirebaseUser,
    signOut,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { User as DBUser } from '@/types/user';

interface AuthContextType {
    user: FirebaseUser | null;
    profile: DBUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<boolean>;
    registerWithEmail: (email: string, password: string, name: string) => Promise<boolean>;
    changePassword: (newPassword: string) => Promise<boolean>;
    setProfile: React.Dispatch<React.SetStateAction<DBUser | null>>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    logout: async () => { },
    signInWithGoogle: async () => { },
    loginWithEmail: async () => Promise.resolve(false),
    registerWithEmail: async () => Promise.resolve(false),
    changePassword: async () => Promise.resolve(false),
    setProfile: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<DBUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Helper to handle verification after successful Firebase auth
    const handleAuthVerification = async (authUser: FirebaseUser) => {
        try {
            setLoading(true);
            const email = authUser.email;

            if (!email) {
                throw new Error("無法獲取郵箱信息");
            }

            // Verify against local database (with logging for literal login)
            const { verifyUser } = await import('@/app/actions/auth');
            const verification = await verifyUser(email, true);

            if (!verification.isValid || !verification.userData) {
                await signOut(auth);
                alert(verification.error || "未經授權的訪問");
                window.location.reload();
                return false;
            }

            setProfile(verification.userData);
            
            // Intelligent Redirect based on permissions - use replace to avoid back-button loop
            const target = verification.userData.level === 'super_admin' || (verification.userData.permissions || []).includes('/admin')
                ? '/admin'
                : (verification.userData.permissions?.[0] || '/admin/settings/password');
            
            router.replace(target);
            return true;
        } catch (error: any) {
            console.error("Verification Error", error);
            alert(error.message || "驗證失敗");
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Handle redirect results (if any)
        const checkRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    await handleAuthVerification(result.user);
                }
            } catch (error: any) {
                if (error.code !== 'auth/popup-closed-by-user') {
                    console.error("Redirect Auth Error", error);
                    alert("重定向登錄失敗: " + (error.message || "未知錯誤"));
                }
            }
        };
        checkRedirect();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // If we are currently in handleAuthVerification (loading is true), 
                // don't start another verifyUser here to avoid double-work
                if (profile && profile.email === user.email) {
                    setLoading(false);
                    return;
                }

                // Fetch profile if user is logged in
                const email = user.email;
                if (email) {
                    try {
                        const { verifyUser } = await import('@/app/actions/auth');
                        const verification = await verifyUser(email, false); 
                        if (verification.isValid && verification.userData) {
                            setProfile(verification.userData);
                        }
                    } catch (e) {
                        console.error("Silent session verification failed", e);
                    }
                }
            } else {
                setProfile(null);
            }

            setLoading(false);

            // Auto redirect if on admin pages and not logged in
            if (!user && pathname.startsWith('/admin') && pathname !== '/admin/login') {
                router.replace('/admin/login');
            }
        });

        return () => unsubscribe();
    }, [pathname, router, profile]); // Added profile to dependencies for the check

    const logout = async () => {
        try {
            if (profile) {
                const { createAdminLog } = await import('@/app/actions/log');
                await createAdminLog({
                    adminName: profile.name || profile.email,
                    adminEmail: profile.email,
                    action: 'LOGOUT',
                    details: 'Admin logged out'
                });
            }
        } catch (e) {
            console.error("Logout logging failed", e);
        }
        await signOut(auth);
        // Force hard reload to clear all states
        window.location.href = '/admin/login';
    };

    const signInWithGoogle = async () => {
        try {
            // Force account selection every time
            googleProvider.setCustomParameters({
                prompt: 'select_account'
            });

            // First try with popup (best UX)
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
                await handleAuthVerification(result.user);
            }
        } catch (error: any) {
            // If popup is blocked, fallback to redirect automatically
            if (error.code === 'auth/popup-blocked') {
                console.error("Google Popup Blocked, falling back to redirect", error);
                try {
                    // Ensure param is set for redirect too
                    googleProvider.setCustomParameters({
                        prompt: 'select_account'
                    });
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError: any) {
                    console.error("Redirect Fallback Error", redirectError);
                    alert("登錄失败: 彈窗被攔截且重定向失敗。");
                }
            } else if (error.code !== 'auth/popup-closed-by-user') {
                console.error("Google Popup Error", error);
                alert(error.message || "登錄失敗，請重試");
            }
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const result = await signInWithEmailAndPassword(auth, email, password);
            if (result.user) {
                return await handleAuthVerification(result.user);
            }
            return false;
        } catch (error: any) {
            console.error("Email Login Error", error);
            // Translate common Firebase auth errors
            let errorMessage = "登錄失敗，請檢查您的郵箱和密碼";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = "賬號或密碼錯誤";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "嘗試次數過多，請稍後再試";
            }
            alert(errorMessage);
            return false;
        }
    };

    const registerWithEmail = async (email: string, password: string, name: string) => {
        try {
            // 1. Pre-check whitelist against server
            const { verifyUser } = await import('@/app/actions/auth');
            const verification = await verifyUser(email, false); // Just check whitelist during registration preamble

            if (!verification.isValid) {
                alert(verification.error || "此郵箱未在系統白名單中，無法註冊。");
                return false;
            }

            // 2. Create Firebase Auth User
            const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // 3. Update Profile
            await updateProfile(result.user, {
                displayName: name
            });

            // 4. Verify and Login
            return await handleAuthVerification(result.user);

        } catch (error: any) {
            console.error("Registration Error", error);
            let errorMessage = "註冊失敗";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "該郵箱已被註冊，請直接登錄";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "密碼強度不足（至少6位）";
            }
            alert(errorMessage);
            return false;
        }
    };

    const changePassword = async (newPassword: string) => {
        if (!auth.currentUser) return false;
        try {
            // Use server action to update password (bypassing recently logged in requirement)
            const { updateUserPassword } = await import('@/app/actions/auth');
            const result = await updateUserPassword(auth.currentUser.uid, newPassword);

            if (result.success) {
                // Return success to caller, avoid side-effect alerts
                return true;
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.error("Change Password Error", error);
            // Re-throw or handle as false, avoiding alerts here
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, logout, signInWithGoogle, loginWithEmail, registerWithEmail, changePassword, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
