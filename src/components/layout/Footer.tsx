"use client";

import React, { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/i18n";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    const { t } = useTranslation();

    const FOOTER_SECTIONS = useMemo(() => [
        {
            title: t.footer.churchInfo,
            links: [
                { name: t.footer.aboutChurch, href: "/east-coast-bays" },
                { name: t.footer.aboutUs, href: "/ministry-team" },
                { name: t.footer.contactUs, href: "/#location" },
            ],
        },
        {
            title: t.footer.servicesResources,
            links: [
                { name: t.footer.sundayService, href: "/#service-info" },
                { name: t.footer.mediaResources, href: "/bible-study" },
                { name: t.footer.dailyDevotion, href: "/devotion" },
            ],
        },
        {
            title: t.footer.careOffering,
            links: [
                { name: t.footer.newFriends, href: "/welcome" },
                { name: t.footer.prayerRequest, href: "/prayer" },
                { name: t.footer.offeringInfo, href: "/offering" },
            ],
        },
    ], [t]);

    return (
        <footer className="bg-[#0d141b] text-slate-300 py-16 border-t border-gray-800">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center text-white relative h-36 w-full max-w-[200px]">
                            <Image
                                src="/images/footer-logo.jpg"
                                alt="長堤基督教會 Logo"
                                fill
                                className="object-contain bg-white rounded p-1"
                                sizes="(max-width: 768px) 200px, 300px"
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
                        Copyright © 2026 {t.footer.copyright}. {t.footer.allRights}
                        <span className="mx-2">|</span>
                        <Link href="/privacy-policy" className="hover:text-amber-500 transition-colors">
                            {t.footer.privacyPolicy}
                        </Link>
                        <br />
                        Website design, development & maintenance by <a href="mailto:ethanranxu@gmail.com" className="hover:text-amber-500 transition-colors">Xu Ran</a>.
                    </p>
                </div>
            </Container>
        </footer>
    );
};
