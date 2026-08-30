# Galagadi Tours & Safari — implementation summary

## Current implementation

The project is a frontend-only Next.js App Router site located in `frontend/`.

- Reusable UI components provide navigation, footer, hero, cards, gallery, testimonials, FAQ, and an inquiry form.
- Safari, destination, activity, accommodation, testimonial and FAQ content lives in typed files under `frontend/data/`.
- Dynamic detail pages are generated from their relevant content data.
- `app/sitemap.ts` produces a sitemap for both static and dynamic pages.
- The contact/inquiry flow is entirely client-side and links visitors to WhatsApp for direct follow-up.

## Deliberately excluded

No backend, database, API endpoints, email delivery service, authentication system, or payment processing is included in this version.

## Local development

```bash
cd frontend
npm install
npm run dev
```
