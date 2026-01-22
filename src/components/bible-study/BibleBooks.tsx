import React from 'react';

const oldTestamentBooks = [
    { name: '創世記', subtitle: '起源與約', icon: 'eco' },
    { name: '出埃及記', subtitle: '拯救與律法', icon: 'waves' },
    { name: '申命記', subtitle: '重申誡命', icon: 'gavel' },
];

const newTestamentBooks = [
    { name: '啟示錄', icon: 'auto_awesome' },
    { name: '馬可福音', icon: 'face_6' },
    { name: '以弗所書', icon: 'forward_to_inbox' },
    { name: '希伯來書', icon: 'account_balance' },
    { name: '使徒行傳', icon: 'footprint' },
    { name: '提摩太前後書', icon: 'person_pin' },
    { name: '哥林多前後書', icon: 'forum' },
];

export default function BibleBooks() {
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
                        <h2 className="text-4xl font-black w-full">舊約</h2>
                    </div>
                    <div className="flex flex-col gap-4 md:items-end">
                        {oldTestamentBooks.map((book) => (
                            <a
                                key={book.name}
                                href="#"
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
                        <h2 className="text-4xl font-black">新約</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {newTestamentBooks.map((book) => (
                            <a
                                key={book.name}
                                href="#"
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
                        {/* Special Training Card - Moved to new row */}
                        <a
                            href="#"
                            className="group flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all hover:-translate-y-1 sm:col-start-1"
                        >
                            <div className="size-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-md shrink-0">
                                <span className="material-symbols-outlined text-xl">school</span>
                            </div>
                            <span className="text-md font-bold text-primary dark:text-blue-400">
                                2025同工造就訓練
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
