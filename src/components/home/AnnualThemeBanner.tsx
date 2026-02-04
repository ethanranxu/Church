"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const AnnualThemeBanner = () => {
    return (
        <Section className="relative overflow-hidden py-16 md:py-20">
            {/* Background with gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#1e4976] via-[#2563a8] to-[#3b82c4]"
                style={{
                    backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(59, 130, 196, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(37, 99, 168, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, #1e4976 0%, #2563a8 50%, #3b82c4 100%)
          `,
                }}
            />

            {/* Subtle texture overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            <Container className="relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-wide">
                        2026年教會年度主題
                    </h2>

                    {/* Subtitle with highlight effect */}
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/30 to-blue-500/20 blur-xl" />
                        <p className="relative text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100 tracking-wider">
                            在真道上紮根，在聖靈中結果
                        </p>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
