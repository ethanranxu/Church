import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface LogLocation {
    country: string;
    city: string;
    region: string;
}

export async function resolveIpLocation(ip: string): Promise<string> {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        return 'Localhost';
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`);
        const data = await response.json();

        if (data.status === 'success') {
            return `${data.country}, ${data.city}`;
        }
        return 'Unknown';
    } catch (error) {
        console.error('IP Location Error:', error);
        return 'Unknown';
    }
}

export async function writeUserLog(data: {
    ip: string;
    page: string;
    userAgent: string;
    sessionId: string;
}) {
    try {
        const location = await resolveIpLocation(data.ip);

        const docRef = await db.collection('UserLogs').add({
            ...data,
            location,
            duration: 0, // Initial duration
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        });

        return docRef.id;
    } catch (error) {
        console.error('Write User Log Error:', error);
        return null;
    }
}

export async function updateUserLogDuration(logId: string, duration: number) {
    if (!logId) return;
    try {
        await db.collection('UserLogs').doc(logId).update({
            duration,
            updatedAt: FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Update Log Duration Error:', error);
    }
}

export async function writeAdminLog(data: {
    adminName: string;
    adminEmail: string;
    action: string;
    details?: string;
    ip: string;
}) {
    try {
        const location = await resolveIpLocation(data.ip);

        await db.collection('AdminLogs').add({
            ...data,
            location,
            createdAt: FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Write Admin Log Error:', error);
    }
}

export async function getUserLogs(limitCount: number = 20, lastId?: string) {
    try {
        let query = db.collection('UserLogs').orderBy('createdAt', 'desc').limit(limitCount);

        if (lastId) {
            const lastDoc = await db.collection('UserLogs').doc(lastId).get();
            if (lastDoc.exists) {
                query = query.startAfter(lastDoc);
            }
        }

        const snapshot = await query.get();
        const logs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString(),
        }));

        return {
            logs,
            lastId: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null
        };
    } catch (error) {
        console.error("Get User Logs Error:", error);
        return { logs: [], lastId: null };
    }
}

export async function getAdminLogs(limitCount: number = 20, lastId?: string) {
    try {
        let query = db.collection('AdminLogs').orderBy('createdAt', 'desc').limit(limitCount);

        if (lastId) {
            const lastDoc = await db.collection('AdminLogs').doc(lastId).get();
            if (lastDoc.exists) {
                query = query.startAfter(lastDoc);
            }
        }

        const snapshot = await query.get();
        const logs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
        }));

        return {
            logs,
            lastId: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null
        };
    } catch (error) {
        console.error("Get Admin Logs Error:", error);
        return { logs: [], lastId: null };
    }
}
export async function getTodayVisitCount(): Promise<number> {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const snapshot = await db.collection('UserLogs')
            .where('createdAt', '>=', today)
            .count()
            .get();

        return snapshot.data().count;
    } catch (error) {
        console.error("Get Today Visit Count Error:", error);
        return 0;
    }
}

export async function getTodayUniqueVisitorCount(): Promise<number> {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const snapshot = await db.collection('UserLogs')
            .where('createdAt', '>=', today)
            .get();

        const uniqueIps = new Set(snapshot.docs.map(doc => doc.data().ip));
        return uniqueIps.size;
    } catch (error) {
        console.error("Get Today Unique Visitor Count Error:", error);
        return 0;
    }
}

/**
 * 自动清理 60 天前的日志
 */
export async function cleanupOldLogs() {
    try {
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const collections = ['UserLogs', 'AdminLogs'];

        for (const colName of collections) {
            const snapshot = await db.collection(colName)
                .where('createdAt', '<', sixtyDaysAgo)
                .limit(500) // 每次清理上限，避免超时
                .get();

            if (snapshot.empty) continue;

            const batch = db.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            console.log(`[Cleanup] Deleted ${snapshot.size} logs from ${colName}`);
        }
    } catch (error) {
        console.error('Cleanup old logs failed:', error);
    }
}
