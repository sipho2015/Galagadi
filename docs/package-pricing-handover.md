# Package pricing and itinerary handover

Prepared 11 October 2026. Work is on `feature/package-pricing-itineraries`. No commit, push or deployment was performed. The working tree was clean when this branch was created, and the previously completed carousel work was preserved.

## What changed

The seven requested packages have original planning copy, day-by-day programmes, overnight destinations, separate daily meals, transport, planned activities and separately quoted options. The existing Chobe day trip and tailor-made journey remain available.

| Journey | Days / nights | Overnight allocation |
| --- | --- | --- |
| Victoria Falls full day | 1 / 0 | None |
| Hwange full day | 1 / 0 | None |
| Victoria Falls Escape | 4 / 3 | Victoria Falls 3 |
| Victoria Falls + Chobe | 7 / 6 | Victoria Falls 3, Chobe 3 |
| Zimbabwe Highlights | 9 / 8 | Harare 1, Masvingo 1, Matobo 2, Hwange 2, Victoria Falls 2 |
| Southern Africa Signature | 12 / 11 | Victoria Falls 3, Chobe 3, Delta camp one 3, Delta camp two 2 |
| Falls, Chobe, Makgadikgadi and Okavango | 7 / 6 | Victoria Falls 2, Chobe 1, Gweta 1, Maun 2 |

The Signature package contains no Hwange. Its new URL is `/safaris/southern-africa-signature-safari`; the former URL redirects there. Older redirects pointing at the former URL now go directly to the new page.

The seven-day Botswana route includes Falls accommodation and a guided visit. Its Delta experience is a day excursion from Maun, with no overnight Delta camp. Day four uses a shorter early Chobe drive before the long road journey. Day five still requires supplier confirmation that the pan excursion and Maun transfer fit. If not, the page explains that the pan activity needs a confirmed day-four slot or a revised scope within seven days.

All complete packages display **Request a quotation**. Previously unsupported numeric package prices were removed. Accommodation subtotals are explicitly labelled as accommodation only and never presented as full package prices.

Explorers Village and Insika replace the fictitious accommodation sample listings. No supplier relationship or availability is claimed. Existing Victoria Falls photography is labelled as a destination photograph, not a photograph of either property. Approved property images are still needed. Package galleries and real image files remain in use; the Signature gallery no longer includes the Hwange-named photo.

Cards now have itinerary links and separate enquiry actions. The form supports package, Falls room/board choice, sharing or single-room allocation, shared/private preferences, both dates, adults, children with each age, optional experiences and the existing contact/message fields. The existing external email submission service remains; email-client and WhatsApp links also carry the selections, displayed pricing and relevant restrictions. No enquiry is described as a booking.

The form rejects equal/reversed dates, incomplete date pairs, invalid adult/child counts and missing child ages. Undecided travellers can leave both dates blank. An enquiry below an operator's guest minimum remains possible, with a visible requirement for a confirmed combined departure or a separately quoted arrangement; it receives no invented price. Unsupported dates, child policies, room arrangements and private services do not produce a complete price.

## Supported customer-facing accommodation amounts

All amounts are USD. Insika amounts below are calculated accommodation selling amounts valid **1 January–31 December 2027**, subject to availability. Single-room prices reflect the supplied single-occupancy rule. VAT and Tourism Levy are already included. Any applicable supplier card-payment surcharge must be confirmed separately; it is not automatically charged.

| Insika option | Adult sharing / night | Single adult / night |
| --- | ---: | ---: |
| Luxury or Sabi Wing Luxury, B&B | 184.80 | 240.24 |
| Luxury or Sabi Wing Luxury, DB&B | 220.80 | 287.04 |
| Signature, B&B | 231.60 | 301.08 |
| Signature, DB&B | 267.60 | 347.88 |

B&B means bed and breakfast. DB&B means dinner, bed and breakfast. In daily itineraries, B = breakfast, L = lunch and D = dinner.

Three Luxury B&B nights illustrate the following **party totals for accommodation only**:

| Party | Room request | Subtotal |
| --- | --- | ---: |
| Solo adult | 1 single | 720.72 |
| 2 adults | 1 twin/double | 1,108.80 |
| 2 adults + children aged 6 and 10 | Family arrangement awaiting occupancy/bedding approval | 1,663.20 |
| 4 adults | 2 twin/double rooms | 2,217.60 |
| 6 adults | 3 twin/double rooms | 3,326.40 |
| 10 adults | 5 twin/double rooms; supplier group conditions | 5,544.00 |

Insika's child policy is confined to that supplier: ages 0–3 free when sharing with a paying guest, ages 4–11 half the adult sharing rate. Family examples are illustrative until capacity, bedding and room arrangements are approved. These discounts are not applied to flights, safaris, meals from other suppliers or transfers. Insika's cancellation and group terms appear with its room options, not in the site's general refund policy. Insika 2026 remains quote-required.

