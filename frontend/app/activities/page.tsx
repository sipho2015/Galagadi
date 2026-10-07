import { ActivityCatalogue } from "@/components/ActivityCatalogue";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Victoria Falls Activities & Day Trips", "Explore Victoria Falls activities, from guided Falls tours and helicopter flights to Zambezi cruises, game drives and cultural experiences with Galagadi.", "/activities");

const planningPaths = [
  { timeframe: "I have one day", title: "Build My Day", description: "Tell us what calls to you and we will help shape a day of experiences that fits your time in Victoria Falls.", href: "/contact", action: "Build my day" },
  { timeframe: "I have several days", title: "Show Me Itineraries", description: "Explore considered multi-day journeys that bring together the region's standout moments at an easy pace.", href: "/experiences#packages", action: "View itineraries" },
  { timeframe: "I want everything sorted", title: "Show Me Packages", description: "Start with a ready-to-enjoy safari package, with the important details of your trip already thoughtfully connected.", href: "/experiences#packages", action: "Explore packages" }
] as const;

export default function ActivitiesPage() {
  return <><Hero compact eyebrow="Experiences" title="Feel closer to the place." description="Choose a package first, then add the experiences that suit your free time." image="/images/gallery/Inside_the_safari.jpg"><div className="hero-actions"><Button href="/contact?interest=Activities">Plan an experience</Button><Button href="/experiences#packages" variant="secondary">View packages</Button></div></Hero><section className="section planning-section" aria-labelledby="planning-title"><div className="container"><div className="section-heading centered-heading"><p className="eyebrow">Plan your time</p><h2 id="planning-title">How would you like to explore?</h2><p>Packages are the main trip choice; activities can be added around the package as free-time experiences.</p></div><div className="planning-grid">{planningPaths.map((path, index) => <article className={"planning-card " + (path.title === "Show Me Packages" ? "planning-card-featured" : "")} key={path.title}><span className="planning-number" aria-hidden="true">0{index + 1}</span><p className="tag">{path.timeframe}</p><h3>{path.title}</h3><p>{path.description}</p><Button href={path.href}>{path.action}</Button></article>)}</div></div></section><section className="section section-tint" aria-labelledby="activities-title"><div className="container"><div className="section-heading"><p className="eyebrow">Experience catalogue</p><h2 id="activities-title">Find the experience that calls to you.</h2><p>Filter by interest, then open an experience to see its available details and make an enquiry.</p></div><ActivityCatalogue activities={activities} /></div></section><section className="section package-first-cta"><div className="container"><p className="eyebrow">Need something more complete?</p><h2>Start with a safari package.</h2><p>Choose a considered itinerary first, then layer in the free-time experiences that make the journey feel yours.</p><Button href="/experiences#packages">Explore packages</Button></div></section></>;
}
