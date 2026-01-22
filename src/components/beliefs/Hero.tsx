import React from 'react';

export default function Hero() {
    return (
        <div className="relative flex flex-col w-full h-[400px]">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAehgfcr5I-I6skp2ntZxXz8iNng_qIVOFhKUU0FHNCYMRZ-2Wx2QDCTNc3KYKd9tgVzjRoxA_2Nd9k3cg0FzmtDl7YUudeEThmOOPDEvAkjQHLMaVy9klbidGa2efYV-g_2I5mseNq_YSLOvspBfto12oQ9hB0AbquE2aAXUGmF5IxxryjEJlIwDJpwNv19hqzI9U54xX1Jm4v4FHMfWX-K6F-OaLEweYNL56kOvvDCPlhFCd-2LS2Tp_GxSSeQWefLxfOmC9XJRw")' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/60 to-[#1e3a8a]/40"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center h-full p-8 z-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                    信仰告白
                </h1>
                <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                    建立在基督真理之上，同心合意興旺福音
                </p>
                <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
            </div>
        </div>
    );
}
