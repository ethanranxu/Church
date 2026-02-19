"use client";

import React, { useMemo } from 'react';
import { BookOpen, Wind, Infinity, Heart, UserX, Wine, Frown, Users, Church } from 'lucide-react';
import { useTranslation } from '@/i18n';

const BeliefCard = ({ icon: Icon, title, description, reference, colorClass = "text-[#1E3A8A]" }: any) => (
    <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
            <Icon size={120} />
        </div>

        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className={`w-6 h-6 ${colorClass} dark:text-blue-400`} />
            </div>
            <h3 className={`text-xl font-bold ${colorClass} dark:text-blue-300`}>{title}</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed tracking-wide text-sm flex-grow mb-6">
            {description}
        </p>

        <div className="text-xs text-gray-400 italic font-medium pt-4 border-t border-gray-50 dark:border-gray-800 h-14 flex items-center">
            {reference}
        </div>
    </div>
);

export default function FundamentalTruths() {
    const { t } = useTranslation();

    const beliefs = useMemo(() => [
        { icon: BookOpen, title: t.beliefs.fundamentalTruths.bible, description: t.beliefs.fundamentalTruths.bibleDesc, reference: t.beliefs.fundamentalTruths.bibleRef },
        { icon: Wind, title: t.beliefs.fundamentalTruths.holySpirit, description: t.beliefs.fundamentalTruths.holySpiritDesc, reference: t.beliefs.fundamentalTruths.holySpiritRef },
        { icon: Infinity, title: t.beliefs.fundamentalTruths.oneGod, description: t.beliefs.fundamentalTruths.oneGodDesc, reference: t.beliefs.fundamentalTruths.oneGodRef },
        { icon: Heart, title: t.beliefs.fundamentalTruths.jesus, description: t.beliefs.fundamentalTruths.jesusDesc, reference: t.beliefs.fundamentalTruths.jesusRef },
        { icon: UserX, title: t.beliefs.fundamentalTruths.salvation, description: t.beliefs.fundamentalTruths.salvationDesc, reference: t.beliefs.fundamentalTruths.salvationRef },
        { icon: Wine, title: t.beliefs.fundamentalTruths.sacraments, description: t.beliefs.fundamentalTruths.sacramentsDesc, reference: t.beliefs.fundamentalTruths.sacramentsRef },
        { icon: Frown, title: t.beliefs.fundamentalTruths.fall, description: t.beliefs.fundamentalTruths.fallDesc, reference: t.beliefs.fundamentalTruths.fallRef },
        { icon: Church, title: t.beliefs.fundamentalTruths.church, description: t.beliefs.fundamentalTruths.churchDesc, reference: t.beliefs.fundamentalTruths.churchRef },
        { icon: Users, title: t.beliefs.fundamentalTruths.ministry, description: t.beliefs.fundamentalTruths.ministryDesc, reference: t.beliefs.fundamentalTruths.ministryRef },
    ], [t]);

    return (
        <div className="w-full pt-12 pb-12 px-4 md:px-8 bg-white dark:bg-[#101922]">
            <div className="max-w-[1140px] w-full mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">{t.beliefs.fundamentalTruths.title}</h2>
                    <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.beliefs.fundamentalTruths.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {beliefs.map((belief, index) => (
                        <BeliefCard key={index} {...belief} />
                    ))}
                </div>
            </div>
        </div>
    );
}
