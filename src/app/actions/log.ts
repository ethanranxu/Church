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

export async function logUserVisit(page: string, userAgent: string, sessionId: string) {
    const headersList = await headers();
    const ip = getIpFromHeaders(headersList);

    return await writeUserLog({
        ip,
        page,
        userAgent,
        sessionId
    });
}

export async function logUserDuration(logId: string, duration: number) {
    await updateUserLogDuration(logId, duration);
}

// Internal helper for other server actions
export async function createAdminLog(data: {
    adminName: string;
    adminEmail: string;
    action: string;
    details?: string;
}) {
    const headersList = await headers();
    const ip = getIpFromHeaders(headersList);

    await writeAdminLog({
        ...data,
        ip
    });
}

export async function fetchUserLogs(limit: number = 20, lastId?: string) {
    const { getUserLogs } = await import('@/lib/logging-admin');
    return await getUserLogs(limit, lastId);
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
