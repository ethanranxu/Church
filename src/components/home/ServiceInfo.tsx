"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/i18n";
import { Bulletin } from "@/app/actions/bulletins";
import { HistoryBulletinsModal } from "./HistoryBulletinsModal";

import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

import { QRCodeCanvas } from "qrcode.react";

export const ServiceInfo = ({ latestBulletin }: { latestBulletin: Bulletin | null }) => {
    const { t } = useTranslation();
    const [isHistoryModalOpen, setIsHistoryModalOpen] = React.useState(false);
    const [baseUrl, setBaseUrl] = React.useState("");

    // Get the base URL on the client
    React.useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    // Format the date if it exists
    const formattedDate = latestBulletin?.publishDate 
        ? format(new Date(latestBulletin.publishDate), "yyyy年M月d日", { locale: zhTW })
        : "";

    const qrUrl = baseUrl && latestBulletin
        ? `${baseUrl}/api/bulletin/latest?v=${latestBulletin.id}&t=${latestBulletin.updatedAt ? encodeURIComponent(latestBulletin.updatedAt) : ""}`
        : "";

    return (
        <div id="service-info" className="relative z-30 -mt-20">
            <Container>
                <div className="bg-white dark:bg-[#1a2634] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-10 md:px-4 grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-0 transition-colors relative">
                    {/* ... (Time and Location sections) */}
                    <div className="flex items-start gap-4 px-4 md:justify-center">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined !text-3xl">schedule</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.home.serviceInfo.serviceTime}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{t.home.serviceInfo.serviceTimeValue}</p>
                            <p className="text-sm text-primary font-medium mt-1 uppercase tracking-wider">Sunday Service 10:00 AM</p>
                        </div>
                    </div>

                    <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-200 dark:bg-gray-700" />

                    <div className="flex items-start gap-4 px-4 md:justify-center">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined !text-3xl">location_on</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.home.serviceInfo.location}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Mairangi Bay Primary School Hall</p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Mairangi+Bay+School"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline font-medium mt-1 inline-flex items-center gap-1 group"
                            >
                                {t.home.serviceInfo.viewMap}
                                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    open_in_new
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-200 dark:bg-gray-700" />

                    {/* Bulletin Info */}
                    <div className="flex items-start gap-4 px-4 md:justify-center">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined !text-3xl">picture_as_pdf</span>
                        </div>
                        <div className="min-w-0 flex items-center gap-1">
                            <div className="min-w-0 flex flex-col justify-between py-0.5">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">周報下載</h3>
                                {latestBulletin ? (
                                    <>
                                        <a
                                            href={latestBulletin.pdfBase64 ? `data:application/pdf;base64,${latestBulletin.pdfBase64}` : latestBulletin.pdfUrl}
                                            download={latestBulletin.pdfName || "周報.pdf"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors inline-flex items-center gap-1 group truncate font-medium mt-1"
                                        >
                                            <span className="truncate">{formattedDate}</span>
                                        </a>
                                        <button
                                            onClick={() => setIsHistoryModalOpen(true)}
                                            className="text-sm text-primary hover:underline font-medium mt-1 inline-flex items-center gap-1 w-fit"
                                        >
                                            查看历史周报
                                            <span className="material-symbols-outlined text-[16px]">
                                                history
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-400 dark:text-gray-500 italic text-sm mt-1">暂无可用周报</p>
                                        <button
                                            onClick={() => setIsHistoryModalOpen(true)}
                                            className="text-sm text-primary hover:underline font-medium mt-1 inline-flex items-center gap-1 w-fit"
                                        >
                                            查看历史周报
                                            <span className="material-symbols-outlined text-[16px]">
                                                history
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {/* Even tighter QR Code */}
                            {qrUrl && latestBulletin && (
                                <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 shrink-0 ml-1">
                                    <QRCodeCanvas 
                                        value={qrUrl} 
                                        size={72}
                                        level="H"
                                        includeMargin={false}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            <HistoryBulletinsModal 
                isOpen={isHistoryModalOpen} 
                onClose={() => setIsHistoryModalOpen(false)} 
            />
        </div>
    );
};
