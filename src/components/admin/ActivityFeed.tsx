'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchUserLogs, fetchAdminLogs } from '@/app/actions/log';
import { Activity, User, Shield, MapPin, Clock, Globe, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { formatDistanceToNow, subDays, startOfDay, endOfDay, format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { useTranslation } from "@/i18n/LanguageContext";
interface LogItem {
    id: string;
    createdAt: string;
    [key: string]: any;
}

export function ActivityFeed() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
    const [logs, setLogs] = useState<LogItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastId, setLastId] = useState<string | undefined>(undefined);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Date Range State
    const [startDate, setStartDate] = useState<string>(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

    const loadLogs = useCallback(async (isRefresh = false) => {
        if (loading && !isRefresh) return;

        setLoading(true);
        try {
            const currentLastId = isRefresh ? undefined : lastId;
            let result;

            if (activeTab === 'user') {
                const start = startOfDay(new Date(startDate)).toISOString();
                const end = endOfDay(new Date(endDate)).toISOString();
                result = await fetchUserLogs(20, currentLastId, start, end);
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
    }, [activeTab, lastId, loading, startDate, endDate]);

    // Initial load and tab change
    useEffect(() => {
        let ignore = false;

        const fetchInitial = async () => {
            setLoading(true);
            try {
                let result;
                if (activeTab === 'user') {
                    const start = startOfDay(new Date(startDate)).toISOString();
                    const end = endOfDay(new Date(endDate)).toISOString();
                    result = await fetchUserLogs(20, undefined, start, end);
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
    }, [activeTab, startDate, endDate]);

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
            <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-2">
                        <Activity className="size-5 text-blue-500" />
                        {t.admin.activity.recentActivity}
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
                            {t.admin.activity.userVisits}
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
                            {t.admin.activity.adminOps}
                        </button>
                    </div>
                </div>

                {activeTab === 'user' && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                            <Calendar className="size-4 text-gray-500" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent text-sm border-none focus:ring-0 p-0 text-gray-600"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent text-sm border-none focus:ring-0 p-0 text-gray-600"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {logs.length === 0 && !loading && (
                    <div className="text-center text-gray-400 py-10">
                        {t.admin.activity.noActivity}
                    </div>
                )}

                {activeTab === 'user' ? (
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-gray-500 bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 font-medium">地点</th>
                                    <th className="px-4 py-3 font-medium">访问链接</th>
                                    <th className="px-4 py-3 font-medium">IP地址</th>
                                    <th className="px-4 py-3 font-medium">停留时间</th>
                                    <th className="px-4 py-3 font-medium">访问时间</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3">
                                            {log.location ? (
                                                <div className="flex items-center gap-2">
                                                    <Globe className="size-4 text-gray-400 shrink-0" />
                                                    <span className="text-gray-900 font-medium">{log.location}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Loading...</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <a
                                                href={log.page}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 max-w-[200px] truncate"
                                                title={log.page}
                                            >
                                                {log.page}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="size-3 text-gray-400" />
                                                {log.ip}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {log.duration > 0 ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {log.duration}s
                                                </span>
                                            ) : (
                                                <span className="text-gray-300">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {formatTime(log.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {logs.map((log) => (
                            <div key={log.id} className="relative pl-6 group py-1">
                                {/* Timeline Line */}
                                <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-100 group-last:bottom-auto group-last:h-full"></div>
                                <div className="absolute left-[-4px] top-2.5 size-2.5 rounded-full ring-4 ring-white bg-blue-500"></div>

                                <div className="flex items-center gap-3 text-sm">
                                    {log.action ? (
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
                                    ) : <span className="text-gray-400">{t.admin.activity.dataLoading}</span>}

                                    <div className="flex-1"></div>

                                    <time className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0 ml-2">
                                        <Clock className="size-3" />
                                        {formatTime(log.createdAt)}
                                    </time>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

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
