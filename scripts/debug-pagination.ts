
import { getPublishedDevotions } from "../src/app/actions/devotions";
import { db } from "../src/lib/firebase-admin";

async function runDebug() {
    console.log("=== Debugging Pagination ===");

    // Fetch Page 1
    console.log("\nFetching Page 1 (Limit 10)...");
    const page1 = await getPublishedDevotions(10);
    console.log(`Page 1 returned ${page1.length} items.`);

    if (page1.length === 0) {
        console.log("No items in Page 1. Aborting.");
        return;
    }

    const lastItem = page1[page1.length - 1];
    console.log("Last Item of Page 1:");
    console.log(`  ID: ${lastItem.id}`);
    console.log(`  Date: ${lastItem.publishDate}`);
    console.log(`  CreatedAt: ${lastItem.createdAt}`);

    // Fetch Page 2
    console.log("\nFetching Page 2 (Limit 10)...");

    // Simulate what the client does
    const page2 = await getPublishedDevotions(10, lastItem.publishDate, lastItem.id);
    console.log(`Page 2 returned ${page2.length} items.`);

    if (page2.length > 0) {
        console.log("First Item of Page 2:");
        const firstP2 = page2[0];
        console.log(`  ID: ${firstP2.id}`);
        console.log(`  Date: ${firstP2.publishDate}`);
        console.log(`  Title: ${firstP2.title}`);
    } else {
        console.log("Page 2 is empty!");
    }

    // Page 3 check
    if (page2.length > 0) {
        const lastItemP2 = page2[page2.length - 1];
        console.log("\nFetching Page 3...");
        const page3 = await getPublishedDevotions(10, lastItemP2.publishDate, lastItemP2.id);
        console.log(`Page 3 returned ${page3.length} items.`);
    }

}

runDebug().then(() => process.exit(0)).catch(e => { console.error("FULL ERROR MESSAGE:", e.message); process.exit(1); });
