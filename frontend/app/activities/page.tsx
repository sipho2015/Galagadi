import { ActivityCard } from "@/components/ActivityCard";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Activities", "Safari, river and Victoria Falls experiences.");
const planningPaths = [
  { timeframe: "I have one day", title: "Build My Day", description: "Tell us what calls to you and we’ll help shape a day of experiences that fits your time in Victoria Falls.", href: "/contact", action: "Build my day" },
  { timeframe: "I have several days", title: "Show Me Itineraries", description: "Explore considered multi-day journeys that bring together the region’s standout moments at an easy pace.", href: "/safaris", action: "View itineraries" },
  { timeframe: "I want everything sorted", title: "Show Me Packages", description: "Start with a ready-to-enjoy safari package, with the important details of your trip already thoughtfully connected.", href: "/safaris", action: "Explore packages" }
];

export default function ActivitiesPage() { return <><Hero compact eyebrow="Experiences" title="Feel closer to the place." description="Choose your package first, then add the experiences that suit your free time." image="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2000&q=90" /><section className="section planning-section" aria-labelledby="planning-title"><div className="container"><div className="section-heading centered-heading"><p className="eyebrow">Plan your time</p><h2 id="planning-title">How would you like to explore?</h2><p>Packages are the main trip choice; activities can be added around the package as free-time experiences.</p></div><div className="planning-grid">{planningPaths.map((path, index) => <article className={`planning-card ${path.title === "Show Me Packages" ? "planning-card-featured" : ""}`} key={path.title}><span className="planning-number" aria-hidden="true">0{index + 1}</span><p className="tag">{path.timeframe}</p><h3>{path.title}</h3><p>{path.description}</p><Button href={path.href}>{path.action}</Button></article>)}</div></div></section><section className="section section-tint" aria-labelledby="activities-title"><div className="container"><div className="section-heading"><p className="eyebrow">Optional experiences</p><h2 id="activities-title">Activities to add to your journey</h2><p>Browse experiences you may enjoy in your free time once your package is in place.</p></div><div className="card-grid">{activities.map(activity => <ActivityCard key={activity.slug} activity={activity} />)}</div></div></section></>; }
