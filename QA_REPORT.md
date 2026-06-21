# Jashnly QA Report

## Release Checkpoint

Jashnly MVP release checkpoint prepared on June 21, 2026.

The checkpoint includes event/template/theme persistence, event-specific public links and sharing, demo authentication, organizer/public route separation, memory albums, opening animations, browser-local guest photo contributions, and automated smoke coverage.

## Required Verification

- `npm run typecheck` — passed
- `npm run build` — passed; all 14 static pages generated and dynamic event routes compiled
- `npm run test:e2e` — passed; 1 Chromium smoke flow

## Routes Covered

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

### Protected organizer routes

- `/create/step-1` through `/create/step-4`
- `/dashboard`
- `/dashboard/[id]`
- `/profile`

## QA-Passed Behavior

- Event type persists from selection through draft, dashboard, and public event page.
- Selected template and template metadata persist after publishing.
- Selected theme persists and applies to event templates, dashboard cards, share surfaces, and QR posters.
- Birthday, housewarming, and wedding content do not fall back to the wrong wedding mock.
- Generated slugs are collision-safe and share links use the current browser origin.
- QR codes, copied links, Web Share payloads, and WhatsApp messages use the current event.
- Malayalam messages use readable Unicode and event-aware wording.
- Dashboard checklists calculate from actual event data.
- Create, dashboard, and profile routes require a demo session.
- Guest event routes remain public after logout.
- Organizer analytics are labeled and absent from public event pages.
- Opening animations persist, support Skip and reduced motion, and play once per session.
- `/event/[slug]/memories` provides an event-aware post-event album.
- Guest photo contributions validate, persist locally, and reappear after refresh.
- Landing carousel uses WebP event cards and does not cause document-level horizontal overflow.

## Automated Smoke Coverage

The Chromium Playwright flow verifies:

1. Homepage and celebration carousel
2. Protected dashboard redirect
3. Demo registration
4. Birthday template selection
5. Four-step create and publish flow
6. Collision-safe slug generation
7. Royal theme persistence
8. Organizer-only analytics
9. Public birthday content and opening animation
10. Once-per-session animation behavior
11. Event-specific QR/share page
12. Malayalam WhatsApp message
13. Memory album route
14. Guest photo upload and refresh persistence
15. Logout and route protection
16. Public event availability after logout

## Fixed Product Issues

- Default wedding template leakage
- Incomplete event/template/theme persistence
- Hardcoded Afsal/Fathima guest navigation and share data
- Incorrect QR, copy-link, and WhatsApp payloads
- Mock-derived dashboard checklist
- Public RSVP demo count leakage
- Missing organizer/public separation
- Missing demo registration, login, session, and logout
- Non-unique published-event slugs
- Malayalam mojibake
- Wedding-only categories copy
- Missing memory route
- Missing opening experiences
- Missing guest contribution flow

## Known Remaining Issues

- Demo auth uses localStorage and is not production security.
- No backend, database, server authorization, or cross-device synchronization exists.
- Guest uploads use small local data URLs rather than production media storage.
- Analytics and RSVP totals remain demo values.
- Instagram and Facebook controls are placeholders.
- No lint npm script is configured.
- `npm audit` reports two moderate Next.js/PostCSS findings without a safe non-breaking automated fix.

## Recommended Next Development Batch

1. Add a backend, production authentication, and event ownership enforcement.
2. Add durable media storage and upload moderation.
3. Persist RSVPs, blessings, views, and analytics server-side.
4. Add CI for typecheck, build, and Playwright.
5. Add linting and broader wedding/housewarming end-to-end tests.
