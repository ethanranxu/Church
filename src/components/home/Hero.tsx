"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n";
import Link from "next/link";

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image - removed scale for maximum clarity */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("/images/hero-bg.png")`,
                }}
            />
            {/* Minimal Overlay - removed as per user request */}

            {/* Content */}
            <Container className="relative z-20 flex flex-col items-center text-center mt-12">
                <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xl font-semibold mb-6 border border-white/30 shadow-lg animate-fade-in">
                    {t.home.hero.badge}
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-lg animate-hero-entrance">
                    {t.home.hero.title1}
                    <br />
                    {t.home.hero.title2}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md animate-hero-entrance animation-delay-200">
                    {t.home.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-entrance animation-delay-400">
                    <Link
                        href="/#location"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById("location");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(null, "", "/#location");
                            }
                        }}
                    >
                        <Button size="lg" className="flex items-center gap-2">
                            <span>{t.home.hero.joinBtn}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Button>
                    </Link>
                    <a
                        href="https://www.youtube.com/@EFCEastCoastBays/streams"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">play_circle</span>
                            <span>{t.home.hero.watchBtn}</span>
                        </Button>
                    </a>
                </div>
            </Container>
        </section>
    );
};
