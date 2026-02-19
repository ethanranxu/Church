'use client';

import { useTranslation } from "@/i18n/LanguageContext";

export const Testimonials = () => {
    const { t } = useTranslation();

    const testimonials = [
        {
            name: t.welcome.testimonials.wang.name,
            role: t.welcome.testimonials.wang.duration,
            image: "/images/assets/testimonial-avatar-1.jpg",
            quote: t.welcome.testimonials.wang.quote,
        },
        {
            name: t.welcome.testimonials.lin.name,
            role: t.welcome.testimonials.lin.duration,
            image: "/images/assets/testimonial-avatar-3.jpg",
            quote: t.welcome.testimonials.lin.quote,
        },
        {
            name: t.welcome.testimonials.chen.name,
            role: t.welcome.testimonials.chen.duration,
            image: "/images/assets/testimonial-avatar-2.jpg",
            quote: t.welcome.testimonials.chen.quote,
        },
    ];

    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#101922]">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t.welcome.testimonials.title}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div
                            key={item.name}
                            className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl relative"
                        >
                            <span className="material-symbols-outlined text-4xl text-gray-200 dark:text-gray-700 absolute top-4 right-4">
                                format_quote
                            </span>
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-gray-300 overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url("${item.image}")`,
                                        }}
                                    ></div>
                                </div>
                                <div>
                                    <p className="font-bold text-[#111418] dark:text-white">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-[#617589] dark:text-gray-500">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#617589] dark:text-gray-300 italic">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
