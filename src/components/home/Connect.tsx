"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n";

export const Connect = () => {
    const { t } = useTranslation();

    return (
        <Section className="bg-primary text-white">
            <Container className="text-center">
                <h2 className="text-3xl font-bold mb-6">{t.home.connect.title}</h2>
                <p className="text-primary-100 mb-10 max-w-xl mx-auto opacity-90">
                    {t.home.connect.description}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-12">
                    <a
                        href="https://www.facebook.com/efcecb/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="Facebook"
                    >
                        <span className="font-bold text-2xl group-hover:scale-110 transition-transform">fb</span>
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCmYfo0BlmnaivWtSfszI3iQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="YouTube"
                    >
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                            smart_display
                        </span>
                    </a>
                    <a
                        href="https://www.instagram.com/efcecbnz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="Instagram"
                    >
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                            photo_camera
                        </span>
                    </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="mailto:efcecbnz@gmail.com">
                        <Button
                            variant="ghost"
                            className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            {t.home.connect.contactUs}
                        </Button>
                    </a>
                </div>
            </Container>
        </Section>
    );
};
