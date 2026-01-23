import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrayerHero, PrayerForm, PrayerSidebar } from "@/components/prayer";

export const metadata: Metadata = {
    title: "代禱需求 - 長堤基督教會",
    description: "長堤基督教會代禱需求表單",
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
