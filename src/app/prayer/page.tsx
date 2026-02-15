import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrayerHero, PrayerForm, PrayerSidebar } from "@/components/prayer";

export const metadata: Metadata = {
    title: "代禱需求",
    description: "歡迎提交您的代禱需求，長堤基督教會的代禱小組將為您禱告。我們相信禱告的力量，願與您一同在主面前交託。",
    openGraph: {
        title: "代禱需求 - 長堤基督教會",
        description: "提交代禱需求，我們將為您禱告",
    },
};

export default function PrayerPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <PrayerHero />
                <div className="bg-[#f6f7f8] dark:bg-[#101922] py-12">
                    <div className="max-w-[1280px] mx-auto px-4 lg:px-40 flex flex-col lg:flex-row gap-12">
                        {/* Left Column: Form */}
                        <div className="flex-1 max-w-[800px] w-full">
                            <PrayerForm />
                        </div>
                        {/* Right Column: Sidebar */}
                        <PrayerSidebar />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
