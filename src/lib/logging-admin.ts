import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface LogLocation {
    country: string;
    city: string;
    region: string;
    latitude?: number;
    longitude?: number;
}

interface LocationStats {
    city: string;
    country: string;
    lat: number;
    lng: number;
    count: number;
}

/**
 * 獲取新西蘭當前日期字串（YYYY-MM-DD）
 * 用於統計數據的分組，確保與本地時間一致
 */
function getTodayDateStr(): string {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: "Pacific/Auckland",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const parts = formatter.formatToParts(now);
    const part = (type: string) => parts.find(p => p.type === type)?.value;
    return `${part('year')}-${part('month')}-${part('day')}`;
}

export async function resolveIpLocation(ip: string): Promise<LogLocation | string> {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        return {
            country: 'Local',
            city: 'Host',
            region: 'Local Network',
            latitude: -36.8485, // Auckland coordinates as default for dev
            longitude: 174.7633
        };
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon`);
        const data = await response.json();

        if (data.status === 'success') {
            return {
                country: data.country,
                city: data.city,
                region: data.regionName,
                latitude: data.lat,
                longitude: data.lon
            };
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
        // Anonymize IP (keep only 3 segments e.g. 192.168.1.*)
        let anonymizedIp = data.ip;
        if (anonymizedIp && anonymizedIp !== '::1' && anonymizedIp !== '127.0.0.1') {
            const parts = anonymizedIp.split('.');
            if (parts.length === 4) {
                anonymizedIp = `${parts[0]}.${parts[1]}.${parts[2]}.*`;
            } else if (anonymizedIp.includes(':')) {
                // Basic IPv6 truncation (keep first 3 blocks)
                const v6parts = anonymizedIp.split(':');
                if (v6parts.length >= 3) {
                    anonymizedIp = `${v6parts[0]}:${v6parts[1]}:${v6parts[2]}::*`;
                }
            }
        }

        const locationData = await resolveIpLocation(data.ip);

        // Handle both object (new format) and string (fallback/old format)
        let locationString = 'Unknown';
        let latitude = null;
        let longitude = null;

        if (typeof locationData === 'string') {
            locationString = locationData;
        } else {
            locationString = `${locationData.country}, ${locationData.city}`;
            // Round coordinates to 0.01 grid for privacy
            if (locationData.latitude !== undefined) {
                latitude = Math.round(locationData.latitude * 100) / 100;
            }
            if (locationData.longitude !== undefined) {
                longitude = Math.round(locationData.longitude * 100) / 100;
            }
        }

        const today = getTodayDateStr(); // YYYY-MM-DD in NZ Time
        const statsRef = db.collection('DailyStats').doc(today);
        const ipRef = statsRef.collection('ips').doc(anonymizedIp);

        // 1. Create ref outside transaction to access ID later
        const newLogRef = db.collection('UserLogs').doc();

        await db.runTransaction(async (t) => {
            const statsDoc = await t.get(statsRef);
            const ipDoc = await t.get(ipRef);

            let locations: Record<string, LocationStats> = {};
            if (statsDoc.exists) {
                const existingData = statsDoc.data();
                locations = (existingData?.locations as Record<string, LocationStats>) || {};
            }

            // Update Location Stats
            if (latitude !== null && longitude !== null) {
                const locKey = `${latitude}_${longitude}`.replace(/\./g, '_');

                if (locations[locKey]) {
                    locations[locKey].count += 1;
                } else {
                    locations[locKey] = {
                        city: typeof locationData !== 'string' ? locationData.city : 'Unknown',
                        country: typeof locationData !== 'string' ? locationData.country : 'Unknown',
                        lat: latitude,
                        lng: longitude,
                        count: 1
                    };
                }
            }

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 60);

            // Write the raw log, putting `data` first so overrides work
            t.set(newLogRef, {
                ...data,
                ip: anonymizedIp, // Replace ip with 3-segment ip
                location: locationString,
                latitude,
                longitude,
                duration: 0,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
                expiresAt,
            });

            // Update Aggregated Stats
            if (!statsDoc.exists) {
                t.set(statsRef, {
                    date: today,
                    pageViews: 1,
                    uniqueVisitors: 1,
                    locations,
                    updatedAt: FieldValue.serverTimestamp()
                });
                t.set(ipRef, { visitedAt: FieldValue.serverTimestamp() });
            } else {
                let updateData: any = {
                    pageViews: FieldValue.increment(1),
                    locations,
                    updatedAt: FieldValue.serverTimestamp()
                };

                if (!ipDoc.exists) {
                    updateData.uniqueVisitors = FieldValue.increment(1);
                    t.set(ipRef, { visitedAt: FieldValue.serverTimestamp() });
                }

                t.update(statsRef, updateData);
            }
        });


        return { success: true, id: newLogRef.id };

    } catch (error: any) {
        console.error('Write User Log Error:', error);
        return { success: false, error: error?.message || String(error) };
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
        // Anonymize IP (keep only 3 segments e.g. 192.168.1.*)
        let anonymizedIp = data.ip || 'Unknown';
        if (anonymizedIp !== 'Unknown' && anonymizedIp !== '::1' && anonymizedIp !== '127.0.0.1') {
            const parts = anonymizedIp.split('.');
            if (parts.length === 4) {
                anonymizedIp = `${parts[0]}.${parts[1]}.${parts[2]}.*`;
            } else if (anonymizedIp.includes(':')) {
                // Basic IPv6 truncation (keep first 3 blocks)
                const v6parts = anonymizedIp.split(':');
                if (v6parts.length >= 3) {
                    anonymizedIp = `${v6parts[0]}:${v6parts[1]}:${v6parts[2]}::*`;
                }
            }
        }

        const locationData = await resolveIpLocation(data.ip);
        let locationString = 'Unknown';

        if (typeof locationData === 'string') {
            locationString = locationData;
        } else {
            locationString = `${locationData.country}, ${locationData.city}`;
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 60);

        await db.collection('AdminLogs').add({
            ...data,
            ip: anonymizedIp,
            location: locationString,
            createdAt: FieldValue.serverTimestamp(),
            expiresAt,
        });
    } catch (error) {
        console.error('Write Admin Log Error:', error);
    }
}

export async function getUserLogs(limitCount: number = 20, lastId?: string, startDate?: Date, endDate?: Date) {
    try {
        let query = db.collection('UserLogs').orderBy('createdAt', 'desc');

        if (startDate) {
            query = query.where('createdAt', '>=', startDate);
        }
        if (endDate) {
            query = query.where('createdAt', '<=', endDate);
        }

        query = query.limit(limitCount);

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
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString(),
            expiresAt: doc.data().expiresAt?.toDate ? doc.data().expiresAt.toDate().toISOString() : null,
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
            expiresAt: doc.data().expiresAt?.toDate ? doc.data().expiresAt.toDate().toISOString() : null,
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
// ----------------------------------------------------------------------
// Aggregated Stats Readers (Optimized)
// ----------------------------------------------------------------------

export async function getTodayVisitCount(): Promise<number> {
    try {
        const today = getTodayDateStr();
        const doc = await db.collection('DailyStats').doc(today).get();
        console.log(`[StatsReader] Today: ${today}, Exists: ${doc.exists}, Views: ${doc.data()?.pageViews}`);

        if (doc.exists) {
            return doc.data()?.pageViews || 0;
        }
        return 0;
    } catch (error) {
        console.error('Get Today Visit Count Error:', error);
        return 0;
    }
}

export async function getTodayUniqueVisitorCount(): Promise<number> {
    try {
        const today = getTodayDateStr();
        const doc = await db.collection('DailyStats').doc(today).get();

        if (doc.exists) {
            return doc.data()?.uniqueVisitors || 0;
        }
        return 0;
    } catch (error) {
        console.error('Get Today Unique Visitor Count Error:', error);
        return 0;
    }
}

/**
 * 自动清理历史日志 (根据 expiresAt)
 */
export async function cleanupOldLogs() {
    try {
        const now = new Date();
        const collections = ['UserLogs', 'AdminLogs'];

        for (const colName of collections) {
            const snapshot = await db.collection(colName)
                .where('expiresAt', '<', now)
                .limit(500) // 每次清理上限，避免超时
                .get();

            if (snapshot.empty) continue;

            const batch = db.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            console.log(`[Cleanup] Deleted ${snapshot.size} expired logs from ${colName}`);
        }
    } catch (error) {
        console.error('Cleanup old logs failed:', error);
    }
}
