
import { db } from '../src/lib/firebase-admin';

const INITIAL_USERS = [
    { id: 1, name: "張穆庭", email: "zhang@church.com", phone: "13800138000", level: "super_admin", roleName: "超級管理員", avatar: null },
    { id: 2, name: "李思思", email: "li@church.com", phone: "13900139000", level: "admin", roleName: "管理員", avatar: null },
    { id: 3, name: "王建國", email: "wang@church.com", phone: "13700137000", level: "admin", roleName: "管理員", avatar: null },
    { id: 4, name: "趙小雅", email: "zhao@church.com", phone: "13600136000", level: "admin", roleName: "管理員", avatar: null },
];

async function seedUsers() {
    console.log('Seeding users...');

    // Create Users collection
    const usersCollection = db.collection('Users');

    for (const user of INITIAL_USERS) {
        // Use user ID (converted to string) as the document ID for easier lookup, 
        // or let Firestore auto-generate ID and store the numeric ID field.
        // Let's us stringified ID key for now to prevent duplication if run multiple times.
        await usersCollection.doc(String(user.id)).set(user);
        console.log(`Added user: ${user.name}`);
    }

    console.log('Seeding completed successfully.');
}

seedUsers().catch(console.error);
