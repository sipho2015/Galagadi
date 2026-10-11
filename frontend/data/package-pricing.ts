// Customer-facing amounts only. Confidential costing lives outside this repository.
export const quoteLabel = "Request a quotation";
export const pricingCheckedOn = "2026-10-11";
export type StayRate = {
  from: string; to: string; sharing: number; single: number;
  kind: "calculated" | "public-reference" | "provisional-reference";
  source: string;
};
export type StayOption = {
  id: string; property: string; room: string; board: "B&B" | "DB&B" | "Room only";
  category: "Room" | "Serviced tent"; rates: StayRate[];
  childPolicy?: "insika"; notes: string[];
};
const supplied = "Supplied Insika 2027 rate conditions";
const explorersSource = "https://explorersvillage.com/rates/";
const explorers2027 = "https://www.info-vicfalls.com/accommodation/victoria-falls/shearwater-explorers-village";
function insika(id: string, room: string, board: "B&B" | "DB&B", sharing: number, single: number): StayOption {
  return { id, property: "Insika Lodge", room, board, category: "Room", childPolicy: "insika",
    rates: [{ from: "2027-01-01", to: "2027-12-31", sharing, single, kind: "calculated", source: supplied }],
    notes: ["2026: quotation required. 2027 amounts are calculated accommodation prices, subject to availability.",
      "15.5% VAT and 2% Tourism Levy already included.", "Children 0–3 free sharing with a paying guest; ages 4–11 at half the adult rate. Family occupancy, bedding and room arrangements must be approved.",
      "Supplier card-payment surcharge of 3% applies only if the actual supplier payment method attracts it; confirm in your quotation."] };
}
function explorers(id: string, room: string, sharing: number, single: number, low: [number, number], high: [number, number]): StayOption {
  return { id, property: "Shearwater Explorers Village", room, board: "B&B", category: "Room",
    rates: [
      { from: "2026-01-01", to: "2026-12-31", sharing, single, kind: "public-reference", source: explorersSource },
      { from: "2027-01-01", to: "2027-04-30", sharing: low[0], single: low[1], kind: "provisional-reference", source: explorers2027 },
      { from: "2027-05-01", to: "2027-10-31", sharing: high[0], single: high[1], kind: "provisional-reference", source: explorers2027 },
      { from: "2027-11-01", to: "2027-12-31", sharing: low[0], single: low[1], kind: "provisional-reference", source: explorers2027 }
    ], notes: ["2026 public accommodation references; 2027 seasonal references await supplier confirmation.", "Child prices and family room occupancy are not established; family stays require a quotation.", "Airport transfers are not included in these accommodation references."] };
}
export const stayOptions: StayOption[] = [
  explorers("explorers-standard", "Standard", 110, 176, [116, 185], [121, 194]),
  explorers("explorers-deluxe", "Deluxe", 137, 218, [144, 229], [151, 240]),
  insika("insika-luxury-bb", "Luxury", "B&B", 184.8, 240.24),
  insika("insika-luxury-dbb", "Luxury", "DB&B", 220.8, 287.04),
  insika("insika-sabi-bb", "Sabi Wing Luxury", "B&B", 184.8, 240.24),
  insika("insika-sabi-dbb", "Sabi Wing Luxury", "DB&B", 220.8, 287.04),
  insika("insika-signature-bb", "Signature", "B&B", 231.6, 301.08),
  insika("insika-signature-dbb", "Signature", "DB&B", 267.6, 347.88),
  { id: "explorers-tent", property: "Shearwater Explorers Village", room: "Serviced tent", board: "Room only", category: "Serviced tent",
    rates: [{ from: "2026-01-01", to: "2026-12-31", sharing: 34, single: 46, kind: "public-reference", source: explorersSource }],
    notes: ["Separate camping category; breakfast excluded. No supported 2027 rate.", "Child rates and family occupancy require a quotation."] }
];
export const travellerChoices = [
  { id: "solo", label: "Solo adult", adults: 1, ages: [], rooms: "1 single room" },
  { id: "couple", label: "Two adults sharing", adults: 2, ages: [], rooms: "1 twin/double room" },
  { id: "family", label: "Two adults + children aged 6 and 10", adults: 2, ages: [6, 10], rooms: "Family room requested; occupancy and bedding must be approved" },
  { id: "four", label: "4 adults", adults: 4, ages: [], rooms: "2 twin/double rooms" },
  { id: "six", label: "6 adults", adults: 6, ages: [], rooms: "3 twin/double rooms" },
  { id: "ten", label: "10 adults", adults: 10, ages: [], rooms: "5 twin/double rooms; supplier group terms apply at Insika" }
];
export const insikaConditions = [
  "Ordinary bookings: 61+ days before arrival, no cancellation fee; 46–60 days, 25%; 31–45 days, 50%; 30 days or fewer, 100%.",
  "No-shows and early departures: 100%.",
  "10+ paying guests: 60+ days, no cancellation fee; 46–59 days, 25%; 31–45 days, 50%; 30 days or fewer, 100%. Rooming list due 60 days before arrival.",
  "These are Insika supplier conditions, not Galagadi’s general refund policy."
];
export const packageOptionalActivities = [
  "Boma dinner and transport", "Morning Elephant Experience (refreshments only)",
  "Flight of Angels (12–13 minutes)", "Explore the Zambezi (22 minutes)",
  "Requested elephant breakfast (confirmation needed)", "Requested 20-minute flight (confirmation needed)",
  "Dinner aboard the Zambezi", "Sunset cruise + riverside dinner (on land)", "Rhino tracking (confirmation needed)"
];
