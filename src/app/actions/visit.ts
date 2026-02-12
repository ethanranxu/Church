'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface VisitData {
    visitors: string[];
    introducer?: string;
    visitDate: string; // YYYY-MM-DD
}

export interface VisitReservation extends VisitData {
    id: string;
    createdAt?: any;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export async function createVisitReservation(data: VisitData) {
    try {
        await db.collection('VisitReservations').add({
            ...data,
            createdAt: FieldValue.serverTimestamp(),
            status: 'pending' // Default status
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to create visit reservation:', error);
        return { success: false, error: 'Failed to create reservation' };
    }
}

export async function getVisitReservations(): Promise<VisitReservation[]> {
    try {
        const snapshot = await db.collection('VisitReservations')
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString()
        } as VisitReservation));
    } catch (error) {
        console.error('Failed to fetch visit reservations:', error);
        return [];
    }
}

export async function updateVisitReservation(id: string, data: Partial<VisitReservation>) {
    try {
        // Remove id and createdAt from data if present to avoid overwriting
        const { id: _, createdAt: __, ...updateData } = data as any;
        await db.collection('VisitReservations').doc(id).update(updateData);
        return { success: true };
    } catch (error) {
        console.error('Failed to update visit reservation:', error);
        return { success: false, error: 'Failed to update reservation' };
    }
}

export async function deleteVisitReservation(id: string) {
    try {
        await db.collection('VisitReservations').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error('Failed to delete visit reservation:', error);
        return { success: false, error: 'Failed to delete reservation' };
    }
}
