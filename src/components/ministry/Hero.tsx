import React from 'react';

export default function Hero() {
    return (
        <div
            className="relative flex flex-col justify-center min-h-[400px] w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTd8Et6Jz5UsrPLad1KcA0x_oUs5umx1-qkS_4NSiLfIIphhtWDv8mfW1X8UIZyYUfQ9ntZXyK6exgXI_mKMHJULiF6chBJTknTuhZYzuudP8uwS3xp5gB-p4X8ULW7TYsb1LM_W9zRlGsEx70KdVd9irDBdk732WhswOn3YkdSsqZU35TopRe7rI80K8mR8sO2XVPuAY6BpfurgP8CRSt2Jsdpg3n9dcgrjWZw37q-v5Q_CdFnwzmO843IKWkA3vV9ENaWUqD8S4")`
            }}
        >
            <div className="flex flex-col items-center justify-center max-w-[960px] mx-auto px-4 text-center">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                    事奉團隊
                </h1>
                <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                    在奧克蘭長堤地區服事神與社區
                </p>
                <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
            </div>
        </div>
    );
}
