"use client";

import { useState } from "react";
import { Plus, Search, Shield, ShieldAlert, Mail, Phone, Trash2, Edit2, X, Loader2, Upload } from "lucide-react";
import clsx from "clsx";
import { User } from "@/types/user";
import { createUser, updateUser, deleteUser } from "@/app/actions/users";
import { resetUserPasswordByEmail, getUserProvider } from "@/app/actions/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { Copy, Check, Key } from "lucide-react";

interface UsersClientProps {
    initialUsers: User[];
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const { profile } = useAuth();

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
            // Permission check: managers cannot see/edit super_admins
            if (profile?.level === 'manager' && user.level === 'super_admin') return false;

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
        switch (level) {
            case 'super_admin': return '超級管理員';
            case 'manager': return '系統管理員';
            case 'admin': return '管理員';
            default: return '管理員';
        }
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setCurrentUser({ level: 'admin', roleName: '管理員' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (user: User) => {
        // Double check permissions (though UI should hide these rows)
        if (profile?.level === 'manager' && user.level === 'super_admin') {
            alert("您沒有權限編輯超級管理員");
            return;
        }
        setIsEditing(true);
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        const targetUser = users.find(u => u.id === id);
        if (profile?.level === 'manager' && targetUser?.level === 'super_admin') {
            alert("您沒有權限刪除超級管理員");
            return;
        }

        if (confirm(`確定要刪除用戶 ${name} 嗎？此操作無法撤銷。`)) {
            const operator = profile ? { name: profile.name, email: profile.email } : undefined;
            await deleteUser(id, operator);
        }
    };

    const handleOpenResetPassword = async (email: string) => {
        // Check provider first
        const result = await getUserProvider(email);
        if (result.providerId === 'google.com') {
            alert("Google賬戶登錄用戶，請直接用Google賬戶認證登錄，無需重置密碼！");
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
                alert("密碼重置成功！");
                setIsResetModalOpen(false);
            } else {
                alert("重置失敗: " + (result.error || "未知錯誤"));
            }
        } catch (error) {
            alert("操作發生錯誤");
        } finally {
            setIsResetting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // We need router to refresh the page data
    const { useRouter } = require("next/navigation");
    const router = useRouter();

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
                alert("圖片處理失敗，請重試");
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
                    avatar: currentUser.avatar
                }, operator);
            } else {
                await createUser({
                    name: currentUser.name!,
                    email: currentUser.email!,
                    phone: currentUser.phone || '',
                    level: currentUser.level || 'admin',
                    roleName: getRoleName(currentUser.level || 'admin'),
                    avatar: currentUser.avatar || null
                }, operator);
            }
            setIsModalOpen(false);
            router.refresh(); // Refresh server data
        } catch (error) {
            alert("操作失敗，請重試");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (profile?.level === 'admin') {
        return (
            <div className="flex h-[600px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/30">
                <div className="text-center">
                    <ShieldAlert className="mx-auto h-12 w-12 text-gray-400" />
                    <h2 className="mt-4 text-lg font-semibold text-gray-900">訪問受限</h2>
                    <p className="mt-2 text-sm text-gray-500">管理員賬號僅擁靈修文章管理權限，無法訪問用戶管理。</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 text-shadow-sm">系統用戶管理</h1>
                    <p className="text-sm text-gray-500">管理擁有後臺訪問權限的管理員賬戶</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    添加用戶
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
                            placeholder="搜索姓名、郵箱或電話..."
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
                                <th className="px-6 py-4 font-medium">用戶姓名</th>
                                <th className="px-6 py-4 font-medium">郵箱</th>
                                <th className="px-6 py-4 font-medium">電話</th>
                                <th className="px-6 py-4 font-medium">創建時間</th>
                                <th className="px-6 py-4 font-medium">用戶等級</th>
                                <th className="px-6 py-4 font-medium text-right">操作</th>
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
                                    <td className="px-6 py-4">
                                        <span
                                            className={clsx(
                                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                user.level === "super_admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : user.level === "manager"
                                                        ? "bg-sky-100 text-sky-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                            )}
                                        >
                                            {user.level === "super_admin" ? (
                                                <ShieldAlert className="h-3.5 w-3.5" />
                                            ) : (
                                                <Shield className="h-3.5 w-3.5" />
                                            )}
                                            {user.roleName}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => handleOpenEdit(user)}
                                                className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                title="編輯"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleOpenResetPassword(user.email)}
                                                className="rounded p-1.5 text-amber-500 hover:bg-amber-50 hover:text-amber-700"
                                                title="重置密碼"
                                            >
                                                <Key className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title="刪除"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-500">
                                        未找到匹配的用戶
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination Placeholder */}
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <span className="text-sm text-gray-500">
                        顯示 {filteredUsers.length} 個結果
                    </span>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {isEditing ? "編輯用戶" : "添加新用戶"}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">頭像</label>
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
                                            <span className="text-gray-400 text-xs">無頭像</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="cursor-pointer inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-emerald-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white whitespace-nowrap w-fit">
                                            <div className="flex items-center gap-2">
                                                <Upload className="h-4 w-4" />
                                                <span>上傳圖片</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <span className="text-xs text-gray-400">支持 jpg/png, 大圖將自動壓縮 (100KB)</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">郵箱</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">電話</label>
                                <input
                                    type="tel"
                                    maxLength={20}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm"
                                    value={currentUser.phone || ''}
                                    onChange={e => setCurrentUser({ ...currentUser, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">等級</label>
                                <select
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm disabled:bg-gray-100 disabled:text-gray-500"
                                    value={currentUser.level || 'admin'}
                                    disabled={isEditing && currentUser.level === 'super_admin'}
                                    onChange={e => setCurrentUser({
                                        ...currentUser,
                                        level: e.target.value as any,
                                        roleName: getRoleName(e.target.value)
                                    })}
                                >
                                    {/* Super Admins can assign any role */}
                                    {profile?.level === 'super_admin' && (
                                        <option value="super_admin">超級管理員</option>
                                    )}
                                    {/* System Admins can only assign manager or admin */}
                                    <option value="manager">系統管理員</option>
                                    <option value="admin">管理員</option>
                                </select>
                                {profile?.level === 'manager' && (
                                    <p className="mt-1 text-xs text-gray-500"></p>
                                )}
                            </div>

                            <div className="flex justify-end pt-4 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-70"
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEditing ? "保存修改" : "立即創建"}
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
                                重置用戶密碼
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
                                    確定要將用戶 <span className="font-semibold text-gray-900">{resetTargetEmail}</span> 的密碼重置為以下隨機密碼嗎？
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
                                        title="複製密碼"
                                    >
                                        {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 italic">
                                    * 請務必通知用戶其新密碼，並建議其登錄後及時修改。
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setIsResetModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-transparent"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={handleResetPassword}
                                    disabled={isResetting}
                                    className="flex items-center rounded-lg bg-amber-600 px-6 py-2 text-sm font-medium text-white hover:bg-amber-700 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    確認重置
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
