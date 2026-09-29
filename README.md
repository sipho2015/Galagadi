# Galagadi Tours & Safari

Galagadi Tours & Safari is a responsive, content-led marketing and enquiry website for Victoria Falls, Hwange and Chobe safari travel. It helps visitors discover packages, activities and destinations, then start a tailored enquiry by form, email or WhatsApp.

The project is intentionally frontend-only: it has no database, payments, authentication, custom API routes or booking engine.

## Features

- Conversion-focused homepage with clear package, activity and enquiry paths.
- Responsive package, activity, destination and gallery experiences, including static detail pages.
- Activity catalogue filtering across safari, Victoria Falls, water, cultural and dining experiences.
- A Victoria Falls visitor guide with practical planning prompts.
- Mobile navigation, floating WhatsApp shortcut, accessible carousel controls and a filterable gallery viewer.
- Enquiry form with package/activity preselection, travel dates, traveller counts, accommodation need, privacy acknowledgement, honeypot and FormSubmit delivery.
- Thank-you page after a successful browser-side enquiry submission.
- SEO essentials: per-page metadata, canonicals, Open Graph image, generated icon, structured travel-agency data, sitemap, robots rules and a branded 404 page.
- Basic browser security headers and consent-gated, optional Google Analytics 4.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage and primary discovery journey |
| `/experiences` | Main package-first and activity-second discovery page |
| `/discover` | Main destination-first and accommodation-second discovery page |
| `/safaris`, `/safaris/[slug]` | Preserved safari package listing and detail routes |
| `/activities`, `/activities/[slug]` | Preserved activity listing and detail routes |
| `/destinations`, `/destinations/[slug]` | Preserved destination listing and detail routes |
| `/accommodation` | Preserved accommodation listing with replaceable samples |
| `/accommodation/[slug]` | Non-indexed sample property-detail layouts; not real listings or booking pages |
| `/about` | Galagadi story and service values |
| `/gallery` | Filterable visual gallery |
| `/contact` | Enquiry form, email and WhatsApp contact |
| `/thank-you` | Post-enquiry confirmation and next steps (not indexed) |
| `/faq` | Common travel-planning questions |
| `/privacy`, `/refund-policy`, `/terms-of-use` | Legal and policy pages |

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Global CSS
- Next.js `Image`, `Link`, metadata, image routes, sitemap and robots support

## Project structure

```text
.
|-- package.json                 # Workspace convenience scripts
|-- README.md
|-- docs/                        # Supporting project and deployment notes
`-- frontend/
    |-- app/                     # App Router routes, metadata, sitemap, robots and styles
    |-- components/              # Shared UI, navigation, cards, gallery, consent and enquiry form
    |-- data/                    # Editable safari, activity, destination, accommodation and FAQ content
    |-- lib/                     # Contact and SEO helpers
    |-- public/
    |   |-- images/              # Local activity, destination, gallery, hero and safari images
    |   `-- logo/                # Brand logo
    `-- types/                   # Shared TypeScript content types
```

## Install and run locally

Use Node.js 20 LTS or newer.

```bash
git clone <repository-url>
cd Galagadi
npm --prefix frontend install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You can also work directly inside `frontend`:

```bash
cd frontend
npm install
npm run dev
```

## Commands

From the repository root:

```bash
npm run dev       # Start the Next.js development server
npm run lint      # Run TypeScript type checking
npm run build     # Create a production build
npm run start     # Serve the production build
```

The frontend `lint` script currently runs `tsc --noEmit`; no separate ESLint configuration is present.

## Content and images

Edit content in `frontend/data/`:

- `safaris.ts` - packages, pricing, highlights and available detail content.
- `activities.ts` - activity copy, categories, location, highlights and galleries.
- `destinations.ts` - destination copy and highlights.
- `accommodations.ts` - temporary sample-card data only.
- `faqs.ts` - FAQ entries.

Place owned or licensed images under `frontend/public/images/` and reference them with root-relative paths, for example:

```ts
image: "/images/activities/example.jpg"
```

Keep filenames and casing exactly aligned with their references. Use meaningful alt text when an image conveys information.

### Important accommodation note

The six entries in `frontend/data/accommodations.ts` are deliberately labelled sample layouts. Their Unsplash images are temporary placeholders, their detail pages are `noindex`, and none are real Galagadi partners, live availability or bookable inventory. Replace every name, image, description, amenity, rate and availability statement with approved supplier material before representing accommodation on the live site. Remove the temporary Unsplash allowance from `frontend/next.config.ts` once replaced with local licensed images.

## Enquiries, contact and analytics

- The contact address is `booking@galagadisafari.com`.
- WhatsApp links come from `frontend/lib/contact.ts`.
- `frontend/components/BookingForm.tsx` posts directly from the browser to FormSubmit's AJAX endpoint and redirects successful submissions to `/thank-you`.
- The form is not a booking engine. Do not describe an enquiry as confirmed availability.
- Optional Google Analytics 4 is never loaded until a visitor accepts the visible analytics notice. If no measurement ID is configured, no analytics notice or GA script is rendered.

### Environment variables

Both variables are optional and are intentionally public because the browser consumes them:

```bash
NEXT_PUBLIC_ENQUIRY_EMAIL_ENDPOINT=https://formsubmit.co/ajax/your-address@example.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Without `NEXT_PUBLIC_ENQUIRY_EMAIL_ENDPOINT`, the form uses the current FormSubmit endpoint for `booking@galagadisafari.com`. Do not put passwords, API keys or other secrets in `NEXT_PUBLIC_*` variables. After deploying any endpoint or analytics change, submit a real test enquiry and verify both delivery and consent behaviour.

## Deployment

Deploy the `frontend` directory to a Next.js-capable host, such as Vercel.

For Vercel:

1. Import the repository.
2. Set the project Root Directory to `frontend`.
3. Use `npm run build` as the build command.
4. Add the optional environment variables only when needed.
5. Configure the production domain as `galagadisafari.com`, or update the production URL in `frontend/app/layout.tsx`, `frontend/app/sitemap.ts` and `frontend/app/robots.ts`.

## Maintenance notes

- Run `npm run lint` and `npm run build` before every deployment.
- Confirm prices, inclusions, availability, testimonial permissions and legal content with the business before publishing.
- Test all primary CTAs, WhatsApp, email, the enquiry form and form delivery after every contact-flow change.
- Check pages at mobile, tablet and desktop widths whenever images, navigation or card layouts change.
- Review privacy, terms and refund content with a qualified local adviser before relying on them as final legal advice.
- Keep the current no-database/no-auth architecture unless a real operational need justifies changing it.
