# Jashnly

A complete mobile-first event website demo built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, lucide-react, and framer-motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Browser smoke tests

```bash
npx playwright install chromium
npm run test:e2e
```

The smoke suite covers the landing carousel and a complete birthday create, publish, public-page, QR, and Malayalam WhatsApp flow.

## Included routes

- `/`
- `/categories`
- `/create/step-1` through `/create/step-4`
- `/dashboard`
- `/dashboard/afsal-fathima`
- `/event/afsal-fathima`
- `/event/afsal-fathima/schedule`
- `/event/afsal-fathima/locations`
- `/event/afsal-fathima/rsvp`
- `/event/afsal-fathima/gallery`
- `/event/afsal-fathima/share`
- `/profile`

The app uses static mock data for the Afsal & Fathima wedding demo.

Opening animations are planned and currently marked as coming soon; event pages do not require animation metadata.

Organizer routes use browser-local demo authentication:

- Register at `/register`
- Login at `/login`
- Dashboard, create, and profile routes require a demo session
- Public `/event/[slug]` routes remain accessible to guests

This is product-flow separation only, not production security. Real authentication and server-side authorization require a backend.
