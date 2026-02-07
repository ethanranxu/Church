"use client";

import React from "react";
import { Users, Baby, Heart, BookOpen } from "lucide-react";

type TimelineEvent = {
    year: string;
    title: string;
    description: string;
};

type Stat = {
    icon: React.ReactNode;
    value: string;
    label: string;
};

const timeline: TimelineEvent[] = [
    {
        year: "2015",
        title: "成立禱告站",
        description: "9月開始在該區成立禱告站，每週帶領查經小組，聚集20多位弟兄姊妹參加。",
    },
    {
        year: "2016",
        title: "正式開始主日崇拜",
        description:
            "3月6日正式開始第一次主日崇拜聚會，從母會長堤教會差派敬拜團、兒童主日學老師、音控組同工支援。",
    },
    {
        year: "2019",
        title: "持續增長",
        description: "全年28位弟兄姊妹受洗，教會持續增長。",
    },
];

const stats: Stat[] = [
    { icon: <Users className="w-8 h-8" />, value: "90+", label: "成人聚會" },
    { icon: <Baby className="w-8 h-8" />, value: "60+", label: "兒童主日學" },
    { icon: <Heart className="w-8 h-8" />, value: "28", label: "2019年受洗" },
];

const groups = [
    "從懷疑到相信一領一課程",
    "受洗班基要真理課程",
    "我愛我家夫婦團契成長小組",
    "晨光小組",
    "慕義小組",
    "麥子小組",
    "平安小組",
    "YOUNG道理青年團契",
];

export const ChurchHistory = () => {
    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                {/* Background Story */}
                <div className="mb-12">
                    <div className="flex flex-col gap-4 mb-8 text-center">
                        <h2 className="text-[#111418] text-4xl font-black leading-tight">
                            教會歷史
                        </h2>
                        <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-base">
                            木槿灣地區距離長堤母會向北行駛20分鐘。當時北岸地區，特別是Albany一帶房價飆升，居住成本過高，
                            許多新舊移民與華人紛紛遷往新興社區如Silverdale、Millwater等購地自建。政府積極推動當地的造鎮計畫，
                            大型商場、學校都已具雛型。其中Kingsway小學隸屬於基督教小學，風評極好，吸引大量華人家長青睞。
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base mt-4">
                            龔牧師領受上帝的異象，看見這地區的需要，深感華人移民眾多卻沒有一間華人教會，就為此迫切禱告。
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-12">
                    <h3 className="text-2xl font-black text-[#111418] mb-6 text-center">發展歷程</h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform md:-translate-x-1/2" />

                        {timeline.map((event, index) => (
                            <div
                                key={event.year}
                                className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Year bubble */}
                                <div className="absolute left-8 md:left-1/2 w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg border-4 border-white">
                                    <span className="text-white font-bold text-xl">{event.year}</span>
                                </div>

                                {/* Content */}
                                <div
                                    className={`ml-24 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                                        }`}
                                >
                                    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 p-6 border border-slate-100">
                                        <h4 className="text-xl font-bold text-emerald-600 mb-2">
                                            {event.title}
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 md:p-6 text-center text-white shadow-sm"
                        >
                            <div className="flex justify-center mb-3 opacity-80">{stat.icon}</div>
                            <p className="text-3xl md:text-4xl font-black mb-1">{stat.value}</p>
                            <p className="text-sm md:text-base text-emerald-100">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Groups */}
                <div className="bg-slate-800 rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="w-6 h-6 text-amber-400" />
                        <h3 className="text-xl font-bold text-white">週間小組</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {groups.map((group) => (
                            <span
                                key={group}
                                className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors duration-300"
                            >
                                {group}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
