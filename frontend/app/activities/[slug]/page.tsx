import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { ActivityGallery } from "@/components/ActivityGallery";
import { PriceBadge } from "@/components/PriceBadge";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { findBySlug } from "@/lib/utils";
import type { Activity } from "@/types";

function HighlightIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.2 4.7L19 9l-3.5 3.6.8 5.1-4.3-2.4-4.3 2.4.8-5.1L5 9l4.8-1.3L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

function RelatedActivities({ activity }: { activity: Activity }) {
  const relatedActivities = activities.filter(item => item.slug !== activity.slug && item.category === activity.category).slice(0, 3);
  if (!relatedActivities.length) return null;
  return <section className="section section-tint" aria-labelledby="related-activities-title"><div className="container"><div className="section-heading"><p className="eyebrow">Keep exploring</p><h2 id="related-activities-title">More {activity.category.toLowerCase()}</h2><p>Find another experience to add around your time in the region.</p></div><div className="card-grid">{relatedActivities.map(item => <ActivityCard key={item.slug} activity={item} />)}</div></div></section>;
}

export function generateStaticParams() {
  return activities.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const activity = findBySlug(activities, (await params).slug);
  if (!activity) return {};
  return { title: activity.title, description: activity.summary, alternates: { canonical: `/activities/${activity.slug}` }, openGraph: { title: activity.title, description: activity.summary, images: [{ url: activity.image, alt: activity.title }] } };
}

export default async function ActivityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const activity = findBySlug(activities, (await params).slug);
  if (!activity) notFound();

  const heroFacts = [["Location", activity.location], ["Duration", activity.duration]].filter((fact): fact is [string, string] => Boolean(fact[1]));
  const glanceFacts = [["Category", activity.category], ["Duration", activity.duration], ["Location", activity.location], ["Price", activity.price ?? "Price on request"]];
  const hasInclusionDetails = Boolean(activity.included?.length || activity.excluded?.length);

  return <article className="activity-editorial">
    <section className="activity-editorial-hero" style={{ backgroundImage: `url(${activity.image})` }}>
      <div className="activity-editorial-overlay" />
      <div className="container activity-editorial-hero-content">
        <p className="home-label">{activity.category}</p>
        <h1>{activity.title}</h1>
        <p>{activity.summary}</p>
        <PriceBadge price={activity.price} className="price-badge-hero" />
        <dl className="activity-editorial-hero-facts">{heroFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <Button href={`/contact?activity=${encodeURIComponent(activity.title)}`}>Enquire about this experience</Button>
      </div>
    </section>
    <section className="activity-glance"><div className="container"><p className="home-label">Experience at a glance</p><dl>{glanceFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? "On request"}</dd></div>)}</dl></div></section>
    <section className="activity-editorial-overview"><div className="container activity-editorial-copy"><p className="home-label">Overview</p><h2>Discover {activity.title}.</h2><p className="activity-editorial-lead">{activity.summary}</p><p>{activity.description}</p></div></section>
    {activity.pricingNotes?.length ? <section className="section"><div className="container narrow"><p className="eyebrow">2026 rates</p><h2>Prices and additional fees</h2><ul>{activity.pricingNotes.map(note => <li key={note}>{note}</li>)}</ul><p>Rates are in US dollars, from the Shearwater 2026 price list. Confirm availability, rate eligibility and the total for your group when enquiring.</p></div></section> : null}
    <section className="activity-editorial-highlights"><div className="container"><div className="activity-editorial-heading"><p className="home-label">The experience</p><h2>Highlights</h2></div><div className="activity-editorial-highlight-grid">{activity.highlights.map(highlight => <article key={highlight}><HighlightIcon /><h3>{highlight}</h3></article>)}</div><Button href={`/contact?activity=${encodeURIComponent(activity.title)}`} className="activity-discover-link">Plan this experience <span aria-hidden="true">&rarr;</span></Button></div></section>
    {hasInclusionDetails ? <section className="activity-editorial-inclusions"><div className="container"><div className="activity-editorial-inclusion-grid">{activity.included?.length ? <section><p className="home-label">Your experience</p><h2>What&apos;s included</h2><ul>{activity.included.map(item => <li key={item}><span aria-hidden="true">&check;</span>{item}</li>)}</ul></section> : null}{activity.excluded?.length ? <section><p className="home-label">Please note</p><h2>What&apos;s not included</h2><ul>{activity.excluded.map(item => <li key={item}><span aria-hidden="true">&times;</span>{item}</li>)}</ul></section> : null}</div></div></section> : null}
    {activity.itinerary?.length ? <section className="activity-editorial-itinerary"><div className="container activity-editorial-copy"><p className="home-label">Your experience</p><h2>Itinerary</h2><ol>{activity.itinerary.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section> : null}
    {activity.gallery?.length ? <section className="activity-editorial-gallery"><div className="container"><div className="activity-editorial-heading"><p className="home-label">In pictures</p><h2>Experience gallery</h2></div><ActivityGallery images={activity.gallery} title={activity.title} /></div></section> : null}
    <section className="section activity-planning-notes"><div className="container narrow"><p className="eyebrow">Before you go</p><h2>Details are confirmed around your dates.</h2><p>Duration, price, pickup arrangements, availability and any activity-specific requirements are confirmed as part of your enquiry. Tell us what matters to you, and we will help you plan the practical details.</p></div></section>
    <RelatedActivities activity={activity} />
    <section className="activity-editorial-cta"><div className="container"><p className="home-label">Galagadi Tours &amp; Safari</p><h2>Ready for the experience?</h2><p>Let us help make {activity.title} part of a journey that feels personal to you.</p><Button href={`/contact?activity=${encodeURIComponent(activity.title)}`}>Make an enquiry</Button></div></section>
  </article>;
}
