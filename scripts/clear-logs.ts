import { db } from '../src/lib/firebase-admin';

async function deleteCollection(collectionPath: string, batchSize: number) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(query: any, resolve: any) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(query, resolve);
    });
}

async function main() {
    console.log('Starting to clear logs...');

    console.log('Clearing UserLogs...');
    await deleteCollection('UserLogs', 100);
    console.log('UserLogs cleared.');

    console.log('Clearing AdminLogs...');
    await deleteCollection('AdminLogs', 100);
    console.log('AdminLogs cleared.');

    console.log('All logs cleared successfully.');
}

main().catch(console.error);
