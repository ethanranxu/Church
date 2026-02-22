"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslation } from "@/i18n/LanguageContext";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden p-4 text-center md:p-10 z-0">
            <Image
                src="/images/assets/devotion-hero.jpg"
                alt={t.devotion.hero.title || "Devotion Hero"}
                fill
                priority
                className="object-cover object-center -z-20"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/40 to-black/60 -z-10" />

            <h1 className="relative text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                {t.devotion.hero.title}
            </h1>
            <p className="relative text-white text-lg md:text-xl font-medium max-w-3xl opacity-90 drop-shadow-md">
                {t.devotion.hero.scripture}
                <br />
                {t.devotion.hero.reference}
            </p>
            <div className="relative w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
}
