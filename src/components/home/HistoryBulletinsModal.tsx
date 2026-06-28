"use client";

import React, { useState, useEffect } from "react";
import { Bulletin, getHistoricalBulletins, getBulletinPdf } from "@/app/actions/bulletins";
import { Loader2, X, Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

interface HistoryBulletinsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HistoryBulletinsModal = ({ isOpen, onClose }: HistoryBulletinsModalProps) => {
    const [bulletins, setBulletins] = useState<Bulletin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCursors, setPageCursors] = useState<(string | undefined)[]>([undefined]);
    const [hasMore, setHasMore] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const fetchBulletinsForPage = async (page: number, cursorsMap = pageCursors) => {
        setIsLoading(true);
        const cursor = cursorsMap[page - 1];
        
        const result = await getHistoricalBulletins(10, cursor);
        
        setBulletins(result.bulletins);
        setHasMore(result.hasMore);
        setCurrentPage(page);

        if (result.bulletins.length > 0) {
            const lastId = result.bulletins[result.bulletins.length - 1].id;
            setPageCursors(prev => {
                const next = [...prev];
                next[page] = lastId;
                return next;
            });
        }
        setIsLoading(false);
    };

    const handleDownload = async (item: Bulletin) => {
        if (item.pdfUrl) {
            window.open(item.pdfUrl, "_blank");
            return;
        }
        if (!item.id) return;
        
        setDownloadingId(item.id);
        try {
            const base64 = await getBulletinPdf(item.id);
            if (base64) {
                const linkSource = `data:application/pdf;base64,${base64}`;
                const downloadLink = document.createElement("a");
                downloadLink.href = linkSource;
                downloadLink.download = item.pdfName || `${item.title}.pdf`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                alert("無法獲取周報 PDF 數據");
            }
        } catch (err) {
            console.error(err);
            alert("下載周報失敗");
        } finally {
            setDownloadingId(null);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
            setPageCursors([undefined]);
            fetchBulletinsForPage(1, [undefined]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const availablePagesCount = Math.max(1, Math.min(pageCursors.length, currentPage + (hasMore ? 1 : 0)));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
                className="bg-white dark:bg-[#1a2634] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">history</span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">歷史周報回顧</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
                    <div>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                <p className="text-gray-500 text-sm">正在努力加載中...</p>
                            </div>
                        ) : bulletins.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 italic">
                                暫無歷史周報記錄
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bulletins.map((item) => {
                                    const formattedDate = item.publishDate 
                                        ? format(new Date(item.publishDate), "yyyy年M月d日", { locale: zhTW })
                                        : "未知日期";
                                        
                                    return (
                                        <div 
                                            key={item.id}
                                            onClick={() => !downloadingId && handleDownload(item)}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                                <div className={clsx(
                                                    "p-2.5 rounded-lg transition-colors",
                                                    downloadingId === item.id 
                                                        ? "bg-primary/10 text-primary animate-pulse" 
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-primary"
                                                )}>
                                                    {downloadingId === item.id ? (
                                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                                    ) : (
                                                        <FileText className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <span className="font-bold text-gray-900 dark:text-white truncate block group-hover:text-primary transition-all text-lg select-none">
                                                        {formattedDate}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {downloadingId === item.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                            ) : (
                                                <div className="text-gray-300 group-hover:text-primary transition-colors">
                                                    <Download className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Pagination Bar */}
                    {!isLoading && bulletins.length > 0 && (
                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <button
                                onClick={() => fetchBulletinsForPage(currentPage - 1)}
                                disabled={currentPage === 1 || isLoading}
                                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed select-none"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                上一頁
                            </button>

                            <div className="flex items-center gap-1.5">
                                {Array.from({ length: availablePagesCount }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => fetchBulletinsForPage(p)}
                                        disabled={isLoading || p === currentPage}
                                        className={clsx(
                                            "w-8 h-8 rounded-lg text-sm font-semibold transition-all flex items-center justify-center select-none",
                                            p === currentPage 
                                                ? "bg-primary text-white shadow-sm cursor-default" 
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => fetchBulletinsForPage(currentPage + 1)}
                                disabled={!hasMore || isLoading}
                                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed select-none"
                            >
                                下一頁
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

