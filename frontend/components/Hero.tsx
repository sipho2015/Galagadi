import type { ReactNode } from "react";
import Image from "next/image";

export function Hero({ eyebrow, title, description, image, children, compact = false }: { eyebrow: string; title: string; description: string; image: string; children?: ReactNode; compact?: boolean }) {
  return <section className={compact ? "hero hero-compact" : "hero"}>
    <div className="hero-media" aria-hidden="true"><Image className="hero-image" src={image} alt="" fill priority sizes="100vw" /></div>
    <div className="container hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-copy">{description}</p>{children}</div>
  </section>;
}
