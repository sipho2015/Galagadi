import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { destinations } from "@/data/destinations";
import { findBySlug } from "@/lib/utils";

const victoriaFallsGuide = [
  ["Things to experience", "Victoria Falls is a place to combine rainforest paths and viewpoints with the Zambezi River, wildlife, culture and adventure at the pace that suits you."],
  ["Best time to visit", "Victoria Falls is rewarding throughout the year. The right time depends on the experiences you value most, so tell us what you hope to see and do when you enquire."],
  ["Seasons and weather", "Conditions, water levels and temperatures vary across the year. Pack light layers and let us help you consider the practical details for your dates and chosen activities."],
  ["Getting there", "Share your arrival and departure details in your enquiry. We can help you discuss transfers, accommodation and experiences in an order that makes sense for your journey."],
  ["What to pack", "Comfortable layers, sun protection, a refillable water bottle and suitable footwear are sensible starting points. Confirm any activity-specific requirements before travel."],
  ["Useful travel information", "Passport, visa, health and border requirements depend on your nationality and route. Check current official guidance before travel, then let us know if you need help planning around it."]
] as const;

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const destination = findBySlug(destinations, (await params).slug);
  if (!destination) return {};
  return { title: destination.title, description: destination.summary, alternates: { canonical: `/destinations/${destination.slug}` }, openGraph: { title: destination.title, description: destination.summary, images: [{ url: destination.image, alt: destination.title }] } };
}

export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const destination = findBySlug(destinations, (await params).slug);
  if (!destination) notFound();
  const destinationActivities = activities.filter(activity => activity.destinationSlugs?.includes(destination.slug) ?? destination.slug === "victoria-falls");
  const isVictoriaFalls = destination.slug === "victoria-falls";

  return <>
    <div className="detail-image" style={{ backgroundImage: `linear-gradient(rgba(44,33,24,.24),rgba(44,33,24,.66)),url(${destination.image})` }}><div className="container"><p className="eyebrow">Destination</p><h1>{destination.title}</h1><p className="hero-copy">{destination.summary}</p></div></div>
    <section className="section"><div className="container detail-content"><div><p className="large-text">{destination.description}</p><h2>What makes it special</h2><ul>{destination.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><aside><h3>Start with a package</h3><p>Choose your main trip first, then add experiences around your free time.</p><Button href="/experiences#packages">Explore packages</Button></aside></div></section>
    {isVictoriaFalls ? <section className="section section-tint" aria-labelledby="victoria-falls-guide"><div className="container"><div className="section-heading"><p className="eyebrow">Discover Victoria Falls</p><h2 id="victoria-falls-guide">A practical guide to planning your time.</h2><p>Use this as a thoughtful starting point, then confirm details that are specific to your travel dates, nationality and chosen activities.</p></div><div className="destination-guide-grid">{victoriaFallsGuide.map(([title, copy], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div className="destination-guide-copy"><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section> : null}
    <section className="section section-tint" aria-labelledby="destination-activities"><div className="container"><div className="section-heading"><p className="eyebrow">Optional experiences</p><h2 id="destination-activities">Activities in {destination.title}</h2><p>These experiences can be added around the package you choose.</p></div>{destinationActivities.length > 0 ? <div className="card-grid">{destinationActivities.map(activity => <ActivityCard key={activity.slug} activity={activity} />)}</div> : <p>Ask us about experiences that suit your chosen package and travel dates.</p>}</div></section>
    <section className="section package-first-cta"><div className="container"><p className="eyebrow">Make it your own</p><h2>Ready to plan time in {destination.title}?</h2><p>Tell us what interests you and we will help connect the practical details.</p><Button href={`/contact?interest=${encodeURIComponent(destination.title)}`}>Plan your journey</Button></div></section>
  </>;
}
