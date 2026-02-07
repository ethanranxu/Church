"use client";

import React from "react";

type TimelineEvent = {
    year: string;
    events: {
        title: string;
        description: string;
        date?: string;
    }[];
};

const timeline: TimelineEvent[] = [
    {
        year: "2018",
        events: [
            {
                title: "設立禱告小組",
                description: "10月份開始在長灣地區設立禱告小組，為這地的福音工作守望禱告。",
                date: "10月"
            },
            {
                title: "社區聖誕佈道會",
                description: "12月14日舉辦第一次社區聖誕佈道會，向社區傳遞愛的福音。",
                date: "12月"
            }
        ]
    },
    {
        year: "2019",
        events: [
            {
                title: "設立感恩禮拜",
                description: "6月2日在林國亮院長及眾牧者的祝福下舉行設立感恩禮拜，正式取名為「長灣基督教會」。",
                date: "6月"
            }
        ]
    },
];

export const LongBayIntro = () => {
    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                {/* Background Story */}
                <div className="mb-12">
                    <div className="flex flex-col gap-4 mb-8 text-center">
                        <h2 className="text-[#111418] text-4xl font-black leading-tight">
                            教會簡介
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-base">
                            長灣地區距離紐西蘭奧克蘭市中心向北行駛30分鐘，有著一條長達一公里的沙灘及一座地區公園（Long Bay Regional Park）。這裡不但地理位置十分優越、自然風光迷人，更是紐西蘭政府重點發展的潛力地區之一。
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base mt-4">
                            因此，龔牧師秉持著神所賜下的異象，要在這上好的土地為主圖謀大事，搶救百萬靈魂！
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-12">
                    <h3 className="text-2xl font-black text-[#111418] mb-12 text-center">發展歷程</h3>
                    <div className="max-w-4xl mx-auto space-y-12">
                        {timeline.map((yearGroup, index) => (
                            <div key={yearGroup.year} className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Year Column */}
                                <div className="md:w-1/4 flex-shrink-0 flex md:flex-col items-center md:items-end gap-4">
                                    <div className="text-4xl md:text-5xl font-black text-blue-600/20 md:text-blue-600/20 select-none">
                                        {yearGroup.year}
                                    </div>
                                    <div className="hidden md:block w-px h-full bg-gradient-to-b from-blue-200 to-transparent min-h-[100px]" />
                                </div>

                                {/* Events Column */}
                                <div className="md:w-3/4 space-y-6">
                                    {yearGroup.events.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 group-hover:bg-blue-500 transition-colors duration-300" />

                                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                                <h4 className="text-xl font-bold text-slate-800">
                                                    {event.title}
                                                </h4>
                                                {event.date && (
                                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                                        {event.date}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-600 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
