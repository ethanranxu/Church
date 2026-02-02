import React from "react";

const TESTIMONIALS = [
    {
        name: "王弟兄",
        duration: "加入教會 6 個月",
        avatar: "/images/assets/testimonial-avatar-1.jpg",
        quote: "剛搬到奧克蘭時覺得很孤單，但第一次來到長堤就感受到了家的溫暖。這裡的弟兄姊妹非常熱情，讓我很快就融入了這個大家庭。",
    },
    {
        name: "林姊妹",
        duration: "加入教會 1 年",
        avatar: "/images/lin_sister_avatar_v2.jpg",
        quote: "兒童主日學非常棒！我的孩子每個禮拜都很期待來教會。老師們很有愛心，教導孩子聖經真理，讓我們做父母的非常放心。",
    },
    {
        name: "陳弟兄",
        duration: "加入教會 2 個月",
        avatar: "/images/assets/testimonial-avatar-2.jpg",
        quote: "這裡的講道非常生活化，幫助我在忙碌的工作中找到平安。主日午餐的團契時間也是我每週最期待的時刻。",
    },
];

export const Testimonials = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center text-[#111418] dark:text-white mb-12">
                    新家人的分享
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item) => (
                        <div
                            key={item.name}
                            className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl relative"
                        >
                            <span className="material-symbols-outlined text-4xl text-gray-200 dark:text-gray-700 absolute top-4 right-4">
                                format_quote
                            </span>
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-gray-300 overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url("${item.avatar}")`,
                                        }}
                                    ></div>
                                </div>
                                <div>
                                    <p className="font-bold text-[#111418] dark:text-white">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-[#617589] dark:text-gray-500">
                                        {item.duration}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#617589] dark:text-gray-300 italic">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
