import { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/beliefs/Hero';
import HistoryTimeline from '@/components/beliefs/HistoryTimeline';
import { CoreValues } from '@/components/home/CoreValues';
import ChurchPlanting from '@/components/beliefs/ChurchPlanting';
import FundamentalTruths from '@/components/beliefs/FundamentalTruths';
import JoinCTA from '@/components/beliefs/JoinCTA';

export const metadata: Metadata = {
    title: "認識教會 - 長堤基督教會",
    description: "了解長堤基督教會的歷史、信仰中心與願景",
};

export default function BeliefsPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="bg-gray-50">
                <Hero />
                <HistoryTimeline />
                <CoreValues />
                <ChurchPlanting />
                <FundamentalTruths />
                <JoinCTA />
            </main>
            <Footer />
        </div>
    );
}

