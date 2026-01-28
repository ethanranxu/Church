'use client';
import React from 'react';
import { Devotion } from '@/app/actions/devotions';

interface RecentTopicsProps {
    devotions: Devotion[];
    onSelectDevotion: (devotion: Devotion) => void;
}

export default function RecentTopics({ devotions, onSelectDevotion }: RecentTopicsProps) {
    const truncateTitle = (title: string, maxLen: number) => {
        if (title.length <= maxLen) return title;
        return title.substring(0, maxLen) + '...';
    };

    return (
        <div className="bg-white dark:bg-[#101922] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">熱門主題</h4>
            <div className="flex flex-col gap-0 pr-2">
                {devotions.map((topic, index) => (
                    <button
                        key={topic.id || index}
                        className={`group flex flex-col gap-1 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-2 transition-colors w-full ${index < devotions.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            onSelectDevotion(topic);
                        }}
                    >
                        <span className="text-xs text-gray-400">{topic.publishDate}</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                            {truncateTitle(topic.title, 18)}
                        </span>
                    </button>
                ))}
                {devotions.length === 0 && (
                    <div className="text-sm text-gray-500 py-4 text-center">暫无數據</div>
                )}
            </div>
        </div>
    );
}
