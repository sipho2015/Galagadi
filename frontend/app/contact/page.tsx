import { Hero } from "@/components/Hero";
import { BookingForm } from "@/components/BookingForm";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact", "Start planning your Galagadi safari journey.", "/contact");

export default function ContactPage() {
  return <><Hero compact eyebrow="Contact us" title="Let’s begin your journey." description="Tell us the kind of trip you have in mind and any experiences you would like to add." image="/images/gallery/Zambezi_River.jpg" /><section className="section"><div className="container contact-layout"><BookingForm /><aside className="contact-details"><p className="eyebrow">Prefer to connect directly?</p><h2>We’d love to hear from you.</h2><a href="mailto:booking@galagadisafari.com">booking@galagadisafari.com</a><a href={whatsappUrl("Hello Galagadi Tours & Safari, I would like help planning my journey.")} target="_blank" rel="noreferrer">WhatsApp: 078 965 2298</a><p>Victoria Falls, Zimbabwe</p><hr /><h3>A simple starting point</h3><p>There is no need to have every detail decided. Share the dates and ideas you have, and we will help you consider the rest.</p><p className="contact-reassurance">You can continue the conversation by email or WhatsApp after sending your enquiry.</p></aside></div></section></>;
}
