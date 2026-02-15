import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/ministry/Hero';
import PastoralTeam from '@/components/ministry/PastoralTeam';
import OrgChart from '@/components/ministry/OrgChart';

export const metadata: Metadata = {
    title: "教牧團隊",
    description: "認識長堤基督教會的教牧團隊與事工架構，包括長堤教會、木槿灣教會、長灣教會的牧者同工。",
    openGraph: {
        title: "教牧團隊 - 長堤基督教會",
        description: "認識我們的教牧團隊與事工架構",
    },
};

export default function MinistryTeamPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <div className="flex flex-col items-center w-full bg-white dark:bg-background-dark py-12 px-4 md:px-10">
                    <div className="w-full max-w-[1024px] flex flex-col gap-8">
                        <PastoralTeam />
                        <OrgChart />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
