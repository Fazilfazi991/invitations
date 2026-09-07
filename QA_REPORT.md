# Occazn Wedding MVP QA Report

## Release Date

September 7, 2026

## A. Release Verdict

`READY FOR WEDDING MVP RELEASE`

## B. Current Release Scope

- Wedding: **LIVE**
- Other event types: **COMING SOON**

## C. Backend Environment

- Supabase project: `ljunjvwkyqnnvejzasww`
- Project URL: `https://ljunjvwkyqnnvejzasww.supabase.co`
- Browser credential: public anon key only; no service-role or database secret is used by the application
- Baseline schema: applied September 7, 2026
- RSVP migration: `202609070001_add_rsvps.sql` applied September 7, 2026
- RLS: enabled for profiles, event drafts, events, guest memories, and RSVPs

## D. Authentication

- Verification type: **REAL Supabase session**
- Email/password signup: PASS
- Email confirmation: PASS
- Login: PASS
- Authenticated session established: PASS
- Protected dashboard access: PASS
- Refresh/session persistence: PASS
- Logout and protected-route redirect: PASS
- Login again and reopen event: PASS
- Auth configuration: email enabled, signups enabled, confirmation required, Google disabled
- Supabase Site URL: `https://occazn.com`
- Allowed redirects: `https://occazn.com/**`, `http://localhost:3000/**`, and `http://127.0.0.1:3000/**`
- QA organizer ID: `e25f00b3-8025-42b3-9a9a-9bb7642341b7`

## E. Real Wedding Creation

- Created through the real Occazn browser UI, not SQL
- Event ID: `b1535792-c838-49fc-ad4a-bb9fda5f3815`
- Slug: `christopher-alexander-noor-al-huda-wedding`
- Owner matches the authenticated QA organizer: PASS
- Event type: `wedding`
- Partner 1: `Christopher Alexander`
- Partner 2: `Noor Al Huda`
- Date: `2026-12-24`
- Time: `18:00:00`
- Venue: `Grand Ballroom, Address Sky View, Downtown Dubai`
- Map URL: `https://maps.google.com/?q=Address+Sky+View+Dubai`
- Template: `contemporary-luxe-wedding` / Modern Premium Wedding
- Publish status: `published`

## F. Database Persistence

- Application-driven draft writes reached `event_drafts`: PASS
- Application-driven event insert reached `events`: PASS
- Serialized Wedding data matched the submitted organizer values: PASS
- Publish status, slug, template, owner, date, time, venue, and canonical URL persisted: PASS
- Organizer dashboard refresh and navigation-away/return loaded the published record from Supabase: PASS
- Logout/login-again reopened the same real event: PASS
- A publish/draft cleanup race found during qualification was fixed by awaiting queued draft writes and checking draft-delete errors.
- The retained QA event was cleaned of obsolete default contact data; its completed draft was removed.

## G. Public Invitation

- Public URL: `https://occazn.com/i/christopher-alexander-noor-al-huda-wedding`
- Anonymous access against the Supabase-backed local application: PASS
- Anonymous refresh: PASS
- Correct partner names, date, time, venue, map, and template: PASS
- Organizer controls absent: PASS
- Private RSVP information absent: PASS
- Authentication requirement absent: PASS
- Stale `Kozhikode, Kerala` template fallback discovered during qualification: removed and reverified
- Production-domain HTTP reachability: not claimed; deployment was not authorized or performed

## H. QR

- `PUBLIC URL`: `https://occazn.com/i/christopher-alexander-noor-al-huda-wedding`
- `ENCODED QR TARGET`: `https://occazn.com/i/christopher-alexander-noor-al-huda-wedding`
- `DECODE RESULT`: programmatically decoded from the stored Supabase SVG using a QR decoder
- `MATCH`: **PASS**

## I. RSVP

