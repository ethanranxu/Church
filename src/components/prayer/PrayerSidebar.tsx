"use client";

import React from "react";
import { useTranslation } from "@/i18n";

export const PrayerSidebar = () => {
    const { t } = useTranslation();

    return (
        <div className="lg:w-[360px] flex flex-col gap-6">
            {/* Scripture Card */}
            <div className="bg-gradient-to-br from-primary/80 to-blue-600/80 p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white/100">{t.prayer.sidebar.scriptureTitle}</span>
                </div>
                <p className="font-serif-content text-lg italic leading-relaxed mb-4">
                    {t.prayer.sidebar.scriptureText}
                </p>
                <p className="text-right text-sm font-bold text-white/80">
                    — {t.prayer.sidebar.scriptureRef}
                </p>
            </div>

            {/* Prayer Team Info */}
            <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <span className="material-symbols-outlined">volunteer_activism</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#111418] dark:text-white">
                        {t.prayer.sidebar.prayForYou}
                    </h3>
                </div>
                <p className="text-[#617589] dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {t.prayer.sidebar.prayForYouDesc}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#617589] dark:text-gray-400">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>{t.prayer.sidebar.privacyNote}</span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-base text-[#111418] dark:text-white mb-4">
                    {t.prayer.sidebar.emergencyContact}
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">call</span>
                        <span>022 476 9930</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">email</span>
                        <span>efcecbnz@gmail.com</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
