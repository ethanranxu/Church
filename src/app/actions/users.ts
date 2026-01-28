'use server';

import { db } from '@/lib/firebase-admin';
import { User } from '@/types/user';
import { revalidatePath } from 'next/cache';

export async function getUsers(): Promise<User[]> {
    try {
        const snapshot = await db.collection('Users').get();
        const users = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        })) as User[];
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>, operator?: { name: string, email: string }) {
    try {
        const newUser = {
            ...data,
            createdAt: new Date().toISOString(),
        };
        const docRef = await db.collection('Users').add(newUser);

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '創建用戶',
                details: `創建了用戶: ${data.name} (${data.email})`
            });
        }

        revalidatePath('/admin/users');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Failed to create user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>, operator?: { name: string, email: string }) {
    try {
        await db.collection('Users').doc(id).update(data);

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            let details = `更新了用戶ID: ${id}`;
            if (data.name) details += `, 改名為: ${data.name}`;
            if (data.level) details += `, 權限變更: ${data.level}`;

            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '更新用戶',
                details
            });
        }

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Failed to update user:', error);
        return { success: false, error: 'Failed to update user' };
    }
}

export async function deleteUser(id: string, operator?: { name: string, email: string }) {
    try {
        // Fetch user name before delete for log
        const doc = await db.collection('Users').doc(id).get();
        const userData = doc.data();
        const userName = userData?.name || '未知用戶';

        await db.collection('Users').doc(id).delete();

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '刪除用戶',
                details: `刪除了用戶: ${userName} (${id})`
            });
        }

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}
export async function getUsersCount(): Promise<number> {
    try {
        const snapshot = await db.collection('Users').count().get();
        return snapshot.data().count;
    } catch (error) {
        console.error('Failed to fetch users count:', error);
        return 0;
    }
}
