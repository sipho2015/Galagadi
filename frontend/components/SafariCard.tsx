import Image from "next/image";
import Link from "next/link";
import { PriceBadge } from "@/components/PriceBadge";
import type { SafariPackage } from "@/types";

export function SafariCard({ safari }: { safari: SafariPackage }) {
  return <Link href={`/safaris/${safari.slug}`} className="feature-card safari-card" aria-label={`Explore ${safari.title}, ${safari.price}`}><div className="feature-card-image"><Image src={safari.image} alt={`${safari.title} safari`} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /><PriceBadge price={safari.price} /></div><div><p className="tag">{safari.duration} &middot; {safari.location}</p><h3>{safari.title}</h3><p>{safari.summary}</p><div className="card-footer"><strong>{safari.price}</strong><span className="text-link">Explore <span aria-hidden="true">&rarr;</span></span></div></div></Link>;
}
