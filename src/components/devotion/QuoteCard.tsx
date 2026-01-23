import React from 'react';

export default function QuoteCard() {
    return (
        <div className="bg-gradient-to-br from-primary/80 to-blue-600/80 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white/100">神的話語</span>
            </div>
            <p className="font-serif-content text-lg italic leading-relaxed mb-4">
                你們得救在乎歸回安息，你們得力在乎平靜安穩。
            </p>
            <p className="text-sm font-bold text-white/80 text-right">— 以賽亞書 30:15</p>
        </div>
    );
}
