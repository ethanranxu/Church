"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const NAV_LINKS = [
    { name: "首頁", href: "/" },
    {
        name: "認識教會",
        href: "#",
        subMenu: [
            { name: "長堤基督教會", href: "/east-coast-bays" },
            { name: "木槿灣基督教會", href: "/hibiscus-coast" },
            { name: "長灣基督教會", href: "/long-bay" },
        ],
    },
    { name: "認識我們", href: "/ministry-team" },
    { name: "影視資源", href: "/bible-study" },
    { name: "每日靈修", href: "/devotion" },
    { name: "奉獻資訊", href: "/offering" },
    { name: "代禱需求", href: "/prayer" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md border-b border-[#e7edf3] dark:border-gray-800 transition-colors">
            <Container>
                <div className="flex justify-between items-center h-24">
                    {/* Logo - Updated to new image logo */}
                    <Link href="/" className="flex items-center h-full py-4">
                        <img
                            src="/images/logo-icon.jpg"
                            alt="長堤基督教會"
                            className="h-16 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => link.subMenu && setOpenSubMenu(link.name)}
                                onMouseLeave={() => setOpenSubMenu(null)}
                            >
                                {link.subMenu ? (
                                    <div className="relative">
                                        <div className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors cursor-default">
                                            {link.name}
                                        </div>
                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <div className="bg-white dark:bg-[#1a2530] shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 py-2 min-w-[200px]">
                                                {link.subMenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="block px-5 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-base font-medium hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link href="/welcome">
                            <Button size="sm" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md">
                                新朋友專區
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            <span className="material-symbols-outlined">
                                {isOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <nav className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                        {NAV_LINKS.map((link) => (
                            <div key={link.name}>
                                {link.subMenu ? (
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center px-2 py-1">
                                            <span
                                                className="text-base font-medium hover:text-primary transition-colors flex-grow cursor-pointer"
                                                onClick={() => setOpenSubMenu(openSubMenu === link.name ? null : link.name)}
                                            >
                                                {link.name}
                                            </span>
                                            <button
                                                onClick={() => setOpenSubMenu(openSubMenu === link.name ? null : link.name)}
                                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                            >
                                                <span className={`material-symbols-outlined transition-transform ${openSubMenu === link.name ? "rotate-180" : ""}`}>
                                                    keyboard_arrow_down
                                                </span>
                                            </button>
                                        </div>
                                        {openSubMenu === link.name && (
                                            <div className="flex flex-col ml-4 mt-2 border-l-2 border-primary/20 bg-gray-50/50 dark:bg-gray-800/30 rounded-r-lg">
                                                {link.subMenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="text-sm font-medium hover:text-primary transition-colors px-4 py-3"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-base font-medium hover:text-primary transition-colors px-2 py-1 block"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-2">
                            <Link href="/welcome" onClick={() => setIsOpen(false)}>
                                <Button className="w-full text-center">新朋友專區</Button>
                            </Link>
                        </div>
                    </nav>
                )}
            </Container>
        </header>
    );
};
