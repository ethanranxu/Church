'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchUserLogs, fetchAdminLogs } from '@/app/actions/log';
import { Activity, User, Shield, MapPin, Clock, Globe } from 'lucide-react';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';

interface LogItem {
    id: string;
    createdAt: string;
    [key: string]: any;
}

export function ActivityFeed() {
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
    const [logs, setLogs] = useState<LogItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastId, setLastId] = useState<string | undefined>(undefined);
    const observerTarget = useRef<HTMLDivElement>(null);

    const loadLogs = useCallback(async (isRefresh = false) => {
        if (loading && !isRefresh) return;

        setLoading(true);
        try {
            const currentLastId = isRefresh ? undefined : lastId;
            let result;

            if (activeTab === 'user') {
                result = await fetchUserLogs(20, currentLastId);
            } else {
                result = await fetchAdminLogs(20, currentLastId);
            }

            if (isRefresh) {
                setLogs(result.logs);
            } else {
                setLogs(prev => {
                    const existingIds = new Set(prev.map(l => l.id));
                    const newLogs = result.logs.filter(l => !existingIds.has(l.id));
                    return [...prev, ...newLogs];
                });
            }

            setLastId(result.lastId || undefined);
            setHasMore(!!result.lastId);
        } catch (error) {
            console.error("Failed to load logs", error);
        } finally {
            setLoading(false);
        }
    }, [activeTab, lastId, loading]);

    // Initial load and tab change
    useEffect(() => {
        let ignore = false;

        const fetchInitial = async () => {
            setLoading(true);
            try {
                let result;
                if (activeTab === 'user') {
                    result = await fetchUserLogs(20);
                } else {
                    result = await fetchAdminLogs(20);
                }

                if (!ignore) {
                    setLogs(result.logs || []);
                    setLastId(result.lastId || undefined);
                    setHasMore(!!result.lastId);
                }
            } catch (err) {
                console.error("Fetch initial failed", err);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        // Reset state
        setLogs([]);
        setLastId(undefined);
        setHasMore(true);
        fetchInitial();

        return () => {
            ignore = true;
        };
    }, [activeTab]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadLogs(false);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, loadLogs]);

    const formatTime = (timeStr: string) => {
        try {
            return formatDistanceToNow(new Date(timeStr), { addSuffix: true, locale: zhTW });
        } catch (e) {
            return timeStr;
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm h-[600px] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-2">
                    <Activity className="size-5 text-blue-500" />
                    最近活動
                </h3>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            activeTab === 'user'
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        )}
                    >
                        用戶訪問
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            activeTab === 'admin'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        )}
                    >
                        管理員操作
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {logs.length === 0 && !loading && (
                    <div className="text-center text-gray-400 py-10">
                        暫無活動記錄
                    </div>
                )}

                {logs
                    .filter(log => {
                        if (activeTab === 'user') return !!log.ip;
                        if (activeTab === 'admin') return !!log.action;
                        return true;
                    })
                    .map((log) => (
                        <div key={log.id} className="relative pl-6 group py-1">
                            {/* Timeline Line */}
                            <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-100 group-last:bottom-auto group-last:h-full"></div>
                            <div className={clsx(
                                "absolute left-[-4px] top-2.5 size-2.5 rounded-full ring-4 ring-white",
                                activeTab === 'user' ? "bg-emerald-400" : "bg-blue-500"
                            )}></div>

                            <div className="flex items-center gap-3 text-sm">
                                {activeTab === 'user' ? (
                                    // USER LOG ITEM
                                    log.location ? (
                                        <>
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Globe className="size-4 text-gray-400 shrink-0" />
                                                <span className="font-medium text-gray-900 whitespace-nowrap">{log.location}</span>
                                                <span className="text-gray-400 font-normal shrink-0">訪問了</span>
                                                <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-xs whitespace-nowrap">{log.page}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs text-gray-500 min-w-0">
                                                <span className="flex items-center gap-1 whitespace-nowrap hidden sm:flex" title="用户IP">
                                                    <MapPin className="size-3" /> {log.ip}
                                                </span>
                                                {log.duration > 0 && (
                                                    <span className="whitespace-nowrap bg-gray-50 px-1.5 rounded text-gray-600">{log.duration}s</span>
                                                )}
                                            </div>
                                        </>
                                    ) : <span className="text-gray-400">數據加載中...</span>
                                ) : (
                                    // ADMIN LOG ITEM
                                    log.action ? (
                                        <>
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Shield className="size-4 text-blue-500 shrink-0" />
                                                <span className="font-medium text-gray-900 whitespace-nowrap">{log.adminName}</span>
                                                <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-xs whitespace-nowrap">{log.action}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-500 min-w-0 flex-1 truncate">
                                                <span className="truncate">{log.details || log.adminEmail}</span>
                                            </div>
                                        </>
                                    ) : <span className="text-gray-400">數據加載中...</span>
                                )}

                                <div className="flex-1"></div>

                                <time className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0 ml-2">
                                    <Clock className="size-3" />
                                    {formatTime(log.createdAt)}
                                </time>
                            </div>
                        </div>
                    ))}

                {/* Loading Indicator */}
                <div ref={observerTarget} className="py-4 flex justify-center h-10">
                    {loading && (
                        <div className="size-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                    )}
                </div>
            </div>
        </div>
    );
}
