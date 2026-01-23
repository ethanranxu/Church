"use client";

import React from "react";

export const PrayerHero = () => {
    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/prayer-hero.jpg")`,
            }}
        >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                代禱需求
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-3xl opacity-90 drop-shadow-md">
                「應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。」
                <br />
                腓立比書 4:6
            </p>
            <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
};
