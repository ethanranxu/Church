"use client";

import { Users, BookOpen, Eye, Globe } from 'lucide-react';
import { VisitTrendsModal } from './VisitTrendsModal';
import { useState } from 'react';

interface DashboardStatsProps {
    userCount: number;
    devotionCount: number;
    visitCount: number;
    uniqueVisitors: number;
}

export function DashboardStats({ userCount, devotionCount, visitCount, uniqueVisitors }: DashboardStatsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'user' | 'page'>('user');

    const openModal = (type: 'user' | 'page') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">总用户数</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">{userCount}</h3>
                            <p className="text-sm text-gray-500 mt-1">注册会员</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <BookOpen className="text-purple-600" size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">灵修文章</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">{devotionCount}</h3>
                            <p className="text-sm text-gray-500 mt-1">已发布</p>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
                    onClick={() => openModal('user')}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Users className="text-green-600" size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-white transition-colors">用户访问</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">{uniqueVisitors}</h3>
                            <p className="text-sm text-gray-500 mt-1">今日访客 (IP)</p>
                        </div>
                        <div className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View Trends &rarr;
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-orange-300 transition-all group"
                    onClick={() => openModal('page')}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-50 p-3 rounded-lg group-hover:bg-orange-100 transition-colors">
                            <Eye className="text-orange-600" size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-white transition-colors">页面访问</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">{visitCount}</h3>
                            <p className="text-sm text-gray-500 mt-1">今日浏览量</p>
                        </div>
                        <div className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View Trends &rarr;
                        </div>
                    </div>
                </div>
            </div>

            <VisitTrendsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialType={modalType}
            />
        </>
    );
}
