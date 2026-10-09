import type { Activity } from "@/types";

// Source: user-provided 2026 - Shearwater Pricelist (local).pdf, page 2.
// The document does not specify child rates or local-rate eligibility.
export const activityRates: Record<string, Pick<Activity, "price" | "pricingNotes">> = {
  "morning-game-drive": {"price":"US$81","pricingNotes":["AM game drive: US$81.","Park fee excluded: US$15."]},
  "pm-game-drive": {"price":"US$81","pricingNotes":["PM game drive: US$81.","Park fee excluded: US$15."]},
  "night-game-drive": {"price":"US$159 - includes bush dinner","pricingNotes":["Night game drive including Shearwater Bush Dinner: US$159.","Park fee excluded: US$15."]},
  "guided-victoria-falls-tour": {"price":"US$32 - entry fee excluded","pricingNotes":["Guided tour of Victoria Falls: US$32.","Falls entry fee is excluded."]},
  "sunset-cruise": {"price":"US$52 - standard cruise","pricingNotes":["Standard sunset cruise: US$52.","Riversong Premium Luxury sunset cruise: US$100.","National Parks fee excluded: US$10, payable at check-in."]},
  "helicopter-flight": {"price":"From US$173 - fees extra","pricingNotes":["Flight of Angels (12-13 minutes): US$173, plus US$27 government fees and fuel surcharge payable at check-in.","Zambezi Explorers Flight (20 minutes): US$271.","Zambezi Spectacular (25 minutes): US$328, plus US$32 government fees and fuel surcharge payable at check-in."]},
  "bungee-jumping": {"price":"US$194","pricingNotes":["Bungee jumping: US$194.","Bridge toll fee: US$3 one way; confirm whether this applies to your arrangements."]},
  "jet-boat": {"price":"US$141 - park fee extra","pricingNotes":["Adventure Jetboat: US$141.","National Parks fee excluded: US$10, payable at check-in."]},
  "white-water-rafting": {"price":"From US$161 - park fee extra","pricingNotes":["One-day high-water rafting trip: US$161.","One-day low-water rafting trip: US$173.","One-day plus overnight rafting trip: US$330.","National Parks fee excluded: US$10, payable at check-in."]},
  "livingstone-island": {"price":"From US$137 - transfer extra","pricingNotes":["Livingstone Island tour: from US$137, excluding transfer.","Return transfer to Livingstone Island: US$46."]},
  "simunye-theatre-show": {"price":"US$58","pricingNotes":["Simunye - The Spirit of Africa: US$58."]},
  "elephant-interaction": {"price":"US$148 suggested donation","pricingNotes":["Through the Eyes of an Elephant: US$148 suggested donation."]},
  "boma-dinner": {"price":"US$65 - transfer extra","pricingNotes":["Boma Dinner: US$65.","Transfer fee excluded: US$15."]}
};
