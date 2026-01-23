import React from 'react';

export default function Hero() {
    return (
        <div className="relative flex flex-col w-full h-[400px]">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/beliefs-hero.jpg")' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/60 to-[#1e3a8a]/40"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center h-full p-8 z-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                    信仰告白
                </h1>
                <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                    「你若口里认耶稣为主，心里信神叫他从死里复活，就必得救。」
                    <br />
                    罗马书 10:9
                </p>
                <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
            </div>
        </div >
    );
}
