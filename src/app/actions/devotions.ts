'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export interface Devotion {
    id?: string;
    title: string;
    content: string;
    publishDate: string;
    status: 'draft' | 'published';
    createdAt?: any; // Firestore Timestamp
    views?: number;
}

/**
 * 獲取所有靈修文章（從 Articles 集合）
 */
export async function getDevotions(): Promise<Devotion[]> {
    try {
        const snapshot = await db.collection('Articles')
            .orderBy('publishDate', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                // Convert Firestore Timestamp to string for Next.js Client Component serialization
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
            } as Devotion;
        });
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        return [];
    }
}

/**
 * 獲取已發佈的靈修文章（首頁顯示用）
 * 條件：status = 'published' 且 publishDate <= 今天
 */
export async function getPublishedDevotions(
    limitCount: number = 10,
    lastPublishDate?: string,
    lastCreatedAtStr?: string
): Promise<Devotion[]> {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        let query = db.collection('Articles')
            .where('status', '==', 'published')
            .where('publishDate', '<=', todayStr)
            .orderBy('publishDate', 'desc');

        if (lastPublishDate && lastCreatedAtStr) {
            const lastCreatedAt = new Date(lastCreatedAtStr);
            // Re-define query to include secondary sort for stability
            query = db.collection('Articles')
                .where('status', '==', 'published')
                .where('publishDate', '<=', todayStr)
                .orderBy('publishDate', 'desc')
                .orderBy('createdAt', 'desc') // Secondary sort by createdAt
                .startAfter(lastPublishDate, lastCreatedAt);
        } else {
            query = db.collection('Articles')
                .where('status', '==', 'published')
                .where('publishDate', '<=', todayStr)
                .orderBy('publishDate', 'desc')
                .orderBy('createdAt', 'desc');
        }

        const snapshot = await query.limit(limitCount).get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
            } as Devotion;
        });
    } catch (error) {
        console.error('Failed to fetch published articles:', error);
        return [];
    }
}

/**
 * 創建靈修記錄（寫入 Articles 集合）
 */
/**
 * 創建靈修記錄（寫入 Articles 集合）
 */
export async function createDevotion(data: Omit<Devotion, 'id' | 'createdAt'>, operator?: { name: string, email: string }) {
    try {
        const newArticle = {
            ...data,
            createdAt: FieldValue.serverTimestamp(), // 自動生成服務端創建時間
        };
        const docRef = await db.collection('Articles').add(newArticle);

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '發布靈修',
                details: `發布了靈修文章: ${data.title}`
            });
        }

        revalidatePath('/admin/devotions');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { success: false, error: 'Failed to create article' };
    }
}

/**
 * 更新靈修記錄
 */
export async function updateDevotion(id: string, data: Partial<Omit<Devotion, 'id' | 'createdAt'>>, operator?: { name: string, email: string }) {
    try {
        await db.collection('Articles').doc(id).update({
            ...data,
            // 如果需要更新時間也可以在這裡添加 updatedAt
        });

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            let action = '更新靈修';
            if (data.status === 'published') action = '發布/更新靈修';
            if (data.status === 'draft') action = '存為草稿';

            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action,
                details: `更新了靈修ID: ${id}`
            });
        }

        revalidatePath('/admin/devotions');
        return { success: true };
    } catch (error) {
        console.error('Failed to update article:', error);
        return { success: false, error: 'Failed to update article' };
    }
}

/**
 * 刪除靈修記錄
 */
export async function deleteDevotion(id: string, operator?: { name: string, email: string }) {
    try {
        // Fetch title before delete
        const doc = await db.collection('Articles').doc(id).get();
        const articleData = doc.data();
        const articleTitle = articleData?.title || '未知標題';

        await db.collection('Articles').doc(id).delete();

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '刪除靈修',
                details: `刪除了靈修: ${articleTitle} (${id})`
            });
        }

        revalidatePath('/admin/devotions');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete article:', error);
        return { success: false, error: 'Failed to delete article' };
    }
}

/**
 * 增加靈修文章的閱讀計數
 */
export async function incrementDevotionView(id: string) {
    try {
        await db.collection('Articles').doc(id).update({
            views: FieldValue.increment(1)
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to increment view count:', error);
        return { success: false, error: 'Failed to increment view count' };
    }
}
/**
 * 獲取熱門靈修文章（按最近30天閱讀量排序）
 */
export async function getPopularDevotions(limitCount: number = 5): Promise<Devotion[]> {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        // 计算30天前的日期
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const startYear = thirtyDaysAgo.getFullYear();
        const startMonth = String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0');
        const startDay = String(thirtyDaysAgo.getDate()).padStart(2, '0');
        const thirtyDaysAgoStr = `${startYear}-${startMonth}-${startDay}`;

        // 获取最近30天内已发布的所有文章
        const snapshot = await db.collection('Articles')
            .where('status', '==', 'published')
            .where('publishDate', '<=', todayStr)
            .where('publishDate', '>=', thirtyDaysAgoStr)
            .get();

        const devotions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
            } as Devotion;
        });

        // 在内存中按点击量排序
        return devotions
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, limitCount);
    } catch (error) {
        console.error('Failed to fetch popular articles:', error);
        return [];
    }
}
/**
 * 獲取所有已發佈文章（用於靈修曆交互）
 */
export async function getCalendarDevotions(): Promise<Devotion[]> {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        // 計算 6 個月前的日期
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const sy = sixMonthsAgo.getFullYear();
        const sm = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0');
        const sd = String(sixMonthsAgo.getDate()).padStart(2, '0');
        const sixMonthsAgoStr = `${sy}-${sm}-${sd}`;



        const snapshot = await db.collection('Articles')
            .where('status', '==', 'published')
            .where('publishDate', '>=', sixMonthsAgoStr)
            .where('publishDate', '<=', todayStr)
            .get();

        const devotions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null
            } as Devotion;
        });



        return devotions;
    } catch (error) {
        console.error('Failed to fetch calendar devotions:', error);
        return [];
    }
}
export async function getDevotionsCount(): Promise<number> {
    try {
        const snapshot = await db.collection('Articles').count().get();
        return snapshot.data().count;
    } catch (error) {
        console.error('Failed to fetch articles count:', error);
        return 0;
    }
}
