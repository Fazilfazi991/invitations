# Jashnly

Jashnly is a mobile-first event invitation MVP built around one shareable link for weddings, birthdays, housewarmings, naming ceremonies, religious events, receptions, business openings, and custom celebrations.

The current release includes:

- Event-type-aware create and publish flow
- Multiple wedding and birthday templates
- Persistent Blush, Sage, Classic, and Royal themes
- Event opening animations
- Date, time, venue, schedule, countdown, RSVP, contacts, gallery, blessings, QR, and WhatsApp sharing
- Organizer dashboard with event-aware checklist and demo analytics
- Public guest invitation and subpages
- Post-event memory albums and browser-local guest photo contributions
- Browser-local demo registration, login, session, and protected organizer routes
- Playwright end-to-end smoke coverage

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- lucide-react
- framer-motion
- qrcode.react
- Playwright
- localStorage and sessionStorage demo persistence

## Routes

### Public

- `/`
- `/categories`
- `/login`
- `/register`
- `/vendors`
- `/event/[slug]`
- `/event/[slug]/schedule`
- `/event/[slug]/locations`
- `/event/[slug]/rsvp`
- `/event/[slug]/gallery`
- `/event/[slug]/blessings`
- `/event/[slug]/share`
- `/event/[slug]/memories`
- `/event/[slug]?mode=memory`

### Demo-auth protected organizer routes

- `/create/step-1`
- `/create/step-2`
- `/create/step-3`
- `/create/step-4`
- `/dashboard`
- `/dashboard/[id]`
- `/profile`

## Demo Authentication

Registration and login are intentionally browser-local for this MVP:

- User and session records are stored in localStorage.
- Organizer pages redirect unauthenticated visitors to `/login`.
- Public event pages remain accessible without login.
- Logout clears the demo session.

This is product-flow separation, not production security. Real authentication, secure password handling, server-side authorization, account recovery, and multi-device sessions require a backend.

## Storage Limitations

Jashnly currently has no backend.

- Drafts, published events, demo users, and guest memories exist only in the current browser.
- Clearing browser storage removes this data.
- Data does not synchronize across browsers or devices.
- Guest photo uploads are stored as small data URLs, limited to 1 MB each and eight photos per event.
- File-name placeholders from create-flow uploads are not durable media uploads.
- Analytics and RSVP totals are demo data rather than server-collected metrics.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate the Release

```bash
npm run typecheck
npm run build
```

Install the Playwright Chromium browser once:

```bash
npx playwright install chromium
```

Run the end-to-end smoke test:

```bash
npm run test:e2e
```

Optional interactive runner:

```bash
npm run test:e2e:ui
```

The smoke test covers demo auth, protected routes, landing carousel behavior, birthday creation and publishing, collision-safe slugs, theme persistence, opening animation session behavior, organizer/public separation, QR/share data, Malayalam messaging, memory albums, guest uploads, and logout.

## Known Remaining Issues

- Demo authentication and authorization are not suitable for production.
- Media uploads need object storage, moderation, and server metadata.
- Instagram and Facebook actions remain visual placeholders.
- Analytics and RSVP persistence need backend event tracking.
- No lint npm script is configured yet.
- `npm audit` currently reports two moderate findings involving Next.js' nested PostCSS dependency; npm proposes a breaking major-version change, so no forced fix has been applied.

See [QA_REPORT.md](./QA_REPORT.md) for the release verification record.
