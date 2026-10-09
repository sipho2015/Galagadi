import Image from "next/image";
import Link from "next/link";
import { PriceBadge } from "@/components/PriceBadge";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { pageMetadata } from "@/lib/seo";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";
import { readingMinutes } from "@/lib/blog";
import "./blog/journal.css";
import journalStyles from "./home-journal.module.css";

export const metadata = pageMetadata("Victoria Falls & Chobe Safari Journeys", "Plan your Victoria Falls holiday and Zimbabwe or Botswana safari with Galagadi. Explore Chobe, Hwange, activities and tailor-made journeys with local support.", "/");

const values = [
  ["01", "Local knowledge", "Journeys shaped by people who know Victoria Falls, Zimbabwe and the surrounding region."],
  ["02", "Personal service", "Thoughtful support from your first enquiry through to the details of your journey."],
  ["03", "Flexible journeys", "A considered trip that can be shaped around your pace, interests and time."],
  ["04", "More than the highlights", "Connect with the culture, wildlife and stories that make this part of Africa distinctive."]
] as const;

const regionPanels = [
  { label: "Waterfalls & wonder", title: "Victoria Falls", description: "Feel the spray, wander rainforest paths and discover the wonder of the Zambezi.", image: "/images/destinations/Victoria_Falls.jpg", href: "/destinations/victoria-falls" },
  { label: "Wildlife & wilderness", title: "Hwange", description: "Head into the bush for close encounters and unhurried days on safari.", image: "/images/destinations/Hwange.jpg", href: "/destinations/hwange" },
  { label: "River & safari", title: "Chobe", description: "Follow the river through elephant country and savour the golden evening light.", image: "/images/destinations/Chobe.jpg", href: "/destinations/chobe" }
] as const;

