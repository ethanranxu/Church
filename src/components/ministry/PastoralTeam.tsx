"use client";

import React from 'react';
import { useTranslation } from "@/i18n";

export default function PastoralTeam() {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-8">
            {/* Section Title */}
            <div className="flex flex-col items-center text-center gap-2 mb-4">
                <h2 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-bold leading-tight">{t.ministry.pastoralTeam.title}</h2>
                <div className="h-1 w-20 bg-primary rounded-full mt-2"></div>
            </div>

            {/* Main Pastor Card */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                <div
                    className="md:w-2/5 min-h-[320px] bg-cover bg-top"
                    style={{
                        backgroundImage: `url("/images/pastor-david-kung.jpg")`
                    }}
                ></div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center gap-4">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white">{t.ministry.pastoralTeam.pastorKungName}</h3>
                        </div>
                        <p className="text-primary font-bold">{t.ministry.pastoralTeam.pastorKungRole}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t.ministry.pastoralTeam.pastorKungBio}
                    </p>
                    <div className="pt-4 mt-auto">
                        <a
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
                            href="#"
                        >
                            <span className="material-symbols-outlined">mail</span>
                            <span>{t.ministry.pastoralTeam.contactPastor}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Pastor Gengzhong Ni Card */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                <div
                    className="md:w-2/5 min-h-[320px] bg-cover bg-top"
                    style={{
                        backgroundImage: `url("/images/ni-gengzhong.jpg")`
                    }}
                ></div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center gap-4">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white">{t.ministry.pastoralTeam.pastorNiName}</h3>
                        </div>
                        <p className="text-primary font-bold">{t.ministry.pastoralTeam.pastorNiRole}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t.ministry.pastoralTeam.pastorNiBio}
                    </p>
                    <div className="pt-4 mt-auto">
                        <a
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
                            href="#"
                        >
                            <span className="material-symbols-outlined">mail</span>
                            <span>{t.ministry.pastoralTeam.contactPastor}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Preachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Preacher 1 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/no-profile.png")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">{t.ministry.pastoralTeam.preacher1Name}</h3>
                            <p className="text-primary font-medium text-center">{t.ministry.pastoralTeam.preacher1Role}</p>
                        </div>

                    </div>
                </div>

                {/* Preacher 2 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/no-profile.png")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">{t.ministry.pastoralTeam.preacher2Name}</h3>
                            <p className="text-primary font-medium text-center">{t.ministry.pastoralTeam.preacher2Role}</p>
                        </div>

                    </div>
                </div>

                {/* Preacher 3 */}
                <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
                    <div
                        className="aspect-[16/10] w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("/images/preacher-zhong.png")`
                        }}
                    ></div>
                    <div className="p-6 flex flex-col gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-[#111418] dark:text-white text-center">{t.ministry.pastoralTeam.preacher3Name}</h3>
                            <p className="text-primary font-medium text-center">{t.ministry.pastoralTeam.preacher3Role}</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
