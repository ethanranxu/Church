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
        if (doc20.exists) {
            const d = doc20.data();
            console.log(`2026-02-20: Views=${d.pageViews}, Unique=${d.uniqueVisitors}`);
        } else {
            console.log("2026-02-20: NOT FOUND");
        }

        const doc19 = await db.collection('DailyStats').doc('2026-02-19').get();
        if (doc19.exists) {
            const d = doc19.data();
            console.log(`2026-02-19: Views=${d.pageViews}, Unique=${d.uniqueVisitors}`);
        }

    } catch (e) {
        console.error(e);
    }
}

checkSpecificDoc();
