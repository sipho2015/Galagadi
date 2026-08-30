import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><Link className="brand footer-brand" href="/"><img src="/logo/logo.jpeg" alt="Galagadi" /><span>Galagadi Tours & Safari</span></Link><p>Victoria Falls and Chobe safari planning with genuine local insight.</p></div>
      <nav aria-label="Footer navigation"><h3>Explore</h3><Link href="/safaris">Safaris</Link><Link href="/destinations">Destinations</Link><Link href="/activities">Activities</Link><Link href="/accommodation">Accommodation</Link></nav>
      <div><h3>Let&apos;s talk</h3><a href="mailto:booking@galagadisafari.com">booking@galagadisafari.com</a><a href="https://wa.me/263782363947" target="_blank" rel="noreferrer">+263 78 236 3947</a><p>Victoria Falls, Zimbabwe</p></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Galagadi Tours & Safari</span><Link href="/privacy">Privacy</Link><Link href="/faq">FAQ</Link></div>
  </footer>;
}
