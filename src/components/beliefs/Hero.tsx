"use client";

import { useTranslation } from '@/i18n';
import Image from 'next/image';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <div className="relative flex flex-col w-full h-[400px]">
            <Image
                src="/images/beliefs-hero.jpg"
                alt="Beliefs Hero"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/60 to-[#1e3a8a]/40 z-0"></div>
            <div className="relative flex flex-col items-center justify-center h-full p-8 z-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                    {t.beliefs.hero.title}
                </h1>
                <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                    {t.beliefs.hero.scripture}
                    <br />
                    {t.beliefs.hero.reference}
                </p>
                <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
            </div>
        </div >
    );
}
