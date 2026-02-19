
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

async function testFirestore() {
    try {
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
        console.log('Loading service account from:', serviceAccountPath);

        if (!fs.existsSync(serviceAccountPath)) {
            console.error('Service account file not found!');
            return;
        }

        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        initializeApp({
            credential: cert(serviceAccount)
        });

        const db = getFirestore();
        console.log('Firestore initialized.');

        const testCollection = db.collection('ConnectivityTest');
        const docRef = testCollection.doc('test-doc');

        console.log('Attempting to write to Firestore...');
        await docRef.set({
            status: 'connected',
            timestamp: new Date().toISOString()
        });
        console.log('Write successful!');

        console.log('Attempting to read from Firestore...');
        const doc = await docRef.get();
        console.log('Read successful:', doc.data());

        // Cleanup
        await docRef.delete();
        console.log('Cleanup successful.');

    } catch (error) {
        console.error('Firestore connection failed:', error);
    }
}

testFirestore();