[Explorers Village's official 2026 references](https://explorersvillage.com/rates/) are per person per night: Standard B&B 110 sharing / 176 single; Deluxe B&B 137 / 218; serviced tent 34 / 46, without breakfast. They are public references, not Galagadi agent costs.

[The provisional 2027 room references](https://www.info-vicfalls.com/accommodation/victoria-falls/shearwater-explorers-village) are Standard B&B 116 / 185 and Deluxe B&B 144 / 229 for January–April and November–December; May–October Standard 121 / 194 and Deluxe 151 / 240. Supplier confirmation is required. Family prices/occupancy and 2027 tent rates are unresolved. Public references receive no automatic additional markup.

Each accommodation calculation checks every overnight, including seasonal and year boundaries. A 2026-only rate never prices a 2027 night. On Zimbabwe Highlights, the Falls accommodation calculation starts after the six preceding nights elsewhere.

## Fees and alternative activities

Park and monument fees are excluded from package prices and displayed separately. Zambezi Vista's 2026 cruise park fee is USD 12 per person; Hwange Safaris' researched park reference is USD 20. Dated amounts and traveller eligibility still need confirmation.

The public helicopter references include the full mandatory bundled government/fuel amounts: Flight of Angels 12–13 minutes, 173 + 37 = **210**; Explore the Zambezi 22 minutes, 271 + 50 = **321**, per person. These are references pending dated confirmation, not guaranteed 2027 prices. The full surcharge remains visible while its breakdown is unresolved. Sources: [Shearwater helicopter page](https://www.shearwatervictoriafalls.com/experience/helicopter-experience/).

The requested 06:00 elephant breakfast and exact 20-minute flight remain provisional. The alternative is named Morning Elephant Experience, includes refreshments rather than a full breakfast, and uses the published later pickups. Source: [Shearwater elephant programme](https://www.shearwatervictoriafalls.com/experience/through-the-eyes-of-an-elephant/).

[Pure Africa's dinner cruise](https://pure.africa/dinner-cruise/) supplies a matching dinner-aboard reference, but dated rates and availability are still required. The Zambezi Vista cruise-plus-riverside-dinner alternative is explicitly dinner on land after the cruise, with its own guest minimum and different timetable.

## Private worksheet and remaining supplier costs

The confidential worksheet is **outside the repository** at:

`C:\Users\User\.codex\private\Galagadi\package-pricing-2026-10-11\costing-worksheet.json`

Its companion `supplied-request.txt` preserves the complete original supplied conditions; `costing-tools.cjs` checks private arithmetic. Do not add these files to Git, public assets, frontend imports or customer downloads. The worksheet distinguishes supplied agent/nett inputs, public retail references, calculated amounts and missing costs. Missing totals are null. The repository contains only customer-facing amounts and reference information. Ignore rules also cover accidentally created private worksheet/rate-sheet folders.

The precise gaps are:

| Journey/service | What still needs a dated supplier quote or confirmation |
| --- | --- |
| Requested Falls full day | Exact elephant breakfast; exact 20-minute flight and mandatory charges; dated dinner-aboard rate; town guide and uncovered inter-activity transfers |
| Hwange day | Dated full-trip rate and supply arrangement; combined departures for parties below four paying guests; private game-drive/transport options; Painted Dog stop |
| Falls Escape | Airport arrival/departure legs, particularly 2027; 2027 Falls tour/cruise; extra-distance transfers; supplier-specific child activity costs |
| Falls + Chobe | Chobe rooms/board/activity breakdown; dated cross-border and Kasane departure transfer; private/exclusive services |
| Zimbabwe Highlights | Harare/Masvingo rooms; Matobo/Hwange board, guiding and game drives; continuous vehicle/driver/fuel/driver accommodation; all lodge access legs and heritage guiding |
| Signature | Two named camps for three plus two nights; activity/fee breakdowns; first-camp, inter-camp and Maun flight sectors; aviation taxes/fuel, airstrip access and baggage rules |
| Seven-day Botswana route | One Chobe night and activities; Planet Baobab dated hut/board and pan excursion; two Maun nights; Delta day excursion; all regional/airport legs; day-four/day-five operating feasibility |
| Optional extras | Boma dinner and return transport; rhino tracking; all child participation/rates; private charter totals and vehicle capacities |

Research includes Chobe Safari Lodge, Amalinda/Ivory/Khulu, Great Zimbabwe Hotel, Planet Baobab, Sedia, Cresta Maun, Moremi Crossing/Pom Pom operator information, Natural Selection's official 2026/2027 rack sheets, Wilderness Air, Mack Air and Safari Air's 2027 references. These sources do not establish complete Galagadi costs for the selected routes. Bundled lodge park fees cannot be removed without a reliable breakdown; flight fuel-inclusion ambiguities also require clarification. Each source and check date is recorded privately.

## Files changed

| Files | Purpose |
| --- | --- |
| `frontend/data/safaris.ts` | Corrected routes, complete daily planning content, quotations and fee/gap notes |
| `frontend/data/package-pricing.ts`, `frontend/lib/package-pricing.ts` | Central public room rates, child rules, date checks and accommodation subtotal logic |
| `frontend/data/accommodations.ts`, `frontend/data/activity-rates.ts` | Real researched Falls stay choices and corrected relevant activity references |
| `frontend/components/PackagePricePanel.tsx`, `AccommodationRates.tsx` | Package quotation and room-rate presentation |
| `frontend/components/BookingForm.tsx`, `frontend/lib/enquiry.ts` | Traveller selections, validation and complete enquiry text |
| `frontend/components/SafariCard.tsx`, `AccommodationCard.tsx` | Itinerary/enquiry actions and truthful accommodation cards |
| `frontend/app/page.tsx`, `frontend/app/safaris/[slug]/page.tsx` | Homepage package actions and detailed itinerary/pricing sections |
| `frontend/app/accommodation/page.tsx`, `frontend/app/accommodation/[slug]/page.tsx`, `frontend/app/discover/page.tsx` | Stay listings and dated room details |
| `frontend/app/globals.css`, `frontend/types/index.ts` | Responsive styling and typed daily/pricing fields |
| `frontend/app/sitemap.ts`, `frontend/next.config.ts` | Static accommodation URLs and legacy Signature redirects |
| `frontend/scripts/verify-package-content.cjs`, `frontend/package.json` | Focused checks and `test:packages` command |
| `.gitignore`, this handover | Confidential-file exclusions and review instructions |

## Validation

- `npm --prefix frontend run test:packages`: passed. Covers exact overnights, no Hwange in Signature, Falls stay/visit in the seven-day route, images, single/family/group subtotals, seasonal/year boundaries, missing costs, minimum departures and enquiry text/WhatsApp encoding.
- `npm run lint`: passed TypeScript checks.
- `npm run build`: passed; 58 static pages generated, with existing metadata and static generation retained. Installed Next.js 15.5.9 and React 19.1.1 were retained.
- Private arithmetic checks: passed single/child rules, one markup, per-vehicle versus per-person handling, minimums, expiry and incomplete totals.
- Generated-output check: 225 HTML/JavaScript/RSC/JSON files checked; no confidential costing markers. Relevant package HTML, enquiry controls, absence of fake Offer prices and the legacy redirect were checked.
- `git diff --check`: passed.

No Browser was available. Mobile/desktop appearance and live keyboard interaction therefore remain manual checks. No email or WhatsApp message was sent, and no booking was made. In a local preview, check the cards at narrow widths, tab through selectors and collapsed itinerary days, enter child ages and confirm the email/WhatsApp draft contains your choices. Do not send a live enquiry merely to test it.

## Review, commit, push and open a PR

Run these commands in PowerShell from the project folder. Read each result before moving to the next step.

1. Confirm the branch and inspect the changes. `git diff` shows tracked edits; open the new files listed by `git status` too.

   ```powershell
   Set-Location C:\Source\repos\Galagadi
   git branch --show-current
   git status --short
   git diff --stat
   git diff
   ```

   The branch name should be `feature/package-pricing-itineraries`. The branch was already created; do not run `git switch -c` again.

2. Run the checks and, if desired, start the local preview.

   ```powershell
   npm --prefix frontend run test:packages
   npm run lint
   npm run build
   npm run dev
   ```

   Open the local URL printed by Next.js. Stop the preview with Ctrl+C when finished.

3. Stage only this work, then inspect exactly what the commit would contain.

   ```powershell
   git add .gitignore frontend docs/package-pricing-handover.md
   git diff --cached --stat
   git diff --cached --check
   git diff --cached
   ```

   If unrelated edits were added after this handover, unstage them before committing. The private worksheet is outside the project and should not appear in the staged list.

4. Create the commit after reviewing it.

   ```powershell
   git commit -m "Complete package itineraries and dated accommodation pricing"
   ```

5. Check the configured remote, then push the feature branch.

   ```powershell
   git remote -v
   git push -u origin feature/package-pricing-itineraries
   ```

6. If GitHub CLI is installed and signed in, open the PR form in your browser. Review its title and description before submitting.

   ```powershell
   gh pr create --base main --head feature/package-pricing-itineraries --web
   ```

   Without GitHub CLI, follow the compare-and-pull-request link printed by Git after the push, or select this branch on GitHub and choose **Compare & pull request**. A suitable title is **Complete package itineraries and dated accommodation pricing**. Describe the corrected routes, accommodation-only subtotals, quote-required complete prices, enquiry choices and passing checks. Include the remaining manual browser checks and supplier costs. Keep confidential supplier costs and worksheet contents out of the PR description.
