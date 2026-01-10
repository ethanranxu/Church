import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ServiceInfo } from "@/components/home/ServiceInfo";
import { LatestSermon } from "@/components/home/LatestSermon";
import { CoreValues } from "@/components/home/CoreValues";
import { Ministries } from "@/components/home/Ministries";
import { Location } from "@/components/home/Location";
import { Connect } from "@/components/home/Connect";

export default function Home() {
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ServiceInfo />
        <LatestSermon />
        <CoreValues />
        <Ministries />
        <Location />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
