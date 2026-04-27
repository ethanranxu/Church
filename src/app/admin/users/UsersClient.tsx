"use client";

import { useState } from "react";
import { Plus, Search, Shield, ShieldAlert, Mail, Phone, Trash2, Edit2, X, Loader2, Upload } from "lucide-react";
import clsx from "clsx";
import { User } from "@/types/user";
import { createUser, updateUser, deleteUser } from "@/app/actions/users";
import { resetUserPasswordByEmail, getUserProvider } from "@/app/actions/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Copy, Check, Key } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

interface UsersClientProps {
    initialUsers: User[];
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const { profile } = useAuth();
    const router = useRouter();
    const { t } = useTranslation();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Reset Password State
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [resetTargetEmail, setResetTargetEmail] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [isResetting, setIsResetting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const filteredUsers = initialUsers.filter(
        (user) => {
            // Permission check: admins cannot see/edit super_admins
            if (profile?.level !== 'super_admin' && user.level === 'super_admin') return false;

            return (
                user.name.includes(searchTerm) ||
                user.email.includes(searchTerm) ||
                (user.phone && user.phone.includes(searchTerm)) ||
                (user.createdAt && user.createdAt.includes(searchTerm))
            );
        }
    );

    // Role Mapping Helper
    const getRoleName = (level: string) => {
        return t.admin.users.levels[level as keyof typeof t.admin.users.levels] || level;
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setCurrentUser({ level: 'admin', roleName: t.admin.users.levels.admin, permissions: [] });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (user: User) => {
        if (profile?.level !== 'super_admin' && user.level === 'super_admin') {
            alert(t.admin.users.permissionDenied);
            return;
        }
        setIsEditing(true);
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        const targetUser = users.find(u => u.id === id);
        if (profile?.level !== 'super_admin' && targetUser?.level === 'super_admin') {
            alert(t.admin.users.deleteDenied);
            return;
        }

        if (confirm(t.admin.users.confirmDelete.replace('{{name}}', name))) {
            const operator = profile ? { name: profile.name, email: profile.email } : undefined;
            await deleteUser(id, operator);
        }
    };

    const handleOpenResetPassword = async (email: string) => {
        // Check provider first
        const result = await getUserProvider(email);
        if (result.providerId === 'google.com') {
            alert(t.admin.users.googleLogin);
            return;
        }

        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedPassword(password);
        setResetTargetEmail(email);
        setIsResetModalOpen(true);
        setIsCopied(false);
    };

    const handleResetPassword = async () => {
        if (!profile) return;
        setIsResetting(true);
        try {
            const result = await resetUserPasswordByEmail(resetTargetEmail, generatedPassword, {
                name: profile.name,
                email: profile.email
            });
            if (result.success) {
                alert(t.admin.users.passwordResetSuccess);
                setIsResetModalOpen(false);
            } else {
                alert(t.admin.users.resetFailed + (result.error || "未知錯誤"));
            }
        } catch (error) {
            alert(t.admin.users.saveFailed);
        } finally {
            setIsResetting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Helper to compress image
                const compressImage = (file: File): Promise<string> => {
                    return new Promise((resolve) => {
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
                        };
                    });
                };

                let resultDataUrl: string;
                if (file.size > 100 * 1024) {
                    resultDataUrl = await compressImage(file);
                } else {
                    const reader = new FileReader();
                    resultDataUrl = await new Promise((resolve) => {
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(file);
                    });
                }

                setCurrentUser({ ...currentUser, avatar: resultDataUrl });
            } catch (error) {
                console.error("Image processing failed", error);
                alert(t.admin.users.imageFailed);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const operator = profile ? { name: profile.name, email: profile.email } : undefined;

            if (isEditing && currentUser.id) {
                await updateUser(currentUser.id, {
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    level: currentUser.level,
                    roleName: getRoleName(currentUser.level || 'admin'),
                    avatar: currentUser.avatar,
                    permissions: currentUser.permissions || []
                }, operator);
            } else {
                await createUser({
                    name: currentUser.name!,
                    email: currentUser.email!,
                    phone: currentUser.phone || '',
                    level: currentUser.level || 'admin',
                    roleName: getRoleName(currentUser.level || 'admin'),
                    avatar: currentUser.avatar || null,
                    permissions: currentUser.permissions || []
                }, operator);
            }
            setIsModalOpen(false);
            router.refresh(); // Refresh server data
        } catch (error) {
            alert(t.admin.users.saveFailed);
        } finally {
            setIsSubmitting(false);
        }
    };

    // This is handled by global route protection, but keep fallback just in case
    if (!profile) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 text-shadow-sm">{t.admin.users.title}</h1>
                    <p className="text-sm text-gray-500">{t.admin.users.subtitle}</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t.admin.users.addUser}
                </button>
            </div>

