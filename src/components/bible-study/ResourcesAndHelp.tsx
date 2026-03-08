"use client";

import React from 'react';

import { useTranslation } from "@/i18n/LanguageContext";

export default function ResourcesAndHelp() {
    const { t } = useTranslation();

    const tools = [
        { name: t.bibleStudy.resources.bible, icon: 'menu_book', link: 'https://www.bible.com/zh-HK' },
        { name: t.bibleStudy.resources.map, icon: 'map', link: 'https://www.biblestudytools.com/bible-atlas/' },
        { name: t.bibleStudy.resources.streams, icon: 'water_drop', link: 'https://xybk.fuyin.tv/Books/CCIM_Streams_Desert/b5/index.htm' },
        { name: t.bibleStudy.resources.dict, icon: 'library_books', link: 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/' },
    ];
    return (
        <section className="relative z-10 w-full max-w-4xl pt-8 flex flex-col items-center">
            {/* Journey Step Dot & Title Combined */}
            <div className="mb-12 relative flex justify-center">
                <div className="relative">
                    <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border-4 border-white dark:border-[#101922] shrink-0">
                        <span className="material-symbols-outlined">import_contacts</span>
                    </div>
                    <h3 className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                        {t.bibleStudy.courses.title}
                    </h3>
                </div>
            </div>

            {/* Church Courses */}
            <div className="w-full mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 門徒訓練課程：直奔標竿 */}
                    <a
                        href="https://youtube.com/playlist?list=PLP7Y2-_kjaaW3CF35j6cWu40sGsPLTRm8&si=Hy-So6B6bSBHVLwX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-end gap-4 bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 hover:shadow-xl transition-all hover:-translate-y-1 text-right"
                    >
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 shrink-0">open_in_new</span>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{t.bibleStudy.courses.discipleship.title}</span>
                            <span className="text-lg font-bold text-slate-800 dark:text-white">{t.bibleStudy.courses.discipleship.subtitle}</span>
                        </div>
                        <div className="size-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                            <span className="material-symbols-outlined text-2xl">flag</span>
                        </div>
                    </a>

                    {/* 信徒培育課程：聖經中的家庭 */}
                    <a
                        href="https://youtube.com/playlist?list=PLP7Y2-_kjaaUlrQuBk2kS2_-sSUyN4UYG&si=X0YFkZsN2OI2H6sG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-200 hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        <div className="size-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                            <span className="material-symbols-outlined text-2xl">family_restroom</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">{t.bibleStudy.courses.believer.title}</span>
                            <span className="text-lg font-bold text-slate-800 dark:text-white">{t.bibleStudy.courses.believer.subtitle}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-500 ml-auto shrink-0">open_in_new</span>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Tools Card */}
                <div className="bg-white dark:bg-[#1a2632] rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">build</span>
                        {t.bibleStudy.resources.toolsTitle}
                    </h3>
                    <div className="space-y-3">
                        {tools.map((tool) => (
                            <a
                                key={tool.name}
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                                        {tool.icon}
                                    </span>
                                    <span className="text-slate-700 dark:text-gray-200 font-medium">
                                        {tool.name}
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">
                                    open_in_new
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-primary/60 rounded-3xl p-8 text-white flex flex-col justify-between items-center text-center shadow-xl shadow-blue-500/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">help_center</span>
                        </div>
                        <h3 className="text-2xl font-bold">{t.bibleStudy.resources.helpTitle}</h3>
                        <p className="text-blue-50 leading-relaxed">
                            {t.bibleStudy.resources.helpDesc}
                        </p>
                    </div>
                    <a
                        href="mailto:jeremiahcxq@gmail.com"
                        className="mt-8 bg-white text-primary rounded-full py-4 px-10 font-black text-lg hover:bg-blue-50 transition-all w-full shadow-lg active:scale-95 cursor-pointer flex items-center justify-center"
                    >
                        {t.bibleStudy.resources.contactBtn}
                    </a>
                </div>
            </div>
        </section>
    );
}
