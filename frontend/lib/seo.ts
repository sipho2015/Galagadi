import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    keywords: ["Victoria Falls safari", "Chobe safari", "Zimbabwe tours", "Botswana safari", "Galagadi Tours & Safari"],
    openGraph: { type: "website", siteName: "Galagadi Tours & Safari", title, description, images: [{ url: "/opengraph-image", alt: "Galagadi Tours & Safari" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
  };
}
