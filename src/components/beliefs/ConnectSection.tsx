import React from 'react';
import { Facebook, Youtube, Instagram, Mail } from 'lucide-react';

export default function ConnectSection() {
    return (
        <div className="bg-[#1E88E5] py-12 px-4 md:px-10">
            <div className="max-w-[1280px] w-full mx-auto flex flex-col items-center">
                <h3 className="text-white text-3xl font-bold mb-4 tracking-wide">保持連結</h3>
                <p className="text-blue-100 text-sm mb-8 text-center">追蹤我們的社群媒體，獲取最新活動消息、講道影片與教會生活點滴。</p>

                <div className="flex gap-6">
                    <a className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm" href="#">
                        <Facebook className="w-6 h-6 fill-current" />
                    </a>
                    <a className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm" href="#">
                        <Youtube className="w-6 h-6 fill-current" />
                    </a>
                    <a className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm" href="#">
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>

                <div className="mt-8 flex gap-4 text-sm">
                    <button className="bg-white text-[#1E88E5] font-bold py-2 px-6 rounded shadow hover:bg-gray-100 transition-colors">
                        聯絡我們
                    </button>
                    <button className="border border-white text-white font-bold py-2 px-6 rounded hover:bg-white/10 transition-colors">
                        訂閱電子報
                    </button>
                </div>
            </div>
        </div>
    );
}
