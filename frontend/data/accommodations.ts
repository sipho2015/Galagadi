import type { Accommodation } from "@/types";

// These are intentionally generic sample listings, not verified Galagadi partners.
// Replace every field and image with approved supplier information before publishing as live inventory.
export const accommodations: Accommodation[] = [
  { slug: "riverside-safari-lodge", name: "Riverside Safari Lodge", location: "Victoria Falls area", type: "Safari lodge", description: "Sample listing for a riverside-style safari stay. Replace with verified property copy, images and availability.", image: "/images/accommodation/SunsetView.jpg", sample: true },
  { slug: "rainforest-retreat", name: "Rainforest Retreat", location: "Victoria Falls area", type: "Boutique stay", description: "Sample listing for a characterful stay near Victoria Falls. Replace with approved partner information.", image: "/images/accommodation/pusnak-lodge-.jpg", sample: true },
  { slug: "zambezi-river-camp", name: "Zambezi River Camp", location: "Zambezi River", type: "Tented camp", description: "Sample listing for a river-focused stay. Replace with real room details, inclusions and supplier imagery.", image: "/images/accommodation/SunsetCruise.jpg", sample: true },
  { slug: "bush-view-lodge", name: "Bush View Lodge", location: "Victoria Falls area", type: "Safari lodge", description: "Sample listing for a bush setting. Replace with verified location, facilities and booking details.", image: "/images/accommodation/Lodge1.jpg", sample: true },
  { slug: "falls-boutique-hotel", name: "Falls Boutique Hotel", location: "Victoria Falls town", type: "Boutique hotel", description: "Sample listing for a town-based hotel. Replace with confirmed property information before public use.", image: "/images/accommodation/pusnak-lodge-.jpg", sample: true },
  { slug: "family-safari-suite", name: "Family Safari Suite", location: "Victoria Falls area", type: "Family-friendly stay", description: "Sample listing for a family accommodation option. Replace with verified capacity, facilities and terms.", image: "/images/accommodation/Lodge1.jpg", sample: true }
];