export default function HomePage() {
  const latestPosts = [...blogPosts]
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 3);

  return <div className="home-page">
    <HeroCarousel />
    <section className="home-trust-bar" aria-label="How we help">
      <div className="container home-trust-grid">
        <p><strong>Victoria Falls based</strong><span>Local knowledge from the start</span></p>
        <p><strong>Made around you</strong><span>Packages shaped to your pace</span></p>
        <p><strong>Easy to begin</strong><span>Enquire by form, email or WhatsApp</span></p>
      </div>
    </section>
    <section className="home-why">
      <div className="container">
        <div className="home-section-intro"><p className="home-label">Why Galagadi?</p><h2>A more personal way to explore.</h2><p>We bring together local insight, thoughtful planning and the freedom to travel at your own pace.</p></div>
        <div className="home-values-grid">{values.map(([number, title, description]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>
    <section className="home-region">
      <div className="home-section-intro home-section-intro-light"><p className="home-label">Experience the region</p><h2>Three worlds. One unforgettable journey.</h2></div>
      <div className="container home-region-panels">{regionPanels.map(panel => <Link className="home-region-card" key={panel.title} href={panel.href} aria-label={`Explore ${panel.title}`}><Image src={panel.image} alt="" fill quality={90} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1160px) calc((100vw - 88px) / 3), 357px" /><div className="home-region-copy"><p className="home-label">{panel.label}</p><h3>{panel.title}</h3><p className="home-region-description">{panel.description}</p><span className="home-region-link">Explore {panel.title} <span aria-hidden="true">&rarr;</span></span></div></Link>)}</div>
    </section>
    <section className="home-escapes">
      <div className="container">
        <div className="home-section-intro"><p className="home-label">Optional experiences</p><h2>Make time for the moments that matter.</h2><p>Start with a package, then add the experiences that feel right for your free time.</p></div>
        <div className="home-escape-grid">{activities.slice(0, 4).map(activity => <article key={activity.slug}><Link className="home-activity-link" href={"/activities/" + activity.slug} aria-label={`View ${activity.title}`}><Image src={activity.image} alt={activity.title + " in the Victoria Falls region"} width={640} height={460} sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 280px" /><div><p className="home-label">{activity.location ?? "Experience"}</p><h3>{activity.title}</h3><div className="home-card-meta"><span>{activity.duration}</span><strong>{activity.price ?? "Price on request"}</strong></div><span className="home-activity-read">Discover experience <span aria-hidden="true">→</span></span></div></Link></article>)}</div>
        <div className="home-link-row"><Button href="/experiences#activities">Browse all activities</Button></div>
      </div>
    </section>
    <section className="home-packages">
      <div className="container">
        <div className="home-section-intro home-section-intro-light"><p className="home-label">Featured packages</p><h2>Let the journey come together.</h2><p>Begin with a considered safari package, then shape the details around you.</p></div>
        <div className="home-package-grid">{safaris.map(safari => <Link className="home-package-card" key={safari.slug} href={safari.isTailorMade ? "/contact?interest=Tailor-made%20journey&package=" + encodeURIComponent(safari.title) : "/safaris/" + safari.slug} aria-label={`View ${safari.title}, ${safari.price}`}><div className="home-package-image"><Image quality={95} src={safari.image} alt={safari.title + " safari"} fill sizes="(max-width: 880px) min(100vw - 40px, 620px), 360px" /><PriceBadge price={safari.price} /></div><div className="home-package-copy"><p className="home-label">{safari.isTailorMade ? "Custom Days \u2022 Custom Destinations \u2022 Custom Experiences" : safari.duration}</p><h3>{safari.title}</h3><p>{safari.cardSummary ?? safari.summary}</p>{safari.cardSupportingLine && <p className="tag">{safari.cardSupportingLine}</p>}<span className="home-package-link">{safari.isTailorMade ? "Build My Journey" : safari.cardCta ?? "View package"} <span aria-hidden="true">&rarr;</span></span></div></Link>)}</div>
        <div className="home-link-row"><Button href="/experiences#packages" variant="secondary">Explore our packages</Button></div>
      </div>
    </section>
    <section className="home-accommodation">
      <div className="container home-accommodation-grid">
        <div className="home-accommodation-image"><Image src="/images/accommodation/Lodge1.jpg" alt="Safari lodge terrace and swimming pool overlooking the bush" fill sizes="(max-width: 880px) min(100vw - 40px, 620px), 55vw" /></div>
        <div><p className="home-label">Accommodation</p><h2>Rest well. Wake up close to wonder.</h2><p className="home-accommodation-lead">The right stay gives every part of your journey room to breathe.</p><p>We can help you consider accommodation that suits your route, travel style and budget as part of your wider safari plan.</p><Button href="/discover#accommodation">Explore accommodation</Button></div>
      </div>
    </section>
    <section className={journalStyles.section} aria-labelledby="home-journal-title">
      <div className="container">
        <div className={journalStyles.header}>
          <div className={journalStyles.intro}>
            <p className="journal-label">The Galagadi Journal</p>
            <h2 id="home-journal-title">Travel Tips &amp; Inspiration</h2>
            <p>Discover practical travel advice, destination guides and safari inspiration to help you plan an unforgettable journey through Victoria Falls and Southern Africa.</p>
          </div>
          <Link className={journalStyles.allStories} href="/blog">View All Stories <span aria-hidden="true">→</span></Link>
        </div>
        <div className="journal-grid">
          {latestPosts.map(post => <BlogCard key={post.slug} post={{ ...post, minutes: readingMinutes(post) }} />)}
        </div>
      </div>
    </section>
    <section className="home-final-cta">
      <div className="container"><p className="home-label">Your African story starts here</p><h2>Travel with the rhythm of the region.</h2><p>Tell us when you would like to travel and what matters to you. We will help turn it into a considered journey.</p><div className="hero-actions"><Button href="/contact">Plan your journey</Button><Button href="/experiences#packages" variant="secondary">Explore our packages</Button></div></div>
    </section>
  </div>;
}
