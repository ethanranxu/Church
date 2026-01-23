import React from 'react';

export default function Hero() {
    return (
        <div
            className="relative flex flex-col justify-center min-h-[400px] w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/ministry-hero-updated.png")`
            }}
        >
            <div className="flex flex-col items-center justify-center max-w-[960px] mx-auto px-4 text-center">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                    事奉團隊
                </h1>
                <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                    「各人要照所得的恩赐彼此服事，作神百般恩赐的好管家。」
                    <br />
                    彼得前书 4:10
                </p>
                <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
            </div>
        </div>
    );
}
