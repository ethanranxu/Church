"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Lock, Save, AlertCircle, CheckCircle2, User as UserIcon, Camera, Phone, Loader2, Upload } from 'lucide-react';
import { useTranslation } from "@/i18n/LanguageContext";
import { updateUser } from '@/app/actions/users';

export default function PasswordClient() {
    const { t } = useTranslation();
    const { changePassword, profile, setProfile } = useAuth();
    
    // Form states
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState(profile?.phone || '');
    const [avatar, setAvatar] = useState(profile?.avatar || '');
    
    // UI states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isProcessingImage, setIsProcessingImage] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync phone and avatar if profile loads later
    useEffect(() => {
        if (profile) {
            setPhone(profile.phone || '');
            setAvatar(profile.avatar || '');
        }
    }, [profile]);

    // Same compression logic as UsersClient.tsx
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Resize if too large (max 1024px)
                    const MAX_SIZE = 1024;
                    if (width > MAX_SIZE || height > MAX_SIZE) {
                        if (width > height) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        } else {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress loop
                    let quality = 0.9;
                    let dataUrl = canvas.toDataURL('image/jpeg', quality);
                    const TARGET_CHARS = 100 * 1024 * 1.37; // Approx chars for 100KB

                    while (dataUrl.length > TARGET_CHARS && quality > 0.1) {
                        quality -= 0.1;
                        dataUrl = canvas.toDataURL('image/jpeg', quality);
                    }

                    resolve(dataUrl);
                };
                img.onerror = () => reject(new Error("Failed to load image"));
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
        });
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessingImage(true);
        setMessage(null);
        
        try {
            let resultDataUrl: string;
            // Only compress if larger than 100KB, otherwise just use as is
            if (file.size > 100 * 1024) {
                resultDataUrl = await compressImage(file);
            } else {
                const reader = new FileReader();
                resultDataUrl = await new Promise((resolve, reject) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }
            
            setAvatar(resultDataUrl);
            setMessage({ type: 'success', text: '頭像已選擇並完成處理，請點擊下方保存以生效' });
        } catch (error) {
            console.error('Image processing failed:', error);
            setMessage({ type: 'error', text: '圖片處理失敗，請重試' });
        } finally {
            setIsProcessingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!profile) return;

        // 1. Password change logic (optional)
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setMessage({ type: 'error', text: t.admin.password.messages.passwordMismatch });
                return;
            }
            if (newPassword.length < 6) {
                setMessage({ type: 'error', text: t.admin.password.messages.passwordLength });
                return;
            }
        }

        setIsSubmitting(true);
        try {
            if (!profile.id) {
                throw new Error('無法獲取您的用戶 ID，請重新登錄或刷新頁面');
            }

            console.log('Submitting update for user ID:', profile.id);
            // Update Profile (Phone & Avatar) via Base64 string directly to Firestore
            const profileUpdated = await updateUser(profile.id, {
                phone: phone,
                avatar: avatar
            }, { name: profile.name, email: profile.email });

            if (!profileUpdated.success) {
                throw new Error(profileUpdated.error || '更新資料失敗');
            }

            // Update local context profile
            setProfile(prev => prev ? { ...prev, phone, avatar } : null);

            // Update Password if provided
            if (newPassword) {
                const passwordSuccess = await changePassword(newPassword);
                if (!passwordSuccess) {
                    throw new Error('資料已更新，但密碼修改失敗');
                }
            }

            setMessage({ type: 'success', text: t.admin.password.messages.success });
            setNewPassword('');
            setConfirmPassword('');
            
            // Auto clear success message after 3 seconds
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || t.admin.password.messages.error });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.admin.password.title}</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t.admin.password.description}
                </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                    {message && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-100 dark:border-green-500/20'
                            : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20'
                            }`}>
                            {message.type === 'success' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
                            <p className="text-sm font-medium">{message.text}</p>
                        </div>
                    )}

                    {/* Profile Section */}
                    <div className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="relative group">
                                <div className="size-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm">
                                    {avatar ? (
                                        <img src={avatar} alt="Avatar" className="size-full object-cover" />
                                    ) : (
                                        <UserIcon className="size-12 text-gray-400" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isProcessingImage}
                                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                                >
                                    {isProcessingImage ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.admin.password.avatar}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {t.admin.users.imageHelp}
                                </p>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.admin.password.phone}</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder={t.admin.password.phonePlaceholder}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="pt-4 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Lock className="size-4 text-primary" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                密碼修改
                            </h3>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.admin.password.newPassword}</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder={t.admin.password.newPasswordPlaceholder}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.admin.password.confirmPassword}</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder={t.admin.password.confirmPasswordPlaceholder}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting || isProcessingImage}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="size-5" />
                                    {t.admin.password.save}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
