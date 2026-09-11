import { Hero } from "@/components/Hero";
import { BookingForm } from "@/components/BookingForm";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contact", "Start planning your Galagadi safari journey.");
export default function ContactPage() { return <><Hero compact eyebrow="Contact us" title="Let&apos;s begin your journey." description="Choose a package first, then tell us which free-time experiences you&apos;d like to add." image="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container contact-layout"><BookingForm /><aside className="contact-details"><p className="eyebrow">Prefer to connect directly?</p><h2>We&apos;d love to hear from you.</h2><a href="mailto:booking@galagadisafari.com">booking@galagadisafari.com</a><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp: 078 965 2298</a><p>Victoria Falls, Zimbabwe</p></aside></div></section></>; }
