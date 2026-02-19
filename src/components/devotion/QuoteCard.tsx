"use client";

import { useTranslation } from "@/i18n/LanguageContext";

export default function QuoteCard() {
    const { t } = useTranslation();

    return (
        <div className="bg-gradient-to-br from-primary/80 to-blue-600/80 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white/100">{t.devotion.sider.wordOfGod}</span>
            </div>
            <p className="font-serif-content text-lg italic leading-relaxed mb-4">
                {t.devotion.sider.quote}
            </p>
            <p className="text-sm font-bold text-white/80 text-right">{t.devotion.sider.quoteRef}</p>
        </div>
    );
}
