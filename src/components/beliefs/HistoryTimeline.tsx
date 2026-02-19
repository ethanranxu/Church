"use client";

import React from 'react';
import { Church, Users, Building, PartyPopper } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function HistoryTimeline() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 justify-center py-12 px-4 md:px-8 bg-[#F9FAFB] dark:bg-[#101922]">
            <div className="flex flex-col max-w-[1140px] w-full gap-24">
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">{t.beliefs.history.title}</h2>
                        <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t.beliefs.history.subtitle}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A] opacity-20 hidden md:block"></div>

                        <div className="flex flex-col gap-12 relative">

                            {/* 2003 Item */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-2 md:order-1">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-l-4 border-[#1E3A8A]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">{t.beliefs.history.year2003}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            {t.beliefs.history.year2003Desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 bg-[#1E3A8A] text-white p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Church className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-3">
                                    <img alt="2003 Church Founding" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="/images/assets/history-2003.jpg" />
                                </div>
                            </div>

                            {/* 2015 Item (Right Aligned Text) */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-3 md:order-1">
                                    <img alt="2015 Mission" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="/images/assets/history-2015.jpg" />
                                </div>
                                <div className="z-10 bg-[#FBBF24] text-[#1E3A8A] p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-2 md:order-3">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-r-4 border-[#FBBF24]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">{t.beliefs.history.year2015}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            {t.beliefs.history.year2015Desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2019 Item */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-2 md:order-1">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-l-4 border-[#1E3A8A]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">{t.beliefs.history.year2019}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            {t.beliefs.history.year2019Desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 bg-[#1E3A8A] text-white p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <Building className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-3">
                                    <img alt="2019 Expansion" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="/images/assets/history-2019.jpg" />
                                </div>
                            </div>

                            {/* 2023 Item (Right Aligned) */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-[45%] order-3 md:order-1">
                                    <img alt="2023 New Chapter" className="w-full h-48 object-cover rounded-2xl shadow-lg" src="/images/assets/history-2023.jpg" />
                                </div>
                                <div className="z-10 bg-[#FBBF24] text-[#1E3A8A] p-3 rounded-full mb-6 md:mb-0 order-1 md:order-2">
                                    <PartyPopper className="w-8 h-8" />
                                </div>
                                <div className="w-full md:w-[45%] order-2 md:order-3">
                                    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-md border-r-4 border-[#FBBF24]">
                                        <h3 className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400 mb-3">{t.beliefs.history.year2023}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide">
                                            {t.beliefs.history.year2023Desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Detailed History Text */}
                    <div className="mt-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1E3A8A]/10 dark:to-[#1a2632] p-8 md:p-12 rounded-3xl border border-blue-100 dark:border-blue-800 shadow-sm">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <p className="text-gray-700 dark:text-gray-200 text-justify indent-[2em] leading-relaxed tracking-wider">
                                {t.beliefs.history.historyParagraph1}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-justify indent-[2em] leading-relaxed tracking-wider">
                                {t.beliefs.history.historyParagraph2}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-justify indent-[2em] leading-relaxed tracking-wider">
                                {t.beliefs.history.historyParagraph3}<br />&nbsp;&nbsp;&nbsp;&nbsp;{t.beliefs.history.goal1}<br />&nbsp;&nbsp;&nbsp;&nbsp;{t.beliefs.history.goal2}<br />&nbsp;&nbsp;&nbsp;&nbsp;{t.beliefs.history.goal3}<br />&nbsp;&nbsp;&nbsp;&nbsp;{t.beliefs.history.goalSuffix}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 text-justify indent-[2em] leading-relaxed tracking-wider">
                                {t.beliefs.history.historyParagraph4}
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
