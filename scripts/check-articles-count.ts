import * as fs from 'fs';
import * as path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin 初始化
if (getApps().length === 0) {
    const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
    initializeApp({ credential: cert(serviceAccountPath) });
}

const db = getFirestore();

async function checkArticles() {
    const snapshot = await db.collection('Articles').get();

    let count = 0;
    const months: Record<string, number> = { '1': 0, '2': 0, '3': 0, '4': 0, 'other': 0 };

    snapshot.forEach(doc => {
        count++;
        const data = doc.data();
        if (data.publishDate) {
            const parts = data.publishDate.split('-');
            if (parts.length >= 2) {
                const month = parseInt(parts[1], 10).toString();
                if (months[month] !== undefined) {
                    months[month]++;
                } else {
                    months['other']++;
                }
            }
        }
    });

    console.log(`\n========================================`);
    console.log(`数据库 Articles 集合分析`);
    console.log(`========================================`);
    console.log(`总数: ${count} 篇`);
    console.log(`分布:`);
    console.log(`  - 1月: ${months['1']} 篇`);
    console.log(`  - 2月: ${months['2']} 篇`);
    console.log(`  - 3月: ${months['3']} 篇`);
    console.log(`  - 4月: ${months['4']} 篇`);
    console.log(`  - 其他: ${months['other']} 篇`);
    console.log(`========================================\n`);
}

checkArticles().catch(console.error);
