import { Hero } from "@/components/Hero";
import { SafariWorld } from "@/components/SafariWorld";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";

const moments = [
  ["Zambezi at sunset", "River", "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=1200&q=85"],
  ["Wild encounters", "Wildlife", "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=85"],
  ["The Smoke That Thunders", "Victoria Falls", "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=85"],
  ["Golden-hour drives", "Safari", "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=85"]
];

const dining = [
  ["The Lookout Café", "Panoramic views", "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85"],
  ["The Boma", "African dining", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85"],
  ["Zambezi Riverside", "Sunset dining", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85"],
  ["Local flavours", "A taste of Victoria Falls", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"]
];

export default function HomePage() {
  return <>
    <Hero eyebrow="Victoria Falls & Chobe safari experiences" title="Africa, revealed with heart." description="Immersive journeys through Victoria Falls and Chobe, guided by local knowledge, thoughtful planning and a true love for this place." image="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2000&q=90"><div className="hero-actions"><Button href="/safaris">Explore safaris</Button><Button href="/contact" variant="secondary">Build your trip</Button></div></Hero>
    <section className="section welcome-section"><div className="container welcome-grid"><div className="welcome-image"><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1300&q=85" alt="Elephants on safari" /></div><div><p className="eyebrow">Welcome to Galagadi</p><h2>Personal journeys. Wildly memorable.</h2><p className="large-text">We make it easy to experience Southern Africa in a way that feels personal, effortless and deeply connected.</p><p>From the roar of Victoria Falls to quiet encounters on the Chobe River, each journey is shaped around how you want to travel, what you want to feel and the memories you want to take home.</p><div className="welcome-points"><span>Local insight</span><span>Trusted partners</span><span>Tailor-made planning</span></div><Button href="/about">Our story</Button></div></div></section>
    <SafariWorld />
    <section className="section captured-section"><div className="container"><div className="section-heading"><p className="eyebrow">Photo gallery</p><h2>Captured moments</h2><p>A glimpse of the extraordinary landscapes, wildlife and warm light that await you.</p></div><div className="home-gallery">{moments.map(([title, category, image]) => <figure key={title}><img src={image} alt={title} /><figcaption><span>{category}</span><strong>{title}</strong></figcaption></figure>)}</div><div className="section-link"><Button href="/gallery">View the gallery</Button></div></div></section>
    <section className="section dining-section"><div className="container"><div className="dining-heading"><div><p className="eyebrow">Dining around Victoria Falls</p><h2>Good days end around a table.</h2></div><p>From riverside favourites to vibrant local kitchens, we can weave memorable meals into your journey.</p></div><div className="dining-rail">{dining.map(([name, type, image]) => <article key={name}><img src={image} alt="" /><div><p>{type}</p><h3>{name}</h3></div></article>)}</div></div></section>
    <Testimonials />
    <section className="proof-section"><div className="container proof-grid"><div><strong>Tailor-made</strong><span>Journeys shaped around you</span></div><div><strong>Local</strong><span>Knowledge that brings places to life</span></div><div><strong>Victoria Falls + Chobe</strong><span>One extraordinary region</span></div></div></section>
    <section className="home-cta"><div className="container"><p className="eyebrow">Your adventure starts here</p><h2>Let&apos;s create your African story.</h2><p>Tell us where your imagination is taking you. We&apos;ll help turn it into a journey that feels entirely your own.</p><Button href="/contact">Plan your safari</Button></div></section>
    <section className="section"><div className="container split faq-split"><div><p className="eyebrow">Good to know</p><h2>Safari questions, answered.</h2><p>We keep planning clear before you commit, then refine each detail together.</p><Button href="/faq">View all questions</Button></div><FAQ /></div></section>
  </>;
}
