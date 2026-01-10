import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const Connect = () => {
    return (
        <section className="py-20 bg-primary text-white">
            <Container className="text-center">
                <h2 className="text-3xl font-bold mb-6">保持連結</h2>
                <p className="text-primary-100 mb-10 max-w-xl mx-auto opacity-90">
                    追蹤我們的社群媒體，獲取最新活動消息、講道影片與教會生活點滴。
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-12">
                    <a
                        href="#"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="Facebook"
                    >
                        <span className="font-bold text-2xl group-hover:scale-110 transition-transform">fb</span>
                    </a>
                    <a
                        href="https://www.youtube.com/@efcecb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="YouTube"
                    >
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                            smart_display
                        </span>
                    </a>
                    <a
                        href="#"
                        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20 group"
                        title="Instagram"
                    >
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                            photo_camera
                        </span>
                    </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                        variant="ghost"
                        className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        聯絡我們
                    </Button>
                    <Button
                        variant="ghost"
                        className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                    >
                        訂閱電子報
                    </Button>
                </div>
            </Container>
        </section>
    );
};
