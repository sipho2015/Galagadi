import { Hero } from "@/components/Hero";
import { ActivityCard } from "@/components/ActivityCard";
import { activities } from "@/data/activities";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Activities", "Safari, river and Victoria Falls experiences.");
export default function ActivitiesPage() { return <><Hero compact eyebrow="Experiences" title="Feel closer to the place." description="From river stillness to the thrill of a game drive, choose the moments that call to you." image="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container card-grid">{activities.map(activity => <ActivityCard key={activity.slug} activity={activity} />)}</div></section></>; }
