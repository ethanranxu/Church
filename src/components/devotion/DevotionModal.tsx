import React, { useEffect, useRef } from 'react';
import { Devotion } from '@/app/actions/devotions';

interface DevotionModalProps {
    devotion: Devotion | null;
    onClose: () => void;
}

export default function DevotionModal({ devotion, onClose }: DevotionModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (devotion) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [devotion, onClose]);

    if (!devotion) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-[#101922] rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="pr-8">
                        <time className="text-sm font-medium text-primary mb-1 block">
                            {devotion.publishDate}
                        </time>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                            {devotion.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors absolute top-4 right-4"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none font-serif-content
                            prose-headings:font-display prose-headings:font-bold
                            prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                            prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: devotion.content }}
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
}
