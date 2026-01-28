"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, LayoutDashboard, Settings, LogOut, Church, Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import clsx from "clsx";

const navigation = [
    { name: "儀表板", href: "/admin", icon: LayoutDashboard },
    { name: "系統用戶", href: "/admin/users", icon: Users },
    { name: "每日靈修", href: "/admin/devotions", icon: BookOpen },
    { name: "系統設置", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { user, profile, logout } = useAuth();

    const displayUser = {
        name: profile?.name || user?.displayName || user?.email?.split('@')[0] || "管理員",
        roleName: profile?.roleName || "系統管理員",
        avatar: profile?.avatar || user?.photoURL || null
    };

    return (
        <div className="flex h-full w-64 flex-col bg-gradient-to-br from-primary/90 to-blue-600/90 text-white shadow-xl transition-all">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <Church className="mr-2 h-6 w-6 text-white" />
                <span className="text-lg font-bold tracking-wide text-white">教會後臺管理</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        // Special handling for System Settings / Change Password
                        if (item.href === "/admin/settings") {
                            const providerId = user?.providerData?.[0]?.providerId;

                            // If not email login, hide this item completely
                            if (providerId !== 'password') {
                                return null;
                            }

                            // If Password login, show "Change Password" regardless of role restrictions on main "Settings"
                            const isActive = pathname?.startsWith("/admin/settings/password");
                            return (
                                <Link
                                    key="change-password"
                                    href="/admin/settings/password"
                                    className={clsx(
                                        "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-white/20 text-white font-semibold shadow-sm"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Lock
                                        className={clsx(
                                            "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                            isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                        )}
                                    />
                                    修改密碼
                                </Link>
                            );
                        }

                        // Level-based visibility check for other items
                        if (profile?.level === 'admin') {
                            // Regular admin only sees Devotions
                            if (item.href === '/admin' || item.href === '/admin/users') return null;
                        }
                        if (profile?.level === 'manager') {
                            // System admin sees Users and Devotions, but not Dashboard
                            if (item.href === '/admin') return null;
                        }

                        const isActive = item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname === item.href || pathname?.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-white/20 text-white font-semibold shadow-sm"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <div className="mb-4 flex items-center px-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/10">
                        {displayUser.avatar ? (
                            <img src={displayUser.avatar} alt={displayUser.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-sm font-medium text-white">{displayUser.name.charAt(0)}</span>
                        )}
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="truncate text-sm font-medium text-white">{displayUser.name}</p>
                        <p className="truncate text-xs text-white/70">{displayUser.roleName}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-red-500/20 hover:text-white"
                >
                    <LogOut className="mr-3 h-4 w-4 transition-colors group-hover:text-white" />
                    登出
                </button>
            </div>
        </div>
    );
}
