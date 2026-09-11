"use client";

import { useState, type FormEvent } from "react";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { whatsappUrl } from "@/lib/contact";

const emailEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL_ENDPOINT ?? "https://formsubmit.co/ajax/booking@galagadisafari.com";
type SubmitState = "idle" | "submitting" | "sent" | "error";

export function BookingForm({ title = "Start planning your journey" }: { title?: string }) {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [selectedPackage] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("package") ?? "");
  const [selectedActivities, setSelectedActivities] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const query = new URLSearchParams(window.location.search);
    return query.getAll("activity").length ? query.getAll("activity") : (query.get("interest") ? [query.get("interest")!] : []);
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { setError("Please complete the required fields before continuing."); form.reportValidity(); return; }
    setError(""); setStatus("submitting");
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(emailEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...values, activities: formData.getAll("activities").join(", "), _subject: "New Galagadi website enquiry", _template: "table" }) });
      if (!response.ok) throw new Error("Email service unavailable");
      setStatus("sent"); form.reset();
    } catch { setStatus("error"); setError("We could not send your enquiry just now. Please try again or contact us on WhatsApp."); }
  }

  if (status === "sent") return <div className="form-success" role="status"><h3>Your enquiry has been sent.</h3><p>Thank you. Our team will receive your details at booking@galagadisafari.com.</p><a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>;

  return <form className="booking-form" onSubmit={submit} noValidate><h2>{title}</h2><p>Choose your package first, then add any free-time experiences you would enjoy around it.</p>{error && <p className="form-error" role="alert">{error}</p>}<fieldset className="package-choice"><legend>1. Choose your package<span aria-hidden="true"> *</span></legend><p>Your package is the main trip choice. We&apos;ll help tailor the details from there.</p><select required name="package" defaultValue={selectedPackage}><option value="" disabled>Select a package</option>{safaris.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></fieldset><fieldset className="activity-choice"><legend>2. Add optional experiences</legend><p>Select any activities you&apos;d like to enjoy in your free time. This is optional.</p><div className="activity-checkboxes">{activities.map(activity => <label key={activity.slug}><input type="checkbox" name="activities" value={activity.title} checked={selectedActivities.includes(activity.title)} onChange={event => setSelectedActivities(current => event.target.checked ? [...current, activity.title] : current.filter(item => item !== activity.title))} /> <span>{activity.title}</span></label>)}</div></fieldset><div className="form-grid"><label>Full name<span aria-hidden="true"> *</span><input required name="name" autoComplete="name" /></label><label>Email address<span aria-hidden="true"> *</span><input required type="email" name="email" autoComplete="email" /></label><label>Travel date<input name="travel_date" type="date" /></label><label>Number of travellers<input required name="travellers" type="number" min="1" inputMode="numeric" /></label></div><label>Message<span aria-hidden="true"> *</span><textarea required name="message" rows={5} placeholder="Tell us what you have in mind." /></label><input className="sr-only" tabIndex={-1} autoComplete="off" name="_honey" aria-hidden="true" /><button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send enquiry"}</button><a className="form-whatsapp-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Prefer WhatsApp? Chat with us.</a></form>;
}
