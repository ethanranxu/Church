const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

async function checkSpecificDoc() {
    try {
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        if (!require('firebase-admin/app').getApps().length) {
            initializeApp({
                credential: cert(serviceAccount)
            });
        }

        const db = getFirestore();

        const doc20 = await db.collection('DailyStats').doc('2026-02-20').get();
        const doc19 = await db.collection('DailyStats').doc('2026-02-19').get();

        console.log("Document 2026-02-20 exists:", doc20.exists);
        if (doc20.exists) console.log("2026-02-20 data:", JSON.stringify(doc20.data()));

        console.log("Document 2026-02-19 exists:", doc19.exists);
        if (doc19.exists) {
            const data19 = doc19.data();
            console.log("2026-02-19 stats:", {
                pageViews: data19.pageViews,
                uniqueVisitors: data19.uniqueVisitors,
                updatedAt: data19.updatedAt?.toDate().toISOString()
            });
        }

    } catch (e) {
        console.error(e);
    }
}

checkSpecificDoc();
