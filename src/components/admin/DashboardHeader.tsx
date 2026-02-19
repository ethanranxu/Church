"use client";

import { useTranslation } from "@/i18n/LanguageContext";

export function DashboardHeader() {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.admin.dashboard.title}</h1>
            <p className="text-sm text-gray-500">{t.admin.dashboard.welcome}</p>
        </div>
    );
}
