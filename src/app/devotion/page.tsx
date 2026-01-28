import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/devotion/Hero';
import { getPublishedDevotions, getPopularDevotions, getCalendarDevotions } from '@/app/actions/devotions';
import DevotionContentWrapper from '@/components/devotion/DevotionContentWrapper';

export default async function DevotionPage() {
    const [devotions, popularDevotions, calendarDevotions] = await Promise.all([
        getPublishedDevotions(),
        getPopularDevotions(),
        getCalendarDevotions()
    ]);

    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow flex flex-col items-center w-full">
                <Hero />

                <DevotionContentWrapper
                    initialDevotions={devotions}
                    popularDevotions={popularDevotions}
                    calendarDevotions={calendarDevotions}
                />

            </main>
            <Footer />
        </div>
    );
}
