import Image from "next/image";
import Link from "next/link";
import { PriceBadge } from "@/components/PriceBadge";
import type { SafariPackage } from "@/types";

export function SafariCard({ safari }: { safari: SafariPackage }) {
  const enquiryHref = `/contact?package=${encodeURIComponent(safari.title)}${safari.isTailorMade ? "&interest=Tailor-made%20journey" : ""}`;
  return <article className="feature-card safari-card"><Link href={`/safaris/${safari.slug}`} className="safari-card-main" aria-label={`View itinerary for ${safari.title}`}><div className="feature-card-image"><Image quality={95} src={safari.image} alt={`${safari.title} safari`} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /><PriceBadge price={safari.price} /></div><div className="safari-card-copy"><p className="tag">{safari.isTailorMade ? "Custom Days · Custom Destinations · Custom Experiences" : <>{safari.duration} &middot; {safari.location}</>}</p><h3>{safari.title}</h3><p>{safari.cardSummary ?? safari.summary}</p><span className="text-link">View itinerary &rarr;</span></div></Link><div className="safari-card-actions"><span>{safari.pricing?.status === "estimate" ? safari.pricing.note : "Plan your journey with us."}</span><Link className="button button-primary" href={enquiryHref} aria-label={`Enquire about ${safari.title}`}>Enquire</Link></div></article>;
}
