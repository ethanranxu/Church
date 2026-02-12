'use client';

import React, { useState } from 'react';
import { createVisitReservation } from '@/app/actions/visit';
import { X, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface VisitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VisitModal({ isOpen, onClose }: VisitModalProps) {
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');

    const [visitors, setVisitors] = useState<string[]>(['']);
    const [introducer, setIntroducer] = useState('');
    const [visitDate, setVisitDate] = useState(formattedToday);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddVisitor = () => {
        setVisitors([...visitors, '']);
    };

    const handleRemoveVisitor = (index: number) => {
        if (visitors.length > 1) {
            const newVisitors = [...visitors];
            newVisitors.splice(index, 1);
            setVisitors(newVisitors);
        }
    };

    const handleVisitorChange = (index: number, value: string) => {
        const newVisitors = [...visitors];
        newVisitors[index] = value;
        setVisitors(newVisitors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const validVisitors = visitors.filter(v => v.trim() !== '');
        if (validVisitors.length === 0) {
            setError('請至少填寫一位參訪人姓名');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const result = await createVisitReservation({
                visitors: validVisitors,
                introducer: introducer || undefined,
                visitDate: visitDate || formattedToday,
            });

            if (result.success) {
                setIsSuccess(true);
                // Reset form after success message displayed or explicitly?
                // We keep modal open to show success message
            } else {
                setError('預約失敗，請稍後再試');
            }
        } catch (err) {
            console.error(err);
            setError('發生錯誤，請稍後再試');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">預約成功！</h3>
                    <p className="text-gray-600 mb-6">感谢您的预约，我們會安排專人接待您！</p>
                    <button
                        onClick={() => {
                            setIsSuccess(false);
                            setVisitors(['']);
                            setIntroducer('');
                            setVisitDate(formattedToday);
                            onClose();
                        }}
                        className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full"
                    >
                        關閉
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-900">預約參訪</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed text-left">
                        我们始终欢迎您的到来！为了能够为您提供更好的服务，建议您提前预约，以便我们做好充分准备。当然，如果您时间方便，我们也非常欢迎您在主日崇拜的時間直接前来！
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                                {error}
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700 text-left">
                                    參訪人姓名 <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddVisitor}
                                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium"
                                >
                                    <Plus size={16} />
                                    新增參訪人
                                </button>
                            </div>

                            <div className="space-y-3">
                                {visitors.map((visitor, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={visitor}
                                            onChange={(e) => handleVisitorChange(index, e.target.value)}
                                            placeholder={`參訪人 ${index + 1}`}
                                            className="flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                            required
                                        />
                                        {visitors.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveVisitor(index)}
                                                className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="移除此參訪人"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                介紹人 (選填)
                            </label>
                            <input
                                type="text"
                                value={introducer}
                                onChange={(e) => setIntroducer(e.target.value)}
                                placeholder="如有介紹人请填写"
                                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                參訪日期
                            </label>
                            <input
                                type="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all block"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        提交中...
                                    </>
                                ) : (
                                    '提交預約'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
