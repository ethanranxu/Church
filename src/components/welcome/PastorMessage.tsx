import React from "react";

export const PastorMessage = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRFHmhkAlodWbB7KIFjjIK0dEEBH2tiTTtpsBzbjwmpH7oLQPMfpa9cjKORQVoyR7TiYo6VeVXGTj-Ntrs74-L7236Ft7QmUWy-vQREoCsXR_cmmJJ4KPm2B_lnqsfXF2KyG2zA1CloX_unXO8tEnwDS9mYNcn5Kj-sdoBvL8_HglnsntaYkP8MT9rxblmpZW5VF25YFv8b5mxfzIed8Ic5GA8zEq65U8-RDBwBOmMiY_brd9Pmr5fNPon_Ztvhjgqq2-Kt6yglIc")`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div>
                            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">
                                牧者寄語
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">
                                願恩惠與平安臨到您
                            </h3>
                        </div>
                        <p className="text-[#617589] dark:text-gray-300 text-lg leading-relaxed">
                            很高興能在這裡遇見您！長堤基督教會是一個充滿愛與包容的大家庭。我們相信心，教會不僅僅是一個聚會的地方，更是一個彼此扶持、共同成長的生命共同體。
                        </p>
                        <p className="text-[#617589] dark:text-gray-300 text-lg leading-relaxed">
                            無論您是剛剛來到奧克蘭，還是正在尋找一個屬靈的家，我們都張開雙臂歡迎您。期待在這個主日見到您！
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
