import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/data/accommodations";
import { findBySlug } from "@/lib/utils";

export function generateStaticParams() {
  return accommodations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const accommodation = findBySlug(accommodations, (await params).slug);
  if (!accommodation) return {};
  return { title: accommodation.name + " sample layout", description: accommodation.description, robots: { index: false, follow: false } };
}

export default async function AccommodationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const accommodation = findBySlug(accommodations, (await params).slug);
  if (!accommodation) notFound();

  return <><Hero compact eyebrow="Sample accommodation layout" title={accommodation.name} description={accommodation.description} image={accommodation.image}><div className="hero-actions"><Button href={"/contact?interest=Accommodation"}>Ask about a real stay</Button><Button href="/accommodation" variant="secondary">All sample layouts</Button></div></Hero><section className="section"><div className="container detail-content"><div className="prose"><p className="eyebrow">Important</p><h2>This is not a real property listing.</h2><p className="large-text">This detail page demonstrates the information structure Galagadi can use once a property has been verified.</p><p>Do not use this sample to make a booking. Replace the placeholder name, image, location, room information, facilities, availability and prices with approved partner content before publishing it as a real property.</p><h2>Rooms and facilities</h2><p>TODO: Add confirmed room categories, capacity, facilities, accessibility details and supplier terms.</p><h2>Location and practical information</h2><p>TODO: Add verified address area, transfer guidance, check-in information and any property-specific requirements.</p></div><aside><h3>{accommodation.type}</h3><p>{accommodation.location}</p><p><strong>Sample only</strong></p><Button href="/contact?interest=Accommodation">Include a real stay in my trip</Button></aside></div></section></>;
}
