'use server';

import { headers } from 'next/headers';
import { writeUserLog, updateUserLogDuration, writeAdminLog } from '@/lib/logging-admin';

function getIpFromHeaders(headersList: Headers): string {
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return headersList.get('x-real-ip') || 'Unknown';
}

export async function logUserVisit(page: string, userAgent: string, sessionId: string): Promise<string | null> {
    const headersList = await headers();
    const ip = getIpFromHeaders(headersList);

    const result = await writeUserLog({
        ip,
        page,
        userAgent,
        sessionId
    });

    if (result && result.success && result.id) {
        return result.id;
    }
    return null;
}

export async function logUserDuration(logId: string, duration: number): Promise<void> {
    await updateUserLogDuration(logId, duration);
}

// Internal helper for other server actions
export async function createAdminLog(data: {
    adminName: string;
    adminEmail: string;
    action: string;
    details?: string;
}): Promise<void> {
    const headersList = await headers();
    const ip = getIpFromHeaders(headersList);

    await writeAdminLog({
        ...data,
        ip
    });
}

export async function fetchUserLogs(limit: number = 20, lastId?: string, startDate?: string, endDate?: string) {
    const { getUserLogs } = await import('@/lib/logging-admin');
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return await getUserLogs(limit, lastId, start, end);
}

export async function fetchAdminLogs(limit: number = 20, lastId?: string) {
    const { getAdminLogs } = await import('@/lib/logging-admin');
    return await getAdminLogs(limit, lastId);
}

export async function fetchTodayVisitCount() {
    const { getTodayVisitCount } = await import('@/lib/logging-admin');
    return await getTodayVisitCount();
}

export async function fetchTodayUniqueVisitorCount() {
    const { getTodayUniqueVisitorCount } = await import('@/lib/logging-admin');
    return await getTodayUniqueVisitorCount();
}

export async function fetchGlobalVisits(startDate?: string, endDate?: string) {
    const { db } = await import('@/lib/firebase-admin');

    // Default to last 30 days if no range provided, or handle open ended
    let query = db.collection('DailyStats')
        .orderBy('date', 'desc');

    if (startDate) {
        query = query.where('date', '>=', startDate.split('T')[0]);
    }
    if (endDate) {
        query = query.where('date', '<=', endDate.split('T')[0]);
    }

    try {
        const snapshot = await query.get();
        const locationMap = new Map<string, { city: string; country: string; lat: number; lng: number; count: number }>();

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const locations = data.locations || {};

            Object.values(locations).forEach((loc: any) => {
                // Key based on lat/lng to aggregate across days
                const key = `${loc.lat},${loc.lng}`;

                if (locationMap.has(key)) {
                    locationMap.get(key)!.count += loc.count;
                } else {
                    locationMap.set(key, { ...loc });
                }
            });
        });

        return Array.from(locationMap.values());
    } catch (error) {
        console.error("Fetch Global Visits Error:", error);
        return [];
    }
}

export async function fetchVisitTrends(startDate: string, endDate: string) {
    // Import db lazily to avoid circular deps if any, or just consistent with pattern
    const { db } = await import('@/lib/firebase-admin');

    // YYYY-MM-DD
    const start = startDate.split('T')[0];
    const end = endDate.split('T')[0];

    try {
        const snapshot = await db.collection('DailyStats')
            .where('date', '>=', start)
            .where('date', '<=', end)
            .get();

        const statsMap = new Map<string, { date: string; userVisits: number; pageVisits: number }>();

        // Fill in gaps with 0
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        for (let d = new Date(sDate); d <= eDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            statsMap.set(dateStr, { date: dateStr, userVisits: 0, pageVisits: 0 });
        }

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (statsMap.has(data.date)) {
                statsMap.set(data.date, {
                    date: data.date,
                    userVisits: data.uniqueVisitors || 0,
                    pageVisits: data.pageViews || 0
                });
            }
        });

        return Array.from(statsMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
        console.error("Fetch Visit Trends Error:", error);
        return [];
    }
}
