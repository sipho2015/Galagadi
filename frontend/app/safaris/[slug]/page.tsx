import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { safaris } from "@/data/safaris";
import { whatsappUrl } from "@/lib/contact";
import { findBySlug } from "@/lib/utils";

export function generateStaticParams() { return safaris.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const safari = findBySlug(safaris, (await params).slug);
  if (!safari) return {};
  return { title: safari.title, description: safari.summary, alternates: { canonical: `/safaris/${safari.slug}` }, openGraph: { title: safari.title, description: safari.summary, images: [{ url: safari.image, alt: safari.title }] }, twitter: { card: "summary_large_image", title: safari.title, description: safari.summary, images: [safari.image] } };
}

function ListSection({ eyebrow, title, items, className = "" }: { eyebrow?: string; title: string; items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return <section className={`package-detail-block ${className}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2><ul className="package-list">{items.map(item => <li key={item}>{item}</li>)}</ul></section>;
}

export default async function SafariDetail({ params }: { params: Promise<{ slug: string }> }) {
  const safari = findBySlug(safaris, (await params).slug);
  if (!safari) notFound();
  const facts = [safari.location && { label: "Location", value: safari.location }, safari.duration && { label: "Duration", value: safari.duration }, safari.price && { label: "Starting price", value: safari.price }].filter((fact): fact is { label: string; value: string } => Boolean(fact));
  const relatedPackages = safaris.filter(({ slug }) => slug !== safari.slug);

  return <>
    <section className="detail-image package-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(24,20,13,.28),rgba(24,20,13,.72)),url(${safari.image})` }}><div className="container"><p className="eyebrow">Safari package{safari.location ? ` · ${safari.location}` : ""}</p><h1>{safari.title}</h1><p className="package-hero-summary">{safari.summary}</p></div></section>
    <section className="section package-detail-section"><div className="container package-detail-layout"><main className="package-detail-main">
      <section className="package-overview" aria-labelledby="overview-title"><p className="eyebrow">Package overview</p><h2 id="overview-title">A journey with room to breathe.</h2><p className="large-text">{safari.summary}</p><p>{safari.description}</p></section>
      <ListSection eyebrow="The journey" title="Highlights" items={safari.highlights} />
      {safari.itinerary?.length ? <section className="package-detail-block" aria-labelledby="itinerary-title"><p className="eyebrow">Day by day</p><h2 id="itinerary-title">Your itinerary</h2><ol className="itinerary-list">{safari.itinerary.map(item => <li key={`${item.day}-${item.title}`}><p className="tag">{item.day}</p><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol></section> : null}
      <div className="package-detail-grid"><ListSection title="Accommodation" items={safari.accommodation} /><ListSection title="Meals" items={safari.meals} /><ListSection title="Activities included" items={safari.activitiesIncluded} /><ListSection title="Optional experiences" items={safari.optionalExperiences} /></div>
      <div className="package-detail-grid package-inclusion-grid"><ListSection title="Trip includes" items={safari.inclusions} /><ListSection title="Trip excludes" items={safari.exclusions} /></div>
      <ListSection eyebrow="Before you go" title="Important information" items={safari.importantInformation} className="package-important-info" />
    </main><aside className="package-detail-aside">{facts.length > 0 && <dl className="package-facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}<div className="package-enquiry"><p className="eyebrow">Plan with Galagadi</p><h2>Ready to make it yours?</h2><p>Choose this package, then add any free-time experiences you would enjoy.</p><div className="package-enquiry-actions"><a className="button button-primary" href={whatsappUrl(`Hello Galagadi Tours & Safari, I would like to enquire about ${safari.title}.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a><Button href={`/contact?package=${encodeURIComponent(safari.title)}`} variant="secondary" className="package-plan-button">Choose this package</Button></div></div></aside></div></section>
    {relatedPackages.length > 0 && <section className="section section-tint package-related-section" aria-labelledby="related-packages-title"><div className="container"><div className="section-heading"><p className="eyebrow">Keep exploring</p><h2 id="related-packages-title">More ways to safari</h2></div><div className="package-related-links">{relatedPackages.map(item => <Link href={`/safaris/${item.slug}`} key={item.slug}><span>{item.duration}</span><strong>{item.title}</strong><em>Explore package →</em></Link>)}</div></div></section>}
  </>;
}
