import { Hero } from "@/components/Hero";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Destinations", "Explore Victoria Falls, Chobe and Hwange.");
export default function DestinationsPage() { return <><Hero compact eyebrow="Destinations" title="Where your story begins." description="Discover the iconic places and quieter moments that make this corner of Southern Africa unforgettable." image="/images/destinations/desti_desti.jpeg" /><section className="section"><div className="container section-heading"><p className="eyebrow">Plan with confidence</p><h2>Choose your package first.</h2><p>Then explore the optional experiences available in each destination.</p></div><div className="container tile-grid">{destinations.map(destination => <DestinationCard key={destination.slug} destination={destination} />)}</div></section></>; }
