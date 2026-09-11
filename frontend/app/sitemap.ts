import type { MetadataRoute } from "next";
import { safaris } from "@/data/safaris";
import { destinations } from "@/data/destinations";
import { activities } from "@/data/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://galagadisafari.com";
  const paths = ["", "/about", "/safaris", "/destinations", "/activities", "/accommodation", "/contact", "/gallery", "/faq", "/privacy", "/refund-policy", "/terms-of-use"];
  return [...paths.map(path => ({ url: `${baseUrl}${path}`, lastModified: new Date() })), ...safaris.map(item => ({ url: `${baseUrl}/safaris/${item.slug}`, lastModified: new Date() })), ...destinations.map(item => ({ url: `${baseUrl}/destinations/${item.slug}`, lastModified: new Date() })), ...activities.map(item => ({ url: `${baseUrl}/activities/${item.slug}`, lastModified: new Date() }))];
}
