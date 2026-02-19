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
            {/* Journey Step Dot */}
            <div className="mb-12">
                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border-4 border-white dark:border-[#101922]">
                    <span className="material-symbols-outlined">import_contacts</span>
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
                    <button className="mt-8 bg-white text-primary rounded-full py-4 px-10 font-black text-lg hover:bg-blue-50 transition-all w-full shadow-lg active:scale-95 cursor-pointer">
                        {t.bibleStudy.resources.contactBtn}
                    </button>
                </div>
            </div>
        </section>
    );
}
