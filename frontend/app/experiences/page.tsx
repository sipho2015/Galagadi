import { ActivityCatalogue } from "@/components/ActivityCatalogue";
import { Hero } from "@/components/Hero";
import { SafariCard } from "@/components/SafariCard";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Experiences", "Explore Galagadi safari packages and Victoria Falls experiences.", "/experiences");

export default function ExperiencesPage() {
  return <><Hero compact eyebrow="Experiences" title="Journeys made for the moments that matter." description="Start with a considered safari package, then add the experiences that make your time in the region distinctly yours." image="/images/gallery/Inside_the_safari.jpg"><div className="hero-actions"><Button href="#packages">Explore packages</Button><Button href="#activities" variant="secondary">Browse activities</Button></div></Hero><section id="packages" className="section" aria-labelledby="packages-title"><div className="container"><div className="section-heading"><p className="eyebrow">Safari packages</p><h2 id="packages-title">Choose the journey that feels like yours.</h2><p>Begin with a considered itinerary, then tell us how you would like to shape the details around it.</p></div><div className="card-grid">{safaris.map(safari => <SafariCard key={safari.slug} safari={safari} />)}</div></div></section><section id="activities" className="section section-tint" aria-labelledby="activities-title"><div className="container"><div className="section-heading"><p className="eyebrow">Activities</p><h2 id="activities-title">Add experiences around your free time.</h2><p>Filter by interest, then open an experience to see its available details and make an enquiry.</p></div><ActivityCatalogue activities={activities} /></div></section><section className="section package-first-cta"><div className="container"><p className="eyebrow">Tailor-made travel</p><h2>Not seeing the right combination?</h2><p>Tell us your dates, pace and interests and we can help shape a journey around you.</p><Button href="/contact?interest=Tailor-made%20journey">Plan your journey</Button></div></section></>;
}
