"use client";

import React from "react";
import { useTranslation } from "@/i18n";

export const OfferingMethods = () => {
    const { t } = useTranslation();

    const handleCopyName = () => {
        navigator.clipboard.writeText("EFC of East Coast Bay");
        alert(t.offering.methods.copied);
    };

    const handleCopyAccount = () => {
        navigator.clipboard.writeText("12-3059-0500732-00");
        alert(t.offering.methods.copied);
    };

    return (
        <div className="flex flex-1 justify-center py-8 bg-[#f6f7f8] dark:bg-[#101922]">
            <div className="flex flex-col max-w-[800px] flex-1 px-4 lg:px-0">
                {/* Section Title */}
                <div className="flex flex-col gap-4 mb-12 text-center">
                    <h2 className="text-[#111418] dark:text-white text-4xl font-black leading-tight">
                        {t.offering.methods.title}
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
                                {t.offering.methods.bankTransferTitle}
                            </h3>
                            <p className="text-sm text-[#617589] dark:text-gray-400 font-medium">
                                {t.offering.methods.bankTransferSubtitle}
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
                                    {t.offering.methods.step1Label}
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
                                            {t.offering.methods.clickToCopy}
                                        </span>
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            content_copy
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 font-medium">
                                    {t.offering.methods.step1Hint}
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
                                    {t.offering.methods.step2Label}
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
                                            {t.offering.methods.clickToCopy}
                                        </span>
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            content_copy
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 font-medium">
                                    {t.offering.methods.step2Hint}
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
                                    {t.offering.methods.step3Label}
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                                            {t.offering.methods.nameAndId}
                                        </p>
                                        <p className="text-base font-bold text-[#111418] dark:text-white">
                                            {t.offering.methods.enterFullName}
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            {t.offering.methods.nameNote}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                                            {t.offering.methods.offeringCategory}
                                        </p>
                                        <p className="text-base font-bold text-[#111418] dark:text-white">
                                            {t.offering.methods.categoryExamples}
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            {t.offering.methods.categoryNote}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-[#101922] rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                                    <p className="text-sm text-[#617589] dark:text-gray-400 font-medium leading-relaxed">
                                        {t.offering.methods.categoryReference}
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
                                        {t.offering.methods.cashTitle}
                                    </h3>
                                    <p className="text-[#617589] dark:text-gray-400 font-medium">
                                        {t.offering.methods.cashSubtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-primary/5 rounded-xl border border-primary/20">
                                <span className="material-symbols-outlined text-primary">
                                    schedule
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold text-primary uppercase">
                                        {t.offering.methods.serviceTimeLabel}
                                    </p>
                                    <p className="text-base font-bold text-[#111418] dark:text-white">
                                        {t.offering.methods.cashNote}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h4 className="font-bold text-[#111418] dark:text-white flex items-center gap-2">
                                        <span className="size-2 bg-primary rounded-full"></span>
                                        {t.offering.methods.bagAndBoxTitle}
                                    </h4>
                                    <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed font-medium">
                                        {t.offering.methods.bagAndBoxDesc}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-[#111418] dark:text-white flex items-center gap-2">
                                        <span className="size-2 bg-primary rounded-full"></span>
                                        {t.offering.methods.receiptTitle}
                                    </h4>
                                    <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed font-medium">
                                        {t.offering.methods.receiptDesc}
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
