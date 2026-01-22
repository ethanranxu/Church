import React from 'react';

export default function Hero() {
    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKf9q4ETV0tzrF0aTj0JnUnGkctZWk60H2LhMQEKyqSepNrlpev-P0jHZLHuYhTldzv3DY8hQMbLmdXJOf6q6KAwksOVDJPh9t3jRGFqL-FXv_eILLbT0o6DpnNHsR1z-eO8Rb-6SNumm6GW86ekaaYNzDdkj8b93bYPfKQJU94pcEGQZJLYDH6CBjM3nkqa6ymyIG1KD_H4GQ93uKA5mlYMKDoLdO9TDXTVncaYWJ1k5203DYLTeklZIelWkmns2s5IoOFm9h5-M")`
            }}
        >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                查經小組
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                「你的話是我腳前的燈，是我路上的光。」<br />詩篇 119:105
            </p>
            <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
}
