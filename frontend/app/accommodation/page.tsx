import { AccommodationCard } from "@/components/AccommodationCard";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/data/accommodations";
import { pageMetadata } from "@/lib/seo";

const considerations = [
  ["Location", "Choose a stay that makes sense for your route, airport arrangements and the experiences you want to include."],
  ["Comfort and budget", "Tell us what feels right for you, from the style of stay to the budget you would like to work within."],
  ["A smoother itinerary", "We can discuss accommodation alongside activities, transfers and timing so the journey feels connected."]
] as const;

export const metadata = pageMetadata("Accommodation", "Accommodation planning support and a replaceable catalogue structure for Galagadi journeys.", "/accommodation");

export default function AccommodationPage() {
  return <><Hero compact eyebrow="Accommodation" title="Rest well, wake up close to wonder." description="We can help you consider stays that suit your route, travel style and budget." image="/images/accommodation/Lodge1.jpg"><div className="hero-actions"><Button href="/contact?interest=Accommodation">Ask about accommodation</Button><Button href="/experiences#packages" variant="secondary">View packages</Button></div></Hero><section className="section" aria-labelledby="sample-stays-title"><div className="container"><div className="section-heading"><p className="eyebrow">Accommodation catalogue</p><h2 id="sample-stays-title">A catalogue structure ready for verified stays.</h2><p>These six cards are clearly marked sample layouts, not real Galagadi partners or bookable properties. Replace their names, images, descriptions, facilities and prices with approved supplier content before treating them as live inventory.</p></div><div className="card-grid">{accommodations.map(accommodation => <AccommodationCard key={accommodation.slug} accommodation={accommodation} />)}</div></div></section><section className="section section-tint" aria-labelledby="stay-considerations"><div className="container"><div className="section-heading"><p className="eyebrow">How we help</p><h2 id="stay-considerations">A stay that supports the whole journey.</h2></div><div className="journey-value-grid">{considerations.map(([title, description], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="centered"><Button href="/contact?interest=Accommodation">Discuss your stay</Button></div></div></section></>;
}
