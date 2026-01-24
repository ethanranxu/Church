'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

type ChurchInfo = {
    name: string;
    logo: string;
    photo: string;
    establishedDate: string;
    location: string;
    meetingTime: string;
    contacts: { name: string; phone: string }[];
};

const churches: ChurchInfo[] = [
    {
        name: '木槿灣基督教會',
        logo: '/images/hibiscus-coast-church-logo.png',
        photo: '/images/hibiscus-coast-church.jpg',
        establishedDate: '2016年3月6日',
        location: 'Kingsway Senior Campus, 100 Jelas Road, Red Beach',
        meetingTime: '每週日早上 9:30AM',
        contacts: [
            { name: '龔偉鴻牧師', phone: '022 476 9930' }
        ]
    },
    {
        name: '長灣基督教會',
        logo: '/images/long-bay-church-logo.png',
        photo: '/images/long-bay-church.jpg',
        establishedDate: '2019年6月2日',
        location: '168 Deep Creek Road, Torbay (St Mary By The Sea)',
        meetingTime: '每週日下午 2:30PM',
        contacts: [
            { name: '龔偉鴻牧師', phone: '022 476 9930' },
            { name: '倪耿忠傳道', phone: '027 558 4493' }
        ]
    }
];

const ChurchCard = ({ church }: { church: ChurchInfo }) => (
    <div className="bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        {/* Church Photo */}
        <div className="relative h-80 w-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20">
            <Image
                src={church.photo}
                alt={`${church.name} 教會照片`}
                fill
                className="object-cover"
            />
        </div>

        <div className="p-6">
            {/* Header with Logo, Name, Established Date, Meeting Time and Contact */}
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-300">
                        {church.name}
                    </h3>
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">成立日期</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{church.establishedDate}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">聚會時間</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{church.meetingTime}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">聯絡方式</span>
                            <div className="space-y-1">
                                {church.contacts.map((contact, idx) => (
                                    <div key={idx} className="text-gray-700 dark:text-gray-300 text-sm">
                                        {contact.name}
                                        <a
                                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                                            className="ml-2 text-[#1E3A8A] dark:text-blue-400 hover:underline"
                                        >
                                            {contact.phone}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-40 h-40 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image
                        src={church.logo}
                        alt={`${church.name} Logo`}
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Church Location */}
            <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">聚會地點</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{church.location}</span>
                </div>
            </div>
        </div>
    </div>
);

export default function ChurchPlanting() {
    return (
        <div className="w-full pb-20 px-4 md:px-8 bg-[#F9FAFB] dark:bg-[#101922]">
            <div className="max-w-[1140px] w-full mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white mb-4">
                        植堂教會
                    </h2>
                    <div className="w-12 h-1 bg-[#FBBF24] mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        我們致力於擴展神的國度，在不同社區建立榮耀神的教會
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {churches.map((church, index) => (
                        <ChurchCard key={index} church={church} />
                    ))}
                </div>
            </div>
        </div>
    );
}
