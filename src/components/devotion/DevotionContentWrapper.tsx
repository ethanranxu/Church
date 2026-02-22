'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Devotion, incrementDevotionView, getDevotionById } from '@/app/actions/devotions';
import DevotionFeed from './DevotionFeed';
import RecentTopics from './RecentTopics';
import Calendar from './Calendar';
import ImageQuote from './ImageQuote';
import QuoteCard from './QuoteCard';
import Welcome from './Welcome';
import DevotionModal from './DevotionModal';

interface DevotionContentWrapperProps {
    initialDevotions: Devotion[];
    popularDevotions: Devotion[];
    calendarDevotions: Devotion[];
}

function DevotionContent({ initialDevotions, popularDevotions, calendarDevotions }: DevotionContentWrapperProps) {
    const [selectedDevotion, setSelectedDevotion] = useState<Devotion | null>(null);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const searchParams = useSearchParams();

    const handleSelectDevotion = async (devotion: Devotion) => {
        // Open immediately to show header/title
        setSelectedDevotion(devotion);

        // Lazy fetch rich-text content if stripped to save payload
        if (!devotion.content && devotion.id) {
            setIsLoadingModal(true);
            try {
                const fullArticle = await getDevotionById(devotion.id);
                if (fullArticle) {
                    setSelectedDevotion(fullArticle);
                }
            } catch (err) {
                console.error("Failed to lazy load content", err);
            } finally {
                setIsLoadingModal(false);
            }
        }

        if (devotion.id) {
            incrementDevotionView(devotion.id).catch((err: any) =>
                console.error("Failed to increment view", err)
            );
        }
    };

    // Handle deep linking via ?id=...
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            // Check in all available lists
            const allDevotions = [...initialDevotions, ...popularDevotions, ...calendarDevotions];
            const article = allDevotions.find(d => d.id === id);
            if (article) {
                handleSelectDevotion(article);
            }
        }
    }, [searchParams, initialDevotions, popularDevotions, calendarDevotions]);

    return (
        <>
            <div className="max-w-[1200px] w-full mx-auto px-4 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <Welcome />
                    <DevotionFeed
                        devotions={initialDevotions}
                        onSelectDevotion={handleSelectDevotion}
                    />
                </div>

                {/* Sidebar - Right Column */}
                <aside className="lg:col-span-4 flex flex-col gap-6">
                    <Calendar
                        devotions={calendarDevotions}
                        onSelectDevotion={handleSelectDevotion}
                    />
                    <ImageQuote />
                    <RecentTopics
                        devotions={popularDevotions}
                        onSelectDevotion={handleSelectDevotion}
                    />
                    <QuoteCard />
                </aside>
            </div>

            <DevotionModal
                devotion={selectedDevotion}
                isLoading={isLoadingModal}
                onClose={() => setSelectedDevotion(null)}
            />
        </>
    );
}

export default function DevotionContentWrapper(props: DevotionContentWrapperProps) {
    return (
        <Suspense>
            <DevotionContent {...props} />
        </Suspense>
    );
}
