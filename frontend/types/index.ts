export type ContentItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  location?: string;
  duration?: string;
  price?: string;
  destinationSlugs?: string[];
  highlights: string[];
};

export type Activity = ContentItem & {
  pricingNotes?: string[];
  category: "Safari & Wildlife" | "Victoria Falls" | "Water Adventures" | "Cultural Experiences" | "Dining & Cruises";
  gallery?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryStep[];
};

export type ItineraryStep = {
  title: string;
  description: string;
};

export type ItineraryDay = {
  location?: string;
  schedule?: { time: string; title: string; description: string }[];
  accommodation?: string[];
  meals?: string[];
  travelInformation?: string[];
  glance?: string[];
  heading?: string;
  day: string;
  title: string;
  description: string;
};

export type SafariPackage = ContentItem & {
  isTailorMade?: boolean;
  subtitle?: string;
  cardSummary?: string;
  cardCta?: string;
  enquiryCta?: string;
  startTime?: string;
  finishTime?: string;
  experienceType?: string;
  showDayAtGlance?: boolean;
  glanceTitle?: string;
  startingPoint?: string;
  endingPoint?: string;
  route?: string;
  cardSupportingLine?: string;
  inclusionsBeforeItinerary?: boolean;
  itineraryEyebrow?: string;
  itineraryTitle?: string;
  itineraryIntro?: string;
  finalEnquiryEyebrow?: string;
  finalEnquiryTitle?: string;
  gallery?: string[];
  itinerary?: ItineraryDay[];
  accommodation?: string[];
  meals?: string[];
  activitiesIncluded?: string[];
  inclusions?: string[];
  exclusions?: string[];
  importantInformation?: string[];
  optionalExperiences?: string[];
};

export type Accommodation = {
  slug: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  sample: true;
};

export type FAQItem = {
  question: string;
  answer: string;
};
