
import { db } from "../src/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const titles = [
    "每日的恩典", "信心的力量", "愛的真諦", "聖靈的果子", "祈禱的力量",
    "神的話語", "平安的應許", "喜樂的心", "饒恕的功課", "服事的喜樂",
    "十字架的道路", "永恆的盼望", "謙卑的態度", "順服的祝福", "合一的見證",
    "感恩的祭", "智慧的開端", "慈愛的父親", "真理的亮光", "生命的活水"
];

const contentSnippets = [
    "<p>今天我們來思想神的恩典。在每一天的生活中，我們都能看見神的帶領。</p>",
    "<p>信心是未見之事的確據。當我們面對困難時，信心使我們能看見神的作爲。</p>",
    "<p>愛是恆久忍耐，又有恩慈。讓我們學習如何用神的愛去愛身邊的人。</p>",
    "<p>聖靈在我們心裡運行，結出仁愛、喜樂、和平的果子。</p>",
    "<p>禱告是我們與神溝通的橋樑。透過禱告，我們能將重擔交託給神。</p>",
    "<p>神的話是我們腳前的燈，路上的光。每天研讀聖經，能指引我們當行的路。</p>",
];

const statuses = ["published", "draft", "published", "published", "draft"]; // 60% published

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedArticles() {
    console.log("Starting to seed articles...");

    try {
        const batch = db.batch();
        const articlesRef = db.collection('Articles');

        for (let i = 0; i < 20; i++) {
            const title = titles[i] || `靈修分享 ${i + 1}`;
            const content = getRandomElement(contentSnippets) + `<p>這是第 ${i + 1} 篇靈修文章的內容片段。</p>`;
            const status = getRandomElement(statuses);

            // Random date within the last 30 days and next 10 days
            const publishDate = getRandomDate(
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            ).toISOString().split('T')[0];

            const newDocRef = articlesRef.doc();

            batch.set(newDocRef, {
                title: title,
                content: content,
                publishDate: publishDate,
                status: status,
                createdAt: FieldValue.serverTimestamp(),
            });
        }

        await batch.commit();
        console.log("Successfully seeded 20 articles.");
    } catch (error) {
        console.error("Error seeding articles:", error);
    }
}

seedArticles().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
