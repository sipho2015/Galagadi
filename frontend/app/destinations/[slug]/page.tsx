import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { findBySlug } from "@/lib/utils";
export function generateStaticParams() { return destinations.map(({ slug }) => ({ slug })); }
export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) { const destination = findBySlug(destinations, (await params).slug); if (!destination) notFound(); return <><div className="detail-image" style={{ backgroundImage: `linear-gradient(rgba(24,20,13,.24),rgba(24,20,13,.66)),url(${destination.image})` }}><div className="container"><p className="eyebrow">Destination</p><h1>{destination.title}</h1></div></div><section className="section"><div className="container detail-content"><div><p className="large-text">{destination.description}</p><h2>What makes it special</h2><ul>{destination.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><aside><h3>Ready to explore?</h3><p>We&apos;ll help you find the right pace and experiences.</p><Button href="/contact">Start planning</Button></aside></div></section></>; }
