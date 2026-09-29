import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <section className="legal-page"><div className="container narrow"><p className="eyebrow">Page not found</p><h1>This path has wandered off.</h1><p>The page you are looking for may have moved, or the link may no longer be available. Use one of these paths to keep planning.</p><div className="hero-actions"><Button href="/">Return home</Button><Link className="button button-outline" href="/experiences#activities">Explore activities</Link><Link className="button button-outline" href="/experiences#packages">View packages</Link></div></div></section>;
}
