'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { LogIn, Chrome, ShieldCheck, Mail, Lock, UserPlus, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { signInWithGoogle, loginWithEmail, registerWithEmail, loading: authLoading } = useAuth();

    // UI State
    const [isRegistering, setIsRegistering] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistering) {
            // Register Logic
            if (!name || !email || !password || !confirmPassword) {
                alert("請填寫所有字段");
                return;
            }
            if (password !== confirmPassword) {
                alert("兩次輸入的密碼不一致");
                return;
            }
            if (password.length < 6) {
                alert("密碼長度至少6位");
                return;
            }

            setIsSubmitting(true);
            try {
                await registerWithEmail(email, password, name);
            } finally {
                setIsSubmitting(false);
            }

        } else {
            // Login Logic
            if (!email || !password) return;
            setIsSubmitting(true);
            try {
                await loginWithEmail(email, password);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const isLoading = authLoading || isSubmitting;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] p-4 font-sans">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 backdrop-blur-sm relative overflow-hidden transition-all duration-300">

                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

                    {/* Header */}
                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex items-center justify-center size-20 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                            <ShieldCheck className="size-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                            {isRegistering ? "註冊新賬號" : "後臺管理系統"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {isRegistering ? "僅限已授權的郵箱註冊" : "僅限教會授權同工訪問"}
                        </p>
                    </div>

                    {/* Action */}
                    <div className="space-y-6 relative z-10">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name Field (Register Only) */}
                            {isRegistering && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">真實姓名</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={isRegistering}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="您的姓名"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">電子郵箱</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="name@church.org"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">密碼</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password (Register Only) */}
                            {isRegistering && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">確認密碼</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required={isRegistering}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="再次輸入密碼"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isRegistering ? <UserPlus className="size-5" /> : <LogIn className="size-5" />}
                                        {isRegistering ? "註冊並登錄" : "登錄"}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Toggle Link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                {isRegistering ? "已有賬號？" : "還沒有設置密碼？"}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="ml-1 font-semibold text-blue-600 hover:text-blue-500 transition-colors focus:outline-none"
                            >
                                {isRegistering ? "直接登錄" : "去註冊"}
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-[#1e293b] text-gray-500">或者</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] group shadow-sm hover:shadow-md disabled:opacity-70"
                        >
                            <Chrome className="size-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            使用 Google 賬號登錄
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-10 text-center text-gray-400 dark:text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} 長堤基督教會. 安全系統.
                    </p>
                </div>
            </div>
        </div>
    );
}
