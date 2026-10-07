import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ActivityGallery } from "@/components/ActivityGallery";
import { Button } from "@/components/ui/button";
import { safaris } from "@/data/safaris";
import { whatsappUrl } from "@/lib/contact";
import { findBySlug } from "@/lib/utils";

export function generateStaticParams() {
  return safaris.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const safari = findBySlug(safaris, (await params).slug);
  if (!safari) return {};
  return {
    title: safari.title,
    description: safari.summary,
    alternates: { canonical: `/safaris/${safari.slug}` },
    openGraph: { title: safari.title, description: safari.summary, images: [{ url: safari.image, alt: safari.title }] },
    twitter: { card: "summary_large_image", title: safari.title, description: safari.summary, images: [safari.image] }
  };
}

function ListSection({ eyebrow, title, items, className = "", id }: { id?: string; eyebrow?: string; title: string; items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return <section id={id} className={`package-detail-block ${className}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2><ul className="package-list">{items.map(item => <li key={item}>{item}</li>)}</ul></section>;
}

export default async function SafariDetail({ params }: { params: Promise<{ slug: string }> }) {
  const safari = findBySlug(safaris, (await params).slug);
  if (!safari) notFound();
  const isStructuredJourney = Boolean(safari.itinerary?.some(day => day.schedule?.length));
  const enquiryHref = `/contact?package=${encodeURIComponent(safari.title)}${safari.isTailorMade ? "&interest=Tailor-made%20journey" : ""}`;
  const enquiryLabel = safari.isTailorMade ? "Build My Journey" : safari.enquiryCta ?? "Enquire about this package";
  const facts = [
    safari.location && { label: "Location", value: safari.location },
    safari.duration && { label: "Duration", value: safari.duration },
    safari.price && { label: "Starting price", value: safari.price },
    safari.startTime && { label: "Start", value: safari.startTime },
    safari.finishTime && { label: "Finish", value: safari.finishTime },
    safari.experienceType && { label: "Experience type", value: safari.experienceType },
    safari.startingPoint && { label: "Starting point", value: safari.startingPoint },
    safari.endingPoint && { label: "Ending point", value: safari.endingPoint }
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));
  const inclusionSections = <div className="package-detail-grid package-inclusion-grid"><ListSection title="What’s Included" items={safari.inclusions} /><ListSection title="What’s Not Included" items={safari.exclusions} /></div>;
  const relatedPackages = safaris.filter(({ slug }) => slug !== safari.slug);

  return <>
    <section className="detail-image package-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(44,33,24,.28),rgba(44,33,24,.72)),url(${safari.image})` }}>
      <div className="container">
        <Link className="package-back" href="/experiences#packages">&larr; All packages</Link>
        <p className="eyebrow">Safari package{safari.location ? ` \u00b7 ${safari.location}` : ""}</p>
        <h1>{safari.title}</h1>
        {safari.subtitle && <p className="large-text">{safari.subtitle}</p>}
        <p className="package-hero-summary">{safari.summary}</p>
        {isStructuredJourney && <p>{safari.route}</p>}
        <dl className="package-hero-facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        <div className="hero-actions"><Button href={enquiryHref}>{enquiryLabel}</Button><Button href={safari.itinerary?.length ? "#itinerary" : "#overview"} variant="secondary">Explore the journey</Button></div>
      </div>
    </section>
    <nav className="package-section-nav" aria-label="Package sections"><div className="container"><a href="#overview">Overview</a>{safari.showDayAtGlance && <a href="#day-at-a-glance">Day at a glance</a>}{safari.itinerary?.length ? <a href="#itinerary">Itinerary</a> : null}{(safari.accommodation?.length || safari.meals?.length || safari.activitiesIncluded?.length || safari.optionalExperiences?.length || safari.inclusions?.length || safari.exclusions?.length) ? <a href={safari.inclusionsBeforeItinerary ? "#package-inclusions" : "#package-details"}>What's included</a> : null}{safari.gallery?.length ? <a href="#package-gallery">Gallery</a> : null}{safari.importantInformation?.length ? <a href="#travel-notes">Travel notes</a> : null}<a href="#package-enquiry">Enquire</a></div></nav>
    <section className="section package-detail-section">
      <div className="container package-detail-layout">
        <div className="package-detail-main">
          <section id="overview" className="package-overview" aria-labelledby="overview-title"><p className="eyebrow">Package overview</p><h2 id="overview-title">Your journey at a glance.</h2><p className="large-text">{safari.summary}</p>{safari.description.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}{safari.route && !isStructuredJourney && <><h3>Your route</h3><p>{safari.route}</p></>}</section>
          <ListSection eyebrow="The journey" title={safari.showDayAtGlance ? "Experience Highlights" : "Highlights"} items={safari.highlights} />
          {isStructuredJourney && <section id="journey-route" className="package-detail-block"><p className="eyebrow">Zimbabwe to Botswana</p><h2>Journey Route</h2><p>{safari.route}</p></section>}
          {safari.inclusionsBeforeItinerary && <div id="package-inclusions">{inclusionSections}</div>}
          {safari.showDayAtGlance && safari.itinerary?.length ? <section id="day-at-a-glance" className="package-detail-block" aria-labelledby="day-at-a-glance-title"><p className="eyebrow">{isStructuredJourney ? "Your week on safari" : "From sunrise to evening"}</p><h2 id="day-at-a-glance-title">{safari.glanceTitle ?? "Day at a Glance"}</h2><ol className="package-list">{safari.itinerary.map((item, index) => <li key={item.title}><a href={`#itinerary-step-${index}`}><strong>{item.day}</strong><br />{item.title}</a>{item.glance && <p>{item.glance.join(" \u00b7 ")}</p>}</li>)}</ol></section> : null}
          {safari.itinerary?.length ? <section id="itinerary" className="package-detail-block" aria-labelledby="itinerary-title"><p className="eyebrow">{safari.itineraryEyebrow ?? (safari.showDayAtGlance ? "Your full-day experience" : "Day by day")}</p><h2 id="itinerary-title">{safari.itineraryTitle ?? (safari.showDayAtGlance ? "Full Detailed Itinerary" : "Your itinerary")}</h2><p>{safari.itineraryIntro ?? (safari.showDayAtGlance ? "Explore each experience in your day, from the elephant breakfast to dinner on the Zambezi." : "Select a day to explore the plan.")}</p><ol className="itinerary-list">{safari.itinerary.map((item, index) => <li id={safari.showDayAtGlance ? `itinerary-step-${index}` : undefined} key={`${item.day}-${item.title}`}><details open={(!isStructuredJourney && safari.showDayAtGlance) || index === 0}><summary><span className="itinerary-day">{item.day}</span><span>{item.title}</span><span className="itinerary-toggle" aria-hidden="true">+</span></summary><p>{item.heading && <><strong className="tag">{item.heading}</strong><br /></>}{item.location && <><strong>{item.location}</strong><br /></>}{item.description}</p>
                {item.schedule?.length ? <div className="package-overview"><ol className="itinerary-list">{item.schedule.map(stop => <li key={stop.time + stop.title}><details open><summary><span className="itinerary-day">{stop.time}</span><span>{stop.title}</span><span className="itinerary-toggle" aria-hidden="true">+</span></summary><p>{stop.description}</p></details></li>)}</ol><dl className="package-facts">{item.accommodation?.length ? <div><dt>Accommodation</dt><dd>{item.accommodation.join(" / ")}</dd></div> : null}{item.meals?.length ? <div><dt>Meals</dt><dd>{item.meals.join(", ")}</dd></div> : null}{item.travelInformation?.length ? <div><dt>Transfers & durations</dt><dd>{item.travelInformation.map(info => <p key={info}>{info}</p>)}</dd></div> : null}</dl></div> : null}
              </details></li>)}</ol></section> : null}
          {!isStructuredJourney && <div id="package-details" className="package-detail-grid"><ListSection title="Accommodation" items={safari.accommodation} /><ListSection title="Meals" items={safari.meals} /><ListSection title="Activities included" items={safari.activitiesIncluded} /><ListSection title="Optional experiences" items={safari.optionalExperiences} /></div>}
          {!safari.inclusionsBeforeItinerary && <div id={isStructuredJourney ? "package-details" : undefined}>{inclusionSections}</div>}
          {isStructuredJourney && <><ListSection id="travel-notes" eyebrow="Before you go" title="Important Travel Information" items={safari.importantInformation} className="package-important-info" /><ListSection title="Accommodation" items={safari.accommodation} /><ListSection title="Meals" items={safari.meals} /><ListSection title="Optional experiences" items={safari.optionalExperiences} /></>}
          {safari.gallery?.length ? <section id="package-gallery" className="package-detail-block" aria-labelledby="package-gallery-title"><p className="eyebrow">In pictures</p><h2 id="package-gallery-title">Journey gallery</h2><ActivityGallery images={safari.gallery} title={safari.title} /></section> : null}
          {safari.showDayAtGlance && <div className="package-enquiry"><p className="eyebrow">{safari.finalEnquiryEyebrow ?? "Your Victoria Falls day"}</p><h2>{safari.finalEnquiryTitle ?? "From sunrise to an evening on the Zambezi."}</h2><p>Share your dates and guest details. We will confirm availability, the price and all inclusions before booking.</p><div className="package-enquiry-actions"><Button href={enquiryHref}>{enquiryLabel}</Button><a className="button button-secondary package-plan-button" href={whatsappUrl(`Hello Galagadi Tours & Safari, I would like to enquire about ${safari.title}.`)} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div></div>}
          {!isStructuredJourney && <ListSection id="travel-notes" eyebrow="Before you go" title="Important information" items={safari.importantInformation} className="package-important-info" />}
        </div>
        <aside className="package-detail-aside">
          {facts.length > 0 && <dl className="package-facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
          <div id="package-enquiry" className="package-enquiry"><p className="eyebrow">Plan with Galagadi</p><h2>Make this journey yours.</h2><p>Tell us your dates and travel preferences. We'll help shape the details around you.</p><div className="package-enquiry-actions"><Button href={enquiryHref}>{enquiryLabel}</Button><a className="button button-secondary package-plan-button" href={whatsappUrl(`Hello Galagadi Tours & Safari, I would like to enquire about ${safari.title}.`)} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div></div>
        </aside>
      </div>
    </section>
    {relatedPackages.length > 0 && <section className="section section-tint package-related-section" aria-labelledby="related-packages-title"><div className="container"><div className="section-heading"><p className="eyebrow">Keep exploring</p><h2 id="related-packages-title">More ways to safari</h2></div><div className="package-related-links">{relatedPackages.map(item => <Link href={`/safaris/${item.slug}`} key={item.slug}><span>{item.duration}</span><strong>{item.title}</strong><em>Explore package &rarr;</em></Link>)}</div></div></section>}
  </>;
}
