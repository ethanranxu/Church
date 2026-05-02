# Project Conventions (Church Management System)

## Commands
- **Run Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure
- `src/app`: Next.js App Router pages
- `src/components`: Reusable UI components
- `src/utils`: Helper functions (e.g., `docxUtils.ts` for bulletin generation)
- `src/lib/firebase`: Firebase configuration and client/admin initialization
- `scripts/`: Maintenance and data import scripts

## Features
- **Weekly Bulletin System**: Automated .docx generation from placeholders in `public/templates/bulletin-template.docx`.
- **Daily Devotions**: Calendar-based devotion system with daily Scripture and topics.
- **Admin Dashboard**: Permission-based management for bulletins, devotions, and users. Includes **Profile** (`/admin/settings/password`) for personal settings.
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
