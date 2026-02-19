
'use client';

import { useTranslation } from "@/i18n/LanguageContext";
import React from "react";

export const PastorMessage = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("/images/assets/pastor-message.jpg")`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-12 h-1 bg-amber-500 rounded-full"></span>
                            <span className="text-amber-600 dark:text-amber-400 font-bold tracking-wider uppercase text-sm">
                                {t.welcome.pastor.label}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {t.welcome.pastor.title}
                        </h2>

                        <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed text-lg">
                            <p>
                                {t.welcome.pastor.p1}
                            </p>
                            <p>
                                {t.welcome.pastor.p2}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
