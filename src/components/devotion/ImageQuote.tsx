import { useTranslation } from "@/i18n/LanguageContext";
import Image from 'next/image';

export default function ImageQuote() {
    const { t } = useTranslation();

    return (
        <div className="relative overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 aspect-[4/3] group">
            <Image
                alt="The Word of God"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/assets/devotion-hero.jpg"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
                <p className="text-white font-serif-content italic text-xl leading-snug text-center">
                    {t.devotion.sider.imageQuote}
                </p>
            </div>
        </div>
    );
}
