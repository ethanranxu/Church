'use client';

import React, { useState } from 'react';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    // Get first day of the month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Get today's date for highlighting
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // Build calendar days array
    const calendarDays: Array<{ day: number; isCurrentMonth: boolean; isToday: boolean }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        calendarDays.push({
            day: daysInPrevMonth - i,
            isCurrentMonth: false,
            isToday: false
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            isCurrentMonth: true,
            isToday: isCurrentMonth && i === todayDate
        });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push({
            day: i,
            isCurrentMonth: false,
            isToday: false
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
                <h4 className="font-serif-content font-bold text-xl text-gray-900 dark:text-white tracking-wide">靈修曆</h4>
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

                {calendarDays.map((dayInfo, index) => (
                    <div
                        key={index}
                        className={`h-9 w-9 mx-auto flex items-center justify-center text-sm rounded-full transition-colors ${dayInfo.isToday
                                ? 'font-bold bg-primary text-white shadow-md shadow-primary/30'
                                : dayInfo.isCurrentMonth
                                    ? 'font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                                    : 'font-medium text-gray-300 dark:text-gray-600'
                            }`}
                    >
                        {dayInfo.day}
                    </div>
                ))}
            </div>
        </div>
    );
}
