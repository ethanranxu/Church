# Project Conventions (Church Management System)

## Commands
- **Run Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure
- `src/app`: Next.js App Router pages and server actions
- `src/app/api`: Server-side API routes (e.g., latest bulletin fetch)
- `src/components`: Reusable UI components
- `src/utils`: Helper functions (e.g., `docxUtils.ts` for bulletin generation)
- `src/lib/firebase`: Firebase configuration and client/admin initialization
- `scripts/`: Maintenance scripts:
    - `setup-storage.js`: Initialize Firebase Storage.
    - `fix-cors.js`: Fix Storage CORS issues.
    - `migrate-status.js`: Migrate bulletin status fields.
    - `debug-bulletins.js`: Debug Firestore data structure.
    - `import-may-jun-devotions.ts`: Import May-June devotions (clear first).
    - `delete-all-devotions.ts`: Delete all devotion data.

## Features
- **Weekly Bulletin System**: Automated .docx generation from placeholders. Includes **Last Operator** tracking, a homepage **History Search** feature, and a dedicated **Latest Bulletin API**.
- **Daily Devotions**: Calendar-based devotion system with daily Scripture and topics.
- **Admin Dashboard**: Permission-based management. All tables (Users, Visits, Bulletins, Devotions, Activity Logs) are **center-aligned** for visual consistency. Includes **Profile** management (Avatar, Phone, Info) for all users.
- **Image Handling**: Client-side compression for avatars (Canvas API), stored as Base64 in Firestore `Users` collection (target < 100KB).
- **Church Info**: Static and dynamic pages for church vision, team, and locations.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Firebase (Firestore & Auth)
- docx / docxtemplater (Document generation)
- Tailwind CSS

## Knowledge Cleanup Policy
- Document new placeholders in `public/templates/bulletin-template.docx` in the internal wiki.
- **Auth Pattern**: Use `router.replace` for auth redirects to avoid history loops.
- **Auth Pattern**: Always include immediate redirection logic in `LoginPage` to handle active sessions.
- Update `CHANGELOG.md` after every major feature deployment.
- Keep `src/utils/docxUtils.ts` types in sync with Firestore schema.
