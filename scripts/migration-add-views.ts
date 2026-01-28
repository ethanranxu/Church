
import { db } from "../src/lib/firebase-admin";

async function addViewsField() {
    console.log("Starting migration to add 'views' field...");

    try {
        const batch = db.batch();
        const articlesSnapshot = await db.collection('Articles').get();
        let count = 0;

        articlesSnapshot.forEach(doc => {
            const data = doc.data();
            // If views field doesn't exist, add it
            if (data.views === undefined) {
                batch.update(doc.ref, { views: 0 });
                count++;
            }
        });

        if (count > 0) {
            await batch.commit();
            console.log(`Successfully added 'views' field to ${count} articles.`);
        } else {
            console.log("All articles already have 'views' field. No changes needed.");
        }

    } catch (error) {
        console.error("Error running migration:", error);
    }
}

addViewsField().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
