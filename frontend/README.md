# Galagadi Tours & Safari

Frontend-only Next.js website for Galagadi Tours & Safari. Content is stored in local TypeScript data files; no API routes, database, or server-side booking system are included.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `app/` — App Router pages, dynamic safari/destination/activity details, global styling and sitemap
- `components/` — reusable navigation, cards, gallery, FAQ and client-side inquiry form
- `data/` — typed, editable website content
- `public/` — logo plus folders ready for local image assets

The inquiry form deliberately has no backend submission. It displays an acknowledgement and offers WhatsApp as the direct follow-up route.
