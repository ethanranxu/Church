import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/beliefs/Hero';
import HistoryTimeline from '@/components/beliefs/HistoryTimeline';
import FundamentalTruths from '@/components/beliefs/FundamentalTruths';
import JoinCTA from '@/components/beliefs/JoinCTA';

export default function BeliefsPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="bg-gray-50">
                <Hero />
                <HistoryTimeline />
                <FundamentalTruths />
                <JoinCTA />
            </main>
            <Footer />
        </div>
    );
}

