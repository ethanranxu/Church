'use client';

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading, profile } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";

    // Role-based Path Protection
    useEffect(() => {
        if (!loading && user && profile && !isLoginPage) {
            // Manager (System Admin) cannot access Dashboard (root /admin)
            if (profile.level === 'manager' && pathname === '/admin') {
                router.replace('/admin/users');
            }
            // Admin cannot access Dashboard, Users or Settings (except password change)
            if (profile.level === 'admin' &&
                (pathname === '/admin' || pathname?.startsWith('/admin/users') || (pathname?.startsWith('/admin/settings') && !pathname?.startsWith('/admin/settings/password')))) {
                router.replace('/admin/devotions');
            }
        }
    }, [profile, pathname, loading, user, isLoginPage, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
                <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    // If it's the login page, just render the children without the sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    // If not logged in and not on login page, AuthProvider handles redirect in its own useEffect
    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-[#0f172a] font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block border-r border-gray-100 dark:border-gray-800">
                <AdminSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col lg:pl-64 h-full">
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-[#0f172a]/50 p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}
