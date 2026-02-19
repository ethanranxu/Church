"use client";

import React, { useMemo } from "react";
import { MapPin, Clock, Phone, User, Facebook, Youtube } from "lucide-react";
import { useTranslation } from "@/i18n";

type ContactPerson = {
    name: string;
    phone: string;
    role?: string;
};

export const LongBayMeetingInfo = () => {
    const { t } = useTranslation();

    const contacts: ContactPerson[] = useMemo(() => [
        { name: t.longBay.meeting.contact1Name, phone: "022 476 9930", role: t.longBay.meeting.contact1Role },
        { name: t.longBay.meeting.contact2Name, phone: "027 538 4493", role: t.longBay.meeting.contact2Role },
    ], [t]);

    return (
        <section className="w-full pt-10 pb-12 bg-[#f6f7f8]">
            <div className="max-w-[1024px] mx-auto px-4 md:px-10">
                <div className="flex flex-col gap-4 mb-8 text-center">
                    <h2 className="text-[#111418] text-4xl font-black leading-tight">
                        {t.longBay.meeting.title}
                    </h2>
                    <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Location Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-7 h-7 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{t.longBay.meeting.locationLabel}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    St Mary By The Sea
                                    <br />
                                    <span className="text-slate-500">168 Deep Creek Road, Torbay</span>
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
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{t.longBay.meeting.timeLabel}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {t.longBay.meeting.timeDesc}
                                    <br />
                                    <span className="text-2xl font-bold text-blue-600">2:30 PM</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-6 h-6 text-blue-200" />
                        <h3 className="text-xl font-bold">{t.longBay.meeting.contactTitle}</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {contacts.map((contact) => (
                            <div
                                key={contact.phone}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors duration-300"
                            >
                                {contact.role && (
                                    <span className="inline-block text-xs font-medium text-blue-200 bg-blue-500/30 px-2 py-1 rounded-full mb-2">
                                        {contact.role}
                                    </span>
                                )}
                                <p className="font-semibold text-lg mb-1">{contact.name}</p>
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    {contact.phone}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <h4 className="text-lg font-semibold mb-4 text-blue-100">{t.longBay.meeting.followUs}</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/efclongbay"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                                <Facebook className="w-5 h-5" />
                                <span>{t.longBay.meeting.facebookPage}</span>
                            </a>
                            <a
                                href="https://www.youtube.com/@EFCLongBay"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                                <Youtube className="w-5 h-5" />
                                <span>{t.longBay.meeting.youtubeChannel}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
