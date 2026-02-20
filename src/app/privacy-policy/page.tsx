"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/i18n";
import { BookOpen, ShieldCheck, Mail, History, Info, Cookie, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();
    const p = t.privacyPolicy;

    const getIcon = (index: number) => {
        const icons = [
            <Info className="w-6 h-6" />,
            <ShieldCheck className="w-6 h-6" />,
            <History className="w-6 h-6" />,
            <Mail className="w-6 h-6" />,
            <UserCheck className="w-6 h-6" />,
            <Cookie className="w-6 h-6" />,
            <History className="w-6 h-6" />
        ];
        return icons[index] || <BookOpen className="w-6 h-6" />;
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <Navbar />

            <main className="flex-1 py-20">
                <Container className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{p.title}</h1>
                        <p className="text-gray-500 font-medium">{p.effectiveDate}</p>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Intro Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
                        <p className="text-gray-600 leading-relaxed text-lg italic">
                            {p.intro}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {p.sections.map((section: any, idx: number) => (
                            <section key={idx} className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-100 transition-colors">
                                        {getIcon(idx)}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                                </div>

                                <div className="pl-4 border-l-2 border-gray-100 group-hover:border-amber-200 transition-colors ml-6">
                                    {section.content && (
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {section.content}
                                        </p>
                                    )}

                                    {section.list && (
                                        <ul className="space-y-3">
                                            {(section.list as string[]).map((item, itemIdx) => (
                                                <li key={itemIdx} className="flex gap-3 text-gray-600 leading-relaxed">
                                                    <span className="text-amber-500 font-bold shrink-0">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.warning && (
                                        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg flex gap-3 text-amber-800 text-sm">
                                            <span className="font-bold shrink-0">⚠️</span>
                                            <p>{section.warning}</p>
                                        </div>
                                    )}

                                    {section.contact && (
                                        <div className="mt-6 p-6 bg-slate-900 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
                                            <p className="font-medium">{section.contact}</p>
                                            <a
                                                href="mailto:ethanranxu@gmail.com"
                                                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-bold text-sm whitespace-nowrap"
                                            >
                                                Send Email
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-20 pt-10 border-t border-gray-200 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2026 EFC of East Coast Bays. All rights reserved.
                        </p>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}
