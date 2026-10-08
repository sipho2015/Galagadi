import type { FAQItem } from "@/types";

export const blogCategories = ["All", "Victoria Falls", "Safari", "Travel Tips", "Itineraries", "Wildlife", "Botswana", "Zimbabwe"] as const;
export type BlogCategory = Exclude<(typeof blogCategories)[number], "All">;
export type BlogPhoto = { src: string; alt: string; caption: string };
export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  tips?: string[];
  subsections?: { title: string; paragraphs: string[] }[];
  photo?: BlogPhoto;
};
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: BlogCategory[];
  location: string;
  image: BlogPhoto;
  published: string;
  updated?: string;
  introduction: string[];
  sections: BlogSection[];
  faqs: FAQItem[];
  experiences: { title: string; description: string; href: string }[];
  relatedSlugs: string[];
  sources?: { title: string; href: string }[];
};
