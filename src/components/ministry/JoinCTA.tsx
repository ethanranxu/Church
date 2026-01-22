import React from 'react';

export default function JoinCTA() {
    return (
        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/10 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white mb-4">
                加入我們的大家庭
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                無論您是剛來到奧克蘭，還是正在尋找屬靈的家，我們都誠摯地歡迎您。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer">
                    參加聚會
                </button>
                <button className="bg-white dark:bg-[#1a2632] hover:bg-gray-50 dark:hover:bg-[#23303e] text-[#111418] dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-3 rounded-lg font-bold transition-all cursor-pointer">
                    聯絡我們
                </button>
            </div>
        </div>
    );
}
