"use client";

import React, { useState } from "react";
import { submitPrayer } from "@/app/actions/prayer";
import { useTranslation } from "@/i18n";

export const PrayerForm = () => {
    const { t } = useTranslation();
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
            alert(t.prayer.form.fillRequired);
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
                alert(result.error || t.prayer.form.submitFailed);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert(t.prayer.form.submitError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2430] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10">
            <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-2xl font-bold text-[#111418] dark:text-white mb-2">
                    {t.prayer.form.title}
                </h2>
                <p className="text-[#617589] dark:text-gray-400 text-sm">
                    {t.prayer.form.subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-[#111418] dark:text-white text-sm font-medium">
                            {t.prayer.form.nameLabel}
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
                                placeholder={t.prayer.form.namePlaceholder}
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-[#111418] dark:text-white text-sm font-medium">
                            {t.prayer.form.contactLabel}
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
                                placeholder={t.prayer.form.contactPlaceholder}
                            />
                        </div>
                    </label>
                </div>

                {/* Category */}
                <label className="flex flex-col gap-2">
                    <span className="text-[#111418] dark:text-white text-sm font-medium">
                        {t.prayer.form.categoryLabel}
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
                                {t.prayer.form.categoryPlaceholder}
                            </option>
                            <option value="health">{t.prayer.form.catHealth}</option>
                            <option value="family">{t.prayer.form.catFamily}</option>
                            <option value="work">{t.prayer.form.catWork}</option>
                            <option value="spiritual">{t.prayer.form.catSpiritual}</option>
                            <option value="other">{t.prayer.form.catOther}</option>
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
                        {t.prayer.form.contentLabel}
                    </span>
                    <textarea
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                        className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2430] text-[#111418] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 min-h-[160px] resize-y"
                        placeholder={t.prayer.form.requestPlaceholder}
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
                            {t.prayer.form.privateLabel}
                        </label>
                        <p className="text-[#617589] dark:text-gray-400 mt-1">
                            {t.prayer.form.privateDesc}
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
                        {isSubmitting ? t.prayer.form.submitting : t.prayer.form.submitBtn}
                    </button>
                </div>
            </form>
        </div>
    );
};
