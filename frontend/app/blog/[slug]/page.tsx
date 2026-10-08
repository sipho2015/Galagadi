import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { getBlogPost, journalDate, readingMinutes } from "@/lib/blog";
import { siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogEnquiry } from "@/components/blog/BlogEnquiry";
import "../journal.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const base = pageMetadata(post.title, post.description, `/blog/${post.slug}`);
  return { ...base, authors: [{ name: "Galagadi Tours & Safari", url: siteUrl }], openGraph: { ...base.openGraph, type: "article", publishedTime: post.published, modifiedTime: post.updated ?? post.published, authors: ["Galagadi Tours & Safari"], section: post.category, tags: post.tags, images: [{ url: post.image.src, alt: post.image.alt }] }, twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image.src] } };
}

export default async function BlogArticle({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const related = post.relatedSlugs.map(getBlogPost).filter(item => item !== undefined).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, image: new URL(post.image.src, siteUrl).href, datePublished: post.published, dateModified: post.updated ?? post.published, author: { "@type": "Organization", name: "Galagadi Tours & Safari", url: siteUrl }, publisher: { "@type": "Organization", name: "Galagadi Tours & Safari", url: siteUrl, logo: { "@type": "ImageObject", url: new URL("/logo/logo.png", siteUrl).href } }, mainEntityOfPage: { "@type": "WebPage", "@id": new URL(`/blog/${post.slug}`, siteUrl).href }, articleSection: post.category, inLanguage: "en", keywords: post.tags.join(", ") };
  return <div className="journal-page">
    <article>
      <header className="journal-hero journal-article-hero">
        <Image src={post.image.src} alt={post.image.alt} fill priority sizes="100vw" />
        <div className="journal-hero-shade" />
        <div className="container journal-hero-content"><Link className="journal-back" href="/blog">← The Galagadi Journal</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="journal-article-location">{post.location}</p></div>
      </header>
      <div className="container journal-byline"><span>By <strong>Galagadi Tours &amp; Safari</strong></span><span>Published <time dateTime={post.published}>{journalDate(post.published)}</time></span>{post.updated && <span>Updated <time dateTime={post.updated}>{journalDate(post.updated)}</time></span>}<span>{readingMinutes(post)} min read</span></div>
      <div className="container journal-article-layout">
        <aside className="journal-toc"><nav aria-label="Table of contents"><p className="journal-label">In this story</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#recommended-experiences">Recommended experiences</a></li><li><a href="#article-faqs">Your questions, answered</a></li></ol></nav><Link className="journal-read" href="/contact">Plan your journey →</Link></aside>
        <div className="journal-article-body">
          <div className="journal-lead">{post.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          {post.sections.map(section => <section className="journal-article-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.subsections?.map(subsection => <div key={subsection.title}><h3>{subsection.title}</h3>{subsection.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>)}{section.tips && <ul className="journal-tips">{section.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>}{section.photo && <figure className="journal-photo"><div><Image src={section.photo.src} alt={section.photo.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 750px" /></div><figcaption>{section.photo.caption}</figcaption></figure>}</section>)}
          <section className="journal-experiences" id="recommended-experiences" aria-labelledby="recommended-experiences-title"><p className="journal-label">Continue your journey</p><h2 id="recommended-experiences-title">Recommended Galagadi Experiences</h2>{post.experiences.map(experience => <Link key={experience.href} href={experience.href}><h3>{experience.title}</h3><p>{experience.description}</p><span className="journal-read">Explore experience <span aria-hidden="true">→</span></span></Link>)}</section>
          <section className="journal-article-section" id="article-faqs" aria-labelledby="article-faq-title"><h2 id="article-faq-title">Your questions, answered</h2><div className="faq-list">{post.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
          {post.sources && <aside className="journal-sources" aria-label="Further reading"><h3>Further reading</h3><ul>{post.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></aside>}
        </div>
      </div>
    </article>
    <section className="section journal-related" aria-labelledby="related-stories-title"><div className="container"><p className="journal-label">More from the journal</p><h2 id="related-stories-title">Keep exploring</h2><div className="journal-grid">{related.map(item => <BlogCard key={item.slug} post={{ ...item, minutes: readingMinutes(item) }} />)}</div></div></section>
    <BlogEnquiry />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </div>;
}
