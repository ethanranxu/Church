# 智能周报系统说明 (Bulletin System Guide)

本项目通过解析 Word 模板（`.docx`）并填充 Firebase 数据，实现自动化周报生成。

## 模板机制
模板路径: `public/templates/bulletin-template.docx`

系统使用 `docxtemplater` 识别模板中的 `{{占位符}}`。

### 常用占位符清单
- `{{周报时间}}`: 本周主日日期及届次
- `{{报告1}}`, `{{报告2}}` ...: 各项报告内容
- `{{经文1}}`: 本周证道经文
- `{{讲员1}}`: 证道讲员
- `{{诗歌1}}` ...: 敬拜诗歌清单

## 数据存储
周报内容存储在 Firestore 的 `Bulletins` 集合中。每个文档包含一个 `contentData` 对象，其键名与模板中的占位符一一对应。

### 状态逻辑
- **保存 (Saved)**: 内容已存入数据库，但尚未生成最终 Word 文档。
- **已下载 (Downloaded)**: 内容已保存且已成功生成并下载过 `.docx` 文件。

### 操作记录
系统会自动记录最后一次保存或生成周报的管理员姓名，并展示在管理列表的“最後操作”列中。

## 管理后台
路径: `/admin/bulletins`

管理员可以通过多标签页（Tab）界面编辑各项内容。点击“生成周报”后，系统会：
1. 从 Firestore 获取 `contentData`。
2. 读取本地 `周报模板.docx`。
3. 执行变量替换。
4. 提供 `.docx` 文件下载。

## 技术细节
- **解析引擎**: `pizzip` + `docxtemplater`
- **前端实现**: `src/app/admin/bulletins/BulletinsClient.tsx`
- **工具类**: `src/utils/docxUtils.ts`
- **公共 API**: `/api/bulletin/latest` - 返回最新的一条状态为「已下载」的周报，用于首页展示。
- **历史查询**: 首页「主日信息」板块集成 `HistoryBulletinsModal.tsx`，支持通过日期范围和标题关键词过滤 Firestore 中的 `Bulletins` 集合。
- **界面一致性**: 后台周报管理列表已统一为居中对齐样式。

---
*更新日期：2026-05-23*
