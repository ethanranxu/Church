"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const Location = () => {
    return (
        <Section id="location" className="bg-white dark:bg-[#101922]">
            <Container>
                <div className="bg-background-light dark:bg-[#1a2634] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
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
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">如何到達</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                                        <span className="material-symbols-outlined">directions_car</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">自行開車</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            教會位於 Mairangi Bay Primary School Hall。學校內設有充足的停車位供會眾使用。請從 Galaxy Drive 入口進入。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                                        <span className="material-symbols-outlined">directions_bus</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">大眾運輸</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            可搭乘奧克蘭公車至 Mairangi Bay Village，步行約 10 分鐘即可到達學校禮堂。
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
                                        在 Google Maps 開啟
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
