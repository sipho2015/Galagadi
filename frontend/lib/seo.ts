import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: new URL(pathname, siteUrl).href },
    keywords: ["Victoria Falls safari", "Chobe safari", "Zimbabwe tours", "Botswana safari", "Galagadi Tours & Safari"],
    openGraph: { type: "website", siteName: "Galagadi Tours & Safari", url: new URL(pathname, siteUrl).href, title, description, images: [{ url: "/opengraph-image", alt: "Galagadi Tours & Safari" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
  };
}
