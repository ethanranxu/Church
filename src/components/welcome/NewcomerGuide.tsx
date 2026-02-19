'use client';

import React from "react";

import { useTranslation } from "@/i18n/LanguageContext";

export const NewcomerGuide = () => {
    const { t } = useTranslation();

    const guideItems = [
        {
            icon: "local_parking",
            title: t.welcome.guide.parking,
            description: t.welcome.guide.parkingDesc,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        },
        {
            icon: "escalator_warning",
            title: t.welcome.guide.kids,
            description: t.welcome.guide.kidsDesc,
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        },
        {
            icon: "restaurant",
            title: t.welcome.guide.lunch,
            description: t.welcome.guide.lunchDesc,
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        },
    ];
    return (
        <section className="py-16 px-4 md:px-10 bg-[#f6f7f8] dark:bg-[#15202b]">
            <div className="mx-auto max-w-5xl flex flex-col gap-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                        {t.welcome.guide.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t.welcome.guide.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guideItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-3xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#111418] dark:text-white">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[#617589] dark:text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
