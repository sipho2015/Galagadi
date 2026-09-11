import { Hero } from "@/components/Hero";
import { SafariCard } from "@/components/SafariCard";
import { safaris } from "@/data/safaris";
import { pageMetadata } from "@/lib/seo";

const travelServices = [
  ["Airport Transfers", "Reliable transfers between Victoria Falls Airport and your accommodation, arranged to support a smooth arrival or departure."],
  ["Private Transfers", "Comfortable private transport between Victoria Falls, nearby destinations and regional connections as part of your journey."],
  ["Guided Tours", "Local guides can help you experience Victoria Falls, wildlife areas and cultural moments with greater context."],
  ["Accommodation Assistance", "Help finding accommodation that suits your preferred location, comfort level and budget."],
  ["Custom Itineraries", "Shape a trip around your interests, available time and the experiences you would most like to include."],
  ["Travel Planning", "Bring accommodation, activities, transfers and timing together into a clear, well-organised journey."]
];

export const metadata = pageMetadata("Safari packages", "Explore Victoria Falls and Chobe safari packages.");

export default function SafarisPage() { return <><Hero compact eyebrow="Safaris" title="Make the wild your own." description="Start with one of our considered itineraries, then make it uniquely yours." image="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container card-grid">{safaris.map(safari => <SafariCard key={safari.slug} safari={safari} />)}</div></section><section className="section section-tint" aria-labelledby="travel-services-title"><div className="container"><div className="section-heading"><p className="eyebrow">Travel services</p><h2 id="travel-services-title">Travel services for your journey.</h2><p>Practical, local support around the package you choose.</p></div><div className="journey-value-grid">{travelServices.map(([title, description], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section></>; }
