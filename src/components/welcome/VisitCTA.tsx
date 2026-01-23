import React from "react";

export const VisitCTA = () => {
    return (
        <section className="py-20 px-4 text-center bg-primary text-white">
            <div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    準備好造訪我們了嗎？
                </h2>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                    我們已經為您預備好了位置。您可以填寫下方的表單，讓我們知道您即將到來，我們會安排專人接待您。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                    <button className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors w-full sm:w-auto">
                        預約參訪
                    </button>
                    <a href="/#location" className="w-full sm:w-auto">
                        <button className="w-full bg-blue-700 text-white hover:bg-blue-800 border border-blue-500 font-bold py-3 px-8 rounded-lg transition-colors">
                            查看地圖位置
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};
