'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchVisitTrends } from '@/app/actions/log';
import { subMonths, startOfDay, endOfDay, subYears, subDays } from 'date-fns';
import { X } from 'lucide-react'; // Using Lucide icon for close button

interface VisitTrend {
    date: string;
    userVisits: number;
    pageVisits: number;
}

interface VisitTrendsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialType?: 'user' | 'page'; // Which line to emphasize or show default
}

export function VisitTrendsModal({ isOpen, onClose, initialType = 'user' }: VisitTrendsModalProps) {
    const [data, setData] = useState<VisitTrend[]>([]);
    const [timeRange, setTimeRange] = useState('1W'); // Default to 1 Week
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const endDate = new Date();
                let startDate = new Date();

                switch (timeRange) {
                    case '1W': startDate = subDays(new Date(), 7); break;
                    case '1M': startDate = subMonths(new Date(), 1); break;
                    case '3M': startDate = subMonths(new Date(), 3); break;
                    case '6M': startDate = subMonths(new Date(), 6); break;
                    case '1Y': startDate = subYears(new Date(), 1); break;
                    default: startDate = subDays(new Date(), 7);
                }

                const startStr = startOfDay(startDate).toISOString();
                const endStr = endOfDay(endDate).toISOString();

                const trends = await fetchVisitTrends(startStr, endStr);
                setData(trends);
            } catch (error) {
                console.error("Failed to load trends", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [isOpen, timeRange]);

    if (!isOpen) return null;

    const title = initialType === 'user' ? '用户访问趋势 (User Visits)' : '页面访问趋势 (Page Visits)';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

                    {/* Time Range Selector */}
                    <div className="flex bg-gray-100 rounded-lg p-1 ml-auto mr-4">
                        {['1W', '1M', '3M', '6M', '1Y'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {range === '1W' ? '近1周' : range === '1M' ? '近1月' : range === '3M' ? '近1季度' : range === '6M' ? '近半年' : '近1年'}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 h-[400px] relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                            <div className="size-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    tickLine={false}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    minTickGap={30}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />

                                {initialType === 'user' && (
                                    <Line
                                        type="monotone"
                                        dataKey="userVisits"
                                        name="用户访问 (User Visits)"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                )}

                                {initialType === 'page' && (
                                    <Line
                                        type="monotone"
                                        dataKey="pageVisits"
                                        name="页面访问 (Page Visits)"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
