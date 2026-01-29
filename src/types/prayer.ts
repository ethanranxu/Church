export type PrayerStatus = 'pending' | 'prayed' | 'archived';

export interface PrayerRecord {
    id?: string;
    name: string;
    contact: string;
    category: string;
    content: string;
    isPrivate: boolean;
    status: PrayerStatus;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
}

export interface PrayerFormData {
    name: string;
    contact: string;
    category: string;
    content: string;
    isPrivate: boolean;
}
