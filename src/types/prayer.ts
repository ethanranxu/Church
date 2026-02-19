export type PrayerStatus = 'pending' | 'prayed' | 'archived';

export interface PrayerRecord {
    id?: string;
    name: string;
    contact: string;
    category: string;
    content: string;
    isPrivate: boolean;
    status: PrayerStatus;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface PrayerFormData {
    name: string;
    contact: string;
    category: string;
    content: string;
    isPrivate: boolean;
}
