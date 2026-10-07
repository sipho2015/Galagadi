import Link from "next/link";
import Image from "next/image";
import { whatsappUrl } from "@/lib/contact";

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><Link className="brand footer-brand" href="/"><Image src="/logo/logo.png" alt="Galagadi Tours & Safari" width={46} height={46} /><span>Galagadi Tours &amp; Safari</span></Link><p>Victoria Falls and Chobe safari planning with genuine local insight.</p></div>
      <nav aria-label="Footer navigation"><h3>Explore</h3><Link href="/experiences">Journeys</Link><Link href="/discover">Discover</Link><Link href="/contact">Contact</Link></nav>
      <div><h3>Let&apos;s talk</h3><a href="mailto:booking@galagadisafari.com">booking@galagadisafari.com</a><a href={whatsappUrl()} target="_blank" rel="noreferrer">078 965 2298</a><p>Victoria Falls, Zimbabwe</p></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Galagadi Tours &amp; Safari</span><Link href="/privacy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/terms-of-use">Terms of Use</Link><Link href="/faq">FAQ</Link></div>
  </footer>;
}
