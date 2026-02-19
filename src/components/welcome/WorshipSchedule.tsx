'use client';

import React from "react";
import { useTranslation } from "@/i18n/LanguageContext";

export const WorshipSchedule = () => {
    const { t } = useTranslation();

    const scheduleItems = [
        {
            time: "10:00 - 10:30",
            title: t.welcome.schedule.worship,
            description: t.welcome.schedule.worshipDesc,
            icon: "queue_music",
            color: "from-blue-500 to-cyan-500",
        },
        {
            time: "10:30 - 11:15",
            title: t.welcome.schedule.sermon,
            description: t.welcome.schedule.sermonDesc,
            icon: "menu_book",
            color: "from-purple-500 to-pink-500",
        },
        {
            time: "11:15 - 11:30",
            title: t.welcome.schedule.announcement,
            description: t.welcome.schedule.announcementDesc,
            icon: "campaign",
            color: "from-amber-500 to-orange-500",
        },
        {
            time: "12:00 - 13:00",
            title: t.welcome.schedule.fellowship,
            description: t.welcome.schedule.fellowshipDesc,
            icon: "soup_kitchen",
            color: "from-emerald-500 to-teal-500",
        },
    ];
    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t.welcome.schedule.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.welcome.schedule.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10">
                    {scheduleItems.map((item, index) => (
                        <React.Fragment key={item.title}>
                            <div className="flex flex-col items-center gap-2">
                                {index > 0 && (
                                    <div className="w-0.5 bg-gray-200 dark:bg-gray-700 h-2"></div>
                                )}
                                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary z-10">
                                    <span className="material-symbols-outlined">
                                        {item.icon}
                                    </span>
                                </div>
                                {index !== scheduleItems.length - 1 && (
                                    <div className="w-0.5 bg-gray-200 dark:bg-gray-700 grow min-h-[60px]"></div>
                                )}
                            </div>
                            <div
                                className={`flex flex-col pt-1 ${index !== scheduleItems.length - 1 ? "pb-8" : ""}`}
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-[#111418] dark:text-white">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {item.time}
                                    </span>
                                </div>
                                <p className="text-[#617589] dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};
