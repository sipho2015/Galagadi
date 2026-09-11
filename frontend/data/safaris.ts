import type { SafariPackage } from "@/types";

export const safaris: SafariPackage[] = [
  {
    slug: "victoria-falls-escape",
    title: "Victoria Falls Escape",
    summary: "A relaxed introduction to the Smoke That Thunders and the Zambezi.",
    description: "Four unhurried days around Victoria Falls, with guided exploration, a sunset cruise and time to make the journey your own.",
    image: "images/destinations/The_Victoria_Falls.jpeg",
    location: "Victoria Falls, Zimbabwe",
    duration: "4 days / 3 nights",
    price: "From $1,505.70",
    highlights: ["Guided Victoria Falls tour", "Zambezi sunset cruise", "Local cultural experience"]
  },
  {
    slug: "chobe-day-safari",
    title: "Chobe Day Safari",
    summary: "A full day of river and land wildlife viewing in Chobe National Park.",
    description: "Cross from Victoria Falls into Botswana for an immersive Chobe day: a river safari, a lodge lunch and a game drive beneath big African skies.",
    image: "/images/safaris/Pm_Game-Drive.jpeg",
    location: "Chobe National Park, Botswana",
    duration: "Full day",
    price: "From $285",
    highlights: ["Chobe River safari", "Lodge lunch", "Afternoon game drive"]
  },
  {
    slug: "victoria-falls-chobe-safari",
    title: "Victoria Falls & Chobe Safari",
    summary: "A considered, cross-border journey through Zimbabwe and Botswana.",
    description: "Spend a week combining Falls experiences, easy Zambezi evenings and exceptional wildlife encounters in Chobe National Park.",
    image: "/images/safaris/Pm_Gme-Drive.jpeg",
    location: "Zimbabwe & Botswana",
    duration: "7 days / 6 nights",
    price: "From $5,650",
    highlights: ["Victoria Falls highlights", "Chobe lodge stay", "Private itinerary planning"]
  }
];
