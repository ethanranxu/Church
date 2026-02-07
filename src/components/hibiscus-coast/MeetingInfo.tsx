"use client";

import React from "react";
import { MapPin, Clock, Phone, User } from "lucide-react";

type ContactPerson = {
    name: string;
    phone: string;
    role?: string;
};

const contacts: ContactPerson[] = [
    { name: "龔偉鴻牧師", phone: "022 476 9930", role: "牧師" },
    { name: "Lydia 王傳道", phone: "029 123 6898", role: "駐堂傳道" },
    { name: "Lina 易傳道", phone: "021 058 1944", role: "傳道" },
];

export const MeetingInfo = () => {
    return (
        <section className="w-full py-12 bg-[#f6f7f8]">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                <div className="flex flex-col gap-4 mb-8 text-center">
                    <h2 className="text-[#111418] text-4xl font-black leading-tight">
                        聚會資訊
                    </h2>
                    <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Location Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">聚會地點</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Kingsway Senior Campus
                                    <br />
                                    <span className="text-slate-500">100 Jelas Road, Red Beach</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Time Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-7 h-7 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">聚會時間</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    每週日上午
                                    <br />
                                    <span className="text-2xl font-bold text-emerald-600">10:00 AM</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6 md:p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-6 h-6 text-emerald-200" />
                        <h3 className="text-xl font-bold">聯絡我們</h3>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {contacts.map((contact) => (
                            <div
                                key={contact.phone}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors duration-300"
                            >
                                {contact.role && (
                                    <span className="inline-block text-xs font-medium text-emerald-200 bg-emerald-500/30 px-2 py-1 rounded-full mb-2">
                                        {contact.role}
                                    </span>
                                )}
                                <p className="font-semibold text-lg mb-1">{contact.name}</p>
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    {contact.phone}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
