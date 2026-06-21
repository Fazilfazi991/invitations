# Jashnly QA Report

## Summary

Full static, build, route, responsive, create-flow, persistence, and feature QA was run on June 21, 2026. All implemented routes load, TypeScript passes, the production build passes, and no console errors or horizontal page overflow were found in the final route checks. The selected event type and template now persist through create, dashboard, and public event pages. Cross-event wedding mock leakage found during testing was fixed.

## Commands Run

- `npm install` — passed; 2 moderate dependency vulnerabilities reported by npm audit.
- `npm run typecheck` — passed after fixes.
- `npm run build` — passed after fixes.
- `npm run lint` — skipped because no `lint` script exists.
- `npm run test:e2e` — passed: 1 Chromium smoke test.
- `npm audit` — reviewed: 2 moderate findings in Next.js' nested PostCSS dependency; the suggested automated fix is a breaking Next.js major-version change/downgrade and was not applied.
- Development and production servers were both used for browser QA.

## Routes Tested

- `/`
- `/categories`
- `/create/step-1?type=wedding`
- `/create/step-1?type=birthday`
- `/create/step-1?type=housewarming`
- `/create/step-2`
- `/create/step-3`
- `/create/step-4`
- `/dashboard`
- `/dashboard/afsal-fathima`
- `/event/afsal-fathima`
- `/event/afsal-fathima/schedule`
- `/event/afsal-fathima/locations`
- `/event/afsal-fathima/rsvp`
- `/event/afsal-fathima/gallery`
- `/event/afsal-fathima/blessings`
- `/event/afsal-fathima/share`
- `/event/afsal-fathima?mode=memory`
- `/profile`
- `/vendors`
- Created-event routes for `daniel-s-5th-birthday` and `rahman-family-housewarming`, including public, schedule, location, share, blessings, and memory views.

## Passed Checks

- All implemented routes returned content without blank screens or route errors.
- No browser console warnings/errors were present in the final tested route set.
- No broken event-card or template preview images were found.
- Landing carousel uses the seven WebP event cards and updates the hero line for Wedding, Birthday, Baptism, Holy Communion, Naming Ceremony, Baby Shower, and Housewarming.
- Homepage, create page, dashboard, and public event page had no document-level horizontal overflow at 390, 430, 768, 1024, 1366, 1440, and 1920 px widths.
- Wedding, birthday, and housewarming Step 1 field sets match their event type.
- Step 3 YouTube, schedule add/edit, contact add, RSVP, family-contact, and QR state reached Step 4 correctly.
- Birthday and housewarming publish flows created dashboard cards with the correct template preview.
- Birthday public page used the birthday renderer and contained no wedding hero language.
- Housewarming public page used housewarming hero/copy, template metadata, schedule, venue, countdown, and dynamic slug.
- Published events survived navigation and refresh through localStorage.
- QR code, share URL, WhatsApp content, schedule, venue, blessings, memory mode, and guest bottom navigation now use the created event slug/data.
- RSVP requires a guest name and now displays an inline success state.
- Past-event countdown/memory state renders without hydration or runtime errors.
- Malayalam WhatsApp messages use readable Unicode and adapt to the event type, title, date, time, venue and URL.
- Dashboard checklist items and completion percentage are calculated from the actual event record.
- The categories page now uses celebration-neutral heading and supporting copy.
- A Playwright Chromium smoke suite covers carousel interaction and birthday create/publish/public/share behavior.
- Organizer demo registration, login, session persistence, logout, and protected-route redirects are implemented.
- Dashboard, create, and profile routes are organizer-only; guest event routes remain public.
- Generated slugs are collision-safe (`-2`, `-3`, and so on), and event URLs use the current browser origin.
- Blush, Sage, Classic, and Royal themes are centralized and persist into dashboard, public templates, share cards, and QR posters.
- Analytics are labeled as an organizer-only preview and are absent from public event pages.

## Critical Bugs Found

1. Created-event subpages and guest navigation were hardcoded to `/event/afsal-fathima`.
2. Share preview, QR code, copy/share actions, and WhatsApp messages used the default wedding mock for birthday and housewarming events.
3. Housewarming blessings and memory mode displayed wedding-specific names/copy.
4. Schedule and location subpages ignored the matching localStorage event.
5. The public generic event renderer used hardcoded wedding imagery/copy and did not visually apply the selected theme.
6. RSVP accepted an empty name and used a blocking alert instead of a stable success state.
7. Legacy/partial localStorage records could lose template metadata or fall back to the wedding template.
8. New drafts defaulted to a past 2025 date and non-wedding drafts inherited an Afsal-family contact.

## Fixes Applied

- Added required `eventType`, `theme`, `templateId`, `templateName`, and optional `templateImage` metadata to normalized draft/published records.
- Added legacy localStorage normalization and event-type/template compatibility checks.
- Fixed create type switching so stale wedding template metadata cannot survive a type change.
- Persisted complete template metadata during publish and template changes.
- Removed the public-page hydration flash of the default wedding renderer.
- Made dashboard cards and detail previews use the selected event/template image.
- Made all guest bottom-nav links derive from the current slug.
- Made public gallery, location, blessings, schedule, share, QR, WhatsApp, memory, and dashboard share links event-aware.
- Applied saved theme palettes to generic event pages.
- Added event-aware housewarming/naming/religious/business/custom celebration copy.
- Added RSVP required-name validation and inline success feedback.
- Changed new-draft defaults to a future date and event-appropriate contact name.
- Replaced legacy Malayalam mojibake/wedding-only copy with event-aware Unicode messages and closings.
- Added `calculateEventChecklist` and `calculateEventCompletionPercent` helpers for safe legacy/partial-event handling.
- Updated compact and detail checklist links/progress to use the active event.
- Replaced wedding-only categories copy with “What are you planning?”.
- Added Playwright configuration, Chromium smoke tests, npm scripts, and README instructions.
- Added browser-local demo auth helpers, login/register routes, protected organizer layouts, and logout.
- Added collision-safe slug and current-origin URL helpers.
- Centralized theme tokens and applied saved themes across event, dashboard, share, QR, birthday, and wedding template surfaces.
- Removed public template RSVP demo counts and gated published-event template mutation by organizer session/ownership.

## Remaining Issues

- `/event/[slug]/memories` is not implemented; memory mode is available through `?mode=memory`.
- Opening animations are planned and currently marked as coming soon; no UI or event page expects animation metadata.
- Demo authentication is intentionally localStorage-only and must not be treated as production security; server-side auth and authorization remain future backend work.
- The gallery uses mock remote images; selected local file names are persisted but browser file contents are not retained across refresh (expected without uploads/backend or IndexedDB).
- Social buttons for Instagram/Facebook are visual placeholders; Web Share, copy, WhatsApp, and QR actions are implemented.
- `npm audit` reports 2 moderate vulnerabilities (`next` through nested `postcss` < 8.5.10). npm only proposes a semver-major Next.js change, so no forced fix was applied.

## Responsive Notes

- No page-level horizontal scrolling or clipped primary controls was found.
- At 390/430 px, later homepage category tabs are intentionally outside the initial viewport inside the horizontal tab scroller; the document itself does not overflow.
- Forms, dashboard cards, event templates, and bottom navigation remained readable and reachable across all tested widths.

## Recommended Next Steps

1. Add a `lint` script.
2. Decide whether to implement `/memories` and opening animations in a future feature batch.
3. Expand Playwright coverage to housewarming and wedding flows in CI.
4. Recheck the nested PostCSS advisory when a compatible Next.js release resolves it.
