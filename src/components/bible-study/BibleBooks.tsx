'use client';

import React from 'react';
import { useTranslation } from "@/i18n/LanguageContext";

const BibleBooks = () => {
    const { t } = useTranslation();

    const oldTestament = [
        { name: t.bibleStudy.books.genesis.name, subtitle: t.bibleStudy.books.genesis.subtitle, icon: 'eco', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaU02f9zzO9bD_K1gduUoNjY' },
        { name: t.bibleStudy.books.exodus.name, subtitle: t.bibleStudy.books.exodus.subtitle, icon: 'waves', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaWSZWlHWfmCzgjEjRnJzWGo' },
        { name: t.bibleStudy.books.deuteronomy.name, subtitle: t.bibleStudy.books.deuteronomy.subtitle, icon: 'gavel', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaUJYwyquxkPvcqsyPWs5h_2' },
    ];

    const newTestament = [
        { name: t.bibleStudy.books.revelation, icon: 'auto_awesome', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaUA0lNNXN6wG7EooQmK7fwp' },
        { name: t.bibleStudy.books.mark, icon: 'face_6', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaU8a9x7nYQ-J_JUdEOtO9Da' },
        { name: t.bibleStudy.books.ephesians, icon: 'forward_to_inbox', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaXlMOCNYUpq4Vowd10aV-S6' },
        { name: t.bibleStudy.books.hebrews, icon: 'account_balance', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaUEZCf_GzkdiP41UCAo__3d' },
        { name: t.bibleStudy.books.acts, icon: 'footprint', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaUurqmm7_Kz-IPPg29KJWZg' },
        { name: t.bibleStudy.books.timothy, icon: 'person_pin', link: 'https://www.youtube.com/playlist?list=PLP7Y2-_kjaaUGE_COV0p297YLFjOcX2n8' },
    ];

    return (
        <section className="relative z-10 w-full max-w-7xl mb-12 px-4">
            {/* Journey Step Dot */}
            <div className="flex justify-center mb-16">
                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border-4 border-white dark:border-[#101922]">
                    <span className="material-symbols-outlined">import_contacts</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Old Testament */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4 text-amber-700 dark:text-amber-500 border-b-2 border-amber-100 dark:border-amber-900/30 pb-4 md:flex-row-reverse md:text-right">
                        <span className="material-symbols-outlined text-4xl">history_edu</span>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            {t.bibleStudy.books.oldTestament}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-4 md:items-end">
                        {oldTestament.map((book) => (
                            <a
                                key={book.name}
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-end gap-4 bg-white dark:bg-[#1a2632] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-amber-200 hover:shadow-xl transition-all hover:-translate-y-1 w-full sm:w-[calc(50%-0.5rem)] text-right"
                            >
                                <div className="flex-1">
                                    <span className="text-lg font-bold block text-slate-800 dark:text-white group-hover:text-amber-600 transition-colors">
                                        {book.name}
                                    </span>
                                    <span className="text-sm text-slate-400">{book.subtitle}</span>
                                </div>
                                <div className="size-14 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 shrink-0">
                                    <span className="material-symbols-outlined text-2xl">{book.icon}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* New Testament */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-end md:justify-start gap-4 text-emerald-700 dark:text-emerald-500 border-b-2 border-emerald-100 dark:border-emerald-900/30 pb-4">
                        <span className="material-symbols-outlined text-4xl">local_library</span>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            {t.bibleStudy.books.newTestament}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {newTestament.map((book) => (
                            <a
                                key={book.name}
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                                    <span className="material-symbols-outlined text-xl">{book.icon}</span>
                                </div>
                                <span className="text-md font-bold text-slate-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                    {book.name}
                                </span>
                            </a>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default BibleBooks;
