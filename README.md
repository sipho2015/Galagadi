# Galagadi Tours & Safari

This repository contains a frontend-only Next.js website for Galagadi Tours & Safari.

The website is deliberately self-contained: it has no Express server, database, API routes, or email integration. Its inquiry form provides an on-page acknowledgement and directs travellers to WhatsApp for direct follow-up.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Frontend structure

```
frontend/
├── app/                  # Next.js App Router routes, metadata and sitemap
├── components/           # Shared navigation, cards, forms and content sections
├── data/                 # Editable, typed safari content
├── lib/                  # Utility and metadata helpers
├── public/               # Logo and image folders
└── types/                # Shared TypeScript types
```

Key pages include safaris, destinations and activities with dynamic detail routes, plus accommodation, contact, gallery, FAQ and privacy pages. See [the frontend README](frontend/README.md) for more detail.
