import React from "react";

const FAQ_ITEMS = [
    {
        icon: "help",
        question: "我需要是基督徒才能參加嗎？",
        answer: "完全不需要。教會是對所有人開放的，無論您的信仰背景如何，我們都非常歡迎您來認識我們，探索信仰。",
    },
    {
        icon: "checkroom",
        question: "參加聚會有服裝規定嗎？",
        answer: "沒有特別規定。我們的會眾穿著從休閒（牛仔褲、T恤）到正式（襯衫、西裝）都有。請穿著讓您感到舒適自在的服裝即可。",
    },
    {
        icon: "translate",
        question: "講道使用中文嗎？",
        answer: "我們的主日崇拜主要以中文（國語）進行，講道、聖經經文以及大部分敬拜讚美都會使用中文。同時也歡迎不同語言背景的朋友一同參與。",
    },
];

export const FAQ = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-[#f6f7f8] dark:bg-[#15202b]">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#111418] dark:text-white">
                        常見問題
                    </h2>
                    <p className="text-[#617589] dark:text-gray-400 mt-2">
                        還有疑問嗎？這裡可能有您想知道的答案
                    </p>
                </div>
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item) => (
                        <div
                            key={item.question}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex gap-4">
                                <div className="text-primary mt-1">
                                    <span className="material-symbols-outlined">
                                        {item.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-2">
                                        {item.question}
                                    </h3>
                                    <p className="text-[#617589] dark:text-gray-300">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
