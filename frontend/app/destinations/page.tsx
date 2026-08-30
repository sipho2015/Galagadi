import { Hero } from "@/components/Hero";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Destinations", "Explore Victoria Falls, Chobe and the Zambezi River.");
export default function DestinationsPage() { return <><Hero compact eyebrow="Destinations" title="Where your story begins." description="Discover the iconic places and quieter moments that make this corner of Southern Africa unforgettable." image="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container tile-grid">{destinations.map(destination => <DestinationCard key={destination.slug} destination={destination} />)}</div></section></>; }
