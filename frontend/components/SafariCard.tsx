import Link from "next/link";
import type { ContentItem } from "@/types";

export function SafariCard({ safari }: { safari: ContentItem }) {
  return <article className="feature-card"><img src={safari.image} alt="" /><div><p className="tag">{safari.duration} · {safari.location}</p><h3>{safari.title}</h3><p>{safari.summary}</p><div className="card-footer"><strong>{safari.price}</strong><Link href={`/safaris/${safari.slug}`}>Explore <span aria-hidden>→</span></Link></div></div></article>;
}
