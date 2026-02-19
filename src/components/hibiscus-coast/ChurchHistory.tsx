"use client";

import React, { useMemo } from "react";
import { Users, Baby, Heart, BookOpen } from "lucide-react";
import { useTranslation } from "@/i18n";

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

export const ChurchHistory = () => {
    const { t } = useTranslation();

    const timeline: TimelineEvent[] = useMemo(() => [
        {
            year: "2015",
            title: t.hibiscusCoast.history.year2015Title,
            description: t.hibiscusCoast.history.year2015Desc,
        },
        {
            year: "2016",
            title: t.hibiscusCoast.history.year2016Title,
            description: t.hibiscusCoast.history.year2016Desc,
        },
        {
            year: "2019",
            title: t.hibiscusCoast.history.year2019Title,
            description: t.hibiscusCoast.history.year2019Desc,
        },
    ], [t]);

    const stats: Stat[] = useMemo(() => [
        { icon: <Users className="w-8 h-8" />, value: "90+", label: t.hibiscusCoast.history.statAdults },
        { icon: <Baby className="w-8 h-8" />, value: "60+", label: t.hibiscusCoast.history.statChildren },
        { icon: <Heart className="w-8 h-8" />, value: "28", label: t.hibiscusCoast.history.statBaptism },
    ], [t]);

    const groups = useMemo(() => [
        t.hibiscusCoast.history.group1,
        t.hibiscusCoast.history.group2,
        t.hibiscusCoast.history.group3,
        t.hibiscusCoast.history.group4,
        t.hibiscusCoast.history.group5,
        t.hibiscusCoast.history.group6,
        t.hibiscusCoast.history.group7,
        t.hibiscusCoast.history.group8,
    ], [t]);

    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                {/* Background Story */}
                <div className="mb-12">
                    <div className="flex flex-col gap-4 mb-8 text-center">
                        <h2 className="text-[#111418] text-4xl font-black leading-tight">
                            {t.hibiscusCoast.history.title}
                        </h2>
                        <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-base indent-[2em] text-justify">
                            {t.hibiscusCoast.history.background1}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base mt-4 indent-[2em] text-justify">
                            {t.hibiscusCoast.history.background2}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-12">
                    <h3 className="text-4xl font-black text-[#111418] mb-6 text-center">{t.hibiscusCoast.history.timelineTitle}</h3>
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
                        <h3 className="text-xl font-bold text-white">{t.hibiscusCoast.history.groupsTitle}</h3>
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
