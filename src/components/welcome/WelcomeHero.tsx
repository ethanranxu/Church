"use client";

import React from "react";

export const WelcomeHero = () => {
    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/welcome-hero.jpg")`,
            }}
        >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                歡迎來到長堤大家庭
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-3xl opacity-90 drop-shadow-md">
                「願你們彼此相愛，像主愛我們一樣。」
                <br />
                約翰福音 15:12
            </p>
            <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
};
