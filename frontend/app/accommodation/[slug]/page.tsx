import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/data/accommodations";
import { findBySlug } from "@/lib/utils";
import { AccommodationRates } from "@/components/AccommodationRates";

export function generateStaticParams() {
  return accommodations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const accommodation = findBySlug(accommodations, (await params).slug);
  if (!accommodation) return {};
  return { title: accommodation.name, description: accommodation.description, alternates: { canonical: `/accommodation/${accommodation.slug}` } };
}

export default async function AccommodationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const accommodation = findBySlug(accommodations, (await params).slug);
  if (!accommodation) notFound();

  return <><Hero compact eyebrow="Victoria Falls accommodation" title={accommodation.name} description={accommodation.description} image={accommodation.image}><div className="hero-actions"><Button href={`/contact?interest=Accommodation&accommodation=${accommodation.options?.[0] ?? ""}`}>Enquire about this stay</Button><Button href="/accommodation" variant="secondary">All accommodation</Button></div></Hero><section className="section"><div className="container"><h2>Room and meal choices</h2><p>Choose your room and meal option below. Contact us to check availability for your dates.</p><ul>{accommodation.notes?.map(note => <li key={note}>{note}</li>)}</ul><AccommodationRates optionIds={accommodation.options ?? []} /><div className="centered"><Button href="/experiences#packages">Choose a package for your stay</Button></div></div></section></>;
}
