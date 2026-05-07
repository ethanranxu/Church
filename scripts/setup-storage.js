const { Storage } = require('@google-cloud/storage');
const path = require('path');

async function list() {
  const storage = new Storage({
    projectId: 'church-28c97',
    keyFilename: path.join(__dirname, '../service-account.json')
  });

  try {
    const [buckets] = await storage.getBuckets();
    console.log('Buckets:');
    let targetBucketName = null;
    buckets.forEach(bucket => {
      console.log(' - ' + bucket.name);
      if (bucket.name.includes('church-28c97')) {
        targetBucketName = bucket.name;
      }
    });

    if (targetBucketName) {
      console.log('\nSetting CORS for', targetBucketName);
      const bucket = storage.bucket(targetBucketName);
      await bucket.setCorsConfiguration([
        {
          origin: ['*'],
          method: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
          responseHeader: ['Content-Type', 'Authorization', 'Content-Length', 'User-Agent', 'x-goog-resumable'],
          maxAgeSeconds: 3600
        }
      ]);
      console.log('CORS updated successfully on', targetBucketName);
    } else {
        console.log('No matching bucket found. Make sure Storage is enabled in Firebase Console.');
    }
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

list();
