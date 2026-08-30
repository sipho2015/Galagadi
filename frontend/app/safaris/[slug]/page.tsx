import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { safaris } from "@/data/safaris";
import { findBySlug } from "@/lib/utils";

export function generateStaticParams() { return safaris.map(({ slug }) => ({ slug })); }
export default async function SafariDetail({ params }: { params: Promise<{ slug: string }> }) { const safari = findBySlug(safaris, (await params).slug); if (!safari) notFound(); return <section className="detail-page"><div className="detail-image" style={{ backgroundImage: `linear-gradient(rgba(24,20,13,.28),rgba(24,20,13,.62)),url(${safari.image})` }}><div className="container"><p className="eyebrow">{safari.location}</p><h1>{safari.title}</h1><p>{safari.duration}</p></div></div><div className="container detail-content"><div><p className="large-text">{safari.description}</p><h2>Journey highlights</h2><ul>{safari.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><aside><p>Starting from</p><strong>{safari.price}</strong><Button href="/contact">Plan this safari</Button></aside></div></section>; }
