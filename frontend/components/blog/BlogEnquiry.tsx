import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export function BlogEnquiry() {
  return <section className="journal-enquiry" aria-labelledby="journal-enquiry-title">
    <div className="container">
      <p className="eyebrow">Your story starts here</p>
      <h2 id="journal-enquiry-title">Ready to Experience It for Yourself?</h2>
      <p>Let Galagadi turn your research into an unforgettable Southern African journey. Explore our carefully planned packages or tell us what you&apos;d like to experience and we&apos;ll help you plan your trip.</p>
      <div className="hero-actions"><Link className="button button-primary" href="/safaris">Explore Packages</Link><a className="button button-secondary" href={whatsappUrl("Hello Galagadi, I have been reading your Travel Blog and would like help planning my journey.")} target="_blank" rel="noopener noreferrer">WhatsApp Us<span className="sr-only"> (opens in a new tab)</span></a></div>
    </div>
  </section>;
}
