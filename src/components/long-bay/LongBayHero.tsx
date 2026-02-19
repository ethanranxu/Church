"use client";

import React from "react";
import { useTranslation } from "@/i18n";

export const LongBayHero = () => {
    const { t } = useTranslation();

    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.85), rgba(30, 64, 175, 0.8)), url("/images/long-bay-church.jpg")`,
            }}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
                <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full" />
                <div className="absolute top-1/3 right-10 w-16 h-16 border border-white/20 rounded-full" />
            </div>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                {t.nav.longBay}
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                {t.longBay.hero.subtitle}
            </p>
            <div className="w-24 h-1.5 bg-amber-400 mt-8 rounded-full"></div>
        </div>
    );
};
