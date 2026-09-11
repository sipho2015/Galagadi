import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { destinations } from "@/data/destinations";
import { findBySlug } from "@/lib/utils";

export function generateStaticParams() { return destinations.map(({ slug }) => ({ slug })); }

export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const destination = findBySlug(destinations, (await params).slug);
  if (!destination) notFound();
  const destinationActivities = activities.filter(activity => activity.destinationSlugs?.includes(destination.slug) ?? destination.slug === "victoria-falls");
  return <><div className="detail-image" style={{ backgroundImage: `linear-gradient(rgba(24,20,13,.24),rgba(24,20,13,.66)),url(${destination.image})` }}><div className="container"><p className="eyebrow">Destination</p><h1>{destination.title}</h1></div></div><section className="section"><div className="container detail-content"><div><p className="large-text">{destination.description}</p><h2>What makes it special</h2><ul>{destination.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><aside><h3>Start with a package</h3><p>Choose your main trip first, then add experiences around your free time.</p><Button href="/safaris">Explore packages</Button></aside></div></section><section className="section section-tint" aria-labelledby="destination-activities"><div className="container"><div className="section-heading"><p className="eyebrow">Optional experiences</p><h2 id="destination-activities">Activities in {destination.title}</h2><p>These experiences can be added around the package you choose.</p></div>{destinationActivities.length > 0 ? <div className="card-grid">{destinationActivities.map(activity => <ActivityCard key={activity.slug} activity={activity} />)}</div> : <p>Ask us about experiences that suit your chosen package and travel dates.</p>}</div></section></>;
}
