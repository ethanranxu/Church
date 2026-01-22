import React from 'react';

export default function Welcome() {
    return (
        <div className="w-full bg-white dark:bg-[#101922] p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/20"></div>
            <div className="font-serif-content space-y-6 text-gray-800 dark:text-gray-200">
                <p className="text-xl font-bold text-primary mb-4">親愛的弟兄姊妹：</p>
                <div className="text-lg leading-[1.8] space-y-6">
                    <p>
                        歡迎踏上「每日與主同行」的靈修旅程！新的一年，是祝福的起點。我們將在接下來三百六十五個日子裡，一同展開整本聖經的閱讀——從創世記的創造之光，到啟示錄的永恆盼望；從律法的訓誨，到福音的恩典；從先知的呼喊，到智慧的細語。每一天，神都預備了祂的話語,等待我們前來領取生命的糧。
                    </p>
                    <p>
                        「每日與主同行」不僅是一個讀經計劃，更是一段與神親密同行的旅程。我們相信：
                    </p>
                    <div className="space-y-4 pl-4 border-l-2 border-primary/10">
                        <p className="italic text-gray-700 dark:text-gray-300">
                            神的話是活的，能在我們每天具體的處境中發聲；
                        </p>
                        <p className="italic text-gray-700 dark:text-gray-300">
                            神的心是貼近的，關心我們生活的每一個層面；
                        </p>
                        <p className="italic text-gray-700 dark:text-gray-300">
                            神的道是可行的，能轉化我們的生命，照亮我們的道路。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
