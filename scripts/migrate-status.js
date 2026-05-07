const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function migrate() {
    console.log('--- Migrating Bulletin Status ---');
    try {
        const snapshot = await db.collection('Bulletins').get();
        console.log(`Total bulletins to check: ${snapshot.size}`);
        
        const batch = db.batch();
        let count = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            let newStatus = null;
            
            if (data.status === 'published') {
                newStatus = '已下載';
            } else if (data.status === 'draft') {
                newStatus = '已保存';
            }

            if (newStatus) {
                console.log(`Updating ${doc.id}: ${data.status} -> ${newStatus}`);
                batch.update(doc.ref, { status: newStatus });
                count++;
            }
        });

        if (count > 0) {
            await batch.commit();
            console.log(`Successfully migrated ${count} bulletins.`);
        } else {
            console.log('No bulletins needed migration.');
        }
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrate();
