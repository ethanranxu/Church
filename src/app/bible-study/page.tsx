import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/bible-study/Hero';
import BibleOverview from '@/components/bible-study/BibleOverview';
import BibleBooks from '@/components/bible-study/BibleBooks';
import ResourcesAndHelp from '@/components/bible-study/ResourcesAndHelp';

export const metadata: Metadata = {
    title: "讀經指引",
    description: "長堤基督教會讀經指引與聖經導覽，幫助您系統性地閱讀聖經，深入認識神的話語。",
    openGraph: {
        title: "讀經指引 - 長堤基督教會",
        description: "系統性聖經導覽與讀經資源",
    },
};

export default function BibleStudyPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex flex-col">
                <Hero />
                <div className="relative flex flex-col items-center pt-12 pb-32 px-4 md:px-0 bg-gradient-to-b from-white to-blue-50/30">
                    {/* Journey Line */}
                    <div className="journey-line"></div>
                    <BibleOverview />
                    <BibleBooks />
                    <ResourcesAndHelp />
                </div>
            </main>
            <Footer />
        </div>
    );
}
