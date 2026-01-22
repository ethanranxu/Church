import React from 'react';

const ministryCards = [
    '崇拜組', '裝備組', '關懷組', '宣教組',
    '團契組', '兒童牧區', '青年牧區', '傳播組',
    '財務組', '總務組', '膳食組', '物業管理'
];

export default function OrgChart() {
    return (
        <section className="flex flex-col items-center py-10">
            <div className="w-full max-w-4xl">
                {/* Top Section: Jesus Christ */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="bg-white border-[5px] border-gray-900 rounded-lg py-8 px-20 text-5xl md:text-6xl font-black text-center relative z-10 transform hover:scale-105 transition-transform duration-300"
                        style={{ boxShadow: '8px 8px 0px rgba(255, 202, 40, 1)' }}
                    >
                        耶穌基督
                    </div>
                    <div className="w-0.5 h-12 bg-gray-400 mx-auto"></div>
                    <div className="bg-[#3367d6] border-2 border-[#1a3a6d] rounded-lg py-3 px-12 text-xl font-bold text-center text-white relative">
                        長堤牧養系統
                    </div>
                </div>

                {/* Middle Section: Hierarchy */}
                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-gray-300"></div>
                        <div
                            className="bg-white border-2 border-gray-800 rounded-lg py-2 px-8 text-lg font-bold text-center relative"
                            style={{ boxShadow: '4px 4px 0px rgba(255, 202, 40, 1)' }}
                        >
                            長堤主任牧師
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-gray-300"></div>
                        <div
                            className="bg-white border-2 border-gray-800 rounded-lg py-2 px-8 text-lg font-bold text-center relative"
                            style={{ boxShadow: '4px 4px 0px rgba(255, 202, 40, 1)' }}
                        >
                            長堤牧者團隊
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-gray-300"></div>
                        <div
                            className="bg-white border-2 border-gray-800 rounded-lg py-2 px-8 text-lg font-bold text-center relative"
                            style={{ boxShadow: '4px 4px 0px rgba(255, 202, 40, 1)' }}
                        >
                            長堤核心同工
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Ministry Teams */}
                <div className="relative bg-[#3b6dbd] rounded-[2rem] p-8 pt-16 mt-12 border-4 border-[#2b5190]">
                    {/* Header Badge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-800 rounded-2xl px-10 py-4 shadow-[0_4px_0_0_#ffca28] z-10">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffca28] rounded-full border-2 border-gray-800"></div>
                        <h3 className="text-2xl font-black text-gray-800 text-center whitespace-nowrap">
                            長堤教會事奉團隊
                        </h3>
                    </div>

                    {/* Ministry Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {ministryCards.map((card) => (
                            <div
                                key={card}
                                className="bg-white border-2 border-gray-800 rounded-lg py-2 px-4 text-lg font-bold text-center text-gray-800"
                                style={{ boxShadow: '3px 3px 0px rgba(255, 202, 40, 1)' }}
                            >
                                {card}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
