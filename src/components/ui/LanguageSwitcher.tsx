'use client';

import React from 'react';
import { useTranslation, type Locale } from '@/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
    const { locale, setLocale, t } = useTranslation();

    const toggleLocale = () => {
        const next: Locale = locale === 'zh-TW' ? 'en' : 'zh-TW';
        setLocale(next);
    };

    return (
        <button
            onClick={toggleLocale}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
            aria-label={t.common.language}
            title={locale === 'zh-TW' ? 'Switch to English' : '切換到中文'}
        >
            <Globe className="w-4 h-4" />
            <span>{locale === 'zh-TW' ? 'EN' : '中文'}</span>
        </button>
    );
}
