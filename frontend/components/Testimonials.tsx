import { testimonials } from "@/data/testimonials";

export function Testimonials() { return <section className="testimonial-section"><div className="container"><p className="eyebrow">Guest notes</p><h2>Journeys remembered for a lifetime.</h2><div className="testimonial-grid">{testimonials.map(item => <blockquote key={item.name}><p>“{item.quote}”</p><footer>{item.name}</footer></blockquote>)}</div></div></section>; }
