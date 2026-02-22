import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/devotion/Hero';
import { getPublishedDevotions, getPopularDevotions, getCalendarDevotions, getDevotionById } from '@/app/actions/devotions';
import DevotionContentWrapper from '@/components/devotion/DevotionContentWrapper';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const defaultMetadata: Metadata = {
        title: "每日靈修",
        description: "長堤基督教會每日靈修分享，每天更新靈修文章，陪伴您在神的話語中成長。長堤教會、木槿灣教會、長灣教會聯合靈修平台。",
        openGraph: {
            title: "每日靈修 - 長堤基督教會",
            description: "每日靈修分享，在神的話語中成長",
            images: ['/images/bible.jpg'],
        },
    };

    const resolvedSearchParams = await searchParams;
    const id = resolvedSearchParams.id;

    if (id && typeof id === 'string') {
        const devotion = await getDevotionById(id);
        if (devotion) {
            return {
                ...defaultMetadata,
                openGraph: {
                    ...defaultMetadata.openGraph,
                    description: devotion.title,
                }
            };
        }
    }

    return defaultMetadata;
}

export const dynamic = "force-dynamic";

function extractSnippet(html: string): string {
    if (!html) return '';
    let cleanHtml = html
        .replace(/<a[^>]*>.*?<\/a>/gi, '')
        .replace(/<img[^>]*\/?>/gi, '')
        .replace(/<video[^>]*>.*?<\/video>/gi, '')
        .replace(/<audio[^>]*>.*?<\/audio>/gi, '')
        .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
        .replace(/<br\s*\/?>/gi, ' ');

    const cleanContent = cleanHtml
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return cleanContent.length > 300 ? cleanContent.substring(0, 300) + "..." : cleanContent;
}

export default async function DevotionPage() {
    const [devotions, popularDevotions, calendarDevotions] = await Promise.all([
        getPublishedDevotions(),
        getPopularDevotions(),
        getCalendarDevotions()
    ]);

    // Strip content out before sending JSON over Next.js client component boundary to save massive hydration/HTML download payload (up to 95% saving on lists)
    const optimizedDevotions = devotions.map(d => ({
        ...d,
        snippet: extractSnippet(d.content),
        content: ""
    }));

    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow flex flex-col w-full">
                <Hero />

                <DevotionContentWrapper
                    initialDevotions={optimizedDevotions}
                    popularDevotions={popularDevotions}
                    calendarDevotions={calendarDevotions}
                />

            </main>
            <Footer />
        </div>
    );
}
