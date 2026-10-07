import { ActivityCatalogue } from "@/components/ActivityCatalogue";
import { Hero } from "@/components/Hero";
import { SafariCard } from "@/components/SafariCard";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { pageMetadata } from "@/lib/seo";

const travelServices = [
  ["Airport Transfers", "Reliable transfers between Victoria Falls Airport and your accommodation, arranged to support a smooth arrival or departure."],
  ["Private Transfers", "Comfortable private transport between Victoria Falls, nearby destinations and regional connections as part of your journey."],
  ["Guided Tours", "Local guides can help you experience Victoria Falls, wildlife areas and cultural moments with greater context."],
  ["Accommodation Assistance", "Help finding accommodation that suits your preferred location, comfort level and budget."],
  ["Custom Itineraries", "Shape a trip around your interests, available time and the experiences you would most like to include."],
  ["Travel Planning", "Bring accommodation, activities, transfers and timing together into a clear, well-organised journey."]
] as const;

export const metadata = pageMetadata("Safari Packages & Victoria Falls Activities", "Explore full-day experiences and multi-day safaris in Victoria Falls, Hwange, Chobe and the Okavango Delta. Plan a tailor-made journey with Galagadi.", "/experiences");

export default function ExperiencesPage() {
  return <><Hero compact eyebrow="Journeys" title="Journeys made for the moments that matter." description="Find your safari package, choose memorable activities and arrange the travel support that brings your journey together." image="/images/gallery/Inside_the_safari.jpg"><div className="hero-actions"><Button href="#packages">Explore packages</Button><Button href="#activities" variant="secondary">Browse activities</Button><Button href="#travel-services" variant="secondary">Travel services</Button></div></Hero><section id="packages" className="section" aria-labelledby="packages-title"><div className="container"><div className="section-heading"><p className="eyebrow">Safari packages</p><h2 id="packages-title">Choose the journey that feels like yours.</h2><p>Begin with a considered itinerary, then tell us how you would like to shape the details around it.</p></div><div className="card-grid">{safaris.map(safari => <SafariCard key={safari.slug} safari={safari} />)}</div></div></section><section id="activities" className="section section-tint" aria-labelledby="activities-title"><div className="container"><div className="section-heading"><p className="eyebrow">Activities</p><h2 id="activities-title">Add experiences around your free time.</h2><p>Filter by interest, then open an experience to see its available details and make an enquiry.</p></div><ActivityCatalogue activities={activities} /></div></section><section id="travel-services" className="section" aria-labelledby="travel-services-title"><div className="container"><div className="section-heading"><p className="eyebrow">Travel services</p><h2 id="travel-services-title">Travel services for your journey.</h2><p>Practical, local support around the package you choose.</p></div><div className="journey-value-grid">{travelServices.map(([title, description], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section><section className="section package-first-cta"><div className="container"><p className="eyebrow">Tailor-made travel</p><h2>Not seeing the right combination?</h2><p>Tell us your dates, pace and interests and we can help shape a journey around you.</p><Button href="/contact?interest=Tailor-made%20journey">Plan your journey</Button></div></section></>;
}
