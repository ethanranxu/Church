"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n";

export const Location = () => {
    const { t } = useTranslation();

    return (
        <Section id="location" className="bg-white dark:bg-background-dark">
            <Container>
                <div className="bg-background-light dark:bg-[#1a2634] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
                        {/* Google Maps Embed */}
                        <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-200 relative">
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Mairangi+Bay+School,Auckland,New+Zealand&zoom=15`}
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mairangi Bay Primary School Location"
                            />
                        </div>

                        {/* Directions Content */}
                        <div className="flex flex-col justify-center p-6 lg:pr-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.home.location.howToGet}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                                        <span className="material-symbols-outlined">directions_car</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.home.location.byCar}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {t.home.location.byCarDesc}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                                        <span className="material-symbols-outlined">directions_bus</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.home.location.byBus}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {t.home.location.byBusDesc}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button
                                        variant="ghost"
                                        className="w-full sm:w-auto bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
                                        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Mairangi+Bay+School', '_blank')}
                                    >
                                        <span className="material-symbols-outlined">map</span>
                                        {t.home.location.openInMaps}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
