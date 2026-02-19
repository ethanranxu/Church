import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import WelcomeContent from "@/components/welcome/WelcomeContent";

export const metadata: Metadata = {
    title: "新朋友專區",
    description: "歡迎來到長堤基督教會！我們是一個充滿愛與包容的大家庭，位於奧克蘭北岸。了解聚會時間、牧者寄語、新朋友指南與常見問題。",
    openGraph: {
        title: "新朋友專區 - 長堤基督教會",
        description: "歡迎來到長堤基督教會！了解聚會時間與新朋友指南",
    },
};

export default function WelcomePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <WelcomeContent />
            </main>
            <Footer />
        </div>
    );
}
