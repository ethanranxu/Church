'use client';

import { useState, useEffect, useMemo } from 'react';
import { VisitReservation, getVisitReservations, updateVisitReservation, deleteVisitReservation } from '@/app/actions/visit';
import { format, subYears, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Search, Filter, Download, ChevronRight, ChevronLeft, Calendar, ArrowUpRight, MoreHorizontal, Edit2, Trash2, Eye, X, Save, AlertCircle } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { useRouter } from 'next/navigation';

type SortKey = 'visitDate' | 'createdAt' | 'visitorName' | 'status';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
    key: SortKey;
    direction: SortDirection;
}

export default function VisitsClient({ initialReservations }: { initialReservations?: VisitReservation[] }) {
    const { t } = useTranslation();
    const [reservations, setReservations] = useState<VisitReservation[]>(initialReservations || []);
    const [loading, setLoading] = useState(false);

    // Date Range State
    const [startDate, setStartDate] = useState(format(subYears(new Date(), 1), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    // Pagination, Search, Sort State
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'visitDate', direction: 'desc' });
    const itemsPerPage = 10;

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReservation, setEditingReservation] = useState<VisitReservation | null>(null);

    const router = useRouter();

    const loadReservations = async () => {
        setLoading(true);
        const data = await getVisitReservations();
        setReservations(data);
        setLoading(false);
    };

    useEffect(() => {
        // Initial load if initialReservations is empty or not provided
        if (!initialReservations || initialReservations.length === 0) {
            loadReservations();
        }
    }, [initialReservations]);

    // Filter, Sort, Paginate Logic
    const processedReservations = useMemo(() => {
        let result = [...reservations];

        // 1. Filter by Date Range
        if (startDate && endDate) {
            const start = startOfDay(parseISO(startDate));
            const end = endOfDay(parseISO(endDate));

            result = result.filter(r => {
                if (!r.visitDate) return false;
                const date = parseISO(r.visitDate);
                // Simple comparison for YYYY-MM-DD strings works, but using date objects is robust
                return date >= start && date <= end;
            });
        }

        // 2. Filter by Search Term
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(r =>
                r.visitors.join(' ').toLowerCase().includes(lowerTerm) ||
                (r.introducer && r.introducer.toLowerCase().includes(lowerTerm))
            );
        }

        // 3. Sort
        result.sort((a, b) => {
            let aValue: any = '';
            let bValue: any = '';

            if (sortConfig.key === 'visitorName') {
                aValue = a.visitors?.[0] || '';
                bValue = b.visitors?.[0] || '';
            } else {
                // @ts-ignore
                aValue = a[sortConfig.key];
                // @ts-ignore
                bValue = b[sortConfig.key];
            }

            if (!aValue && !bValue) return 0;
            if (!aValue) return 1;
            if (!bValue) return -1;

            const comparison = String(aValue).localeCompare(String(bValue));
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [reservations, searchTerm, sortConfig, startDate, endDate]);

    // Statistics
    const totalVisitors = useMemo(() => {
        return processedReservations.reduce((sum, r) => sum + (r.visitors?.length || 0), 0);
    }, [processedReservations]);

    const totalPages = Math.ceil(processedReservations.length / itemsPerPage);
    const paginatedReservations = processedReservations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key: SortKey) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t.admin.visits.confirmDelete)) return;

        try {
            await deleteVisitReservation(id);
            setReservations(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
            alert(t.admin.visits.deleteFailed);
        }
    };

    const openEditModal = (reservation: VisitReservation) => {
        setEditingReservation({ ...reservation }); // Create a copy to edit
        setIsEditModalOpen(true);
    };

    const handleUpdateStatus = async () => {
        if (!editingReservation) return;
        if (!editingReservation.visitors || editingReservation.visitors.length === 0 || !editingReservation.visitDate) {
            alert(t.admin.visits.missingInfo);
            return;
        }

        try {
            // Optimistic update
            setReservations(prev => prev.map(r =>
                r.id === editingReservation.id ? editingReservation : r
            ));

            await updateVisitReservation(editingReservation.id, editingReservation);
            setIsEditModalOpen(false);
            setEditingReservation(null);
        } catch (error) {
            console.error("Update failed", error);
            alert(t.admin.visits.updateFailed);
            // Revert on failure (reload from server would be better)
            loadReservations();
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const config = {
            pending: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", label: t.admin.visits.statuses.pending },
            confirmed: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", label: t.admin.visits.statuses.confirmed },
            completed: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", label: t.admin.visits.statuses.completed },
            cancelled: { color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400", label: t.admin.visits.statuses.cancelled },
        };
        const statusConfig = config[status as keyof typeof config] || config.pending;

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                {statusConfig.label}
            </span>
        );
    };

    const SortIcon = ({ active }: { active: boolean }) => {
        if (!active) return <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-30 transition-opacity ml-1" />;
        return sortConfig.direction === 'asc' ?
            <ArrowUpRight className="h-4 w-4 ml-1 rotate-0 transition-transform" /> :
            <ArrowUpRight className="h-4 w-4 ml-1 rotate-180 transition-transform" />;
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t.admin.visits.title}</h1>
                <button
                    onClick={loadReservations}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                    {t.admin.visits.refresh}
                </button>
            </div>

            {/* Filter and Stats Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.admin.visits.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    {/* Date Range Picker */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{t.admin.visits.totalVisitors} <strong className="text-gray-900 dark:text-white">{totalVisitors}</strong> {t.admin.visits.unit}</span>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th onClick={() => handleSort('visitDate')} className="px-6 py-4 cursor-pointer hover:text-primary group transition-colors text-center">
                                    <div className="flex items-center justify-center">{t.admin.visits.date} <SortIcon active={sortConfig.key === 'visitDate'} /></div>
                                </th>
                                <th onClick={() => handleSort('visitorName')} className="px-6 py-4 cursor-pointer hover:text-primary group transition-colors text-center">
                                    <div className="flex items-center justify-center">{t.admin.visits.visitors} <SortIcon active={sortConfig.key === 'visitorName'} /></div>
                                </th>
                                <th className="px-6 py-4 text-center">{t.admin.visits.introducer}</th>
                                <th onClick={() => handleSort('status')} className="px-6 py-4 cursor-pointer hover:text-primary group transition-colors text-center">
                                    <div className="flex items-center justify-center">{t.admin.visits.status} <SortIcon active={sortConfig.key === 'status'} /></div>
                                </th>
                                <th onClick={() => handleSort('createdAt')} className="px-6 py-4 cursor-pointer hover:text-primary group transition-colors hidden md:table-cell text-center">
                                    <div className="flex items-center justify-center">{t.admin.visits.submitTime} <SortIcon active={sortConfig.key === 'createdAt'} /></div>
                                </th>
                                <th className="px-6 py-4 text-center">{t.admin.visits.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle className="h-8 w-8 text-gray-300" />
                                            {searchTerm ? t.admin.visits.noMatch : t.admin.visits.noRecords}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedReservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {reservation.visitDate ? new Date(reservation.visitDate).toLocaleDateString() : 'Pending'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{reservation.visitors.join(", ")}</div>
                                            <div className="text-xs text-gray-500">
                                                {reservation.visitors.length} {t.admin.visits.unit}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                                            {reservation.introducer || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={reservation.status} />
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 hidden md:table-cell text-center">
                                            {new Date(reservation.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(reservation)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(reservation.id)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            {t.admin.visits.showing} <span className="font-medium text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> {t.admin.visits.to} <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, processedReservations.length)}</span> {t.admin.visits.total} <span className="font-medium text-gray-900 dark:text-white">{processedReservations.length}</span> {t.admin.visits.entries}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium px-2">
                                {t.admin.visits.page} {currentPage} {t.admin.visits.ofPages} {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingReservation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{t.admin.visits.edit}</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.admin.visits.name}</label>
                                    <input
                                        type="text"
                                        value={editingReservation.visitors.join(", ")}
                                        onChange={e => setEditingReservation({ ...editingReservation, visitors: e.target.value.split(",").map(s => s.trim()) })}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.admin.visits.date}</label>
                                    <input
                                        type="date"
                                        value={editingReservation.visitDate}
                                        onChange={e => setEditingReservation({ ...editingReservation, visitDate: e.target.value })}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.admin.visits.introducer}</label>
                                    <input
                                        type="text"
                                        value={editingReservation.introducer || ''}
                                        placeholder={t.admin.visits.none}
                                        onChange={e => setEditingReservation({ ...editingReservation, introducer: e.target.value })}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.admin.visits.status}</label>
                                    <select
                                        value={editingReservation.status}
                                        onChange={(e) => setEditingReservation({ ...editingReservation, status: e.target.value as any })}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option value="pending">{t.admin.visits.statuses.pending}</option>
                                        <option value="confirmed">{t.admin.visits.statuses.confirmed}</option>
                                        <option value="completed">{t.admin.visits.statuses.completed}</option>
                                        <option value="cancelled">{t.admin.visits.statuses.cancelled}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                                >
                                    {t.admin.visits.cancel}
                                </button>
                                <button
                                    onClick={handleUpdateStatus}
                                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {t.admin.visits.save}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
