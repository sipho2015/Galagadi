import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/types/blog";

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export function readingMinutes(post: BlogPost) {
  const text = [post.title, ...post.introduction, ...post.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.tips ?? []), ...(section.subsections ?? []).flatMap(subsection => [subsection.title, ...subsection.paragraphs])]), ...post.faqs.flatMap(faq => [faq.question, faq.answer])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function journalDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
