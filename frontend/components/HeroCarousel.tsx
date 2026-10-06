"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";

const slideDuration = 2000;
const slides = [
  { image: "/images/hero/Golden Hour at Victoria Falls.png", mobilePosition: "65% center", alt: "Victoria Falls in golden sunset light", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." },
  { image: "/images/hero/Golden Bungee Leap Over Misty Falls.png", mobilePosition: "40% center", alt: "Bungee jump above the misty Victoria Falls gorge", eyebrow: "Victoria Falls", title: "Start with a journey worth remembering.", description: "Choose a considered safari package, then add the experiences that suit your free time." },
  { image: "/images/hero/Golden Sunset Safari Cruise.png", mobilePosition: "78% center", alt: "Safari cruise boat on a river at sunset", eyebrow: "Chobe, Botswana", title: "Wildlife, water and wide-open skies.", description: "Discover a journey that connects the region's remarkable places at your own pace." },
  { image: "/images/hero/Golden Sunset Elephant Herd.png", mobilePosition: "25% center", alt: "Elephant herd beside the water at sunset", eyebrow: "Hwange, Zimbabwe", title: "A local way to experience the wild.", description: "Thoughtful planning, local knowledge and time to take it all in." },
  { image: "/images/hero/Helicopter Sunset Over Victoria Falls.png", mobilePosition: "25% center", alt: "Helicopter above Victoria Falls at sunset", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), slideDuration);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  return <section className="hero-carousel" aria-label="Galagadi safari highlights">
    {slides.map((item, index) => <Image key={item.image} className={`hero-carousel-image ${index === active ? "active" : ""}`} style={{ "--hero-mobile-position": item.mobilePosition } as CSSProperties} src={item.image} alt={index === active ? item.alt : ""} fill priority={index === 0} sizes="100vw" />)}
    <div className="hero-carousel-overlay" />
    <div className="container hero-carousel-content"><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="hero-copy">{slide.description}</p><div className="hero-actions"><Button href="/experiences#activities">Explore experiences</Button><Button href="/experiences#packages" variant="secondary">View packages</Button></div></div>
  </section>;
}
