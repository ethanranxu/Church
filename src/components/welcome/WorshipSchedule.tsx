import React from "react";

const SCHEDULE_ITEMS = [
    {
        icon: "music_note",
        title: "詩歌敬拜",
        time: "10:00 AM",
        description:
            "我們以當代與傳統詩歌開始聚會，全心敬拜上帝，預備我們的心領受信息。",
        isLast: false,
    },
    {
        icon: "menu_book",
        title: "聖經教導與講道",
        time: "10:30 AM",
        description:
            "牧師分享建基於聖經的信息，幫助我們將信仰應用於日常生活中。現場提供即時英文翻譯設備。",
        isLast: false,
    },
    {
        icon: "campaign",
        title: "教會報告與歡迎",
        time: "11:30 AM",
        description: "分享教會近況與活動資訊，並特別歡迎第一次來的新朋友。",
        isLast: false,
    },
    {
        icon: "coffee",
        title: "午餐與團契",
        time: "12:00 PM",
        description:
            "聚會後我們一同享用午餐，這是大家互相交流、彼此關心的美好時光。",
        isLast: true,
    },
];

export const WorshipSchedule = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white">
                        主日崇拜流程
                    </h2>
                    <p className="text-[#617589] dark:text-gray-400 mt-2">
                        我們週日的聚會大約歷時 120 分鐘，流程簡單而溫馨
                    </p>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10">
                    {SCHEDULE_ITEMS.map((item, index) => (
                        <React.Fragment key={item.title}>
                            <div className="flex flex-col items-center gap-2">
                                {index > 0 && (
                                    <div className="w-0.5 bg-gray-200 dark:bg-gray-700 h-2"></div>
                                )}
                                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary z-10">
                                    <span className="material-symbols-outlined">
                                        {item.icon}
                                    </span>
                                </div>
                                {!item.isLast && (
                                    <div className="w-0.5 bg-gray-200 dark:bg-gray-700 grow min-h-[60px]"></div>
                                )}
                            </div>
                            <div
                                className={`flex flex-col pt-1 ${!item.isLast ? "pb-8" : ""}`}
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-[#111418] dark:text-white">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {item.time}
                                    </span>
                                </div>
                                <p className="text-[#617589] dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};
