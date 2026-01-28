"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const NAV_LINKS = [
    { name: "首頁", href: "/" },
    { name: "認識教會", href: "/statement-of-faith" },
    { name: "事奉團隊", href: "/ministry-team" },
    { name: "查經小組", href: "/bible-study" },
    { name: "每日靈修", href: "/devotion" },
    { name: "奉獻資訊", href: "/offering" },
    { name: "代禱需求", href: "/prayer" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
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
                    <nav className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium hover:text-primary transition-colors px-2 py-1"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
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
