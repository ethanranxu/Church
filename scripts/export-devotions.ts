import * as fs from 'fs';
import * as path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin 初始化
if (getApps().length === 0) {
    const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
    initializeApp({ credential: cert(serviceAccountPath) });
}

const db = getFirestore();

function htmlToMarkdown(html: string): string {
    if (!html) return '';
    let md = html;

    // 替换 h3 为加粗
    md = md.replace(/<h3>(.*?)<\/h3>/g, '**$1**\n\n');

    // 替换 blockquote
    md = md.replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n\n');

    // 替换 a 标签包裹在 p 中格式
    md = md.replace(/<p><a href="(.*?)" target="_blank">(.*?)<\/a><\/p>/g, '$1\n\n');

    // 替换 p 标签
    md = md.replace(/<p>(.*?)<\/p>/g, '$1\n\n');

    // 替换 br
    md = md.replace(/<br\s*\/?>/g, '\n');

    // 清理多余空行
    md = md.replace(/\n{3,}/g, '\n\n');

    return md.trim();
}

async function exportDevotions() {
    console.log('正在从 Firestore 中获取每日灵修文章...');
    const snapshot = await db.collection('Articles').get();

    const devotions = snapshot.docs.map(doc => doc.data());
    console.log(`获取到 ${devotions.length} 篇文章，正在格式化...`);

    // 按日期排序
    devotions.sort((a, b) => {
        const dateA = a.publishDate || '';
        const dateB = b.publishDate || '';
        return dateA.localeCompare(dateB);
    });

    let mdContent = '';

    for (const d of devotions) {
        if (!d.publishDate || !d.title) continue;

        const parts = d.publishDate.split('-');
        if (parts.length !== 3) continue;

        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        mdContent += `# ${month}月${day}日｜${d.title}\n\n`;
        mdContent += htmlToMarkdown(d.content as string) + '\n\n\n';
    }

    // 导出到根目录
    const outPath = path.join(process.cwd(), 'devotions-backup.md');
    fs.writeFileSync(outPath, mdContent.trim());

    console.log(`导出完成！备份文件已保存至: ${outPath}`);
}

exportDevotions().catch(console.error);
