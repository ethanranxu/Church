---
trigger: always_on
---

# Frontend Rules — React + Next.js + TypeScript (NZ Standard)

## Stack
- React
- Next.js (App Router only)
- TypeScript (strict)

---

## Language & Typing
- TypeScript is mandatory.
- `strict: true` must be enabled.
- No `any`, no implicit `any`, no `unknown` without narrowing.
- Prefer `type` over `interface` unless extension is required.
- All component props, hooks, API responses must be explicitly typed.
- External data must be runtime-validated (e.g. zod).

---

## Next.js Architecture
- App Router (`/app`) only. Pages Router is forbidden.
- Server Components by default.
- Client Components only when required (`"use client"`).
- Data fetching must occur in:
  - Server Components
  - Route Handlers
- Client Components must not fetch critical data.

---

## Client Components
- Must explicitly declare `"use client"`.
- Allowed responsibilities:
  - UI state
  - User interactions
  - Event handling
- Forbidden:
  - Direct database access
  - Business logic
  - Critical data fetching

---

## State Management
- Prefer server state over client state.
- Use:
  - URL state
  - Props
  - React Context (UI-only, low-frequency updates)
- Redux / Zustand only if state complexity cannot be expressed otherwise.

---

## Styling
- Tailwind CSS is the default.
- No CSS-in-JS unless unavoidable.
- No global styles except reset and CSS variables.
- Styles must be component-scoped.
- No inline styles unless dynamic.

---

## Component Design
- Components must be small, pure, and composable.
- No side effects during render.
- Hooks:
  - One responsibility per hook
  - Must start with `use`
- No deeply nested components without justification.

---

## File & Folder Structure