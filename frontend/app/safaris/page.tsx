import { Hero } from "@/components/Hero";
import { SafariCard } from "@/components/SafariCard";
import { safaris } from "@/data/safaris";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Safari packages", "Explore Victoria Falls and Chobe safari packages.");
export default function SafarisPage() { return <><Hero compact eyebrow="Safaris" title="Make the wild your own." description="Start with one of our considered itineraries, then make it uniquely yours." image="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container card-grid">{safaris.map(safari => <SafariCard key={safari.slug} safari={safari} />)}</div></section></>; }
