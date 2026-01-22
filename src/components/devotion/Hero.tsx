import React from 'react';

export default function Hero() {
    return (
        <div
            className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center p-4 text-center md:p-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlAfzat7kIIuACwd9eD8leyJYYLMloNhooSQ8wBGJc3kUf6GOdLzoFsvvaiM2Ki_3dRfvOKr-AL6oOtb8fjlI2xFUFi_IyaJGbNmOBm9MgICokdPVaCehZFZoEBwC9ppePVUK2rxx4hpj-9i4QISoz1vRHiTeQakomSbhQifCQZED0AJe2ypQUc0Pnxl8n5fqiMce5Vwk7ZY0jxLwB6Vxt9Jqg5fGd41jTVzJfZ4x6YXpExJTioeAnUi6NhQlCL6uWyGvBqoAIFq4")`
            }}
        >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-2xl tracking-[0.2em]">
                每日靈修
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                「耶和華是我的牧者，我必不致缺乏。」<br />詩篇 23:1
            </p>
            <div className="w-24 h-1.5 bg-[#FBBF24] mt-8 rounded-full"></div>
        </div>
    );
}
