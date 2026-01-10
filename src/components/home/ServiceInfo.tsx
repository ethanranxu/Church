import React from "react";
import { Container } from "@/components/ui/Container";

export const ServiceInfo = () => {
    return (
        <div className="relative z-30 -mt-20">
            <Container>
                <div className="bg-white dark:bg-[#1a2634] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors">
                    {/* Time Info */}
                    <div className="flex items-start gap-4 flex-1 w-full md:w-auto">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined !text-3xl">schedule</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">主日崇拜時間</h3>
                            <p className="text-gray-600 dark:text-gray-300">每週日 上午 10:00</p>
                            <p className="text-sm text-primary font-medium mt-1 uppercase tracking-wider">Sunday Service 10:00 AM</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-700" />

                    {/* Location Info */}
                    <div className="flex items-start gap-4 flex-1 w-full md:w-auto">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined !text-3xl">location_on</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">聚會地點</h3>
                            <p className="text-gray-600 dark:text-gray-300">Mairangi Bay Primary School Hall</p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Mairangi+Bay+School"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline font-medium mt-1 inline-flex items-center gap-1 group"
                            >
                                查看地圖
                                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    open_in_new
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
