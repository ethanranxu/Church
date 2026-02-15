import { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LongBayHero } from '@/components/long-bay/LongBayHero';
import { LongBayIntro } from '@/components/long-bay/LongBayIntro';
import { LongBayMeetingInfo } from '@/components/long-bay/LongBayMeetingInfo';

export const metadata: Metadata = {
    title: "長灣基督教會",
    description: "長灣基督教會（Long Bay Christian Church）是長堤基督教會的植堂教會，位於奧克蘭北岸長灣地區，為這地的福音工作守望禱告。",
    openGraph: {
        title: "長灣基督教會 - Long Bay Christian Church",
        description: "長灣教會位於風景優美的長灣地區，為這地的福音工作守望禱告",
    },
};

export default function LongBayPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="bg-gray-50 flex-grow">
                <LongBayHero />
                <LongBayIntro />
                <LongBayMeetingInfo />
            </main>
            <Footer />
        </div>
    );
}
