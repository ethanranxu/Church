"use client";

import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function JoinCTA() {
    const { t } = useTranslation();

    return (
        <div className="w-full pt-12 pb-12 px-4 md:px-8 bg-[#F9FAFB] dark:bg-[#101922]">
            <div className="max-w-[1140px] w-full mx-auto">
                <div className="bg-gradient-to-br from-[#1E3A8A] to-[#152a6d] rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("/images/assets/join-cta-bg.jpg")' }}></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <HeartHandshake className="text-[#FBBF24] mb-6 w-12 h-12" />
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">{t.beliefs.joinCTA.title}</h3>
                        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                            {t.beliefs.joinCTA.description}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="/#location" className="flex cursor-pointer items-center justify-center rounded-full h-14 px-10 bg-[#FBBF24] hover:bg-yellow-400 transition-all text-[#1E3A8A] text-lg font-bold shadow-lg transform hover:scale-105">
                                {t.beliefs.joinCTA.contactUs}
                            </a>
                            <a href="/#service-info" className="flex cursor-pointer items-center justify-center rounded-full h-14 px-10 bg-white/10 hover:bg-white/20 border border-white/30 transition-all text-white text-lg font-bold backdrop-blur-sm">
                                {t.beliefs.joinCTA.joinSunday}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
