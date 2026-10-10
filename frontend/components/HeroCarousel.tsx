"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";

const slideDuration = 2000;
const slides = [
  { image: "/images/hero/Rain_forest.jpg", mobilePosition: "45% center", alt: "Victoria Falls and a rainbow seen from the rainforest", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." },
  { image: "/images/hero/under the bridge.jpg", mobilePosition: "50% center", alt: "Victoria Falls Bridge above the Zambezi River gorge", eyebrow: "Victoria Falls", title: "Start with a journey worth remembering.", description: "Choose a considered safari package, then add the experiences that suit your free time." },
  { image: "/images/hero/SunsetCruise.jpg", mobilePosition: "55% center", alt: "River cruise boat silhouetted against an orange sunset", eyebrow: "Chobe, Botswana", title: "Wildlife, water and wide-open skies.", description: "Discover a journey that connects the region's remarkable places at your own pace." },
  { image: "/images/hero/Elephant_along_zambezi.jpg", mobilePosition: "35% center", alt: "Elephant silhouetted beside the river at sunset", eyebrow: "Hwange, Zimbabwe", title: "A local way to experience the wild.", description: "Thoughtful planning, local knowledge and time to take it all in." },
  { image: "/images/hero/helicopter.jpg", mobilePosition: "50% center", alt: "Passengers enjoying the view from inside a helicopter", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." },
  { image: "/images/hero/JetBoat2.jpeg", mobilePosition: "50% center", alt: "View of Victoria Falls from a boat in the gorge", eyebrow: "Victoria Falls", title: "Start with a journey worth remembering.", description: "Choose a considered safari package, then add the experiences that suit your free time." }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), slideDuration);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  return <section className="hero-carousel" aria-label="Galagadi safari highlights">
    <div className="hero-carousel-media">
    {slides.map((item, index) => <Image key={item.image} className={`hero-carousel-image ${index === active ? "active" : ""}`} style={{ "--hero-mobile-position": item.mobilePosition } as CSSProperties} src={item.image} alt={index === active ? item.alt : ""} fill priority={index === 0} sizes="100vw" />)}
    </div>
    <div className="hero-carousel-overlay" />
    <div className="container hero-carousel-content"><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="hero-copy">{slide.description}</p><div className="hero-actions"><Button href="/experiences#activities">Explore experiences</Button><Button href="/experiences#packages" variant="secondary">View packages</Button></div></div>
  </section>;
}
