'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import zhTW, { type TranslationKeys } from './zh-TW';
import en from './en';

export type Locale = 'zh-TW' | 'en';

const translations: Record<Locale, TranslationKeys> = {
    'zh-TW': zhTW as unknown as TranslationKeys,
    'en': en,
};

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'zh-TW',
    setLocale: () => { },
    t: zhTW as unknown as TranslationKeys,
});

const STORAGE_KEY = 'preferred-language';

function detectBrowserLanguage(): Locale {
    if (typeof window === 'undefined') return 'zh-TW';

    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh-TW' || stored === 'en') return stored;

    // Detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage || '';

    // If browser language starts with zh (zh, zh-TW, zh-CN, zh-HK), use Chinese
    if (browserLang.startsWith('zh')) return 'zh-TW';

    // Default to English for all other languages
    return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('zh-TW');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const detected = detectBrowserLanguage();
        setLocaleState(detected);
        setMounted(true);
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
        document.documentElement.lang = newLocale === 'zh-TW' ? 'zh-Hant' : 'en';
    }, []);

    const value: LanguageContextType = {
        locale,
        setLocale,
        t: translations[locale],
    };

    // Avoid hydration mismatch by rendering with default locale until mounted
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ locale: 'zh-TW', setLocale, t: zhTW as unknown as TranslationKeys }}>
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Convenience hook - returns just the translation object
export function useTranslation() {
    const { t, locale, setLocale } = useLanguage();
    return { t, locale, setLocale };
}

export { LanguageContext };
