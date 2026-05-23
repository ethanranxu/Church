# 权限管理系统说明 (Admin Permissions Guide)

本项目已从传统的基于角色（Role-based）的权限控制迁移为细粒度的基于页面路径（Path-based）的权限控制。

## 权限逻辑
系统不再简单检查用户是否为 "admin" 或 "editor"，而是检查用户是否具有访问特定页面路径的权限。
- **权限豁免项**：`個人資料` (`/admin/settings/password`) 是基础功能，对所有已通过白名单验证的登录用户开放。该页面支持头像上传、手机号修改及基本信息展示，不受权限勾选框限制。
- **普通页面**：如 `系統用戶`, `每日靈修`, `代禱需求` 等，必须在用户管理中显式勾选对应的路径方可访问。

## Firestore 结构
用户信息及权限存储在 `Users` 集合中（由 `firebase-admin` 在服务端管理）：

```json
{
  "name": "张三",
  "email": "user@example.com",
  "level": "admin",
  "permissions": [
    "/admin",
    "/admin/devotions",
    "/admin/prayers"
  ],
  "phone": "12345678",
  "avatar": "data:image/jpeg;base64,..."
}
```

- `permissions`: 存储该用户可访问的路径前缀数组。
- `level`: `super_admin` 拥有全系统最高权限，跳过所有路径校验。

## UI 集成
- **侧边栏 (Sidebar)**: `AdminSidebar` 组件会根据 `profile.permissions` 数组动态渲染功能链接。
- **全局布局保护**: `src/app/admin/layout.tsx` 负责路由守卫。如果用户尝试通过 URL 直接访问未授权页面，会被自动重定向至其拥有的第一个权限页面或个人资料页。

## 管理操作
超级管理员可以在 `系统用户管理` 页面通过勾选框修改其他管理员的权限。修改后，系统会自动调用 Server Action 同步至 Firestore。

---
*更新日期：2026-05-23*
