'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export interface Bulletin {
    id?: string;
    title: string;
    publishDate: string;
    status: '已保存' | '已下載';
    createdAt?: string | null;
    updatedAt?: string | null;
    templateUrl?: string;
    pdfUrl?: string;
    pdfName?: string;
    pdfBase64?: string;
    contentData: Record<string, string>;
    lastOperator?: string;
    views?: number;
}

export async function getBulletins(): Promise<Bulletin[]> {
    try {
        const snapshot = await db.collection('Bulletins')
            .orderBy('publishDate', 'desc')
            .limit(100)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : 
                           (data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null)
            } as Bulletin;
        });
    } catch (error) {
        console.error('Failed to fetch Bulletins:', error);
        return [];
    }
}

export async function getBulletinById(id: string): Promise<Bulletin | null> {
    try {
        const doc = await db.collection('Bulletins').doc(id).get();
        if (!doc.exists) return null;

        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            createdAt: data?.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
            updatedAt: data?.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : 
                       (data?.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null)
        } as Bulletin;
    } catch (error) {
        console.error(`Failed to fetch bulletin ${id}:`, error);
        return null;
    }
}

export async function createBulletin(data: Omit<Bulletin, 'id' | 'createdAt'>, operator?: { name: string, email: string }): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const newbulletin = {
            ...data,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            lastOperator: operator?.name || '未知',
        };
        const docRef = await db.collection('Bulletins').add(newbulletin);

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '发布周报',
                details: `发布了周报: ${data.title}`
            });
        }

        revalidatePath('/admin/bulletins');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Failed to create bulletin:', error);
        return { success: false, error: 'Failed to create bulletin' };
    }
}

export async function updateBulletin(id: string, data: Partial<Omit<Bulletin, 'id' | 'createdAt'>>, operator?: { name: string, email: string }): Promise<{ success: boolean; error?: string }> {
    try {
        await db.collection('Bulletins').doc(id).update({
            ...data,
            updatedAt: FieldValue.serverTimestamp(),
            lastOperator: operator?.name || '未知',
        });

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            let action = '更新周报';
            if (data.status === 'published') action = '发布/更新周报';
            if (data.status === 'draft') action = '存为草稿周报';

            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action,
                details: `更新了周报: ${id}`
            });
        }

        revalidatePath('/admin/bulletins');
        return { success: true };
    } catch (error) {
        console.error('Failed to update bulletin:', error);
        return { success: false, error: 'Failed to update bulletin' };
    }
}

export async function deleteBulletin(id: string, operator?: { name: string, email: string }): Promise<{ success: boolean; error?: string }> {
    try {
        const doc = await db.collection('Bulletins').doc(id).get();
        const bulletinData = doc.data();
        const bulletinTitle = bulletinData?.title || '未知标题';

        await db.collection('Bulletins').doc(id).delete();

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '删除周报',
                details: `删除了周报: ${bulletinTitle} (${id})`
            });
        }

        revalidatePath('/admin/bulletins');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete bulletin:', error);
        return { success: false, error: 'Failed to delete bulletin' };
    }
}

export async function getLatestBulletinWithPdf(): Promise<Bulletin | null> {
    try {
        // Fetch all bulletins (limited to 50 for safety)
        const snapshot = await db.collection('Bulletins')
            .orderBy('publishDate', 'desc')
            .limit(50)
            .get();

        const bulletins = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                // Serialize Firestore Timestamps to ISO strings
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
                updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt,
            } as Bulletin;
        });

        // Filter in memory to avoid needing a composite index in Firestore
        // Only require that it HAS a PDF (either URL or Base64), regardless of status
        return bulletins.find(b => b.pdfUrl || b.pdfBase64) || null;
    } catch (error) {
        console.error('Failed to fetch latest PDF bulletin:', error);
        return null;
    }
}

export async function getHistoricalBulletins(limitCount: number = 10, lastId?: string): Promise<{ bulletins: Bulletin[], hasMore: boolean }> {
    try {
        let bulletins: Bulletin[] = [];
        let currentLastId = lastId;
        let hasMore = true;
        const internalLimit = 100; // Increase scan range per request

        // Keep searching until we find enough bulletins with PDF or reach the end
        let snapshot = await db.collection('Bulletins')
            .orderBy('publishDate', 'desc')
            .limit(internalLimit)
            .get();

        if (currentLastId) {
            const lastDoc = await db.collection('Bulletins').doc(currentLastId).get();
            if (lastDoc.exists) {
                snapshot = await db.collection('Bulletins')
                    .orderBy('publishDate', 'desc')
                    .startAfter(lastDoc)
                    .limit(internalLimit)
                    .get();
            }
        }

        const allDocs = snapshot.docs;
        const filtered = allDocs
            .map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
                    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : null,
                } as Bulletin;
            })
            .filter(b => !!b.pdfUrl || !!b.pdfBase64);

        bulletins = filtered.slice(0, limitCount);
        hasMore = allDocs.length === internalLimit;

        return { bulletins, hasMore };
    } catch (error) {
        console.error('Failed to fetch historical bulletins:', error);
        return { bulletins: [], hasMore: false };
    }
}
