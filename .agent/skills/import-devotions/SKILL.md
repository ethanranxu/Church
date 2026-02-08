---
name: import-devotions
description: 导入每日灵修数据到 Firestore Articles 集合
---

# 每日灵修数据导入 Skill

将灵修内容从 markdown 文件批量导入到 Firestore `Articles` 集合。

## 数据源格式

灵修源文件（如 `c:\每日与主同行—2026年灵修（1-2月）.md`）存在**多种标题格式变体**：

```markdown
# 1月1日｜标题（经文范围）
# **1月3日｜标题（经文范围）**
# 1月5日｜标题（经文范围）

**1月1日｜标题（经文范围）**  ← 重复标题行，需跳过

[经文链接...]

**灵修分享：**
[正文内容...]

**默想时刻：**
[内容...]

**属灵原则：**
[内容...]

**生活应用:**
[内容...]

**回应祷告：**
[内容...]
```

### ⚠️ 注意事项

1. **标题格式不一致**：有些是 `# 1月1日｜...`，有些是 `# **1月3日｜...**`
2. **重复标题行**：每个条目开头有 `# 标题` 和 `**标题**` 两行，需跳过第二行
3. **分隔符变体**：既有全角 `｜` 也可能有半角 `|`
4. **空 markdown 标记**：可能存在独立的 `##` 或 `###` 行

## 数据库格式

导入到 Firestore `Articles` 集合时的字段规范：

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | **不含日期前缀**，如：`从起初看见神的心意（创世记 1–2 章）` |
| `content` | string | HTML 格式，**不含标题行**，从经文链接开始 |
| `publishDate` | string | 格式：`YYYY-MM-DD`，如 `2026-01-01` |
| `status` | string | `published` 或 `draft` |
| `createdAt` | Timestamp | 使用 `FieldValue.serverTimestamp()` |
| `views` | number | 初始值 `0` |

## 快速导入

### 直接使用现有脚本

```bash
# 导入所有灵修数据（会先清空现有数据）
npx tsx scripts/import-all-devotions.ts
```

脚本位置：`scripts/import-all-devotions.ts`

## 解析逻辑（关键）

### 标题匹配正则

```typescript
// 匹配所有可能的标题格式
const titlePattern = /^#\s+\*{0,2}(\d+月\d+日[｜|].+?)\*{0,2}\s*$/gm;
```

这个正则可匹配：
- `# 1月1日｜标题`
- `# **1月3日｜标题**`
- `# 2月5日|标题`（半角分隔符）

### 日期去重

```typescript
const seenDates = new Set<string>();

// 每个日期只取第一个出现的标题
if (!seenDates.has(dateStr)) {
  seenDates.add(dateStr);
  titlePositions.push({ ... });
}
```

### 内容起始位置

```typescript
// 跳过重复的日期标题行
if (line.match(/^\*{0,2}\d+月\d+日[｜|]/)) continue;
// 跳过空的 markdown 标记
if (/^#{1,3}\s*$/.test(line)) continue;
```

### 正文内容过滤（关键！）

在处理每行内容时，必须过滤掉所有形式的标题行：

```typescript
// ⚠️ 跳过所有形式的日期标题行（不应出现在正文中）
// 格式: **1月1日｜标题** 或 1月1日｜标题 或 # **1月1日...
if (/^\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;
if (/^#{1,3}\s+\*{0,2}\d+月\d+日[｜|]/.test(trimmedLine)) continue;
```

## 完整脚本模板

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

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

