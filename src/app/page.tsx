import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ServiceInfo } from "@/components/home/ServiceInfo";
import { LatestSermon } from "@/components/home/LatestSermon";
import { AnnualThemeBanner } from "@/components/home/AnnualThemeBanner";
import { Ministries } from "@/components/home/Ministries";
import { Location } from "@/components/home/Location";
import { Connect } from "@/components/home/Connect";
import { getLatestBulletinWithPdf } from "@/app/actions/bulletins";

export default async function Home() {
  const latestBulletin = await getLatestBulletinWithPdf();
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ServiceInfo latestBulletin={latestBulletin} />
        <LatestSermon />
        <AnnualThemeBanner />
        <Ministries />
        <Location />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
