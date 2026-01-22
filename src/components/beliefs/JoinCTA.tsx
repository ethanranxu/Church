import React from 'react';

import { HeartHandshake } from 'lucide-react';

export default function JoinCTA() {
    return (
        <div className="w-full pb-20 px-4 md:px-8 bg-[#F9FAFB] dark:bg-[#101922]">
            <div className="max-w-[1140px] w-full mx-auto">
                <div className="bg-gradient-to-br from-[#1E3A8A] to-[#152a6d] rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoI1SNoBlJjk0b_5noH4MjhIsQDzlii0vnLPKJev39u2SuY81eG3_A4TiKu8N7KQd4Q9tC31rFf4PQQndbwzmvAw7F10dZUufqMSO5QDGFVbBwDKU6aA1An4U7J2sgiIVzEMAHoWjqQtINOaVbpeFkzve96R3qlscfF2XPc-Wc6dSjkV5aYyxK2tLSEanlxn33wdJzv2VYzP3bfcxIjGI6HoHmEV8aJxHpOt_JRZ-XOGt71Ua0_qr7CdMzt3wsaPTZQE5dXoSfW-o")' }}></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <HeartHandshake className="text-[#FBBF24] mb-6 w-12 h-12" />
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">加入我們的信仰大家庭</h3>
                        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                            無論您是初次接觸基督教，還是正在尋找屬靈的家，我們都誠摯地邀請您來到長堤基督教會。讓我們一同在真理中成長，在愛中彼此建立。
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="flex cursor-pointer items-center justify-center rounded-full h-14 px-10 bg-[#FBBF24] hover:bg-yellow-400 transition-all text-[#1E3A8A] text-lg font-bold shadow-lg transform hover:scale-105">
                                聯絡我們
                            </button>
                            <button className="flex cursor-pointer items-center justify-center rounded-full h-14 px-10 bg-white/10 hover:bg-white/20 border border-white/30 transition-all text-white text-lg font-bold backdrop-blur-sm">
                                參加主日
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
