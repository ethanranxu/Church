'use client';

import { useState, useEffect } from 'react';
import { VisitReservation, getVisitReservations, updateVisitReservation, deleteVisitReservation } from '@/app/actions/visit';
import { format } from 'date-fns';
import { Loader2, Trash2, Edit, Check, X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VisitsClient() {
    const [reservations, setReservations] = useState<VisitReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<VisitReservation>>({});
    const router = useRouter();

    const loadReservations = async () => {
        setLoading(true);
        const data = await getVisitReservations();
        setReservations(data);
        setLoading(false);
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('确定要删除这条预约记录吗？')) return;

        const result = await deleteVisitReservation(id);
        if (result.success) {
            setReservations(reservations.filter(r => r.id !== id));
        } else {
            alert('删除失败');
        }
    };

    const startEdit = (reservation: VisitReservation) => {
        setEditingId(reservation.id);
        setEditForm({
            visitors: [...reservation.visitors],
            introducer: reservation.introducer || '',
            visitDate: reservation.visitDate,
            status: reservation.status
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = async (id: string) => {
        if (!editForm.visitDate || !editForm.visitors || editForm.visitors.length === 0) {
            alert('请填写必要信息');
            return;
        }

        const result = await updateVisitReservation(id, editForm);
        if (result.success) {
            setReservations(reservations.map(r => r.id === id ? { ...r, ...editForm } : r));
            setEditingId(null);
        } else {
            alert('更新失败');
        }
    };

    const handleVisitorChange = (index: number, value: string) => {
        if (!editForm.visitors) return;
        const newVisitors = [...editForm.visitors];
        newVisitors[index] = value;
        setEditForm({ ...editForm, visitors: newVisitors });
    };

    const addVisitorField = () => {
        if (!editForm.visitors) return;
        setEditForm({ ...editForm, visitors: [...editForm.visitors, ''] });
    };

    const removeVisitorField = (index: number) => {
        if (!editForm.visitors || editForm.visitors.length <= 1) return;
        const newVisitors = [...editForm.visitors];
        newVisitors.splice(index, 1);
        setEditForm({ ...editForm, visitors: newVisitors });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">預約參訪管理</h1>
                <button
                    onClick={loadReservations}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                    刷新列表
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">參訪日期</th>
                                <th className="px-6 py-4">參訪人</th>
                                <th className="px-6 py-4">介紹人</th>
                                <th className="px-6 py-4">狀態</th>
                                <th className="px-6 py-4">提交時間</th>
                                <th className="px-6 py-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {reservations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        暫無預約記錄
                                    </td>
                                </tr>
                            ) : (
                                reservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        {editingId === reservation.id ? (
                                            // Edit Mode
                                            <>
                                                <td className="px-6 py-4 align-top">
                                                    <input
                                                        type="date"
                                                        value={editForm.visitDate}
                                                        onChange={(e) => setEditForm({ ...editForm, visitDate: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded text-gray-900"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 align-top">
                                                    <div className="space-y-2">
                                                        {editForm.visitors?.map((v, idx) => (
                                                            <div key={idx} className="flex gap-1">
                                                                <input
                                                                    type="text"
                                                                    value={v}
                                                                    onChange={(e) => handleVisitorChange(idx, e.target.value)}
                                                                    className="w-full px-2 py-1 border rounded text-gray-900"
                                                                    placeholder="姓名"
                                                                />
                                                                {editForm.visitors && editForm.visitors.length > 1 && (
                                                                    <button onClick={() => removeVisitorField(idx)} className="text-red-500 hover:text-red-700">
                                                                        <X size={16} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button onClick={addVisitorField} className="text-xs text-primary flex items-center gap-1">
                                                            <Plus size={14} /> 添加
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 align-top">
                                                    <input
                                                        type="text"
                                                        value={editForm.introducer}
                                                        onChange={(e) => setEditForm({ ...editForm, introducer: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded text-gray-900"
                                                        placeholder="無"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 align-top">
                                                    <select
                                                        value={editForm.status}
                                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                                                        className="w-full px-2 py-1 border rounded text-gray-900"
                                                    >
                                                        <option value="pending">待處理</option>
                                                        <option value="confirmed">已確認</option>
                                                        <option value="completed">已接待</option>
                                                        <option value="cancelled">已取消</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-xs">
                                                    {reservation.createdAt ? format(new Date(reservation.createdAt), 'yyyy-MM-dd HH:mm') : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2 align-top">
                                                    <button
                                                        onClick={() => saveEdit(reservation.id)}
                                                        className="text-green-600 hover:text-green-800 p-1"
                                                        title="保存"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="text-gray-400 hover:text-gray-600 p-1"
                                                        title="取消"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            // View Mode
                                            <>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                                    {reservation.visitDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {reservation.visitors.map((v, i) => (
                                                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs border border-blue-100">
                                                                {v}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">
                                                    {reservation.introducer || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${reservation.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            reservation.status === 'completed' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                                                reservation.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                        }`}>
                                                        {reservation.status === 'confirmed' ? '已確認' :
                                                            reservation.status === 'completed' ? '已接待' :
                                                                reservation.status === 'cancelled' ? '已取消' : '待處理'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-xs">
                                                    {reservation.createdAt ? format(new Date(reservation.createdAt), 'yyyy-MM-dd HH:mm') : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => startEdit(reservation)}
                                                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                                                        title="編輯"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(reservation.id)}
                                                        className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                                                        title="刪除"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
