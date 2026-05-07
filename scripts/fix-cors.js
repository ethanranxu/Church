const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

// Get bucket name from env or hardcode from .env.local
const bucketName = 'church-28c97.firebasestorage.app'; // or 'church-28c97.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = admin.storage().bucket();

async function setCors() {
  const corsConfiguration = [
    {
      origin: ['*'], // Or specific domains like 'http://localhost:3000'
      method: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      responseHeader: ['Content-Type', 'Authorization', 'Content-Length', 'User-Agent', 'x-goog-resumable'],
      maxAgeSeconds: 3600
    }
  ];

  try {
    const fallbackBucket = admin.storage().bucket('church-28c97.appspot.com');
    await fallbackBucket.setCorsConfiguration(corsConfiguration);
    console.log('CORS updated successfully on church-28c97.appspot.com.');
    const [metadata] = await fallbackBucket.getMetadata();
    console.log('Current CORS:', JSON.stringify(metadata.cors, null, 2));
  } catch (error) {
    console.error('Failed to update CORS on appspot bucket:', error.message || error);
  }
}

setCors();
