const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

async function checkStats() {
    try {
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        initializeApp({
            credential: cert(serviceAccount)
        });

        const db = getFirestore();
        console.log("Checking DailyStats documents...");

        const snapshot = await db.collection('DailyStats').orderBy('date', 'desc').limit(5).get();
        if (snapshot.empty) {
            console.log("No DailyStats documents found.");
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            console.log(`ID: ${doc.id}, Date: ${data.date}, PageViews: ${data.pageViews}, Unique: ${data.uniqueVisitors}, UpdatedAt: ${data.updatedAt?.toDate().toLocaleString()}`);
        });

        const now = new Date();
        console.log("\nSystem (Local) Time:", now.toString());
        console.log("System (ISO) Time:", now.toISOString());
        console.log("Calculated Today ID (current logic):", now.toISOString().split('T')[0]);
    } catch (e) {
        console.error(e);
    }
}

checkStats();
