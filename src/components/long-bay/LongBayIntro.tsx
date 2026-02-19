"use client";

import React, { useMemo } from "react";
import { useTranslation } from "@/i18n";

type TimelineEvent = {
    year: string;
    events: {
        title: string;
        description: string;
        date?: string;
    }[];
};

export const LongBayIntro = () => {
    const { t } = useTranslation();

    const timeline: TimelineEvent[] = useMemo(() => [
        {
            year: "2018",
            events: [
                {
                    title: t.longBay.intro.year2018Event1Title,
                    description: t.longBay.intro.year2018Event1Desc,
                    date: t.longBay.intro.year2018Event1Date
                },
                {
                    title: t.longBay.intro.year2018Event2Title,
                    description: t.longBay.intro.year2018Event2Desc,
                    date: t.longBay.intro.year2018Event2Date
                }
            ]
        },
        {
            year: "2019",
            events: [
                {
                    title: t.longBay.intro.year2019Event1Title,
                    description: t.longBay.intro.year2019Event1Desc,
                    date: t.longBay.intro.year2019Event1Date
                }
            ]
        },
    ], [t]);

    return (
        <section className="w-full pt-12 pb-6 bg-white">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                {/* Background Story */}
                <div className="mb-12">
                    <div className="flex flex-col gap-4 mb-8 text-center">
                        <h2 className="text-[#111418] text-4xl font-black leading-tight">
                            {t.longBay.intro.title}
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-base indent-[2em]">
                            {t.longBay.intro.background1}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base indent-[2em] mt-4">
                            {t.longBay.intro.background2}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div>
                    <h3 className="text-4xl font-black text-[#111418] mb-12 text-center">{t.longBay.intro.timelineTitle}</h3>
                    <div className="max-w-4xl mx-auto space-y-12">
                        {timeline.map((yearGroup) => (
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
