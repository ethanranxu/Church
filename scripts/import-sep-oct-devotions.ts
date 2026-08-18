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
    // # 9月1日｜...
    // # **9月2日｜...**
    // # 10月1日|...
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
            // 跳过重复的日期标题行 (如 **9月1日｜..., ### **9月1日｜...)
            if (line.match(/^(?:#{1,3}\s+)?\*{0,2}\d+月\d+日[｜|]/)) continue;
            // 跳过单独的 # 或 ##
            if (/^#{1,3}\s*$/.test(line)) continue;
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

            // ⚠️ 跳过所有形式 of 日期标题行（不应出现在正文中）
            if (/^\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;
            if (/^#{1,3}\s+\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;

            // 处理经文链接（含"阅读经文链接："提示行）
            if (trimmedLine === '阅读经文链接：' || trimmedLine === '阅读经文链接:') continue;
            if (trimmedLine.startsWith('http') || trimmedLine.startsWith('[http')) {
                const urlMatch = trimmedLine.match(/https?:\/\/[^\s\]\)]+/);
                if (urlMatch) {
                    htmlContent += `<p><a href="${urlMatch[0]}" target="_blank">${urlMatch[0]}</a></p>`;
                }
                continue;
            }

            // 处理小节标题（如 **灵修分享：**、### **属灵原则：**、默想时刻： 等）
            const cleanedHeader = trimmedLine
                .replace(/^#{1,3}\s*/, '')
                .replace(/^\*{1,2}/, '')
                .replace(/\*{1,2}$/, '')
                .replace(/[：:]$/, '')
                .trim();
            if (['灵修分享', '默想时刻', '属灵原则', '生活应用', '回应祷告'].includes(cleanedHeader)) {
                htmlContent += `<h3>${cleanedHeader}</h3>`;
                continue;
            }

            const sectionMatch = trimmedLine.match(/^(?:#{1,3}\s*)?(?:\*{2})(.+?)[：:]\*{2}\s*$/);
            if (sectionMatch) {
                htmlContent += `<h3>${sectionMatch[1]}</h3>`;
                continue;
            }

            // 处理引言
            if (trimmedLine.startsWith('"') || trimmedLine.startsWith('“') || trimmedLine.startsWith('”')) {
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

async function runDryRunOrImport(isDryRun: boolean = true) {
    console.log('========================================');
    console.log(` 9-10月灵修数据导入 (${isDryRun ? 'DRY-RUN 预览模式' : '正式导入模式'})`);
    console.log(' 注意：绝不修改或删除现有数据！');
    console.log('========================================\n');

    // 查找文件
    const possiblePaths = [
        path.join(__dirname, '..', '每日与主同行—2026年灵修（9-10月）.md'),
        path.join(__dirname, '..', '..', '每日与主同行—2026年灵修（9-10月）.md'),
        'c:\\每日与主同行—2026年灵修（9-10月）.md',
    ];

    let filePath = '';
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            filePath = p;
            break;
        }
    }

    if (!filePath) {
        console.error('未找到 9-10 月灵修文件！');
        return;
    }

    const markdownContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`✓ 成功读取文件: ${filePath} (${markdownContent.length} 字符)\n`);

    const devotions = parseDevotions(markdownContent);
    console.log(`✓ 解析到 ${devotions.length} 篇灵修\n`);

    const sepDates = devotions.filter(d => d.publishDate.startsWith('2026-09')).map(d => parseInt(d.publishDate.slice(-2)));
    const octDates = devotions.filter(d => d.publishDate.startsWith('2026-10')).map(d => parseInt(d.publishDate.slice(-2)));
    console.log(`  9月 (${sepDates.length}篇): ${sepDates.join(', ')}`);
    console.log(`  10月 (${octDates.length}篇): ${octDates.join(', ')}\n`);

    // 检查数据库中现有已存在的记录
    console.log('正在读取 Firestore 中已有的 Articles 记录...');
    const snapshot = await db.collection('Articles').get();
    const existingDates = new Set<string>();
    const existingMap = new Map<string, any>();

    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.publishDate) {
            existingDates.add(data.publishDate);
            existingMap.set(data.publishDate, { id: doc.id, title: data.title });
        }
    });

    console.log(`✓ 数据库当前共有 ${snapshot.size} 篇文章，已覆盖 ${existingDates.size} 个唯一日期。\n`);

    // 检查冲突/重合情况
    const toInsert: DevotionEntry[] = [];
    const skipped: { date: string; title: string; existingTitle: string }[] = [];

    for (const d of devotions) {
        if (existingDates.has(d.publishDate)) {
            skipped.push({
                date: d.publishDate,
                title: d.title,
                existingTitle: existingMap.get(d.publishDate)?.title || ''
            });
        } else {
            toInsert.push(d);
        }
    }

    if (skipped.length > 0) {
        console.log(`⚠️ 检测到 ${skipped.length} 篇已存在于数据库中的日期（按要求将保留现有数据，跳过导入）：`);
        for (const s of skipped) {
            console.log(`   - ${s.date}: 现有="${s.existingTitle}" | 待导入="${s.title}"`);
        }
        console.log('');
    } else {
        console.log(`✓ 数据库中无重合日期，所有 ${toInsert.length} 篇均为新增数据。\n`);
    }

    console.log(`待新增篇数: ${toInsert.length} 篇\n`);

    // 打印前3篇预览
    console.log('--- 详细解析清单 ---');
    for (let i = 0; i < devotions.length; i++) {
        const d = devotions[i];
        const h3Count = (d.content.match(/<h3>/g) || []).length;
        const pCount = (d.content.match(/<p>/g) || []).length;
        const blockquoteCount = (d.content.match(/<blockquote>/g) || []).length;
        console.log(`[${i + 1}/${devotions.length}] ${d.publishDate} | ${d.title} (HTML: ${d.content.length} chars, h3: ${h3Count}, p: ${pCount}, quote: ${blockquoteCount})`);
        
        if (!d.title || d.content.length < 100 || h3Count === 0) {
            console.warn(`⚠️ 警告: ${d.publishDate} 可能解析不完整!`);
        }
    }
    console.log('---------------------------\n');

    if (isDryRun) {
        console.log('💡 当前为 Dry-Run 模式，未对数据库进行写入。');
        return;
    }

    // 正式执行插入
    console.log('开始写入数据库...');
    let successCount = 0;
    for (const devotion of toInsert) {
        try {
            await db.collection('Articles').add({
                ...devotion,
                createdAt: FieldValue.serverTimestamp(),
            });
            successCount++;
            console.log(`  ✓ 已上传 [${devotion.publishDate}] ${devotion.title}`);
        } catch (err) {
            console.error(`  ✗ 上传失败 [${devotion.publishDate}] ${devotion.title}:`, err);
        }
    }

    console.log(`\n========================================`);
    console.log(`🎉 导入完成! 成功新增: ${successCount} 篇，跳过已有: ${skipped.length} 篇`);
    console.log(`========================================`);
}

// 检查命令行参数 --execute
const isExecute = process.argv.includes('--execute');
runDryRunOrImport(!isExecute).catch(console.error);