- Submitted through the anonymous public invitation UI: PASS
- Submit controls disabled while saving: PASS
- Success state displayed: PASS
- RSVP ID: `7f37425b-bf24-4056-9ef5-c1260b4230c7`
- Event relationship: `b1535792-c838-49fc-ad4a-bb9fda5f3815` — PASS
- Guest: `Release QA Guest`
- Attendance: `attending`
- Guest count: `1`
- Message: empty
- Created at: `2026-09-07T07:39:40.76109+00:00`
- The current template RSVP UI supports a name and attendance choice; it does not expose guest-count or message fields.
- Anonymous read: denied (`401`, PostgreSQL `42501`)
- Anonymous delete: denied (`401`, PostgreSQL `42501`)
- Authenticated owner read: PASS (`200`, one matching row)
- Cross-owner access is prevented by the owner-ID condition in the active RLS policy.
- `RSVP DATA PERSISTS, ORGANIZER MANAGEMENT UI NOT PART OF CURRENT MVP`

## J. RLS

- Profiles: users can select/update only their own profile.
- Event drafts: owner-only access and mutation.
- Events: published events are publicly readable; unpublished events are not publicly readable; insert/update/delete require ownership.
- RSVPs: anonymous/authenticated insert is allowed only when the related event is published; only the related event owner can read/delete.
- Anonymous guest-photo insertion and Storage upload policies are not enabled in this release.
- Live anonymous and owner RSVP access checks matched the intended policies.

## K. Adapter Isolation

- Local persistence and demo authentication require the explicit build-time flag `NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE=true`.
- The flag is absent from normal `.env.local` and production configuration.
- Missing sessions, empty remote drafts, Supabase errors, and network failures no longer activate local persistence.
- Production draft writes now surface backend/auth failures instead of reporting cached success.
- Organizer and public event reads no longer silently fall back to local cached records in normal mode.

## L. Automated Tests

Four isolated Chromium tests pass:

1. Canonical production invitation URL and QR target
2. Responsive Wedding discovery pages
3. Isolated-adapter create → publish → reload → RSVP journey
4. Live countdown updates and expired-countdown handling

Additional gates:

- TypeScript: PASS
- Next.js build-time lint/type validation: PASS
- Optimized production build: PASS; 16 static pages generated and dynamic routes compiled

## M. Real Backend Tests

These results are separate from the isolated automated suite:

1. Real email/password signup and confirmation: PASS
2. Real login/session/protected route: PASS
3. Session refresh: PASS
4. Real Wedding creation and draft persistence through UI: PASS
5. Real publish and event-row persistence: PASS
6. Logout/login-again and event reload: PASS
7. Anonymous public invitation and refresh: PASS
8. Stored QR programmatic decode: PASS
9. Anonymous RSVP UI submission and row persistence: PASS
10. Anonymous RSVP read/delete denial: PASS
11. Authenticated owner RSVP read: PASS
12. Legacy `/event/{slug}` redirect to `/i/{slug}`: PASS
13. Legacy `/invite/{slug}` route reduced to a redirect with no embedded demo invitation: PASS

## N. Current UI Scope Cleanup

- Fabricated analytics and RSVP totals: removed
- Fabricated guest names: removed
- Guest-photo upload UI: removed from the current MVP
- Dead Instagram and Facebook controls: removed
- Dead profile rewards/payment/settings rows: removed
- Unsupported event creation: disabled and labeled Coming Soon
- Empty-dashboard links to the old demo event: removed
- Stale default Wedding location/contact content: removed
- Current Wedding journey uses Occazn branding

## O. Remaining Issues

| Severity | Issue | Release Blocking | Recommended Action |
| -------- | ----- | ---------------- | ------------------ |
| P2 | `occazn.com` HTTP reachability is not verified because no deployment was authorized | No | Verify the live domain immediately after an authorized deployment |
| P2 | Organizer RSVP-management UI is not part of the current MVP | No | Add an owner-facing response list in a later product iteration |
| P3 | Current inline RSVP captures one guest and no optional message | No | Expand the form later if multi-guest counts/messages are required |

## P. Release Recommendation

The complete real Supabase journey passed: genuine login, UI-driven Wedding creation, database persistence, publish, anonymous public invitation, exact QR decode, anonymous RSVP persistence, and owner-only response access. Production-only fallback and stale-default issues found during qualification were corrected and all quality gates were rerun successfully. There are no remaining P0 or P1 blockers for the Wedding-only MVP. Deploy and verify `https://occazn.com` separately when production deployment is explicitly authorized.
