"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const LatestSermon = () => {
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
                            最新講道
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">聆聽神的話語</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            透過每週的主日信息，我們一同深入聖經真理，領受生命的糧。無論您身在何處，都歡迎線上參與我們的敬拜與學習。
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button>前往影音專區</Button>
                            <Button variant="ghost" className="border border-gray-300 dark:border-gray-600" onClick={() => window.open('https://www.youtube.com/@efcecb', '_blank')}>
                                訂閱 YouTube 頻道
                            </Button>
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
                                長堤教會2026年主日證道影片
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/videoseries?list=PLP7Y2-_kjaaUy4F41fNKzHkV24Eo8Pxk7"
                                    title="長堤教會2026年主日證道影片"
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
                                見證分享 & 特別呈獻
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/videoseries?list=PLP7Y2-_kjaaW91UsBtI2EslTM5OQ_LadG"
                                    title="見證分享 & 特別呈獻"
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
