
import { db } from "../src/lib/firebase-admin";

async function checkData() {
    console.log("Checking Article Fields...");
    const snapshot = await db.collection('Articles').get();
    let missingCreatedAt = 0;

    snapshot.forEach(doc => {
        const data = doc.data();
        if (!data.createdAt) {
            console.log(`Doc ${doc.id} missing createdAt`);
            missingCreatedAt++;
        } else {
            // console.log(`Doc ${doc.id} has createdAt: ${data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt}`);
        }
    });

    console.log(`Total: ${snapshot.size}`);
    console.log(`Missing createdAt: ${missingCreatedAt}`);
}

checkData().then(() => process.exit(0)).catch(console.error);
