'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { PrayerFormData, PrayerRecord, PrayerStatus } from '@/types/prayer';
import { revalidatePath } from 'next/cache';

/**
 * 提交新的代禱事項到 Firestore 的 'Prays' 集合
 */
export async function submitPrayer(formData: PrayerFormData) {
    try {
        const newPrayer: Omit<PrayerRecord, 'id'> = {
            ...formData,
            status: 'pending',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection('Prays').add(newPrayer);

        revalidatePath('/admin/prayers');
        return {
            success: true,
            id: docRef.id,
            message: "代禱需求已送出，我們會為您禱告！"
        };
    } catch (error) {
        console.error('Failed to submit prayer:', error);
        return {
            success: false,
            error: '提交失敗，請稍後再試。'
        };
    }
}

/**
 * 获取所有代祷事项（管理后台使用）
 */
export async function getPrayers() {
    try {
        const snapshot = await db.collection('Prays')
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
            updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
        }));
    } catch (error) {
        console.error('Failed to fetch prayers:', error);
        return [];
    }
}

/**
 * 更新代禱事項狀態
 */
export async function updatePrayerStatus(id: string, status: PrayerStatus, operator: { name: string, email: string }) {
    try {
        await db.collection('Prays').doc(id).update({
            status,
            updatedAt: FieldValue.serverTimestamp(),
        });

        const { createAdminLog } = await import('@/app/actions/log');
        await createAdminLog({
            adminName: operator.name,
            adminEmail: operator.email,
            action: '更新代禱狀態',
            details: `將代禱 ID: ${id} 狀態更新為: ${status}`
        });

        revalidatePath('/admin/prayers');
        return { success: true };
    } catch (error) {
        console.error('Failed to update prayer status:', error);
        return { success: false, error: '更新失敗' };
    }
}

/**
 * 刪除代禱事項
 */
export async function deletePrayer(id: string, operator: { name: string, email: string }) {
    try {
        await db.collection('Prays').doc(id).delete();

        const { createAdminLog } = await import('@/app/actions/log');
        await createAdminLog({
            adminName: operator.name,
            adminEmail: operator.email,
            action: '刪除代禱',
            details: `刪除了代禱事項 ID: ${id}`
        });

        revalidatePath('/admin/prayers');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete prayer:', error);
        return { success: false, error: '刪除失敗' };
    }
}
