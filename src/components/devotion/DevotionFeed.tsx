import React from 'react';

const devotionArticles = [
    {
        date: '2026年01月24日',
        title: '信心的跳躍',
        content: '在這個繁忙的世界裡，我們常常感到缺乏。我們缺乏時間、缺乏精力、缺乏安全感。然而，大衛在詩篇23篇開頭就宣告了一個驚人的真理：「耶和華是我的牧者，我必不致缺乏。」這不是因為大衛擁有很多財富，而是因為他擁有了那位擁有一切的神。'
    },
    {
        date: '2026年01月23日',
        title: '愛人如己的真諦',
        content: '當我們談論愛的時候，往往首先想到的是情感。但聖經中的「愛」更多地與行動和意志相關。愛鄰舍不僅僅是感覺良好，而是在具體的需要中伸出援手。耶穌通過撒馬利亞人的比喻，打破了界限，告訴我們每個人都是我們的鄰舍。'
    },
    {
        date: '2026年01月22日',
        title: '如何面對焦慮',
        content: '焦慮是現代人的常態，但聖經勸誡我們要「一無掛慮」。這並非要我們逃避現實，而是教導我們將所有的憂慮通過禱告交託給神。當我們將目光從問題轉向那位創造天地的神時，祂的出人意外的平安必保守我們的心懷意念。'
    }
];

export default function DevotionFeed() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">靈修分享 (Devotion Feed)</h3>
            </div>

            {devotionArticles.map((article, index) => (
                <article key={index} className="bg-white dark:bg-[#101922] p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all group">
                    <div className="flex flex-col gap-3">
                        <time className="text-sm font-medium text-gray-500 dark:text-gray-400">{article.date}</time>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors font-serif-content">
                            {article.title}
                        </h4>
                        <div className="text-gray-700 dark:text-gray-300 font-serif-content leading-relaxed line-clamp-3">
                            {article.content}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm cursor-pointer hover:underline">
                            繼續閱讀
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                </article>
            ))}

            <div className="flex justify-center py-8">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                    載入更多內容
                </button>
            </div>
        </div>
    );
}
