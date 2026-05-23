"use client";

import React from 'react';
import { useTranslation } from "@/i18n/LanguageContext";
import Image from 'next/image';

export default function BibleOverview() {
    const { t } = useTranslation();

    return (
        <section className="relative z-10 w-full max-w-4xl px-4">
            <div className="bg-white dark:bg-[#1a2632] rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 text-xs font-bold tracking-wider uppercase mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        {t.bibleStudy.overview.badge}
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">
                        {t.bibleStudy.overview.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t.bibleStudy.overview.description}
                    </p>
                    <a
                        href="https://www.bible.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 mx-auto md:mx-0 w-fit"
                    >
                        <span className="material-symbols-outlined">play_circle</span>
                        {t.bibleStudy.overview.startBtn}
                    </a>
                </div>
                <div className="w-full md:w-1/3 aspect-square relative rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                        src="/images/bible.png"
                        alt="Bible Overview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
            </div>
        </section>
    );
}
