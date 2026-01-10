"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const LatestSermon = () => {
    return (
        <Section className="bg-background-light dark:bg-background-dark">
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
            </Container>
        </Section>
    );
};
