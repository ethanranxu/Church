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

        const now = new Date();
        const nzDate = new Date(now.toLocaleString("en-US", { timeZone: "Pacific/Auckland" }));
        const year = nzDate.getFullYear();
        const month = String(nzDate.getMonth() + 1).padStart(2, '0');
        const day = String(nzDate.getDate()).padStart(2, '0');
        const nzTodayStr = `${year}-${month}-${day}`;

        console.log("System (Local) Time:", now.toString());
        console.log("System (ISO/UTC) Time:", now.toISOString());
        console.log("Calculated Today ID (UTC-based):", now.toISOString().split('T')[0]);
        console.log("Calculated Today ID (NZ-based):", nzTodayStr);

        console.log("\nChecking DailyStats for both IDs...");
        const utcDoc = await db.collection('DailyStats').doc(now.toISOString().split('T')[0]).get();
        const nzDoc = await db.collection('DailyStats').doc(nzTodayStr).get();

        if (utcDoc.exists) {
            console.log(`UTC ID [${utcDoc.id}] exists. Views: ${utcDoc.data().pageViews}, Updated: ${utcDoc.data().updatedAt?.toDate().toLocaleString()}`);
        } else {
            console.log(`UTC ID [${now.toISOString().split('T')[0]}] does NOT exist.`);
        }

        if (nzDoc.exists) {
            console.log(`NZ ID [${nzDoc.id}] exists. Views: ${nzDoc.data().pageViews}, Updated: ${nzDoc.data().updatedAt?.toDate().toLocaleString()}`);
        } else {
            console.log(`NZ ID [${nzTodayStr}] does NOT exist.`);
        }

    } catch (e) {
        console.error(e);
    }
}

checkStats();
