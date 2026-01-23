"use client";

import React from "react";

export const OfferingHero = () => {
    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/offering-hero.jpg")`,
            }}
        >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                奉獻資訊
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-3xl opacity-90 drop-shadow-md">
                「各人要隨本心所酌定的，不要作難，不要勉強；因為捐得樂意的人是神所喜愛的。」
                <br />
                哥林多後書 9:7
            </p>
            <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
};
