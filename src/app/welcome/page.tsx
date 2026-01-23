import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    WelcomeHero,
    PastorMessage,
    NewcomerGuide,
    WorshipSchedule,
    FAQ,
    Testimonials,
    VisitCTA,
} from "@/components/welcome";

export const metadata: Metadata = {
    title: "新朋友專區 - 長堤基督教會",
    description: "歡迎來到長堤基督教會！我們是一個充滿愛與包容的大家庭。",
};

export default function WelcomePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <WelcomeHero />
                <PastorMessage />
                <NewcomerGuide />
                <WorshipSchedule />
                <FAQ />
                <Testimonials />
                <VisitCTA />
            </main>
            <Footer />
        </div>
    );
}
