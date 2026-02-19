"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n";

export const LatestSermon = () => {
    const { t } = useTranslation();

    return (
        <Section className="bg-white dark:bg-background-dark">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Video Column */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 aspect-video group">
                            <iframe
                                src="https://www.youtube.com/embed/DP5RWiCUrGI"
                                title="Pastor Speech"
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="lg:w-1/2 w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                            <span className="material-symbols-outlined text-sm">live_tv</span>
                            {t.home.latestSermon.badge}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t.home.latestSermon.title}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            {t.home.latestSermon.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.youtube.com/@EFCEastCoastBays/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button>{t.home.latestSermon.goToMedia}</Button>
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCmYfo0BlmnaivWtSfszI3iQ?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-bold bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                            >
                                {t.home.latestSermon.subscribeYT}
                            </a>
                        </div>
                    </div>
                </div>
                {/* Additional Videos Section */}
                <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Video: 2026 Sunday Sermon */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">video_library</span>
                                {t.home.latestSermon.sermonPlaylist}
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/videoseries?list=PLP7Y2-_kjaaUy4F41fNKzHkV24Eo8Pxk7"
                                    title={t.home.latestSermon.sermonPlaylist}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        {/* Right Video: Testimonials & Special Presentation */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                {t.home.latestSermon.testimonies}
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/videoseries?list=PLP7Y2-_kjaaW91UsBtI2EslTM5OQ_LadG"
                                    title={t.home.latestSermon.testimonies}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
