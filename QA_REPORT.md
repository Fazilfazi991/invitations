# occazn QA Report

## Release Checkpoint

occazn MVP release checkpoint prepared on June 21, 2026.

The checkpoint includes event/template/theme persistence, event-specific public links and sharing, Supabase authentication and persistence adapters, organizer/public route separation, memory albums, opening animations, Storage-backed guest photo contributions, and automated smoke coverage.

## Required Verification

- `npm run typecheck` — passed
- `npm run build` — passed; all 14 static pages generated and dynamic event routes compiled
- `npm run test:e2e` — passed; 1 Chromium smoke flow

## occazn Rebrand Validation

- Visible platform branding uses the supplied occazn logo asset.
- Platform UI tokens use the occazn purple palette while event-specific themes remain available.
- Royal/default fallback styling uses the occazn purple and lavender palette.
- Landing, authentication, dashboard, create, template selection, QR/share, and memory surfaces retain responsive behavior.
- The Chromium smoke flow passed with the occazn hero copy and palette.

## Live Supabase Validation

Validated against project `ecaedcomifelegtavrvk` on June 21, 2026:

- Migration `202606210001_jashnly_mvp.sql` applied successfully.
- Auth health, registration, email confirmation, login, and authenticated route access passed.
- The new-user trigger completed during registration; signup would roll back on a trigger failure.
- `profiles`, `event_drafts`, `events`, and `guest_memories` REST endpoints return HTTP 200.
- A birthday draft persisted across all four create routes without reverting to the wedding default.
- Publishing inserted a birthday event with the selected `pink-teddy-birthday` template and `blush` theme.
- The published event was readable anonymously and rendered birthday-specific content on its public page.
- A WebP guest photo uploaded to the `guest-memories` bucket successfully and was publicly readable.
- Guest memory metadata inserted with HTTP 201, read publicly with HTTP 200, and rendered in the memory album.
- Authenticated dashboards no longer append the three mock fallback events.

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
- Create, dashboard, and profile routes require a Supabase session in normal builds.
- Guest event routes remain public after logout.
- Organizer analytics are labeled and absent from public event pages.
- Opening animations persist, support Skip and reduced motion, and play once per session.
- `/event/[slug]/memories` provides an event-aware post-event album.
- Guest photo contributions validate, upload to Supabase Storage, persist metadata, and reappear after refresh.
- Landing carousel uses WebP event cards and does not cause document-level horizontal overflow.

## Automated Smoke Coverage

The Chromium Playwright flow verifies:

1. Homepage and celebration carousel
2. Protected dashboard redirect
3. Isolated test-adapter registration
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
- Missing registration, login, session, and logout
- Non-unique published-event slugs
- Malayalam mojibake
- Wedding-only categories copy
- Missing memory route
- Missing opening experiences
- Missing guest contribution flow

## Known Remaining Issues

- The production deployment domain is not recorded in the repository, so its Auth login/dashboard redirect URLs still need to be added when the domain is known.
- Supabase's generated Edge bundle emits a non-blocking `process.version` warning during the Playwright build.
- Legacy browser-local events are cached but are not automatically imported into Supabase.
- Guest uploads still need production moderation and abuse controls.
- Analytics and RSVP totals remain demo values.
- Instagram and Facebook controls are placeholders.
- No lint npm script is configured.
- `npm audit` reports two moderate Next.js/PostCSS findings without a safe non-breaking automated fix.

## Recommended Next Development Batch

1. Add the production login/dashboard URLs to the Supabase Auth redirect allowlist when the deployment domain is known.
2. Add guest media moderation and abuse controls.
3. Persist RSVPs, blessings, views, and analytics in Supabase.
4. Add CI for typecheck, build, and Playwright.
5. Add linting and broader wedding/housewarming end-to-end tests.
