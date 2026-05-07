const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function debugBulletins() {
    console.log('--- Debugging Bulletins Data ---');
    try {
        const snapshot = await db.collection('Bulletins').get();
        console.log(`Total bulletins found: ${snapshot.size}`);
        
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`\nID: ${doc.id}`);
            console.log(`Title: ${data.title}`);
            console.log(`Status: ${data.status}`);
            console.log(`Publish Date: ${data.publishDate}`);
            console.log(`Has PDF URL: ${!!data.pdfUrl}`);
            console.log(`Has PDF Base64: ${!!data.pdfBase64}`);
        });
        
        console.log('\n--- Testing Target Query ---');
        try {
            const target = await db.collection('Bulletins')
                .where('status', '==', 'published')
                .orderBy('publishDate', 'desc')
                .limit(10)
                .get();
            console.log(`Query returned ${target.size} items.`);
        } catch (queryError) {
            console.error('Query Error (possible missing index?):', queryError.message);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

debugBulletins();
