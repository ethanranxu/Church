import React from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

const FOOTER_SECTIONS = [
    {
        title: "教會資訊",
        links: [
            { name: "聯絡我們", href: "/#location" },
            { name: "信仰告白", href: "/statement-of-faith" },
            { name: "事奉團隊", href: "/ministry-team" },
        ],
    },
    {
        title: "聚會與資源",
        links: [
            { name: "主日崇拜", href: "/#service-info" },
            { name: "查經小組", href: "/bible-study" },
            { name: "每日靈修", href: "/devotion" },
        ],
    },
    {
        title: "關懷與奉獻",
        links: [
            { name: "新朋友專區", href: "/welcome" },
            { name: "代禱需求", href: "/prayer" },
            { name: "奉獻資訊", href: "/offering" },
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
                        <div className="flex items-center text-white">
                            <img
                                src="/images/footer-logo.png"
                                alt="長堤基督教會 Logo"
                                className="h-36 w-auto object-contain bg-white rounded p-1"
                            />
                        </div>


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

                <div className="border-t border-gray-800 pt-8 mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Copyright © 2026 長堤基督教會. All Rights Reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};
