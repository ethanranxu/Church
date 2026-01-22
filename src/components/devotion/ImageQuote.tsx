import React from 'react';

export default function ImageQuote() {
    return (
        <div className="relative overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 aspect-[4/3] group">
            <img
                alt="The Word of God"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlAfzat7kIIuACwd9eD8leyJYYLMloNhooSQ8wBGJc3kUf6GOdLzoFsvvaiM2Ki_3dRfvOKr-AL6oOtb8fjlI2xFUFi_IyaJGbNmOBm9MgICokdPVaCehZFZoEBwC9ppePVUK2rxx4hpj-9i4QISoz1vRHiTeQakomSbhQifCQZED0AJe2ypQUc0Pnxl8n5fqiMce5Vwk7ZY0jxLwB6Vxt9Jqg5fGd41jTVzJfZ4x6YXpExJTioeAnUi6NhQlCL6uWyGvBqoAIFq4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
                <p className="text-white font-serif-content italic text-xl leading-snug text-center">
                    「主是我的力量，我心安然。」
                </p>
            </div>
        </div>
    );
}
