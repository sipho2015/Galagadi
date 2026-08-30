import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/data/accommodations";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Accommodation", "Safari stays selected for comfort, character and location.");
export default function AccommodationPage() { return <><Hero compact eyebrow="Accommodation" title="Rest well, wake up close to wonder." description="We match every journey with stays that feel right for your style, budget and route." image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container"><div className="section-heading"><p className="eyebrow">Places to stay</p><h2>Comfort with a sense of place.</h2></div><div className="value-grid">{accommodations.map(stay => <article key={stay.name}><p className="tag">{stay.type}</p><h3>{stay.name}</h3><p>{stay.description}</p></article>)}</div><div className="centered"><Button href="/contact">Find your perfect stay</Button></div></div></section></>; }
