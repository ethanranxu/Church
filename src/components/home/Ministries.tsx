"use client";

import React, { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n";
import Link from "next/link";

export const Ministries = () => {
    const { t } = useTranslation();

    const MINISTRIES = useMemo(() => [
        {
            title: t.home.ministries.childrenSS,
            subtitle: "",
            description: t.home.ministries.childrenSSDesc,
            image: "/images/children-ministry.jpg",
            icon: "",
            iconColor: "text-yellow-400",
        },
        {
            title: t.home.ministries.youthFellowship,
            subtitle: " ",
            description: t.home.ministries.youthFellowshipDesc,
            image: "/images/youth-fellowship.jpg",
            icon: "",
            iconColor: "text-sky-400",
        },
    ], [t]);

    return (
        <Section className="bg-background-light dark:bg-background-dark">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {MINISTRIES.map((ministry) => (
                        <div
                            key={ministry.title}
                            className="flex-1 rounded-2xl overflow-hidden relative group h-[400px] shadow-lg"
                        >
                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url("${ministry.image}")` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`material-symbols-outlined ${ministry.iconColor}`}>
                                        {ministry.icon}
                                    </span>
                                    <span className={`${ministry.iconColor} font-bold tracking-wider text-sm uppercase`}>
                                        {ministry.subtitle}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">{ministry.title}</h3>
                                <p className="text-gray-200 mb-6 max-w-md line-clamp-2">
                                    {ministry.description}
                                </p>
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all"
                                >
                                    <span className="material-symbols-outlined text-sm"></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
