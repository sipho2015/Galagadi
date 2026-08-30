import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { findBySlug } from "@/lib/utils";
export function generateStaticParams() { return activities.map(({ slug }) => ({ slug })); }
export default async function ActivityDetail({ params }: { params: Promise<{ slug: string }> }) { const activity = findBySlug(activities, (await params).slug); if (!activity) notFound(); return <><div className="detail-image" style={{ backgroundImage: `linear-gradient(rgba(24,20,13,.24),rgba(24,20,13,.66)),url(${activity.image})` }}><div className="container"><p className="eyebrow">Activity</p><h1>{activity.title}</h1></div></div><section className="section"><div className="container detail-content"><div><p className="large-text">{activity.description}</p><h2>Included moments</h2><ul>{activity.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><aside><h3>Make it part of your journey.</h3><Button href="/contact">Ask about this activity</Button></aside></div></section></>; }
