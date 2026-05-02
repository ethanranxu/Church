# 权限管理系统说明 (Admin Permissions Guide)

本项目已从传统的基于角色（Role-based）的权限控制迁移为细粒度的基于页面（Page-based）的权限控制。

## 权限逻辑
不再检查用户是否为 "admin" 或 "editor"，而是检查用户是否具有访问特定页面（如 `bulletins`, `devotions`, `users`）的显式权限。

## Firestore 结构
用户权限存储在 `admins` 集合的文档中：
```json
{
  "email": "user@example.com",
  "permissions": {
    "bulletins": true,
    "devotions": true,
    "users": false,
    "settings": true
  }
}
```

## UI 集成
- **导航栏**: `AdminNavbar` 会根据当前登录用户的 `permissions` 动态显示或隐藏功能链接。
- **页面路由**: 页面级组件会通过 `useAdminAuth` 钩子验证当前路径的访问权限。

## 管理操作
超级管理员（或具有 `users` 权限的用户）可以在后台修改其他管理员的权限勾选框。
