'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Devotion, getPublishedDevotions } from '@/app/actions/devotions';
import ShareButton from './ShareButton';

interface DevotionFeedProps {
    devotions: Devotion[];
    onSelectDevotion: (devotion: Devotion) => void;
}

import { useTranslation } from "@/i18n/LanguageContext";

export default function DevotionFeed({ devotions: initialDevotions, onSelectDevotion }: DevotionFeedProps) {
    const { t } = useTranslation();
    const [devotions, setDevotions] = useState<Devotion[]>(initialDevotions);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef<HTMLDivElement>(null);

    const loadMoreDevotions = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const lastDevotion = devotions[devotions.length - 1];
            if (!lastDevotion) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            const newDevotions = await getPublishedDevotions(10, lastDevotion.publishDate ?? undefined, lastDevotion.createdAt ?? undefined);

            if (newDevotions.length < 10) {
                setHasMore(false);
            }


            if (newDevotions.length > 0) {
                const optimizedNewDevotions = newDevotions.map(d => {
                    let cleanContent = '';
                    if (d.content) {
                        const cleanHtml = d.content
                            .replace(/<a[^>]*>.*?<\/a>/gi, '')
                            .replace(/<img[^>]*\/?>/gi, '')
                            .replace(/<video[^>]*>.*?<\/video>/gi, '')
                            .replace(/<audio[^>]*>.*?<\/audio>/gi, '')
                            .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
                            .replace(/<br\s*\/?>/gi, ' ');
                        cleanContent = cleanHtml
                            .replace(/<[^>]+>/g, '')
                            .replace(/&nbsp;/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                        cleanContent = cleanContent.length > 300 ? cleanContent.substring(0, 300) + "..." : cleanContent;
                    }
                    return {
                        ...d,
                        snippet: d.snippet || cleanContent || "",
                        content: "" // free up memory
                    };
                });

                setDevotions(prev => {
                    const existingIds = new Set(prev.map(d => d.id));
                    const uniqueNew = optimizedNewDevotions.filter(d => !existingIds.has(d.id));
                    return [...prev, ...uniqueNew];
                });
            }
        } catch (error) {
            console.error("Failed to load more devotions", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, devotions]);

    const handleDevotionClick = async (article: Devotion) => {
        onSelectDevotion(article);
    };

    useEffect(() => {
        const currentTarget = observerTarget.current;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreDevotions();
                }
            },
            { threshold: 1.0 }
        );

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loadMoreDevotions]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">{t.devotion.feed.title}</h3>
            </div>

            {devotions.map((article) => (
                <article key={article.id} className="bg-white dark:bg-[#101922] p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all group">
                    <div className="flex flex-col gap-3">
                        <time className="text-sm font-medium text-gray-500 dark:text-gray-400">{article.publishDate}</time>
                        <button
                            onClick={() => handleDevotionClick(article)}
                            className="text-left"
                        >
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors font-serif-content">
                                {article.title.length > 50 ? article.title.substring(0, 50) + "..." : article.title}
                            </h4>
                        </button>
                        <div className="text-gray-700 dark:text-gray-300 font-serif-content leading-relaxed line-clamp-3">
                            {article.snippet || article.content}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                onClick={() => handleDevotionClick(article)}
                                className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer hover:underline inline-flex"
                            >
                                {t.devotion.feed.readMore}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                            <ShareButton title={article.title} id={article.id} />
                        </div>
                    </div>
                </article>
            ))}

            <div ref={observerTarget} className="flex justify-center py-8 h-20">
                {loading && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        <span>{t.devotion.feed.loading}</span>
                    </div>
                )}
                {!hasMore && devotions.length > 0 && (
                    <div className="text-gray-400 text-sm">{t.devotion.feed.noMore}</div>
                )}
            </div>
        </div>
    );
}
