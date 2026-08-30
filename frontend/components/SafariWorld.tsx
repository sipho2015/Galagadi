"use client";

import Link from "next/link";
import { useState } from "react";
import { activities } from "@/data/activities";
import { destinations } from "@/data/destinations";
import { safaris } from "@/data/safaris";
import type { ContentItem } from "@/types";

const collections: Record<string, { label: string; href: string; items: ContentItem[] }> = {
  experiences: { label: "Experiences", href: "/activities", items: activities },
  destinations: { label: "Destinations", href: "/destinations", items: destinations },
  safaris: { label: "Safaris", href: "/safaris", items: safaris }
};

export function SafariWorld() {
  const [active, setActive] = useState("experiences");
  const current = collections[active];

  return <section className="section safari-world">
    <div className="container">
      <div className="section-heading centered-heading">
        <p className="eyebrow">Discover our safari world</p>
        <h2>Africa, experienced your way.</h2>
        <p>Every detail has a purpose: to bring you closer to the landscapes, wildlife and people that make this region unforgettable.</p>
      </div>
      <div className="world-tabs" role="tablist" aria-label="Discover Galagadi">
        {Object.entries(collections).map(([key, item]) => <button key={key} className={active === key ? "active" : ""} onClick={() => setActive(key)} role="tab" aria-selected={active === key}>{item.label}</button>)}
      </div>
      <div className="world-grid">
        {current.items.map((item, index) => <Link href={`${current.href}/${item.slug}`} className={`world-card world-card-${index + 1}`} key={item.slug}>
          <img src={item.image} alt="" />
          <div><p className="tag">{current.label.slice(0, -1)}</p><h3>{item.title}</h3><p>{item.summary}</p><span>Explore →</span></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
