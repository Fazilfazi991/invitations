# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Couples and other wedding organizers who need to create, publish, share, and manage a digital wedding invitation without learning event-management software. Wedding guests use the public invitation primarily on mobile to view details and send a private RSVP.

## Product Purpose

Occazn makes it possible to create a polished wedding invitation, publish it at one stable public URL, share it by link or QR code, and privately manage real guest responses. Success means an organizer can understand the state of their invitation and guest list immediately after signing in.

## Positioning

Occazn combines a guided consumer wedding-invitation builder, five distinct live wedding templates, canonical sharing, and owner-private RSVP management in one simple flow.

## Operating Context

Organizers move from creation to a mobile-first dashboard, edit a published invitation without changing its URL, share through WhatsApp/link/QR, and review attending and declined responses. Guests open `/i/{slug}` without an account and submit a short RSVP.

## Capabilities and Constraints

- Wedding is the only live event category; all other categories remain Coming Soon.
- Supabase is the source of truth for production accounts, invitations, drafts, and RSVPs.
- Published event IDs, slugs, QR targets, and `/i/{slug}` URLs must remain stable during normal edits.
- Anonymous guests may insert an RSVP only for a published event, but may not read, update, or delete RSVP rows.
- Only an authenticated event owner may read RSVPs for that event.
- RSVP guest count is bounded and messages are plain text with a 500-character maximum.
- Demo analytics, fabricated guests, placeholder counts, and public guest-list exposure are prohibited.

## Brand Commitments

The product name is Occazn. The product voice is warm, concise, reassuring, and consumer-friendly. The established identity uses restrained purple accents (`#6C1785`, `#500D68`, `#7B3892`, `#A477B4`, `#D0B8D8`) with light neutral surfaces. Wedding typography and existing logo assets must remain consistent.

## Evidence on Hand

The repository and verified production system contain five live Wedding templates, real Supabase event and RSVP rows, canonical invitation URLs, QR generation, email/Google authentication, and automated Playwright release tests. There are no approved demo analytics or fabricated response datasets.

## Product Principles

- Show real state and real data; use honest empty states when nothing exists.
- Keep the organizer experience simple enough for a couple, not an enterprise administrator.
- Protect guest privacy at the database boundary as well as in the interface.
- Preserve shared invitation URLs and QR targets across ordinary edits.
- Make every mutation and loading state clear, recoverable, and mobile-friendly.

## Accessibility & Inclusion

Core organizer and guest flows must support keyboard focus, readable contrast, 16px mobile inputs, large tap targets, semantic status/error feedback, and responsive layouts without horizontal scrolling.
