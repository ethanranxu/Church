"use client";

import React from "react";

export const OfferingMethods = () => {
    const handleCopyName = () => {
        navigator.clipboard.writeText("EFC of East Coast Bay");
        alert("戶名已複製");
    };

    const handleCopyAccount = () => {
        navigator.clipboard.writeText("12-3059-0500732-00");
        alert("帳號已複製");
    };

    return (
        <div className="flex flex-1 justify-center py-8 bg-[#f6f7f8] dark:bg-[#101922]">
            <div className="flex flex-col max-w-[800px] flex-1 px-4 lg:px-0">
                {/* Section Title */}
                <div className="flex flex-col gap-4 mb-12 text-center">
                    <h2 className="text-[#111418] dark:text-white text-4xl font-black leading-tight">
                        奉獻方式
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Bank Transfer Card */}
                <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#dbe0e6] dark:border-[#2a3441] shadow-sm overflow-hidden mb-12">
                    {/* Card Header */}
                    <div className="bg-primary/5 p-6 border-b border-[#dbe0e6] dark:border-[#2a3441] flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[28px]">
                                account_balance
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-[#111418] dark:text-white">
                                銀行轉帳指南
                            </h3>
                            <p className="text-sm text-[#617589] dark:text-gray-400 font-medium">
                                請依照以下步驟完成您的奉獻
                            </p>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="p-8 space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                    1
                                </div>
                                <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-800 mt-2"></div>
                            </div>
                            <div className="flex-1 pb-4">
                                <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                                    第一步：輸入收款帳戶名稱
                                </label>
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={handleCopyName}
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        value="EFC of East Coast Bay"
                                        className="w-full bg-gray-50 dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#2a3441] rounded-lg py-4 px-4 font-bold text-lg text-[#111418] dark:text-white focus:ring-0 focus:border-primary cursor-pointer"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold">
                                            點擊複製
                                        </span>
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            content_copy
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 font-medium">
                                    請在您的銀行 App 中準確輸入上述教會官方戶名。
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                    2
                                </div>
                                <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-800 mt-2"></div>
                            </div>
                            <div className="flex-1 pb-4">
                                <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                                    第二步：輸入帳號 (ASB 銀行)
                                </label>
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={handleCopyAccount}
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        value="12-3059-0500732-00"
                                        className="w-full bg-gray-50 dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#2a3441] rounded-lg py-4 px-4 font-mono font-bold text-2xl text-primary focus:ring-0 focus:border-primary cursor-pointer"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold">
                                            點擊複製
                                        </span>
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            content_copy
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 font-medium">
                                    請核對帳號是否正確，點擊輸入框可快速複製。
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                    3
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-2">
                                    第三步：填寫轉帳備註 (必要資訊)
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                                            姓名及編號 Particulars/Code
                                        </p>
                                        <p className="text-base font-bold text-[#111418] dark:text-white">
                                            請輸入您的中文或英文全名
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            ※ 須與報稅收據姓名一致
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                                            奉獻類別 Reference
                                        </p>
                                        <p className="text-base font-bold text-[#111418] dark:text-white">
                                            什一、感恩、宣教、建堂等
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            ※ 若未註明將歸入一般奉獻
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-[#101922] rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                                    <p className="text-sm text-[#617589] dark:text-gray-400 font-medium leading-relaxed">
                                        常用類別參考：什一奉獻、感恩奉獻、建堂奉獻、梅西大學、宣教信心認獻。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sunday Offering Card */}
                <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#dbe0e6] dark:border-[#2a3441] shadow-sm overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[32px]">
                                        volunteer_activism
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#111418] dark:text-white">
                                        主日現場奉獻
                                    </h3>
                                    <p className="text-[#617589] dark:text-gray-400 font-medium">
                                        於教會實體聚會時奉獻
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-primary/5 rounded-xl border border-primary/20">
                                <span className="material-symbols-outlined text-primary">
                                    schedule
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold text-primary uppercase">
                                        崇拜時間
                                    </p>
                                    <p className="text-base font-bold text-[#111418] dark:text-white">
                                        每週日上午 10:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h4 className="font-bold text-[#111418] dark:text-white flex items-center gap-2">
                                        <span className="size-2 bg-primary rounded-full"></span>
                                        奉獻袋與奉獻箱
                                    </h4>
                                    <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed font-medium">
                                        歡迎於主日崇拜期間，將您的奉獻投入傳遞的奉獻袋或設置於會堂後方的奉獻箱中。
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-[#111418] dark:text-white flex items-center gap-2">
                                        <span className="size-2 bg-primary rounded-full"></span>
                                        申請奉獻收據
                                    </h4>
                                    <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed font-medium">
                                        若您需要年度退稅收據，請務必使用奉獻信封，並清楚填寫您的全名。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
