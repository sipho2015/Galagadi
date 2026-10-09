import Image from "next/image";
import Link from "next/link";
import { PriceBadge } from "@/components/PriceBadge";
import type { Activity } from "@/types";

export function ActivityCard({ activity }: { activity: Activity }) {
  return <article className="feature-card activity-catalogue-card"><Link className="activity-card-link" href={`/activities/${activity.slug}`} aria-label={`View ${activity.title}`}><div className="feature-card-image"><Image src={activity.image} alt={`${activity.title} in the Victoria Falls region`} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /><PriceBadge price={activity.price} /></div><div className="activity-card-copy"><p className="tag">{activity.category}</p><h3>{activity.title}</h3><p>{activity.summary}</p><div className="card-meta-row"><span>{activity.duration ?? "Duration on request"}</span><strong>{activity.price ?? "Price on request"}</strong></div><span className="text-link">View experience <span aria-hidden="true">&rarr;</span></span></div></Link></article>;
}
