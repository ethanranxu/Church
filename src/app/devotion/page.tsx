import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/devotion/Hero';
import Welcome from '@/components/devotion/Welcome';
import DevotionFeed from '@/components/devotion/DevotionFeed';
import Calendar from '@/components/devotion/Calendar';
import ImageQuote from '@/components/devotion/ImageQuote';
import RecentTopics from '@/components/devotion/RecentTopics';
import QuoteCard from '@/components/devotion/QuoteCard';

export default function DevotionPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow flex flex-col items-center w-full">
                <Hero />

                <div className="max-w-[1200px] w-full mx-auto px-4 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <Welcome />
                        <DevotionFeed />
                    </div>

                    {/* Sidebar - Right Column */}
                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        <Calendar />
                        <ImageQuote />
                        <RecentTopics />
                        <QuoteCard />
                    </aside>
                </div>

                {/* Bottom Spacer */}
                <div className="w-full h-16"></div>
            </main>
            <Footer />
        </div>
    );
}
