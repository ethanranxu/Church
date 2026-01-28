'use client';
import React, { useState, useEffect, useRef } from 'react';

import { Devotion, getPublishedDevotions } from '@/app/actions/devotions';

interface DevotionFeedProps {
    devotions: Devotion[];
    onSelectDevotion: (devotion: Devotion) => void;
}

export default function DevotionFeed({ devotions: initialDevotions, onSelectDevotion }: DevotionFeedProps) {
    const [devotions, setDevotions] = useState<Devotion[]>(initialDevotions);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Update devotions if initial props change (though typically static from server)
    // useEffect(() => {
    //     setDevotions(initialDevotions);
    // }, [initialDevotions]);

    const loadMoreDevotions = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const lastDevotion = devotions[devotions.length - 1];
            if (!lastDevotion) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            const newDevotions = await getPublishedDevotions(10, lastDevotion.publishDate, lastDevotion.createdAt);

            if (newDevotions.length < 10) {
                setHasMore(false);
            }

            if (newDevotions.length > 0) {
                setDevotions(prev => [...prev, ...newDevotions]);
            }
        } catch (error) {
            console.error("Failed to load more devotions", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDevotionClick = async (article: Devotion) => {
        onSelectDevotion(article);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreDevotions();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, devotions.length]); // Dependencies for re-creating/triggering observer

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">靈修分享</h3>
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
                        {(() => {
                            const cleanContent = article.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/(?:https?|ftp):\/\/[\S]+/g, '');
                            const shouldTruncate = cleanContent.length > 300;
                            return (
                                <div className="text-gray-700 dark:text-gray-300 font-serif-content leading-relaxed line-clamp-3">
                                    {shouldTruncate ? cleanContent.substring(0, 300) + "..." : cleanContent}
                                </div>
                            );
                        })()}
                        <button
                            onClick={() => handleDevotionClick(article)}
                            className="mt-4 flex items-center gap-2 text-primary font-bold text-sm cursor-pointer hover:underline inline-flex"
                        >
                            繼續閱讀
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </article>
            ))}

            {/* Loading Indicator / Sentinel */}
            <div ref={observerTarget} className="flex justify-center py-8 h-20">
                {loading && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        <span>載入中...</span>
                    </div>
                )}
                {!hasMore && devotions.length > 0 && (
                    <div className="text-gray-400 text-sm">沒有更多內容了</div>
                )}
            </div>


        </div>
    );
}