function parseDevotions(markdownContent: string): DevotionEntry[] {
  const entries: DevotionEntry[] = [];
  const seenDates = new Set<string>();
  const normalizedContent = markdownContent.replace(/\r\n/g, '\n');
  
  // 匹配所有标题格式变体
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
      
      if (!seenDates.has(dateStr)) {
        seenDates.add(dateStr);
        titlePositions.push({ index: match.index, title: fullTitle, dateStr });
      }
    }
  }
  
  for (let i = 0; i < titlePositions.length; i++) {
    const current = titlePositions[i];
    const nextIndex = i + 1 < titlePositions.length 
      ? titlePositions[i + 1].index 
      : normalizedContent.length;
    
    const sectionContent = normalizedContent.substring(current.index, nextIndex);
    const lines = sectionContent.split('\n');
    
    const titleMatch = current.title.match(/\d+月\d+日[｜|](.+)/);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    
    // 找内容起始位置，跳过重复标题
    let contentStartIndex = -1;
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;
      if (line.match(/^\*{0,2}\d+月\d+日[｜|]/)) continue;
      if (/^#{1,3}\s*$/.test(line)) continue;
      contentStartIndex = j;
      break;
    }
    
    if (contentStartIndex === -1) continue;
    
    // 构建 HTML
    let htmlContent = '';
    for (const line of lines.slice(contentStartIndex)) {
      const trimmed = line.trim();
      if (!trimmed || /^#{1,3}\s*$/.test(trimmed)) continue;
      
      // ⚠️ 过滤掉正文中的标题行
      if (/^\*{0,2}\d+月\d+日[｜|]/.test(trimmed)) continue;
      if (/^#{1,3}\s+\*{0,2}\d+月\d+日[｜|]/.test(trimmed)) continue;
      
      // 经文链接
      if (trimmed.startsWith('http') || trimmed.startsWith('[http')) {
        const urlMatch = trimmed.match(/https?:\/\/[^\s\]\)]+/);
        if (urlMatch) {
          htmlContent += `<p><a href="${urlMatch[0]}" target="_blank">${urlMatch[0]}</a></p>`;
        }
        continue;
      }
      
      // 小节标题
      const sectionMatch = trimmed.match(/^(?:#{1,3}\s*)?\*{2}(.+?)[：:]\*{2}\s*$/);
      if (sectionMatch) {
        htmlContent += `<h3>${sectionMatch[1]}</h3>`;
        continue;
      }
      
      // 引言
      if (trimmed.startsWith('"') || trimmed.startsWith('"')) {
        htmlContent += `<blockquote>${trimmed}</blockquote>`;
        continue;
      }
      
      // 编号列表
      if (/^\d+\.\s/.test(trimmed)) {
        htmlContent += `<p>${trimmed}</p>`;
        continue;
      }
      
      // 普通段落
      htmlContent += `<p>${trimmed}</p>`;
    }
    
    entries.push({ title, content: htmlContent, publishDate: current.dateStr, status: 'published', views: 0 });
  }
  
  return entries.sort((a, b) => a.publishDate.localeCompare(b.publishDate));
}

async function importDevotions() {
  const filePath = 'c:\\每日与主同行—2026年灵修（1-2月）.md';
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  const devotions = parseDevotions(markdownContent);
  
  console.log(`解析到 ${devotions.length} 篇灵修`);
  
  // 清空现有数据
  const existing = await db.collection('Articles').get();
  for (const doc of existing.docs) {
    await doc.ref.delete();
  }
  
  // 写入新数据
  for (const d of devotions) {
    await db.collection('Articles').add({ ...d, createdAt: FieldValue.serverTimestamp() });
    console.log(`✓ ${d.publishDate}: ${d.title}`);
  }
  
  console.log(`\n导入完成: ${devotions.length} 篇`);
}

importDevotions().catch(console.error);
```

## 单独删除脚本

```bash
# 删除所有灵修数据
npx tsx scripts/delete-all-devotions.ts
```

## 示例脚本位置

| 脚本 | 用途 |
|------|------|
| `scripts/import-all-devotions.ts` | 一键导入所有灵修（推荐） |
| `scripts/delete-all-devotions.ts` | 删除所有灵修数据 |
| `scripts/import-first-2-days.ts` | 测试用：仅导入前 2 天 |
