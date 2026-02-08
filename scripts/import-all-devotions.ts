/**
 * 导入所有灵修数据到 Firestore
 * 处理多种标题格式变体
 */
import * as fs from 'fs';
import * as path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Firebase Admin 初始化
if (getApps().length === 0) {
    const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
    initializeApp({ credential: cert(serviceAccountPath) });
}

const db = getFirestore();

interface DevotionEntry {
    title: string;
    content: string;
    publishDate: string;
    status: string;
    views: number;
}

// 解析 markdown 文件中的所有灵修条目
function parseDevotions(markdownContent: string): DevotionEntry[] {
    const entries: DevotionEntry[] = [];
    const seenDates = new Set<string>();

    // 标准化换行符
    const normalizedContent = markdownContent.replace(/\r\n/g, '\n');

    // 匹配所有可能的标题行格式:
    // # 1月1日｜...
    // # **1月3日｜...**
    // # 1月5日｜...
    // # **1月5日｜...**
    const titlePattern = /^#\s+\*{0,2}(\d+月\d+日[｜|].+?)\*{0,2}\s*$/gm;

    let match;
    const titlePositions: { index: number; title: string; dateStr: string }[] = [];

    while ((match = titlePattern.exec(normalizedContent)) !== null) {
        const fullTitle = match[1].trim();
        const dateMatch = fullTitle.match(/^(\d+)月(\d+)日/);
        if (dateMatch) {
            const month = parseInt(dateMatch[1]);
            const day = parseInt(dateMatch[2]);
            const dateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // 只取每个日期的第一个出现（避免重复标题）
            if (!seenDates.has(dateStr)) {
                seenDates.add(dateStr);
                titlePositions.push({
                    index: match.index,
                    title: fullTitle,
                    dateStr
                });
            }
        }
    }

    console.log(`找到 ${titlePositions.length} 个唯一日期的标题`);

    // 解析每个条目的内容
    for (let i = 0; i < titlePositions.length; i++) {
        const current = titlePositions[i];
        const nextIndex = i + 1 < titlePositions.length
            ? titlePositions[i + 1].index
            : normalizedContent.length;

        const sectionContent = normalizedContent.substring(current.index, nextIndex);
        const lines = sectionContent.split('\n');

        // 提取标题（去除日期前缀）
        const titleMatch = current.title.match(/\d+月\d+日[｜|](.+)/);
        if (!titleMatch) continue;
        const title = titleMatch[1].trim();

        // 跳过标题行和重复标题，找到内容开始位置
        let contentStartIndex = -1;
        for (let j = 1; j < lines.length; j++) {
            const line = lines[j].trim();
            if (!line) continue;
            // 跳过重复的日期标题行 (如 **1月1日｜...)
            if (line.match(/^\*{0,2}\d+月\d+日[｜|]/)) continue;
            // 跳过单独的 # 或 ##
            if (/^#{1,2}\s*$/.test(line)) continue;
            contentStartIndex = j;
            break;
        }

        if (contentStartIndex === -1) continue;

        // 构建 HTML 内容
        const contentLines = lines.slice(contentStartIndex);
        let htmlContent = '';

        for (const line of contentLines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            // 跳过空的 markdown 标记
            if (/^#{1,3}\s*$/.test(trimmedLine)) continue;

            // ⚠️ 跳过所有形式的日期标题行（不应出现在正文中）
            // 格式: **1月1日｜标题** 或 1月1日｜标题 或 # **1月1日...
            if (/^\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;
            if (/^#{1,3}\s+\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;

            // 处理经文链接
            if (trimmedLine.startsWith('http') || trimmedLine.startsWith('[http')) {
                const urlMatch = trimmedLine.match(/https?:\/\/[^\s\]\)]+/);
                if (urlMatch) {
                    htmlContent += `<p><a href="${urlMatch[0]}" target="_blank">${urlMatch[0]}</a></p>`;
                }
                continue;
            }

            // 处理小节标题
            // 格式: ## **灵修分享：** 或 **灵修分享：** 或 **灵修分享:**
            const sectionMatch = trimmedLine.match(/^(?:#{1,3}\s*)?\*{2}(.+?)[：:]\*{2}\s*$/);
            if (sectionMatch) {
                htmlContent += `<h3>${sectionMatch[1]}</h3>`;
                continue;
            }

            // 处理独立的加粗标题（如 **属灵原则：**）
            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                const innerText = trimmedLine.replace(/^\*{2}/, '').replace(/\*{2}$/, '').replace(/[：:]$/, '');
                if (innerText.includes('分享') || innerText.includes('时刻') ||
                    innerText.includes('原则') || innerText.includes('应用') ||
                    innerText.includes('祷告')) {
                    htmlContent += `<h3>${innerText}</h3>`;
                    continue;
                }
            }

            // 处理引言
            if (trimmedLine.startsWith('"') || trimmedLine.startsWith('"') || trimmedLine.startsWith('"')) {
                htmlContent += `<blockquote>${trimmedLine}</blockquote>`;
                continue;
            }

            // 处理编号列表
            if (/^\d+\.\s/.test(trimmedLine)) {
                htmlContent += `<p>${trimmedLine}</p>`;
                continue;
            }

            // 普通段落
            htmlContent += `<p>${trimmedLine}</p>`;
        }

        entries.push({
            title,
            content: htmlContent,
            publishDate: current.dateStr,
            status: 'published',
            views: 0
        });
    }

    // 按日期排序
    entries.sort((a, b) => a.publishDate.localeCompare(b.publishDate));

    return entries;
}

async function importDevotions() {
    console.log('========================================');
    console.log('      灵修数据批量导入工具');
    console.log('========================================\n');

    // 读取 markdown 文件
    const filePath = 'c:\\每日与主同行—2026年灵修（1-2月）.md';
    const markdownContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`✓ 成功读取文件: ${filePath}\n`);

    // 解析所有灵修条目
    const devotions = parseDevotions(markdownContent);
    console.log(`✓ 解析到 ${devotions.length} 篇灵修\n`);

    // 列出所有找到的日期
    console.log('日期分布:');
    const janDates = devotions.filter(d => d.publishDate.startsWith('2026-01')).map(d => parseInt(d.publishDate.slice(-2)));
    const febDates = devotions.filter(d => d.publishDate.startsWith('2026-02')).map(d => parseInt(d.publishDate.slice(-2)));
    console.log(`  1月: ${janDates.join(', ')}`);
    console.log(`  2月: ${febDates.join(', ')}\n`);

    // 先删除所有已存在的灵修条目
    console.log('正在清理现有数据...');
    const existingDocs = await db.collection('Articles').get();
    let deletedCount = 0;

    for (const doc of existingDocs.docs) {
        await doc.ref.delete();
        deletedCount++;
    }
    console.log(`✓ 已删除 ${deletedCount} 条现有数据\n`);

    // 批量写入新数据
    console.log('正在写入新数据...');
    let successCount = 0;

    for (const devotion of devotions) {
        try {
            await db.collection('Articles').add({
                ...devotion,
                createdAt: FieldValue.serverTimestamp(),
            });
            successCount++;
            console.log(`  ✓ ${devotion.publishDate}: ${devotion.title}`);
        } catch (error) {
            console.error(`  ✗ 失败: ${devotion.title}`, error);
        }
    }

    console.log(`\n========================================`);
    console.log(`导入完成! 成功: ${successCount}/${devotions.length}`);
    console.log(`========================================`);
}

importDevotions().catch(console.error);
