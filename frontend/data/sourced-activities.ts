import type { Activity } from "@/types";

export type ActivityEnhancement = Pick<
  Activity,
  "summary" | "description" | "duration" | "price" | "highlights" | "gallery" | "included" | "excluded" | "itinerary"
>;

const victoriaFallsGallery = [
  "/images/destinations/Victoria_Falls.jpg",
  "/images/gallery/Zambezi_Curtain.jpg",
  "/images/activities/under the bridge.jpg"
];

export const sourcedActivityEnhancements: Record<string, ActivityEnhancement> = {
  "guided-victoria-falls-tour": {
    summary: "See the Smoke That Thunders with a guide who brings its viewpoints, geology and stories into focus.",
    description: "Follow the rainforest trails and lookouts of Victoria Falls with a knowledgeable local guide. This walking experience is designed to make sense of the Falls' scale, river setting and seasonal character without rushing the visit.",
    duration: "Approximately 2–3 hours",
    price: "Enquire for Price",
    highlights: ["Rainforest trails and Falls viewpoints", "Local insight into the landscape and history", "A focused introduction to Victoria Falls"],
    gallery: victoriaFallsGallery,
    included: ["Guided walking tour", "Hotel pickup and drop-off where confirmed at booking", "Rainforest trail and viewpoint access where included in the selected option"],
    excluded: ["Park entry fees where not included in the selected option", "Personal purchases and gratuities", "Travel insurance"],
    itinerary: [
      { title: "Meet your guide", description: "Begin with the confirmed pickup or meeting point in the Victoria Falls area." },
      { title: "Rainforest and viewpoints", description: "Walk the established paths, pausing at key viewpoints while your guide shares context about the Falls and the Zambezi." },
      { title: "Return transfer", description: "Finish at the agreed drop-off point, with time to plan any next Victoria Falls experience." }
    ]
  },
  "sunset-cruise": {
    summary: "An unhurried Zambezi evening with wide river views, changing light and the chance of wildlife on the banks.",
    description: "Step aboard for a calm late-afternoon journey on the Zambezi. It is a gentle counterpoint to a safari day: watch the sky turn warm, listen for hippos and enjoy the river's slower pace.",
    duration: "Late afternoon / evening",
    price: "Enquire for Price",
    highlights: ["Zambezi River at sunset", "Riverbank wildlife watching", "Relaxed guided cruise"],
    gallery: ["/images/activities/SunsetCruise.jpg", "/images/gallery/Zambezi_River.jpg", "/images/gallery/Zambezi_Curtain.jpg"],
    included: ["Scheduled river cruise", "Professional crew or guide", "Hotel transfers and refreshments where confirmed for the selected cruise"],
    excluded: ["Premium drinks or additions not listed at booking", "Personal purchases and gratuities", "Travel insurance"],
    itinerary: [
      { title: "Collection and boarding", description: "Travel from the agreed Victoria Falls pickup point to the river and board the vessel." },
      { title: "Golden-hour cruise", description: "Cruise the Zambezi as the light changes, with time for riverbank wildlife watching and photography." },
      { title: "Return to Victoria Falls", description: "Disembark after sunset and return to the confirmed drop-off point." }
    ]
  },
  "boma-dinner": {
    summary: "A lively Victoria Falls evening that brings together a generous meal, local flavours and entertainment.",
    description: "Gather around the Boma for a social dinner experience in Victoria Falls. The evening is built around food, atmosphere and performance, making it an easy cultural addition to a Falls stay.",
    duration: "Evening",
    price: "Enquire for Price",
    highlights: ["Traditional Boma-style dinner setting", "Local flavours", "Evening entertainment"],
    gallery: ["/images/activities/Boma Dinner.jpg", "/images/destinations/Victoria_Falls.jpg"],
    included: ["Dinner and scheduled entertainment as confirmed for the selected seating", "Transfers where confirmed at booking"],
    excluded: ["Drinks or menu items not listed in the confirmed booking", "Personal purchases and gratuities", "Travel insurance"],
    itinerary: [
      { title: "Arrive for the evening", description: "Make your way to the venue using the confirmed transfer or meeting arrangements." },
      { title: "Dinner and entertainment", description: "Enjoy the Boma's meal, music and performance programme." },
      { title: "Return arrangements", description: "Use the confirmed return transfer or make your own way back to your accommodation." }
    ]
  }
};

export const sourcedActivities: Activity[] = [
  {
    slug: "victoria-falls-zimbabwe-zambia-guided-tour",
    category: "Victoria Falls",
    title: "Victoria Falls: Zimbabwe & Zambia Guided Tour",
    summary: "Take in Victoria Falls from both countries in one guided day, from broad panoramas to close-up spray.",
    description: "Experience the full breadth of Victoria Falls by walking the Zimbabwean and Zambian sides with a guide. The route connects rainforest viewpoints, Victoria Falls Bridge and the more immersive viewpoints on the Zambia side.",
    image: "/images/gallery/Zambezi_Curtain.jpg",
    location: "Victoria Falls, Zimbabwe & Livingstone, Zambia",
    duration: "Full day (approximately 7–8 hours)",
    price: "Enquire for Price",
    destinationSlugs: ["victoria-falls"],
    highlights: ["Zimbabwe's panoramic Falls viewpoints", "Victoria Falls Bridge border crossing", "Zambia's Knife Edge Bridge and close-up spray"],
    gallery: victoriaFallsGallery,
    included: ["Guided walking tour on both sides of the Falls", "Transfers", "Park entry fees where included in the selected booking"],
    excluded: ["Required visas or border charges", "Optional helicopter flights, bungee jumps or market visits", "Personal purchases, gratuities and travel insurance"],
    itinerary: [
      { title: "Zimbabwe-side rainforest walk", description: "Begin with hotel pickup and explore the Zimbabwean pathways and their panoramic Falls viewpoints with your guide." },
      { title: "Cross Victoria Falls Bridge", description: "Use the historic bridge to cross between Zimbabwe and Zambia; carry the travel documents required for your nationality." },
      { title: "Zambia-side viewpoints", description: "Visit the Zambia-side paths, including Knife Edge Bridge and the Boiling Pot area where conditions and access allow." },
      { title: "Return transfer", description: "Finish with the agreed return to your Victoria Falls or Livingstone accommodation." }
    ]
  }
];
