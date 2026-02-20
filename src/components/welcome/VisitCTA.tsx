'use client';

import React from "react";
import Link from 'next/link';
import { useTranslation } from "@/i18n/LanguageContext";

interface VisitCTAProps {
    onOpenModal: () => void;
}

export const VisitCTA = ({ onOpenModal }: VisitCTAProps) => {
    const { t } = useTranslation();

    return (
        <section className="py-20 px-4 text-center bg-primary text-white">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {t.welcome.cta.title}
                </h2>
                <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                    {t.welcome.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onOpenModal}
                        className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
                    >
                        {t.welcome.cta.bookBtn}
                    </button>
                    <Link
                        href="/#location"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">map</span>
                        {t.welcome.cta.mapBtn}
                    </Link>
                </div>
            </div>
        </section>
    );
};
