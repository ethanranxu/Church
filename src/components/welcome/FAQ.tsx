'use client';

import { useTranslation } from "@/i18n/LanguageContext";

export const FAQ = () => {
    const { t } = useTranslation();

    const faqItems = [
        {
            icon: "help",
            question: t.welcome.faq.christianQuestion,
            answer: t.welcome.faq.christianAnswer,
        },
        {
            icon: "checkroom",
            question: t.welcome.faq.clothingQuestion,
            answer: t.welcome.faq.clothingAnswer,
        },
        {
            icon: "translate",
            question: t.welcome.faq.languageQuestion,
            answer: t.welcome.faq.languageAnswer,
        },
    ];

    return (
        <section className="py-16 px-4 md:px-10 bg-[#f6f7f8] dark:bg-[#15202b]">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t.welcome.faq.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t.welcome.faq.subtitle}
                    </p>
                </div>
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex gap-4">
                                <div className="text-primary mt-1">
                                    <span className="material-symbols-outlined">
                                        {item.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-2">
                                        {item.question}
                                    </h3>
                                    <p className="text-[#617589] dark:text-gray-300">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
