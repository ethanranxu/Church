# Church Management System

本项目是一个基于 Next.js 构建的教会管理系统，旨在简化行政流程并增强会友连接。

## 核心功能

- **自动化周报**：在线编辑并导出 Word 周报。提供往期历史周报搜索。
- **每日灵修**：集成日历和灵修内容展示，支持多种格式。
- **后台管理**：全表居中对齐优化。细粒度权限控制，管理页面内容、会友信息及权限。
- **多教会支持**：支持多个分堂（如木槿灣、長灣）的信息展示。

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 运行开发服务器
```bash
npm run dev
```

### 3. 环境配置
在 `.env.local` 中配置以下变量：
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: 地图 API。
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: Firebase Admin SDK 配置。
- `DASHSCOPE_API_KEY`: 阿里云通义千问 API 密钥。

## 技术栈
- **前端**: Next.js 16, React 19, Tailwind CSS
- **后端**: Firebase Firestore, Firebase Auth
- **文档生成**: docx, docxtemplater

## 部署
推荐使用 [Vercel](https://vercel.com) 部署。确保在环境变量中正确配置 Firebase 和 Google Maps 密钥。

---
*Last Updated: 2026-05-23*

