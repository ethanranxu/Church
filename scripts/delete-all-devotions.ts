/**
 * 删除所有灵修数据
 */
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

if (getApps().length === 0) {
    const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
    initializeApp({ credential: cert(serviceAccountPath) });
}

const db = getFirestore();

async function deleteAllDevotions() {
    console.log('正在删除所有灵修数据...\n');

    const snapshot = await db.collection('Articles').get();

    if (snapshot.empty) {
        console.log('数据库中没有灵修数据。');
        return;
    }

    let count = 0;
    for (const doc of snapshot.docs) {
        await doc.ref.delete();
        console.log(`🗑️ 已删除: ${doc.data().title || doc.id}`);
        count++;
    }

    console.log(`\n✅ 共删除 ${count} 条灵修数据。`);
}

deleteAllDevotions().catch(console.error);
