'use client';

import React, { useState, useEffect } from "react";
import { getPrayers, updatePrayerStatus, deletePrayer } from "@/app/actions/prayer";
import { useAuth } from "@/components/auth/AuthProvider";
import { PrayerRecord, PrayerStatus } from "@/types/prayer";
import {
    CheckCircle2,
    Clock,
    Archive,
    Trash2,
    User,
    Phone,
    Tag,
    Lock,
    Unlock,
    MoreVertical,
    Search,
    Filter,
    HeartHandshake,
    RotateCcw
} from "lucide-react";
import clsx from "clsx";

const CATEGORY_LABELS: Record<string, string> = {
    health: "健康與疾病",
    family: "家庭與婚姻",
    work: "工作與事業",
    spiritual: "靈命成長",
    other: "其他"
};

const STATUS_CONFIG = {
    pending: { label: "待處理", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
    prayed: { label: "已代禱", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
    archived: { label: "已存檔", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400", icon: Archive },
};

export default function PrayerManagementPage() {
    const { profile } = useAuth();
    const [prayers, setPrayers] = useState<PrayerRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("pending");

    useEffect(() => {
        loadPrayers();
    }, []);

    async function loadPrayers() {
        setLoading(true);
        const data = await getPrayers();
        setPrayers(data as PrayerRecord[]);
        setLoading(false);
    }

    async function handleStatusChange(id: string, newStatus: PrayerStatus) {
        if (!profile) return;
        const result = await updatePrayerStatus(id, newStatus, {
            name: profile.name,
            email: profile.email
        });
        if (result.success) {
            setPrayers(prayers.map(p => p.id === id ? { ...p, status: newStatus } : p));
        }
    }

    async function handleDelete(id: string) {
        if (!profile || !confirm("確定要刪除此代禱需求嗎？此操作不可恢復。")) return;
        const result = await deletePrayer(id, {
            name: profile.name,
            email: profile.email
        });
        if (result.success) {
            setPrayers(prayers.filter(p => p.id !== id));
        }
    }

    const filteredPrayers = prayers.filter(p => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            (p.name || "").toLowerCase().includes(search) ||
            (p.content || "").toLowerCase().includes(search) ||
            (p.contact || "").toLowerCase().includes(search);

        const matchesStatus = statusFilter === "all" || p.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">代禱需求管理</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">查看並管理弟兄姊妹提交的代禱請求</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索姓名、內容..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e293b] text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setStatusFilter("all")}
                    className={clsx(
                        "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                        statusFilter === "all"
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                    )}
                >
                    全部 ({prayers.length})
                </button>
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setStatusFilter(key)}
                        className={clsx(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2",
                            statusFilter === key
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                        )}
                    >
                        <config.icon className="h-4 w-4" />
                        {config.label} ({prayers.filter(p => p.status === key).length})
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            ) : filteredPrayers.length === 0 ? (
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800">
                    <HeartHandshake className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">暫無匹配的代禱需求</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredPrayers.map((prayer) => {
                        const status = STATUS_CONFIG[prayer.status];
                        return (
                            <div
                                key={prayer.id}
                                className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                                        {prayer.name || "匿名信徒"}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        提交於 {prayer.createdAt ? new Date(prayer.createdAt).toLocaleString() : "未知時間"}
                                                    </p>
                                                </div>
                                                <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5", status.color)}>
                                                    <status.icon className="h-3.5 w-3.5" />
                                                    {status.label}
                                                </span>
                                                {prayer.isPrivate && (
                                                    <span className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                                                        <Lock className="h-3.5 w-3.5" />
                                                        保密
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {prayer.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusChange(prayer.id!, 'prayed')}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="標記為已代禱"
                                                    >
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </button>
                                                )}
                                                {prayer.status !== 'archived' && (
                                                    <button
                                                        onClick={() => handleStatusChange(prayer.id!, 'archived')}
                                                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                                                        title="歸檔"
                                                    >
                                                        <Archive className="h-5 w-5" />
                                                    </button>
                                                )}
                                                {prayer.status === 'archived' && (
                                                    <button
                                                        onClick={() => handleStatusChange(prayer.id!, 'pending')}
                                                        className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="恢復到待處理"
                                                    >
                                                        <RotateCcw className="h-5 w-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(prayer.id!)}
                                                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="刪除"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-[#0f172a]/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                                {prayer.content}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Tag className="h-4 w-4 text-primary/60" />
                                                <span>類別: {CATEGORY_LABELS[prayer.category] || prayer.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-primary/60" />
                                                <span>聯絡: {prayer.contact || "未提供"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
