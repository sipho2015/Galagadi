"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slideDuration = 6000;

const slides = [
  { image: "/images/hero/About_Us.jpeg", alt: "View across the Victoria Falls landscape", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." },
  { image: "/images/destinations/The_Victoria_Falls.jpeg", alt: "Water flowing over Victoria Falls", eyebrow: "Victoria Falls", title: "Start with a journey worth remembering.", description: "Choose a considered safari package, then add the experiences that suit your free time." },
  { image: "/images/destinations/Chobezi.jpeg", alt: "River landscape in Chobe", eyebrow: "Chobe, Botswana", title: "Wildlife, water and wide-open skies.", description: "Discover a journey that connects the region’s remarkable places at your own pace." },
  { image: "/images/destinations/Rhino_Hwange.jpeg", alt: "Rhinoceros in Hwange landscape", eyebrow: "Hwange, Zimbabwe", title: "A local way to experience the wild.", description: "Thoughtful planning, local knowledge and time to take it all in." }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedByInteraction, setIsPausedByInteraction] = useState(false);
  useEffect(() => {
    if (!isPlaying || isPausedByInteraction || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), slideDuration);
    return () => window.clearInterval(timer);
  }, [isPlaying, isPausedByInteraction]);
  const select = (index: number) => setActive((index + slides.length) % slides.length);
  const slide = slides[active];
  return <section className="hero-carousel" aria-roledescription="carousel" aria-label="Galagadi safari highlights" onMouseEnter={() => setIsPausedByInteraction(true)} onMouseLeave={() => setIsPausedByInteraction(false)} onFocus={() => setIsPausedByInteraction(true)} onBlur={() => setIsPausedByInteraction(false)}>
    {slides.map((item, index) => <Image key={item.image} className={`hero-carousel-image ${index === active ? "active" : ""}`} src={item.image} alt={index === active ? item.alt : ""} fill priority={index === 0} sizes="100vw" />)}
    <div className="hero-carousel-overlay" />
    <div className="container hero-carousel-content"><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="hero-copy">{slide.description}</p><div className="hero-actions"><Button href="/safaris">Explore Our Packages</Button><Button href="/contact" variant="secondary">Build My Day</Button></div></div>
    <div className="hero-carousel-controls"><button type="button" onClick={() => select(active - 1)} aria-label="Previous slide">←</button><button type="button" onClick={() => setIsPlaying(current => !current)} aria-label={isPlaying ? "Pause automatic slides" : "Play automatic slides"}>{isPlaying ? "Ⅱ" : "▶"}</button><div className="hero-carousel-dots" role="tablist" aria-label="Choose hero slide">{slides.map((item, index) => <button key={item.image} type="button" role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}: ${item.eyebrow}`} className={index === active ? "active" : ""} onClick={() => select(index)}><span className={`hero-carousel-progress ${index === active && isPlaying && !isPausedByInteraction ? "playing" : ""}`} key={index === active ? active : undefined} /></button>)}</div><button type="button" onClick={() => select(active + 1)} aria-label="Next slide">→</button></div>
  </section>;
}
