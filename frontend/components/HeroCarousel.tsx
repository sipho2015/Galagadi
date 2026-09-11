"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slideDuration = 3000;
const slides = [
  { image: "/images/hero/About_Us.jpeg", alt: "View across the Victoria Falls landscape", eyebrow: "Galagadi Tours & Safari", title: "Africa, revealed with heart.", description: "Personal journeys through Victoria Falls, Hwange and Chobe, shaped around you." },
  { image: "/images/destinations/The_Victoria_Falls.jpeg", alt: "Water flowing over Victoria Falls", eyebrow: "Victoria Falls", title: "Start with a journey worth remembering.", description: "Choose a considered safari package, then add the experiences that suit your free time." },
  { image: "/images/destinations/Chobezi.jpeg", alt: "River landscape in Chobe", eyebrow: "Chobe, Botswana", title: "Wildlife, water and wide-open skies.", description: "Discover a journey that connects the region’s remarkable places at your own pace." },
  { image: "/images/destinations/Rhino_Hwange.jpeg", alt: "Rhinoceros in Hwange landscape", eyebrow: "Hwange, Zimbabwe", title: "A local way to experience the wild.", description: "Thoughtful planning, local knowledge and time to take it all in." }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), slideDuration);
    return () => window.clearInterval(timer);
  }, []);
  const slide = slides[active];
  return <section className="hero-carousel" aria-roledescription="carousel" aria-label="Galagadi safari highlights">
    {slides.map((item, index) => <Image key={item.image} className={`hero-carousel-image ${index === active ? "active" : ""}`} src={item.image} alt={index === active ? item.alt : ""} fill priority={index === 0} sizes="100vw" />)}
    <div className="hero-carousel-overlay" />
    <div className="container hero-carousel-content"><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="hero-copy">{slide.description}</p><div className="hero-actions"><Button href="/safaris">Explore Our Packages</Button><Button href="/contact" variant="secondary">Build My Day</Button></div></div>
  </section>;
}
