import React from "react";

const GUIDE_ITEMS = [
    {
        icon: "directions_car",
        title: "停車資訊",
        description:
            "教會設有充足的免費停車位。當您抵達時，會有穿著背心的招待同工指引您停在最方便的位置。",
    },
    {
        icon: "child_care",
        title: "兒童主日學",
        description:
            "我們為兒童提供分齡的主日學課程 (3-12歲)。讓孩子在安全、有趣的環境中學習聖經真理。",
    },
    {
        icon: "restaurant",
        title: "主日午餐",
        description:
            "聚會結束後，請務必留步！我們每週都準備了美味的愛宴午餐，這是認識新朋友的最佳時機。",
    },
];

export const NewcomerGuide = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-[#f6f7f8] dark:bg-[#15202b]">
            <div className="mx-auto max-w-5xl flex flex-col gap-10">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#111418] dark:text-white mb-4">
                        新朋友指南
                    </h2>
                    <p className="text-[#617589] dark:text-gray-400 text-lg">
                        我們明白第一次來到新教會可能會有些緊張，這裡有一些資訊幫助您了解我們。
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GUIDE_ITEMS.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-3xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#111418] dark:text-white">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[#617589] dark:text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
