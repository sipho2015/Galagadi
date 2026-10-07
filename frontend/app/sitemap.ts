import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";
import { safaris } from "@/data/safaris";
import { destinations } from "@/data/destinations";
import { activities } from "@/data/activities";

const baseUrl = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    ["", 1],
    ["/experiences", 0.9],
    ["/discover", 0.8],
    ["/activities", 0.9],
    ["/destinations", 0.8],
    ["/accommodation", 0.7],
    ["/about", 0.6],
    ["/contact", 0.8],
    ["/faq", 0.5],
    ["/privacy", 0.2],
    ["/refund-policy", 0.2],
    ["/terms-of-use", 0.2]
  ] as const;

  return [
    ...staticPaths.map(([path, priority]) => ({ url: baseUrl + path, changeFrequency: "monthly" as const, priority })),
    ...safaris.map(item => ({ url: baseUrl + "/safaris/" + item.slug, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...destinations.map(item => ({ url: baseUrl + "/destinations/" + item.slug, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...activities.map(item => ({ url: baseUrl + "/activities/" + item.slug, changeFrequency: "monthly" as const, priority: 0.7 }))
  ];
}
