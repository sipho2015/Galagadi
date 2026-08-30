import type { ReactNode } from "react";

export function Hero({ eyebrow, title, description, image, children, compact = false }: { eyebrow: string; title: string; description: string; image: string; children?: ReactNode; compact?: boolean }) {
  return <section className={compact ? "hero hero-compact" : "hero"} style={{ backgroundImage: `linear-gradient(90deg, rgba(24, 20, 13, .87), rgba(24, 20, 13, .38)), url(${image})` }}>
    <div className="container hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-copy">{description}</p>{children}</div>
  </section>;
}
