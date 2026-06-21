# occazn

occazn is a mobile-first event invitation MVP built around one shareable link for weddings, birthdays, housewarmings, naming ceremonies, religious events, receptions, business openings, and custom celebrations.

Tagline: One beautiful link for every celebration.

The current release includes:

- Event-type-aware create and publish flow
- Multiple wedding and birthday templates
- Persistent Blush, Sage, Classic, and Royal themes
- Event opening animations
- Date, time, venue, schedule, countdown, RSVP, contacts, gallery, blessings, QR, and WhatsApp sharing
- Organizer dashboard with event-aware checklist and demo analytics
- Public guest invitation and subpages
- Post-event memory albums and Supabase Storage-backed guest photo contributions
- Supabase registration, login, session, and protected organizer routes
- Supabase Postgres persistence, Row Level Security, and Storage-backed guest photos
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
- Supabase Auth, Postgres, Storage, and Row Level Security
- localStorage cache and sessionStorage opening-animation state

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

### Auth-protected organizer routes

- `/create/step-1`
- `/create/step-2`
- `/create/step-3`
- `/create/step-4`
- `/dashboard`
- `/dashboard/[id]`
- `/profile`

## Supabase Setup

1. Copy the environment template:

```bash
copy .env.example .env.local
```

2. Set:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

3. Apply [`supabase/migrations/202606210001_jashnly_mvp.sql`](./supabase/migrations/202606210001_jashnly_mvp.sql) using the Supabase SQL Editor, or link the Supabase CLI and run `supabase db push`.

4. In Supabase Auth URL configuration, add local and deployed login URLs as allowed redirect URLs.

The migration creates:

- `profiles`
- `event_drafts`
- `events`
- `guest_memories`
- RLS policies for owners and public published events
- Public `guest-memories` Storage bucket with constrained upload policies
- New-user profile trigger

Only the anon/publishable key belongs in `NEXT_PUBLIC_*`. Never expose a service-role key.

## Authentication and Persistence

- Registration, login, email confirmation, sessions, and logout use Supabase Auth.
- Middleware and client guards protect organizer routes.
- Drafts are cached locally for responsive editing and queued to `event_drafts`.
- Published events are stored in `events`; public pages read only published records.
- Guest photos upload to Supabase Storage and metadata is stored in `guest_memories`.
- RLS restricts organizer data to `auth.uid()` while allowing public invitation reads.
- The old browser-local auth adapter is used only when Playwright builds with `NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE=true`.

## Current Limitations

- The migration is applied to the current Supabase project; it must also be applied to every new environment before live persistence is available there.
- Drafts and published events retain a local cache as an offline/demo fallback.
- Existing legacy localStorage events are not automatically imported into Supabase.
- Analytics and RSVP totals remain demo data rather than server-collected metrics.
- Guest uploads are public-by-link and auto-approved in this MVP; production moderation is still required.

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

The smoke test uses an isolated local adapter and covers auth flow, protected routes, landing carousel behavior, birthday creation and publishing, collision-safe slugs, theme persistence, opening animation session behavior, organizer/public separation, QR/share data, Malayalam messaging, memory albums, guest uploads, and logout.

## Known Remaining Issues

- The initial Supabase migration must be deployed to each environment.
- Guest media needs moderation, abuse controls, and lifecycle policies.
- Instagram and Facebook actions remain visual placeholders.
- Analytics and RSVP persistence need backend event tracking.
- No lint npm script is configured yet.
- `npm audit` currently reports two moderate findings involving Next.js' nested PostCSS dependency; npm proposes a breaking major-version change, so no forced fix has been applied.

See [QA_REPORT.md](./QA_REPORT.md) for the release verification record.
