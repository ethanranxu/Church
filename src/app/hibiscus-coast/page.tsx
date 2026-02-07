import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HibiscusHero, MeetingInfo, ChurchHistory, PhotoGallery } from "@/components/hibiscus-coast";

export const metadata: Metadata = {
    title: "木槿灣基督教會 - 長堤基督教會",
    description: "木槿灣基督教會聚會資訊與教會歷史",
};

export default function HibiscusCoastPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <HibiscusHero />
                <ChurchHistory />
                <MeetingInfo />
                <PhotoGallery />
            </main>
            <Footer />
        </div>
    );
}
