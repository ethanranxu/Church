"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

const GALLERY_IMAGES = [
    "/images/hibiscus-coast/e10ba5_379616b3a6a14adcacbc3c3b87e60992~mv2.jpg",
    "/images/hibiscus-coast/e10ba5_912266e0666e4be8bf1681725be178b0~mv2.jpg",
    "/images/hibiscus-coast/e10ba5_0df79e1b84884d14a9a07a45ca65ac1d~mv2.jpg",
    "/images/hibiscus-coast/e10ba5_eb281e860b3348a9a0ab7deca7c36fa9~mv2.jpg",
    "/images/hibiscus-coast/e10ba5_65126c88d3414368a8ead7717630112c~mv2.jpg",
];

export const PhotoGallery = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-white dark:bg-background-dark py-16 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="w-full max-w-[1024px] mx-auto px-4 md:px-10">
                <div className="flex flex-col items-center mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">{t.hibiscusCoast.gallery.title}</h2>
                    <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
                        {t.hibiscusCoast.gallery.description}
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Top Row - Single Featured Image */}
                    <div className="w-full relative h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group">
                        <Image
                            src={GALLERY_IMAGES[0]}
                            alt="Featured Gallery Photo"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    </div>

                    {/* Bottom Row - 4 Images */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[300px] md:h-[250px]">
                        {GALLERY_IMAGES.slice(1).map((src, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group"
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery Photo ${index + 2}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
