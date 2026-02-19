"use client";

import React, { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n";

export const CoreValues = () => {
    const { t } = useTranslation();

    const VALUES = useMemo(() => [
        {
            icon: "diversity_3",
            title: t.home.coreValues.fellowship,
            description: t.home.coreValues.fellowshipDesc,
            color: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-t-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            icon: "auto_stories",
            title: t.home.coreValues.bibleTeaching,
            description: t.home.coreValues.bibleTeachingDesc,
            color: "bg-amber-50 dark:bg-amber-900/20",
            borderColor: "border-t-amber-500",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            icon: "volunteer_activism",
            title: t.home.coreValues.communityService,
            description: t.home.coreValues.communityServiceDesc,
            color: "bg-emerald-50 dark:bg-emerald-900/20",
            borderColor: "border-t-emerald-500",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
    ], [t]);

    return (
        <Section className="bg-white dark:bg-[#101922] py-12 md:py-12">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">
                        {t.home.coreValues.title}
                    </h2>
                    <Container className="max-w-[1134px]">
                        <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t.home.coreValues.subtitle}
                        </p>
                    </Container>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6  max-w-[1158px] mx-auto">
                    {VALUES.map((value) => (
                        <div
                            key={value.title}
                            className={`bg-background-light dark:bg-[#1a2634] px-6 py-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border-t-4 ${value.borderColor} border-x border-b border-gray-100 dark:border-gray-800 text-center group hover:-translate-y-1`}
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center ${value.iconColor} group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined !text-4xl">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white m-0">{value.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
