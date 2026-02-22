'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from "@/i18n/LanguageContext";

interface ShareButtonProps {
    title: string;
    id?: string;
    className?: string;
}

export default function ShareButton({ title, id, className = "" }: ShareButtonProps) {
    const { t } = useTranslation();
    const [showToast, setShowToast] = useState(false);
    const [supportsNativeShare, setSupportsNativeShare] = useState(false);

    useEffect(() => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            setSupportsNativeShare(true);
        }
    }, []);

    const getShareUrl = () => {
        if (typeof window === 'undefined') return '';
        const baseUrl = window.location.origin + window.location.pathname;
        return id ? `${baseUrl}?id=${id}` : window.location.href;
    };

    const handleShareClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const url = getShareUrl();
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

        // In WeChat, prefer copying plain text (title + url) to clipboard
        // because native share is either unsupported or behaves unpredictably
        if (isWeChat) {
            const textToCopy = `${title}\n${url}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).catch(() => {
                alert(t.nav.share.copyError);
            });
            return;
        }

        if (supportsNativeShare) {
            try {
                await navigator.share({
                    title: title,
                    text: title,
                    url: url,
                });
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error("Error sharing:", error);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).catch(() => {
                alert(t.nav.share.copyError);
            });
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={handleShareClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary transition-all text-sm font-medium"
                title={t.nav.share.title}
            >
                <span className="material-symbols-outlined text-[20px]">share</span>
                <span className="hidden sm:inline">{t.nav.share.title}</span>
            </button>

            {showToast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    {t.nav.share.copySuccess}
                </div>
            )}
        </div>
    );
}
