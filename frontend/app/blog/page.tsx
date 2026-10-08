import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { BlogCatalogue } from "@/components/blog/BlogCatalogue";
import { BlogEnquiry } from "@/components/blog/BlogEnquiry";
import { pageMetadata } from "@/lib/seo";
import { readingMinutes } from "@/lib/blog";
import "./journal.css";

const featured = blogPosts[0];
const description = "Discover Victoria Falls and Southern Africa through local travel guides, safari stories, practical advice and carefully planned itineraries designed to help you make the most of every journey.";
const baseMetadata = pageMetadata("The Galagadi Journal | Travel Blog", description, "/blog");
export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, images: [{ url: featured.image.src, alt: featured.image.alt }] }, twitter: { ...baseMetadata.twitter, images: [featured.image.src] } };

export default function BlogPage() {
  return <div className="journal-page">
    <header className="journal-hero">
      <Image src={featured.image.src} alt={featured.image.alt} fill priority sizes="100vw" />
      <div className="journal-hero-shade" />
      <div className="container journal-hero-content"><p className="eyebrow">The Galagadi Journal</p><h1>Stories From the<br className="journal-hero-break" /> Heart of Africa</h1><p>Travel guides, safari inspiration and local knowledge for unforgettable journeys through Victoria Falls and Southern Africa.</p><div className="hero-actions"><a className="button button-primary" href="#travel-guides">Explore Travel Guides</a><Link className="button button-secondary" href="/contact">Plan Your Journey</Link></div></div>
      <p className="journal-hero-location">Victoria Falls · Zimbabwe</p>
    </header>
    <section className="journal-intro container" aria-labelledby="journal-intro-title"><p className="journal-label">The Galagadi Journal</p><h2 id="journal-intro-title">Stories, Guides &amp; Safari Inspiration</h2><p>{description}</p></section>
    <section className="container journal-featured" aria-labelledby="featured-story-title">
      <div className="journal-featured-top"><p className="journal-label">Featured Story</p><span>From our corner of Africa</span></div>
      <article className="journal-featured-story"><Link className="journal-featured-image" href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`}><Image src={featured.image.src} alt={featured.image.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 60vw" /></Link><div className="journal-featured-copy"><p className="journal-label">Destination Guide</p><h2 id="featured-story-title"><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.description}</p><p className="journal-meta">{readingMinutes(featured)} min read <span aria-hidden="true">·</span> {featured.location}</p><Link className="journal-read" href={`/blog/${featured.slug}`}>Read the Guide <span aria-hidden="true">→</span></Link></div></article>
    </section>
    <BlogCatalogue posts={blogPosts.map(post => ({ slug: post.slug, title: post.title, description: post.description, category: post.category, image: post.image, tags: post.tags, minutes: readingMinutes(post) }))} />
    <BlogEnquiry />
  </div>;
}
