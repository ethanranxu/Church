"use client";

import React, { useState, useEffect } from "react";
import { Bulletin, getHistoricalBulletins } from "@/app/actions/bulletins";
import { Loader2, X, Download, FileText, Calendar } from "lucide-react";
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
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastId, setLastId] = useState<string | undefined>();

    const fetchBulletins = async (isInitial = false) => {
        if (isInitial) setIsLoading(true);
        else setIsLoadingMore(true);

        const result = await getHistoricalBulletins(10, isInitial ? undefined : lastId);
        
        if (isInitial) {
            setBulletins(result.bulletins);
        } else {
            setBulletins(prev => [...prev, ...result.bulletins]);
        }
        
        setHasMore(result.hasMore);
        if (result.bulletins.length > 0) {
            setLastId(result.bulletins[result.bulletins.length - 1].id);
        }

        setIsLoading(false);
        setIsLoadingMore(false);
    };

    useEffect(() => {
        if (isOpen && bulletins.length === 0) {
            fetchBulletins(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

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
                <div className="flex-1 overflow-y-auto p-6">
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
                                        className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-all"
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <a
                                                    href={item.pdfBase64 ? `data:application/pdf;base64,${item.pdfBase64}` : item.pdfUrl}
                                                    download={item.pdfName || `${item.title}.pdf`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-gray-900 dark:text-white truncate block hover:text-primary hover:underline transition-all cursor-pointer text-lg"
                                                >
                                                    {formattedDate}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        {(item.pdfUrl || item.pdfBase64) && (
                                            <div className="text-gray-300 group-hover:text-primary transition-colors">
                                                <Download className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {hasMore && (
                                <div className="pt-4 flex justify-center">
                                    <button
                                        onClick={() => fetchBulletins(false)}
                                        disabled={isLoadingMore}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-semibold disabled:opacity-50"
                                    >
                                        {isLoadingMore ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                加載中...
                                            </>
                                        ) : (
                                            "加載更多周報"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
