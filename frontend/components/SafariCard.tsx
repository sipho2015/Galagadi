import Image from "next/image";
import Link from "next/link";
import { PriceBadge } from "@/components/PriceBadge";
import type { SafariPackage } from "@/types";

export function SafariCard({ safari }: { safari: SafariPackage }) {
  return <Link href={safari.isTailorMade ? `/contact?interest=Tailor-made%20journey&package=${encodeURIComponent(safari.title)}` : `/safaris/${safari.slug}`} className="feature-card safari-card" aria-label={`Explore ${safari.title}, ${safari.price}`}><div className="feature-card-image"><Image quality={95} src={safari.image} alt={`${safari.title} safari`} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /><PriceBadge price={safari.price} /></div><div><p className="tag">{safari.isTailorMade ? "Custom Days \u2022 Custom Destinations \u2022 Custom Experiences" : <>{safari.duration} &middot; {safari.location}</>}</p><h3>{safari.title}</h3><p>{safari.cardSummary ?? safari.summary}</p>{safari.cardSupportingLine && <p className="tag">{safari.cardSupportingLine}</p>}<div className="card-footer"><strong>{safari.price}</strong><span className="text-link">{safari.isTailorMade ? "Build My Journey" : safari.cardCta ?? "Explore"} <span aria-hidden="true">&rarr;</span></span></div></div></Link>;
}
