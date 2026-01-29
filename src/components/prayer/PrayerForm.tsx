"use client";

import React, { useState } from "react";
import { submitPrayer } from "@/app/actions/prayer";

export const PrayerForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        category: "",
        content: "",
        isPrivate: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category || !formData.content) {
            alert("請填寫代禱類別和詳細內容");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitPrayer(formData);
            if (result.success) {
                alert(result.message);
                setFormData({
                    name: "",
                    contact: "",
                    category: "",
                    content: "",
                    isPrivate: false,
                });
            } else {
                alert(result.error || "提交失敗");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("提交出錯，請稍後再試");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10">
            <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-2xl font-bold text-[#111418] dark:text-white mb-2">
                    填寫代禱事項
                </h2>
                <p className="text-[#617589] dark:text-gray-400 text-sm">
                    請填寫下表，我們的同工將會為您代禱。所有資訊將會保密。
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-[#111418] dark:text-white text-sm font-medium">
                            您的姓名 (可選)
                        </span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#617589] text-[20px]">
                                    person
                                </span>
                            </div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2430] text-[#111418] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="輸入您的姓名"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-[#111418] dark:text-white text-sm font-medium">
                            聯絡方式 (Email 或電話)
                        </span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#617589] text-[20px]">
                                    contact_phone
                                </span>
                            </div>
                            <input
                                type="text"
                                value={formData.contact}
                                onChange={(e) =>
                                    setFormData({ ...formData, contact: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2430] text-[#111418] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="輸入您的聯絡方式"
                            />
                        </div>
                    </label>
                </div>

                {/* Category */}
                <label className="flex flex-col gap-2">
                    <span className="text-[#111418] dark:text-white text-sm font-medium">
                        代禱類別
                    </span>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[#617589] text-[20px]">
                                category
                            </span>
                        </div>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2430] text-[#111418] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled>
                                請選擇代禱事項
                            </option>
                            <option value="health">健康與疾病</option>
                            <option value="family">家庭與婚姻</option>
                            <option value="work">工作與事業</option>
                            <option value="spiritual">靈命成長</option>
                            <option value="other">其他</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[#617589]">
                                expand_more
                            </span>
                        </div>
                    </div>
                </label>

                {/* Content Area */}
                <label className="flex flex-col gap-2">
                    <span className="text-[#111418] dark:text-white text-sm font-medium">
                        詳細內容
                    </span>
                    <textarea
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                        className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2430] text-[#111418] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 min-h-[160px] resize-y"
                        placeholder="請在此詳細說明您的代禱需求..."
                    />
                </label>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10">
                    <div className="flex items-center h-5">
                        <input
                            type="checkbox"
                            id="privacy"
                            checked={formData.isPrivate}
                            onChange={(e) =>
                                setFormData({ ...formData, isPrivate: e.target.checked })
                            }
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary bg-white"
                        />
                    </div>
                    <div className="text-sm">
                        <label
                            htmlFor="privacy"
                            className="font-medium text-[#111418] dark:text-white select-none cursor-pointer"
                        >
                            保密申請
                        </label>
                        <p className="text-[#617589] dark:text-gray-400 mt-1">
                            勾選此項，您的代禱內容將僅限於牧者與代禱同工團隊知曉，不會公開。
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center gap-2 bg-primary hover:bg-[#116ecf] text-white text-base font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <span className="animate-spin material-symbols-outlined">sync</span>
                        ) : (
                            <span className="material-symbols-outlined">send</span>
                        )}
                        {isSubmitting ? "正在送出..." : "送出代禱"}
                    </button>
                </div>
            </form>
        </div>
    );
};
