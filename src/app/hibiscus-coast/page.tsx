import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HibiscusHero, MeetingInfo, ChurchHistory, PhotoGallery } from "@/components/hibiscus-coast";

export const metadata: Metadata = {
    title: "木槿灣基督教會",
    description: "木槿灣基督教會（Hibiscus Coast Christian Church）是長堤基督教會的植堂教會，位於奧克蘭北岸木槿灣地區。了解我們的聚會時間、地點與教會歷史。",
    openGraph: {
        title: "木槿灣基督教會 - Hibiscus Coast Christian Church",
        description: "木槿灣教會聚會資訊與教會歷史",
    },
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
