# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-05-13

### Added
- **灵修数据导入工具 (Devotion Import Tools)**:
  - `scripts/import-may-jun-devotions.ts`: 5-6月灵修数据导入脚本，支持先删除旧数据再全量导入。
  - `scripts/delete-all-devotions.ts`: 删除所有灵修数据的脚本。

### Changed
- **灵修数据更新 (Devotions Update)**: 删除了数据库中原有的 52 篇 5-6 月灵修文章，并使用最新的 markdown 文件重新清洗后上传。

## [Unreleased] - 2026-05-07

### Changed
- **后台界面标准化 (Admin UI Standardization)**: 统一了所有管理后台模块（周报、灵修、用户、探访、活动日志）的表格对齐方式，表格头部和内容列均改为居中显示，提升视觉整洁度。
- **首页周报交互优化 (Homepage Bulletin UX)**: 
  - 在首页「主日信息」板块增加了「查看往期周报」功能，通过弹出模态框（HistoryBulletinsModal）支持按日期和关键词搜索历史周报。
  - 优化了首页最新周报的加载逻辑，通过新 API 路由 `/api/bulletin/latest` 实时获取最新发布的周报。

### Added
- **历史周报模态框 (HistoryBulletinsModal)**: 全新的搜索和筛选界面，方便会友查找历史周报。
- **最新周报 API (Latest Bulletin API)**: 增加 `/api/bulletin/latest` 路由，用于快速检索当前发布的周报。
- **运维工具集 (Maintenance Scripts)**: 
  - `scripts/setup-storage.js`: 初始化 Firebase Storage 权限与存储桶。
  - `scripts/fix-cors.js`: 解决 Firebase Storage 的跨域资源共享问题。
  - `scripts/migrate-status.js`: 迁移旧版周报状态字段。
  - `scripts/debug-bulletins.js`: 调试周报数据结构。

## [Unreleased] - 2026-05-03

### Changed
- **側邊栏導航重構 (Sidebar Refactoring)**:
  - 將「個人資料」從「教會週報」邏輯中解耦，設為導航欄常駐項，對所有登錄用戶可見。
  - 更換個人資料圖標為 `User`，提升識別度。
  - 優化權限過濾機制，確保個人資料頁面不被普通管理員的權限列表意外攔截。
- **個人資料頁面增強 (Profile Page Enhancements)**:
  - 增加姓名、郵箱等基本身份信息的唯讀展示。
  - 針對 **Google 登錄用戶**，自動隱藏密碼修改區域，僅保留頭像和手機號修改功能，避免操作混淆。
- **認證日誌優化 (Auth Logging Optimization)**:
  - 屏蔽了 `auth/popup-closed-by-user` 錯誤的控制台日誌，減少用戶主動關閉登錄彈窗時產生的噪音。

## [Unreleased] - 2026-05-02

### Added
- **個人資料管理 (Profile Management)**: 
  - 将“修改密码”页面重构为完整的“个人资料”页面，支持头像上传和手机号修改。
  - 集成本地图片压缩逻辑，确保上传头像大小控制在 100KB 以内。
  - 头像存储方案统一为 Base64 字符串存入 Firestore `Users` 集合。
- **自动消退提示 (Auto-fading Toast)**: 个人资料保存及周报保存操作现在使用 3 秒自动消退的横幅提示，取代了浏览器 `alert()`。

### Changed
- **周报管理优化**: 
  - 简化保存流程，将“保存草稿”改为“保存”，移除“保存并发布”。
  - 列表状态现在显示为“保存”或“已下载”。
  - 列表新增“最後操作人”字段，记录最后一次保存数据的管理员姓名。
  - 更新了周报生成的 Word 模板至最新版本。
- **认证与重定向优化**: 
  - 优化登录流程，解决认证通过后返回登录页的停顿问题，通过即时全屏加载状态和 `useEffect` 监听实现秒级跳转。
  - 修复 `AuthProvider` 中的双重验证请求，防止手动登录与自动监听逻辑冲突，提升响应速度。
  - 修复了受限权限管理员在登录后短暂闪现“仪表板”的问题，现在直接跳转至其可访问的首个页面。
  - 修复了 `verifyUser` 中因字段覆盖导致的文档 ID 丢失 Bug。

## [0.2.1] - 2026-04-29

### 状态逻辑
- **保存 (Saved)**: 内容已存入数据库，但尚未生成最终 Word 文档。
- **已下载 (Downloaded)**: 内容已保存且已成功生成并下载过 `.docx` 文件。

### 操作人记录
系统会自动记录最后一次保存或生成周报的管理员姓名，并展示在管理列表的“最後操作”列中。

### Added
- **智能周报系统 (Automated Bulletin System)**: 
  - 支持从 `.docx` 模板自动填充占位符。
  - 集成 Firebase 后端存储周报数据。
  - 动态管理后台界面，支持多标签页编辑。
- **权限管理系统 (Permission System)**: 
  - 实现基于页面的细粒度权限控制。
  - 移除原有的硬编码角色限制。
- **通义千问 API 集成**: 支持通过阿里云大模型生成内容（灵修、总结等）。

## [0.2.0] - 2026-02-27

### Fixed
- 修复 `Navbar` 组件中的导航链接悬停样式，增加 `transition-colors` 效果。
- 修复 `Navbar` 中 `Link` 标签闭合处的语法错误。

### Added
- **信仰告白 (Statement of Faith)**: 新增「植堂教會」板块，详细介绍木槿灣基督教會和長灣基督教會的相关信息、照片及徽标。
- **代祷需求 (Prayer Request)**: 新增代祷需求页面 `/prayer`，提供代祷申请表单及联系信息。
- **新朋友专区 (Welcome)**: 新增新朋友专区 `/welcome`，包含牧者见证、聚会指南及常见问题解答。
- **每日灵修 (Daily Devotion)**: 新增每日灵修页面 `/devotion`，集成日历组件、金句卡片及灵修话题流。
- **查经资源 (Bible Study)**: 新增查经资源汇总页 `/bible-study`。

### Changed
- **页面间距样式**: 统一了信仰告白、事奉團隊、奉献信息等多个页面的顶距和板块间距。
- **奉献信息 (Offering)**: 更新了银行账号信息，优化了金句卡片排版，并实现在点击账号时自动复制到剪贴板。
- **首页 (Homepage)**: 更新了 Hero 板块的奥克兰全景图，并重新对齐了「核心价值」板块的图标与标题。