            {/* Filters & Content */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Toolbar */}
                <div className="border-b border-gray-100 p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.admin.users.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">{t.admin.users.name}</th>
                                <th className="px-6 py-4 font-medium">{t.admin.users.email}</th>
                                <th className="px-6 py-4 font-medium">{t.admin.users.phone}</th>
                                <th className="px-6 py-4 font-medium">{t.admin.users.createdAt}</th>
                                <th className="px-6 py-4 font-medium text-right">{t.admin.users.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group transition-colors hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                onClick={() => user.avatar && setPreviewImage(user.avatar)}
                                                className={clsx(
                                                    "flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold overflow-hidden transition-opacity hover:opacity-80",
                                                    user.avatar ? "cursor-zoom-in" : "cursor-default"
                                                )}
                                            >
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    user.name.charAt(0)
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5" />
                                            {user.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleString('zh-CN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => handleOpenEdit(user)}
                                                className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                title={t.admin.users.edit}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleOpenResetPassword(user.email)}
                                                className="rounded p-1.5 text-amber-500 hover:bg-amber-50 hover:text-amber-700"
                                                title={t.admin.users.resetPassword}
                                            >
                                                <Key className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title={t.admin.users.delete}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-500">
                                        {t.admin.visits.noMatch}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination Placeholder */}
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <span className="text-sm text-gray-500">
                        {t.admin.users.totalUsers.replace('{{count}}', filteredUsers.length.toString())}
                    </span>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {isEditing ? t.admin.users.editUser : t.admin.users.addUserTitle}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Avatar Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.users.avatar}</label>
                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => currentUser.avatar && setPreviewImage(currentUser.avatar)}
                                        className={clsx(
                                            "h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0 transition-transform hover:scale-105",
                                            currentUser.avatar ? "cursor-zoom-in" : "cursor-default"
                                        )}
                                    >
                                        {currentUser.avatar ? (
                                            <img src={currentUser.avatar} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-xs">{t.admin.users.noAvatar}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="cursor-pointer inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-emerald-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white whitespace-nowrap w-fit">
                                            <div className="flex items-center gap-2">
                                                <Upload className="h-4 w-4" />
                                                <span>{t.admin.users.uploadImage}</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <span className="text-xs text-gray-400">{t.admin.users.imageHelp}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.users.name}</label>
                                <input
                                    required
                                    type="text"
                                    maxLength={30}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm"
                                    value={currentUser.name || ''}
                                    onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.users.email}</label>
                                <input
                                    required
                                    type="email"
                                    maxLength={30}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm"
                                    value={currentUser.email || ''}
                                    onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.users.phone}</label>
                                <input
                                    type="tel"
                                    maxLength={20}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm"
                                    value={currentUser.phone || ''}
                                    onChange={e => setCurrentUser({ ...currentUser, phone: e.target.value })}
                                />
                            </div>
                            {currentUser.level !== 'super_admin' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">頁面訪問權限</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { value: '/admin', label: t.admin.sidebar.dashboard },
                                            { value: '/admin/users', label: t.admin.sidebar.users },
                                            { value: '/admin/devotions', label: t.admin.sidebar.devotions },
                                            { value: '/admin/prayers', label: t.admin.sidebar.prayers },
                                            { value: '/admin/visits', label: t.admin.sidebar.visits },
                                            { value: '/admin/bulletins', label: t.admin.sidebar.bulletins },
                                        ].map((perm) => (
                                            <label key={perm.value} className="flex items-center gap-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    disabled={isEditing && currentUser.level === 'super_admin'}
                                                    checked={(currentUser.permissions || []).includes(perm.value)}
                                                    onChange={(e) => {
                                                        const currentPerms = currentUser.permissions || [];
                                                        if (e.target.checked) {
                                                            setCurrentUser({ ...currentUser, permissions: [...currentPerms, perm.value] });
                                                        } else {
                                                            setCurrentUser({ ...currentUser, permissions: currentPerms.filter(p => p !== perm.value) });
                                                        }
                                                    }}
                                                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                {perm.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    {t.admin.users.cancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-70"
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEditing ? t.admin.users.save : t.admin.users.create}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Preview Lightbox */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-12 right-0 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-8 w-8" />
                        </button>
                        <img
                            src={previewImage}
                            alt="Full Preview"
                            className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain selection:bg-transparent"
                        />
                    </div>
                </div>
            )}
            {/* Reset Password Modal */}
            {isResetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-amber-50">
                            <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                                <Key className="h-5 w-5" />
                                {t.admin.users.resetModalTitle}
                            </h3>
                            <button
                                onClick={() => setIsResetModalOpen(false)}
                                className="rounded-full p-1 text-amber-400 hover:bg-amber-100 hover:text-amber-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    {t.admin.users.resetConfirmText.split('{{email}}')[0]} <span className="font-semibold text-gray-900">{resetTargetEmail}</span> {t.admin.users.resetConfirmText.split('{{email}}')[1]}
                                </p>
                                <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-200 p-4">
                                    <div className="flex-1 font-mono text-xl font-bold tracking-wider text-emerald-600 text-center">
                                        {generatedPassword}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={clsx(
                                            "flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                                            isCopied ? "bg-emerald-100 text-emerald-600" : "bg-white text-gray-400 hover:text-gray-600 border border-gray-200 shadow-sm"
                                        )}
                                        title={t.admin.users.copyPassword}
                                    >
                                        {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 italic">
                                    {t.admin.users.resetNote}
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setIsResetModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-transparent"
                                >
                                    {t.admin.users.cancel}
                                </button>
                                <button
                                    onClick={handleResetPassword}
                                    disabled={isResetting}
                                    className="flex items-center rounded-lg bg-amber-600 px-6 py-2 text-sm font-medium text-white hover:bg-amber-700 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t.admin.users.confirmReset}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
