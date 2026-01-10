"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const Hero = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image - removed scale for maximum clarity */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("/images/hero-bg.png")`,
                }}
            />
            {/* Minimal Overlay - only subtle dark tint at the bottom to protect text readability */}
            <div className="absolute inset-0 z-10 bg-black/10" />

            {/* Content */}
            <Container className="relative z-20 text-center mt-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 border border-white/30 shadow-lg animate-fade-in">
                    歡迎來到長堤基督教會
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-lg animate-slide-up">
                    在奧克蘭北岸
                    <br />
                    建立屬神的家
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md animate-slide-up animation-delay-200">
                    我們是一群愛主、跟隨主的基督徒。邀請您與我們一同敬拜，<br className="hidden md:block" />
                    在真理中成長，在愛中建立團契。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
                    <Button size="lg" className="flex items-center gap-2">
                        <span>參加我們的聚會</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() => setShowVideo(true)}
                    >
                        <span className="material-symbols-outlined">play_circle</span>
                        <span>觀看線上講道</span>
                    </Button>
                </div>
            </Container>

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl">
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full transition-colors"
                            onClick={() => setShowVideo(false)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="aspect-video w-full">
                            <iframe
                                src="https://www.youtube.com/embed/DP5RWiCUrGI?autoplay=1"
                                title="YouTube video player"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
