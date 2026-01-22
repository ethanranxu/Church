import React from 'react';

const recentTopics = [
    { date: '10月 23日', title: '信心的跳躍' },
    { date: '10月 22日', title: '愛人如己的真諦' },
    { date: '10月 21日', title: '如何面對焦慮' },
    { date: '10月 20日', title: '安息日的主' },
    { date: '10月 19日', title: '曠野中的呼聲' }
];

export default function RecentTopics() {
    return (
        <div className="bg-white dark:bg-[#101922] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">近期主題</h4>
            <div className="flex flex-col gap-0 pr-2">
                {recentTopics.map((topic, index) => (
                    <a
                        key={index}
                        className={`group flex flex-col gap-1 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-2 transition-colors ${index < recentTopics.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''
                            }`}
                        href="#"
                    >
                        <span className="text-xs text-gray-400">{topic.date}</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                            {topic.title}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
