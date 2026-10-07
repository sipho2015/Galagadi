"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { whatsappUrl } from "@/lib/contact";

const emailEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL_ENDPOINT ?? "https://formsubmit.co/ajax/booking@galagadisafari.com";
const destinationChoices = ["Victoria Falls", "Hwange", "Chobe", "Okavango Delta", "Matobo", "Great Zimbabwe", "Livingstone/Zambia", "Other"];

function enquirySummary(data: FormData) {
  return Array.from(new Set(Array.from(data.keys())))
    .filter(key => !key.startsWith("_") && key !== "privacy_consent")
    .map(key => `${key.replaceAll("_", " ")}: ${data.getAll(key).filter(value => String(value).trim()).join(", ")}`)
    .filter(line => !line.endsWith(": ")).join("\n");
}

type SubmitState = "idle" | "submitting" | "sent" | "error";

export function BookingForm({ title = "Start planning your journey" }: { title?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [journeyType, setJourneyType] = useState("");

  const isTailorMade = journeyType === "Tailor-made journey" || selectedPackage === "Tailor-Made Safari";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const activityChoices = query.getAll("activity");
    const interest = query.get("interest");
    setSelectedPackage(query.get("package") ?? "");
    setSelectedActivities(activityChoices);
    if (query.get("package")) setJourneyType("Safari package");
    if (interest === "Accommodation") setJourneyType("Accommodation");
    if (interest === "Activities" || activityChoices.length) setJourneyType("Activities or day experiences");
    if (interest === "Tailor-made journey") setJourneyType("Tailor-made journey");
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError("Please complete the required fields before continuing.");
      form.reportValidity();
      return;
    }

    setError("");
    setStatus("submitting");
    const formData = new FormData(form);
    const arrival = String(formData.get("arrival_date") ?? "");
    const departure = String(formData.get("departure_date") ?? "");
    if (arrival && departure && departure < arrival) {
      setError("Departure date must be on or after arrival date.");
      setStatus("idle");
      return;
    }
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(emailEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, activities: formData.getAll("activities").join(", "), preferred_destinations: formData.getAll("preferred_destinations").join(", "), enquiry_summary: enquirySummary(formData), _subject: "New Galagadi website enquiry", _template: "table", _captcha: "false" })
      });

      if (!response.ok) throw new Error("Enquiry service unavailable");
      setSelectedActivities([]);
      setStatus("sent");
      form.reset();
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setError("We could not send your enquiry just now. Please try again, email us, or contact us on WhatsApp.");
    }
  }

  if (status === "sent") {
    return <div className="form-success" role="status"><h3>Your enquiry has been sent.</h3><p>Taking you to the next steps now.</p><a className="button button-primary" href={whatsappUrl("Hello Galagadi Tours & Safari, I have just submitted an enquiry and would like to continue planning here.")} target="_blank" rel="noreferrer">Continue on WhatsApp</a></div>;
  }

  return <form className="booking-form" onSubmit={submit} noValidate>
    <h2>{title}</h2>
    <p>Share as much or as little as you know. We will help you shape the rest.</p>
    {error && <p className="form-error" role="alert">{error}</p>}
    <fieldset className="package-choice">
      <legend>1. What would you like to plan?<span aria-hidden="true"> *</span></legend>
      <p>Choose the option that best fits your starting point.</p>
      <select required name="journey_type" value={journeyType} onChange={event => setJourneyType(event.target.value)}>
        <option value="" disabled>Select an option</option>
        <option value="Safari package">A safari package</option>
        <option value="Activities or day experiences">Activities or day experiences</option>
        <option value="Accommodation">Accommodation</option>
        <option value="Tailor-made journey">A tailor-made journey or advice</option>
      </select>
    </fieldset>
    <fieldset className="activity-choice">
      <legend>2. Add details if you have them</legend>
      <label>Preferred package<select name="package" value={selectedPackage} onChange={event => { setSelectedPackage(event.target.value); if (event.target.value === "Tailor-Made Safari") setJourneyType("Tailor-made journey"); }}><option value="">I would like advice first</option>{safaris.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></label>
      <p>Select any experiences you would like to include. This is optional.</p>
      <div className="activity-checkboxes">{activities.map(activity => <label key={activity.slug}><input type="checkbox" name="activities" value={activity.title} checked={selectedActivities.includes(activity.title)} onChange={event => setSelectedActivities(current => event.target.checked ? [...current, activity.title] : current.filter(item => item !== activity.title))} /> <span>{activity.title}</span></label>)}</div>
    </fieldset>
    {isTailorMade && <fieldset className="activity-choice"><legend>Preferred destinations</legend><p>Select the places you would like to include. Livingstone/Zambia is an optional extension.</p><div className="activity-checkboxes">{destinationChoices.map(destination => <label key={destination}><input type="checkbox" name="preferred_destinations" value={destination} /> <span>{destination}</span></label>)}</div></fieldset>}
    <div className="form-grid">
      <label>Full name<span aria-hidden="true"> *</span><input required name="name" autoComplete="name" /></label>
      <label>Email address<span aria-hidden="true"> *</span><input required type="email" name="email" autoComplete="email" /></label>
      <label>Phone or WhatsApp number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" /></label>
      <label>Accommodation needed?<select name="accommodation_needed" defaultValue=""><option value="">Not sure yet</option><option value="Yes">Yes</option><option value="No">No</option></select></label>
      <label>Arrival date<input name="arrival_date" type="date" /></label>
      <label>Departure date<input name="departure_date" type="date" /></label>
      {isTailorMade && <><label>Number of days<input name="number_of_days" type="number" min="1" inputMode="numeric" /></label><label>Accommodation preference<select name="accommodation_preference" defaultValue=""><option value="">Please advise me</option><option>Luxury lodges</option><option>Mid-range lodges or hotels</option><option>Tented safari camps</option><option>Budget accommodation</option><option>A mix of styles</option></select></label></>}
      <label>Adults<input name="adults" type="number" min="1" inputMode="numeric" /></label>
      <label>Children<input name="children" type="number" min="0" inputMode="numeric" /></label>
    </div>
    <label>{isTailorMade ? "Additional requests / message" : "Message"}<span aria-hidden="true"> *</span><textarea required name="message" rows={5} placeholder="Tell us what you have in mind, including any dates, interests or questions." /></label>
    <label className="form-consent"><input required type="checkbox" name="privacy_consent" value="yes" /> <span>I agree that Galagadi Tours &amp; Safari may use these details to respond to my enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.<span aria-hidden="true"> *</span></span></label>
    <input className="sr-only" tabIndex={-1} autoComplete="off" name="_honey" aria-hidden="true" />
    <button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send enquiry"}</button>
    <a className="form-whatsapp-link" onClick={event => { const form = event.currentTarget.closest("form"); if (form) event.currentTarget.href = whatsappUrl(`Hello Galagadi Tours & Safari, I would like help planning my journey.\n${enquirySummary(new FormData(form))}`); }} href={whatsappUrl(`Hello Galagadi Tours & Safari, I would like help planning my journey.\n${selectedPackage ? `package: ${selectedPackage}` : journeyType}`)} target="_blank" rel="noreferrer">Prefer WhatsApp? Chat with us.</a>
  </form>;
}
