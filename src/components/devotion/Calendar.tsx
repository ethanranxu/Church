'use client';

import React, { useState } from 'react';
import { Devotion } from '@/app/actions/devotions';

interface CalendarProps {
    devotions?: Devotion[];
    onSelectDevotion?: (devotion: Devotion) => void;
}

export default function Calendar({ devotions = [], onSelectDevotion }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    // Helper to format date to YYYY-MM-DD in local time
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Get first day of the month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Get today's date for highlighting
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // Build calendar days array
    const calendarDays: Array<{ day: number; isCurrentMonth: boolean; isToday: boolean; dateStr: string }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const d = new Date(year, month - 1, daysInPrevMonth - i);
        calendarDays.push({
            day: daysInPrevMonth - i,
            isCurrentMonth: false,
            isToday: false,
            dateStr: formatDate(d)
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            isCurrentMonth: true,
            isToday: isCurrentMonth && i === todayDate,
            dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
        const d = new Date(year, month + 1, i);
        calendarDays.push({
            day: i,
            isCurrentMonth: false,
            isToday: false,
            dateStr: formatDate(d)
        });
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    return (
        <div className="bg-white dark:bg-[#101922] p-6 rounded-2xl shadow-lg border border-gray-100/80 dark:border-gray-800 transition-shadow duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h4 className="font-serif-content font-bold text-xl text-gray-900 dark:text-white tracking-wide">靈修曆</h4>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={handlePrevMonth}
                        className="size-9 flex items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="size-9 flex items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="text-center font-medium text-base text-gray-800 dark:text-gray-200 mb-6 font-display tracking-widest uppercase">
                {year}年 {monthNames[month]}
            </div>

            <div className="grid grid-cols-7 gap-x-2 gap-y-3 text-center">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-xs font-semibold text-gray-400/80 uppercase">
                        {day}
                    </div>
                ))}

                {calendarDays.map((dayInfo, index) => {
                    // Normalize comparison by re-formatting or careful string matching
                    const devotion = devotions.find(d => {
                        const dStr = d.publishDate?.trim();
                        if (!dStr) return false;
                        // Handle potential YYYY-M-D vs YYYY-MM-DD
                        const parts = dStr.split('-');
                        if (parts.length === 3) {
                            const normalized = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
                            return normalized === dayInfo.dateStr;
                        }
                        return dStr === dayInfo.dateStr;
                    });
                    const hasDevotion = !!devotion;

                    // 增加 6 個月的視覺限制
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    const sixMonthsAgoStr = formatDate(sixMonthsAgo);
                    const isWithinSixMonths = dayInfo.dateStr >= sixMonthsAgoStr;

                    const shouldShowDot = hasDevotion && isWithinSixMonths;

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center gap-1 group/day"
                            title={devotion?.title}
                        >
                            <button
                                disabled={!hasDevotion}
                                onClick={() => devotion && onSelectDevotion?.(devotion)}
                                className={`h-9 w-9 flex items-center justify-center text-sm rounded-full transition-all relative ${dayInfo.isToday
                                    ? 'font-bold bg-primary text-white shadow-md shadow-primary/30'
                                    : dayInfo.isCurrentMonth
                                        ? 'font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                                        : 'font-medium text-gray-300 dark:text-gray-600'
                                    } ${hasDevotion ? 'hover:scale-110 active:scale-95' : ''}`}
                            >
                                {dayInfo.day}
                            </button>
                            <div className="h-1.5 flex items-center justify-center">
                                {shouldShowDot && (
                                    <div className={`h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)] ring-1 ring-white/20 transition-all duration-300 group-hover/day:scale-125`} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
