import React from "react";

export const PrayerSidebar = () => {
    return (
        <div className="lg:w-[360px] flex flex-col gap-6">
            {/* Scripture Card */}
            {/* Scripture Card */}
            <div className="bg-gradient-to-br from-primary/80 to-blue-600/80 p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white/100">神的話語</span>
                </div>
                <p className="font-serif-content text-lg italic leading-relaxed mb-4">
                    神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。
                </p>
                <p className="text-right text-sm font-bold text-white/80">
                    — 腓立比書 4:7
                </p>
            </div>

            {/* Prayer Team Info */}
            <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <span className="material-symbols-outlined">volunteer_activism</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#111418] dark:text-white">
                        我們為您禱告
                    </h3>
                </div>
                <p className="text-[#617589] dark:text-gray-400 text-sm leading-relaxed mb-4">
                    長堤基督教會的代禱團隊每週都會聚集，專心地為每一項收到的需求禱告。我們關心您的生命，也相信神垂聽每一個呼求。
                </p>
                <div className="flex items-center gap-2 text-sm text-[#617589] dark:text-gray-400">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>您的隱私是我們首要考量</span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="font-bold text-base text-[#111418] dark:text-white mb-4">
                    緊急聯絡
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">call</span>
                        <span>(09) 123-4567</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">email</span>
                        <span>prayer@efcecb.org.nz</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
