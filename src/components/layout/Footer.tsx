import React from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

const FOOTER_SECTIONS = [
    {
        title: "教會資訊",
        links: [
            { name: "關於我們", href: "#" },
            { name: "信仰告白", href: "#" },
            { name: "牧養團隊", href: "#" },
            { name: "植堂異象", href: "#" },
        ],
    },
    {
        title: "聚會與資源",
        links: [
            { name: "主日崇拜", href: "#" },
            { name: "查經小組", href: "#" },
            { name: "每日靈修", href: "#" },
            { name: "講道錄音", href: "#" },
        ],
    },
    {
        title: "關懷與奉獻",
        links: [
            { name: "新朋友專區", href: "#" },
            { name: "代禱需求", href: "#" },
            { name: "奉獻資訊", href: "#" },
            { name: "聯絡我們", href: "#" },
        ],
    },
];

export const Footer = () => {
    return (
        <footer className="bg-[#0d141b] text-slate-300 py-16 border-t border-gray-800">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center text-white mb-6">
                            <img
                                src="/images/footer-logo.png"
                                alt="長堤基督教會 Logo"
                                className="h-20 w-auto object-contain bg-white rounded p-1"
                            />
                        </div>
                        <p className="text-sm text-gray-400">
                            長堤基督教會 - 奧克蘭北岸屬神的家
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            © 2026 長堤基督教會. All Rights Reserved.
                        </p>
                    </div>

                    {/* Nav Columns */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-bold mb-6">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </footer>
    );
};
