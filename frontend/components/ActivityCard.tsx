import Link from "next/link";
import type { ContentItem } from "@/types";

export function ActivityCard({ activity }: { activity: ContentItem }) {
  return <article className="feature-card"><img src={activity.image} alt="" /><div><p className="tag">Experience</p><h3>{activity.title}</h3><p>{activity.summary}</p><Link className="text-link" href={`/activities/${activity.slug}`}>Learn more →</Link></div></article>;
}
