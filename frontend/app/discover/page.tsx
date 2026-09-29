import { AccommodationCard } from "@/components/AccommodationCard";
import { DestinationCard } from "@/components/DestinationCard";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/data/accommodations";
import { destinations } from "@/data/destinations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Discover", "Discover Victoria Falls, Chobe and Hwange alongside accommodation planning support.", "/discover");

export default function DiscoverPage() {
  return <><Hero compact eyebrow="Discover" title="Get to know the places behind the journey." description="Explore the region first, then consider the stays that can help every part of your itinerary flow." image="/images/destinations/desti_desti.jpeg"><div className="hero-actions"><Button href="#destinations">Explore destinations</Button><Button href="#accommodation" variant="secondary">Explore accommodation</Button></div></Hero><section id="destinations" className="section" aria-labelledby="destinations-title"><div className="container"><div className="section-heading"><p className="eyebrow">Destinations</p><h2 id="destinations-title">Places with stories worth following.</h2><p>Discover Victoria Falls, Chobe and Hwange, then choose the experiences that suit your time in each place.</p></div><div className="tile-grid">{destinations.map(destination => <DestinationCard key={destination.slug} destination={destination} />)}</div></div></section><section id="accommodation" className="section section-tint" aria-labelledby="accommodation-title"><div className="container"><div className="section-heading"><p className="eyebrow">Accommodation</p><h2 id="accommodation-title">A stay that supports the whole journey.</h2><p>These six cards are clearly labelled sample layouts, not real Galagadi partners or bookable properties. Replace their names, images, descriptions, facilities and prices with approved supplier content before treating them as live inventory.</p></div><div className="card-grid">{accommodations.map(accommodation => <AccommodationCard key={accommodation.slug} accommodation={accommodation} />)}</div><div className="centered"><Button href="/contact?interest=Accommodation">Discuss your stay</Button></div></div></section></>;
}
