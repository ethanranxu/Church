'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export interface Bulletin {
    id?: string;
    title: string;
    publishDate: string;
    status: 'draft' | 'published';
    createdAt?: string | null;
    templateUrl?: string;
    pdfUrl?: string;
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
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
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
            createdAt: data?.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
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
