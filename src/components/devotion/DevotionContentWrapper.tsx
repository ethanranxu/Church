'use client';

import React, { useState } from 'react';
import { Devotion, incrementDevotionView } from '@/app/actions/devotions';
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

export default function DevotionContentWrapper({ initialDevotions, popularDevotions, calendarDevotions }: DevotionContentWrapperProps) {
    const [selectedDevotion, setSelectedDevotion] = useState<Devotion | null>(null);

    const handleSelectDevotion = async (devotion: Devotion) => {
        setSelectedDevotion(devotion);
        if (devotion.id) {
            incrementDevotionView(devotion.id).catch((err: any) =>
                console.error("Failed to increment view", err)
            );
        }
    };

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
                onClose={() => setSelectedDevotion(null)}
            />
        </>
    );
}
