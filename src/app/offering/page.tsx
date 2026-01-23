import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OfferingHero, ScriptureQuote, OfferingMethods } from "@/components/offering";

export const metadata: Metadata = {
    title: "奉獻資訊 - 長堤基督教會",
    description: "長堤基督教會奉獻方式與資訊",
};

export default function OfferingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <OfferingHero />
                <ScriptureQuote />
                <OfferingMethods />
            </main>
            <Footer />
        </div>
    );
}
