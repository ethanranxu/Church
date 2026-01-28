'use server';

import { db } from '@/lib/firebase-admin';
import { User } from '@/types/user';
import { createAdminLog } from '@/app/actions/log';

export interface AuthVerificationResult {
    isValid: boolean;
    userData?: User;
    error?: string;
}

export async function verifyUser(email: string, shouldLog: boolean = true): Promise<AuthVerificationResult> {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }

    try {
        const usersRef = db.collection('Users');
        const snapshot = await usersRef.where('email', '==', email).limit(1).get();

        if (snapshot.empty) {
            console.log(`[Auth] Rejected login for ${email}: Not found in Users collection.`);
            return {
                isValid: false,
                error: '此郵箱未在系統用戶名單中，請聯繫管理員。'
            };
        }

        const doc = snapshot.docs[0];
        const userData = {
            id: doc.id,
            ...doc.data()
        } as User;

        console.log(`[Auth] Verified login for ${email} as ${userData.roleName}`);

        // Log Admin Login only if requested
        if (shouldLog) {
            await createAdminLog({
                adminName: userData.name || email,
                adminEmail: email,
                action: 'LOGIN',
                details: `Logged in as ${userData.roleName}`
            });

            // 触发自动清理 (异步进行，不阻塞登录)
            const { cleanupOldLogs } = await import('@/lib/logging-admin');
            cleanupOldLogs().catch(err => console.error("Auto cleanup triggered from login failed", err));
        }

        return {
            isValid: true,
            userData
        };

    } catch (error) {
        console.error('[Auth] Verification failed:', error);
        return {
            isValid: false,
            error: '驗證過程發生錯誤，請稍後重試。'
        };
    }
}

export async function updateUserPassword(uid: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (!uid || !password) {
        return { success: false, error: "缺少必要參數" };
    }

    try {
        const { adminAuth } = await import('@/lib/firebase-admin');
        const userRecord = await adminAuth.getUser(uid);

        await adminAuth.updateUser(uid, {
            password: password
        });

        console.log(`[Auth] Password updated for user ${uid}`);

        // Log Password Change
        await createAdminLog({
            adminName: userRecord.displayName || userRecord.email || "Unknown",
            adminEmail: userRecord.email || "Unknown",
            action: 'UPDATE_PASSWORD',
            details: `Updated password for UID: ${uid}`
        });

        return { success: true };
    } catch (error: any) {
        console.error('[Auth] Password update failed:', error);
        return {
            success: false,
            error: error.message || "密碼更新失敗"
        };
    }
}

export async function resetUserPasswordByEmail(email: string, password: string, operator: { name: string, email: string }): Promise<{ success: boolean; error?: string }> {
    if (!email || !password || !operator) {
        return { success: false, error: "缺少必要參數" };
    }

    try {
        const { adminAuth } = await import('@/lib/firebase-admin');
        const userRecord = await adminAuth.getUserByEmail(email);

        await adminAuth.updateUser(userRecord.uid, {
            password: password
        });

        console.log(`[Auth] Password reset for user ${email} by admin ${operator.email}`);

        // Log Password Reset
        await createAdminLog({
            adminName: operator.name,
            adminEmail: operator.email,
            action: 'RESET_USER_PASSWORD',
            details: `為用戶 ${email} 設置了新密碼 (UID: ${userRecord.uid})`
        });

        return { success: true };
    } catch (error: any) {
        console.error('[Auth] Password reset failed:', error);
        return {
            success: false,
            error: error.message || "重置密碼失敗"
        };
    }
}

export async function getUserProvider(email: string): Promise<{ providerId?: string; error?: string }> {
    if (!email) {
        return { error: 'Email is required' };
    }

    try {
        const { adminAuth } = await import('@/lib/firebase-admin');
        const userRecord = await adminAuth.getUserByEmail(email);

        // Return the first provider found, or 'password' if none (shouldn't happen with valid user)
        const providerId = userRecord.providerData[0]?.providerId || 'password';

        return { providerId };
    } catch (error: any) {
        console.error('[Auth] Fetching provider failed:', error);
        // If user not found in Auth but exists in whitelist/DB, they might not have registered yet
        if (error.code === 'auth/user-not-found') {
            return { providerId: 'password' }; // Assume password for invited users
        }
        return { error: '獲取提供商失敗' };
    }
}
