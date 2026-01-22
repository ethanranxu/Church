import React from 'react';

export default function BibleOverview() {
    return (
        <section className="relative z-10 w-full max-w-5xl mb-24 px-4">
            {/* Journey Step Dot */}
            <div className="flex justify-center mb-8">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(19,127,236,0.4)] text-white ring-4 ring-white dark:ring-[#1a222c]">
                    <span className="material-symbols-outlined text-3xl">auto_stories</span>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-[#1a2632] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-blue-50 dark:border-slate-800 text-center flex flex-col items-center gap-6 overflow-hidden relative">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">聖經速覽</h2>
                    <h3 className="text-xl font-bold text-primary">全本聖經綜覽與核心架構</h3>
                </div>

                <p className="text-slate-500 dark:text-gray-300 text-lg leading-relaxed max-w-3xl">
                    提供舊約與新約的歷史背景、神學主題及書卷大綱，幫助弟兄姊妹快速掌握聖經脈絡，建立宏觀的信仰視野。從創造到啟示，開啟一段認識上帝主權與救恩計劃的旅程。
                </p>

                <button className="mt-4 inline-flex items-center gap-3 rounded-full bg-primary hover:bg-blue-600 px-10 py-4 text-white font-bold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer">
                    <span className="material-symbols-outlined">explore</span>
                    開始閱讀
                </button>
            </div>
        </section>
    );
}
