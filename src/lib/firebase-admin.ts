import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';

// 仅在服务端初始化
// Prevent multiple initializations in development
if (!getApps().length) {
    try {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            // Vercel / Production: Use environment variable
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            initializeApp({
                credential: cert(serviceAccount)
            });
            console.log('Firebase Admin initialized from environment variable');
        } else {
            // Local Development: Use file
            const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
            initializeApp({
                credential: cert(serviceAccountPath)
            });
            console.log('Firebase Admin initialized from local file');
        }
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
    }
}

export const db = getFirestore();
export const adminAuth = getAuth();
