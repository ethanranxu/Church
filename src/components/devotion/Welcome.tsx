"use client";

import React from 'react';
import { useTranslation } from "@/i18n/LanguageContext";

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-white dark:bg-[#101922] p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/20"></div>
            <div className="font-serif-content space-y-6 text-gray-800 dark:text-gray-200">
                <p className="text-xl font-bold text-primary mb-4">{t.devotion.welcome.title}</p>
                <div className="text-lg leading-[1.8] space-y-6">
                    <p>
                        {t.devotion.welcome.p1}
                    </p>
                    <p>
                        {t.devotion.welcome.p2}
                    </p>
                    <div className="space-y-4 pl-4 border-l-2 border-primary/10">
                        <p className="italic text-gray-700 dark:text-gray-300">
                            {t.devotion.welcome.point1}
                        </p>
                        <p className="italic text-gray-700 dark:text-gray-300">
                            {t.devotion.welcome.point2}
                        </p>
                        <p className="italic text-gray-700 dark:text-gray-300">
                            {t.devotion.welcome.point3}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
