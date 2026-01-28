const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');

initializeApp({
    credential: cert(serviceAccountPath)
});

const db = getFirestore();

async function deleteCollection(collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        resolve();
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    process.nextTick(() => {
        deleteQueryBatch(query, resolve);
    });
}

async function main() {
    console.log('Starting standalone clear-logs...');

    console.log('Clearing UserLogs...');
    await deleteCollection('UserLogs', 100);
    console.log('UserLogs cleared.');

    console.log('Clearing AdminLogs...');
    await deleteCollection('AdminLogs', 100);
    console.log('AdminLogs cleared.');

    console.log('Done.');
}

main().catch(console.error);
