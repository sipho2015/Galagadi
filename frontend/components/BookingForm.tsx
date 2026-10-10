"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
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
  const id = useId();
  const [arrivalDate, setArrivalDate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const errors: Record<string, string> = {};
    const data = new FormData(form);
    for (const control of Array.from(form.elements)) {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) || control.name.startsWith("_")) continue;
      if (control.required && ((control instanceof HTMLInputElement && control.type === "checkbox") ? !control.checked : !control.value.trim())) {
        errors[control.name] = ({name: "Please enter your full name, for example John Smith.", journey_type: "Please choose an enquiry type. Choose a tailor-made journey or advice if unsure.", message: "Please add a short message, for example: Please help me plan a safari.", privacy_consent: "Please tick this box so we can use your details to reply."} as Record<string, string>)[control.name];
      } else if (!control.validity.valid) {
        errors[control.name] = control.name === "email" ? "Please enter an email like john@gmail.com, with an @ symbol and no spaces." : control instanceof HTMLInputElement && control.type === "number" ? "Please enter a whole number of " + control.min + " or more, or leave blank if unsure." : "Please choose a valid date. Departure must be on or after arrival.";
      }
    }
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (phone && (!/^\+[0-9 ()-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15)) errors.phone = "Please include + and your country code, for example +44 7700 900123. Use 7 to 15 digits; spaces, brackets and hyphens are welcome.";
    if (!email && !phone) {
      errors.email = "Please enter your email, or provide an international phone / WhatsApp number below so we can reply.";
      errors.phone = "Please provide a phone / WhatsApp number or an email address. You only need one.";
    }
    if (data.get("arrival_date") && data.get("departure_date") && String(data.get("departure_date")) < String(data.get("arrival_date"))) errors.departure_date = "Please choose a departure date on or after arrival.";
    return errors;
  }

  function field(name: string) {
    return { id: id + name, "aria-invalid": !!fieldErrors[name], "aria-describedby": id + name + "-help" + (fieldErrors[name] ? " " + id + name + "-error" : "") };
  }
  function guidance(name: string, hint: string) {
    return <><span className="form-help" id={id + name + "-help"}>{hint}</span>{fieldErrors[name] && <span className="field-error" id={id + name + "-error"}>{fieldErrors[name]}</span>}</>;
  }
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
    if (status === "submitting") return;
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setError("Please check the highlighted fields. Your other answers have been kept.");
      const first = form.elements.namedItem(Object.keys(errors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setError("");
    setStatus("submitting");
    const formData = new FormData(form);
    for (const name of ["name", "email", "phone", "message"]) formData.set(name, String(formData.get(name) ?? "").trim());
    if (!formData.get("email")) formData.delete("email");
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(emailEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, activities: formData.getAll("activities").join(", "), preferred_destinations: formData.getAll("preferred_destinations").join(", "), enquiry_summary: enquirySummary(formData), _subject: "New Galagadi website enquiry", _template: "table", _captcha: "false" })
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === "false") throw new Error("Enquiry service unavailable");
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

  return <form className="booking-form" onSubmit={submit} noValidate onBlur={event => {
    const control = event.target;
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
      const errors = validate(event.currentTarget);
      setFieldErrors(current => ({ ...current, [control.name]: errors[control.name] ?? "" }));
    }
  }} onChange={event => {
    const errors = validate(event.currentTarget);
    setFieldErrors(current => Object.fromEntries(Object.keys(current).map(name => [name, errors[name] ?? ""])));
  }}>
    <h2>{title}</h2>
    <p>Share as much or as little as you know. We will help you shape the rest.</p>
    <p>Fields marked * are required. Provide an email address or an international phone number. Other fields are optional unless marked.</p>
    <p className="form-assistance">Need help or prefer WhatsApp? <a href={whatsappUrl("Hello Galagadi, please help me plan my trip.")} target="_blank" rel="noreferrer">Get help on WhatsApp</a>. No form needed.</p>
    {error && <p className="form-error" role="alert">{error}</p>}
    <fieldset className="package-choice">
      <legend>1. What would you like to plan?<span aria-hidden="true"> *</span></legend>
      <p>Choose the option that best fits your starting point.</p>
      <label htmlFor={id + "journey_type"}>Type of enquiry *</label>
      <select {...field("journey_type")} required name="journey_type" value={journeyType} onChange={event => setJourneyType(event.target.value)}>
        <option value="" disabled>Select an option</option>
        <option value="Safari package">A safari package</option>
        <option value="Activities or day experiences">Activities or day experiences</option>
        <option value="Accommodation">Accommodation</option>
        <option value="Tailor-made journey">A tailor-made journey or advice</option>
      </select>
      {guidance("journey_type", "Not sure? Choose a tailor-made journey or advice.")}
    </fieldset>
    <fieldset className="activity-choice">
      <legend>2. Add details if you have them</legend>
      <label>Preferred package<select name="package" value={selectedPackage} onChange={event => { setSelectedPackage(event.target.value); if (event.target.value === "Tailor-Made Safari") setJourneyType("Tailor-made journey"); }}><option value="">I would like advice first</option>{safaris.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></label>
      <p>Select any experiences you would like to include. This is optional.</p>
      <div className="activity-checkboxes">{activities.map(activity => <label key={activity.slug}><input type="checkbox" name="activities" value={activity.title} checked={selectedActivities.includes(activity.title)} onChange={event => setSelectedActivities(current => event.target.checked ? [...current, activity.title] : current.filter(item => item !== activity.title))} /> <span>{activity.title}</span></label>)}</div>
    </fieldset>
    {isTailorMade && <fieldset className="activity-choice"><legend>Preferred destinations</legend><p>Select the places you would like to include. Livingstone/Zambia is an optional extension.</p><div className="activity-checkboxes">{destinationChoices.map(destination => <label key={destination}><input type="checkbox" name="preferred_destinations" value={destination} /> <span>{destination}</span></label>)}</div></fieldset>}
    <div className="form-grid">
      <label>Full name<span aria-hidden="true"> *</span><input {...field("name")} required name="name" type="text" autoComplete="name" placeholder="John Smith" />{guidance("name", "The name you would like us to use when replying.")}</label>
      <label>Email address<input {...field("email")} type="email" name="email" autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="john@gmail.com" />{guidance("email", "Leave blank if you provide a phone / WhatsApp number.")}</label>
      <label>Phone or WhatsApp number<input {...field("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44 7700 900123" />{guidance("phone", "Include + and your country code, such as +44 for the UK or +27 for South Africa. Optional if you provide email.")}</label>
      <label>Accommodation needed?<select name="accommodation_needed" defaultValue="Not sure yet"><option value="Not sure yet">Not sure yet - please advise me</option><option value="Yes">Yes - help me arrange a stay</option><option value="No">No - I will arrange my own stay</option></select></label>
      <label>Arrival date<input {...field("arrival_date")} name="arrival_date" type="date" value={arrivalDate} onChange={event => setArrivalDate(event.target.value)} />{guidance("arrival_date", "Use the calendar, or leave blank if your dates are undecided.")}</label>
      <label>Departure date<input {...field("departure_date")} name="departure_date" type="date" min={arrivalDate || undefined} />{guidance("departure_date", "Choose arrival day or later, or leave blank if unsure.")}</label>
      {isTailorMade && <><label>Number of days<input {...field("number_of_days")} placeholder="7" name="number_of_days" type="number" step="1" min="1" inputMode="numeric" />{guidance("number_of_days", "Enter whole days, or leave blank for advice.")}</label><label>Accommodation preference<select name="accommodation_preference" defaultValue=""><option value="">Please advise me</option><option>Luxury lodges</option><option>Mid-range lodges or hotels</option><option>Tented safari camps</option><option>Budget accommodation</option><option>A mix of styles</option></select></label></>}
      <label>Adults<input {...field("adults")} placeholder="2" name="adults" type="number" step="1" min="1" inputMode="numeric" />{guidance("adults", "Enter 1 or more, or leave blank if unsure.")}</label>
      <label>Children<input {...field("children")} placeholder="0" name="children" type="number" step="1" min="0" inputMode="numeric" />{guidance("children", "Enter 0 for no children, or leave blank if unsure.")}</label>
    </div>
    <label>{isTailorMade ? "Additional requests / message" : "Message"}<span aria-hidden="true"> *</span><textarea {...field("message")} required name="message" rows={5} placeholder="We are two adults visiting Victoria Falls and Chobe for a week. Could you suggest a safari?" />{guidance("message", "A short sentence is enough. Include any questions or accessibility needs if you wish.")}</label>
    <label className="form-consent"><input {...field("privacy_consent")} required type="checkbox" name="privacy_consent" value="yes" /> <span>I agree that Galagadi Tours &amp; Safari may use these details to respond to my enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.<span aria-hidden="true"> *</span></span></label>
    {guidance("privacy_consent", "We use your details to respond to this enquiry.")}
    <input className="sr-only" tabIndex={-1} autoComplete="off" name="_honey" aria-hidden="true" />
    <button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send enquiry"}</button>
    <a className="form-whatsapp-link" onClick={event => { const form = event.currentTarget.closest("form"); if (form) event.currentTarget.href = whatsappUrl(`Hello Galagadi Tours & Safari, I would like help planning my journey.\n${enquirySummary(new FormData(form))}`); }} href={whatsappUrl(`Hello Galagadi Tours & Safari, I would like help planning my journey.\n${selectedPackage ? `package: ${selectedPackage}` : journeyType}`)} target="_blank" rel="noreferrer">Prefer WhatsApp? Chat with us.</a>
  </form>;
}
