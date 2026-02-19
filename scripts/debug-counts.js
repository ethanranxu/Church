const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

async function debugLogs() {
    try {
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        if (!require('firebase-admin/app').getApps().length) {
            initializeApp({
                credential: cert(serviceAccount)
            });
        }

        const db = getFirestore();

        console.log("--- Last 10 UserLogs ---");
        const logsSnapshot = await db.collection('UserLogs').orderBy('createdAt', 'desc').limit(10).get();
        logsSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`Log ID: ${doc.id}, Page: ${data.page}, CreatedAt (UTC): ${data.createdAt?.toDate().toISOString()}, Location: ${data.location}, IP: ${data.ip}`);
        });

        console.log("\n--- DailyStats Table (Recent) ---");
        const statsSnapshot = await db.collection('DailyStats').orderBy('date', 'desc').limit(5).get();
        statsSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`Stats ID: ${doc.id}, Date: ${data.date}, PageViews: ${data.pageViews}, Unique: ${data.uniqueVisitors}, Updated (UTC): ${data.updatedAt?.toDate().toISOString()}`);
        });

    } catch (e) {
        console.error(e);
    }
}

debugLogs();
