"use client";

import { useState, type FormEvent } from "react";

export function BookingForm({ title = "Start planning your journey" }: { title?: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="form-success"><h3>Thank you for your inquiry.</h3><p>We&apos;ll be in touch soon. For a faster response, message us directly on WhatsApp.</p><a className="button button-primary" href="https://wa.me/263782363947">Chat on WhatsApp</a></div>;
  return <form className="booking-form" onSubmit={submit}><h2>{title}</h2><p>This inquiry form is frontend-only; submitting it will show your next step without sending data to a server.</p><div className="form-grid"><label>Full name<input required name="name" autoComplete="name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label><label>Interested in<select name="interest" defaultValue=""><option value="" disabled>Select an experience</option><option>Safari package</option><option>Destination</option><option>Accommodation</option><option>Custom journey</option></select></label></div><label>Tell us about your ideal trip<textarea required name="message" rows={5} placeholder="Travel dates, number of travellers, interests…" /></label><button className="button button-primary" type="submit">Send inquiry</button></form>;
}
