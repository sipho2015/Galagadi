"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
import { activities } from "@/data/activities";
import { safaris } from "@/data/safaris";
import { whatsappUrl } from "@/lib/contact";
import { packageOptionalActivities, stayOptions } from "@/data/package-pricing";
import { enquiryPricing, validatePackageSelection, type EnquirySelection } from "@/lib/package-pricing";
import { enquiryMessage, enquirySummary } from "@/lib/enquiry";

const emailEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL_ENDPOINT ?? "https://formsubmit.co/ajax/booking@galagadisafari.com";
const destinationChoices = ["Victoria Falls", "Hwange", "Chobe", "Okavango Delta", "Matobo", "Great Zimbabwe", "Livingstone/Zambia", "Other"];

type SubmitState = "idle" | "submitting" | "sent" | "error";

export function BookingForm({ title = "Start planning your journey" }: { title?: string }) {
  const router = useRouter();
  const id = useId();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [childAges, setChildAges] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("Please advise me");
  const [roomAllocation, setRoomAllocation] = useState<"sharing" | "single">("sharing");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function selectionFromData(data: FormData): EnquirySelection {
    const count = Number(data.get("children"));
    return { arrival: String(data.get("arrival_date") ?? ""), departure: String(data.get("departure_date") ?? ""), adults: Number(data.get("adults")), childCount: count,
      ages: Array.from({ length: Number.isInteger(count) && count >= 0 && count <= 20 ? count : 0 }, (_, index) => { const age = data.get(`child_age_${index}`); return age === null || age === "" ? null : Number(age); }),
      optionId: String(data.get("accommodation_option") ?? ""), transport: String(data.get("transport_preference") ?? ""), roomAllocation: data.get("room_allocation") === "single" ? "single" : "sharing" };
  }

  function validate(form: HTMLFormElement) {
    const errors: Record<string, string> = {};
    const data = new FormData(form);
    for (const control of Array.from(form.elements)) {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) || control.name.startsWith("_")) continue;
      if (control.required && ((control instanceof HTMLInputElement && control.type === "checkbox") ? !control.checked : !control.value.trim())) {
        errors[control.name] = ({name: "Please enter your full name, for example John Smith.", journey_type: "Please choose an enquiry type. Choose a tailor-made journey or advice if unsure.", message: "Please add a short message, for example: Please help me plan a safari.", privacy_consent: "Please tick this box so we can use your details to reply."} as Record<string, string>)[control.name] ?? "Please complete this field.";
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
    Object.assign(errors, validatePackageSelection(selectionFromData(data)));
    return errors;
  }

  function field(name: string) {
    return { id: id + name, "aria-invalid": !!fieldErrors[name], "aria-describedby": id + name + "-help" + (fieldErrors[name] ? " " + id + name + "-error" : "") };
  }
  function guidance(name: string, hint: string) {
    return <><span className="form-help" id={id + name + "-help"}>{hint}</span>{fieldErrors[name] && <span className="field-error" id={id + name + "-error"}>{fieldErrors[name]}</span>}</>;
  }
  function checkForContact(form: HTMLFormElement) {
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setError("Please check the highlighted fields before sending your enquiry.");
      const first = form.elements.namedItem(Object.keys(errors)[0] === "child_ages" ? "child_age_0" : Object.keys(errors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return null;
    }
    setError("");
    return enquiryMessage(new FormData(form));
  }
  const [error, setError] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [journeyType, setJourneyType] = useState("");
  const chosenSafari = safaris.find(item => item.title === selectedPackage);
  const childCount = Number.isInteger(Number(children)) && Number(children) >= 0 && Number(children) <= 20 ? Number(children) : 0;
  const selection: EnquirySelection = { arrival: arrivalDate, departure: departureDate, adults: Number(adults), childCount: Number(children), ages: Array.from({ length: childCount }, (_, index) => childAges[index] ? Number(childAges[index]) : null), optionId: accommodation, transport, roomAllocation };
  const pricing = enquiryPricing(chosenSafari, selection);
  const optionalNotes = [
    selectedActivities.includes("Morning Elephant Experience (refreshments only)") && Number(adults) < 2 ? "Morning Elephant Experience needs two guests in total; a combined departure must be confirmed. Child participation rules need confirmation." : "",
    selectedActivities.includes("Sunset cruise + riverside dinner (on land)") && Number(adults) < 10 ? "Zambezi Vista cruise + riverside dinner has an ordinary minimum of 10; a departure must be confirmed. Dinner is on land, not aboard." : "",
    selectedActivities.some(activity => activity.includes("Flight of Angels")) ? "Flight of Angels public reference: USD 173 base plus mandatory USD 37 government/fuel charge; dated rates and breakdown need confirmation." : "",
    selectedActivities.some(activity => activity.includes("Explore the Zambezi")) ? "Explore the Zambezi is 22 minutes: public reference USD 271 base plus mandatory USD 50 government/fuel charge; dated rates and breakdown need confirmation." : "",
    childCount > 0 && selectedActivities.length > 0 ? "Child activity prices and participation rules must be confirmed separately; accommodation discounts are not applied to activities or transfers." : ""
  ].filter(Boolean);
  const displayedPricing = [pricing.text, ...pricing.notes, ...optionalNotes].join("\n");

  const isTailorMade = journeyType === "Tailor-made journey" || selectedPackage === "Tailor-Made Safari";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const activityChoices = query.getAll("activity");
    const interest = query.get("interest");
    setSelectedPackage(query.get("package") ?? "");
    setSelectedActivities(activityChoices);
    const option = query.get("accommodation");
    if (stayOptions.some(item => item.id === option)) setAccommodation(option!);
    if (/^\d{4}-\d{2}-\d{2}$/.test(query.get("arrival") ?? "")) setArrivalDate(query.get("arrival")!);
    if (/^\d{4}-\d{2}-\d{2}$/.test(query.get("departure") ?? "")) setDepartureDate(query.get("departure")!);
    const adultValue = Number(query.get("adults"));
    if (Number.isInteger(adultValue) && adultValue >= 1 && adultValue <= 100) setAdults(String(adultValue));
    const childrenValue = Number(query.get("children"));
    if (Number.isInteger(childrenValue) && childrenValue >= 0 && childrenValue <= 20) { setChildren(String(childrenValue)); setChildAges(query.getAll("child_age").slice(0, childrenValue)); }
    if (query.get("room_allocation") === "single") setRoomAllocation("single");
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
      const first = form.elements.namedItem(Object.keys(errors)[0] === "child_ages" ? "child_age_0" : Object.keys(errors)[0]);
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
      <label>Falls accommodation option<select name="accommodation_option" value={accommodation} onChange={event => setAccommodation(event.target.value)}><option value="">Please advise me</option>{stayOptions.map(option => <option key={option.id} value={option.id}>{option.property} · {option.room} · {option.board}{option.category === "Serviced tent" ? " · camping" : ""}</option>)}</select></label>
      <input type="hidden" name="accommodation_description" value={stayOptions.filter(option => option.id === accommodation).map(option => `${option.property}, ${option.room}, ${option.board}`).join("")} />
      <label>Room allocation<select name="room_allocation" value={roomAllocation} onChange={event => setRoomAllocation(event.target.value as "sharing" | "single")}><option value="sharing">Twin/double sharing; odd adult uses a single room</option><option value="single">One single room per adult</option></select></label>
      <label>Transport and safari preference<select name="transport_preference" value={transport} onChange={event => setTransport(event.target.value)}><option>Please advise me</option><option>Shared services requested</option><option>Private transfers requested</option><option>Fully private safari requested</option></select></label>
      <p className="form-help">Private transfers do not automatically make helicopters, cruises or game drives private. Availability, capacity and exclusive activity costs require confirmation.</p>
      <p>Select any experiences you would like to include. This is optional.</p>
      <div className="activity-checkboxes">{activities.map(activity => <label key={activity.slug}><input type="checkbox" name="activities" value={activity.title} checked={selectedActivities.includes(activity.title)} onChange={event => setSelectedActivities(current => event.target.checked ? [...current, activity.title] : current.filter(item => item !== activity.title))} /> <span>{activity.title}</span></label>)}</div>
      <details><summary>Package alternatives and optional extras</summary><div className="activity-checkboxes">{packageOptionalActivities.map(activity => <label key={activity}><input type="checkbox" name="activities" value={activity} checked={selectedActivities.includes(activity)} onChange={event => setSelectedActivities(current => event.target.checked ? [...current, activity] : current.filter(item => item !== activity))} /> <span>{activity}</span></label>)}</div></details>
    </fieldset>
    {isTailorMade && <fieldset className="activity-choice"><legend>Preferred destinations</legend><p>Select the places you would like to include. Livingstone/Zambia is an optional extension.</p><div className="activity-checkboxes">{destinationChoices.map(destination => <label key={destination}><input type="checkbox" name="preferred_destinations" value={destination} /> <span>{destination}</span></label>)}</div></fieldset>}
    <div className="form-grid">
      <label>Full name<span aria-hidden="true"> *</span><input {...field("name")} required name="name" type="text" autoComplete="name" placeholder="John Smith" />{guidance("name", "The name you would like us to use when replying.")}</label>
      <label>Email address<input {...field("email")} type="email" name="email" autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="john@gmail.com" />{guidance("email", "Leave blank if you provide a phone / WhatsApp number.")}</label>
      <label>Phone or WhatsApp number<input {...field("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44 7700 900123" />{guidance("phone", "Include + and your country code, such as +44 for the UK or +27 for South Africa. Optional if you provide email.")}</label>
      <label>Accommodation needed?<select name="accommodation_needed" defaultValue="Not sure yet"><option value="Not sure yet">Not sure yet - please advise me</option><option value="Yes">Yes - help me arrange a stay</option><option value="No">No - I will arrange my own stay</option></select></label>
      <label>Arrival date<input {...field("arrival_date")} name="arrival_date" type="date" min="2026-10-11" max="2027-12-31" value={arrivalDate} onChange={event => setArrivalDate(event.target.value)} />{guidance("arrival_date", "Planning dates: remaining 2026 or 2027. Leave both dates blank if undecided.")}</label>
      <label>Departure date<input {...field("departure_date")} name="departure_date" type="date" value={departureDate} onChange={event => setDepartureDate(event.target.value)} min={arrivalDate || "2026-10-12"} max="2028-01-01" />{guidance("departure_date", "Departure must be after arrival. For a day experience, enter your overall holiday dates.")}</label>
      {isTailorMade && <><label>Number of days<input {...field("number_of_days")} placeholder="7" name="number_of_days" type="number" step="1" min="1" inputMode="numeric" />{guidance("number_of_days", "Enter whole days, or leave blank for advice.")}</label><label>Accommodation preference<select name="accommodation_preference" defaultValue=""><option value="">Please advise me</option><option>Luxury lodges</option><option>Mid-range lodges or hotels</option><option>Tented safari camps</option><option>Budget accommodation</option><option>A mix of styles</option></select></label></>}
      <label>Adults *<input {...field("adults")} required value={adults} onChange={event => setAdults(event.target.value)} name="adults" type="number" step="1" min="1" max="100" inputMode="numeric" />{guidance("adults", "At least one adult. Groups of 4, 6 and 10 may request 2, 3 and 5 twin/double rooms respectively; no group discount is assumed.")}</label>
      <label>Children *<input {...field("children")} required value={children} onChange={event => { setChildren(event.target.value); setChildAges(current => current.slice(0, Math.max(0, Math.min(20, Number(event.target.value) || 0)))); }} name="children" type="number" step="1" min="0" max="20" inputMode="numeric" />{guidance("children", "Enter 0 if there are no children. Every child’s age at travel is needed.")}</label>
    </div>
    {childCount > 0 && <fieldset className="activity-choice"><legend>Children’s ages at travel</legend><div className="form-grid">{Array.from({ length: childCount }, (_, index) => <label key={index}>Child {index + 1} age *<input {...field(`child_age_${index}`)} required name={`child_age_${index}`} type="number" min="0" max="17" step="1" value={childAges[index] ?? ""} onChange={event => setChildAges(current => Array.from({ length: childCount }, (_, i) => i === index ? event.target.value : current[i] ?? ""))} />{guidance(`child_age_${index}`, "Age 0–17 on arrival; age 18 or older counts as an adult.")}</label>)}</div>{guidance("child_ages", "Family room occupancy and child activity participation must be confirmed supplier by supplier.")}</fieldset>}
    <div className="accommodation-subtotal" aria-live="polite"><h3>Your pricing information</h3><p>{pricing.text}</p>{pricing.estimate && <p>Room allocation: {pricing.estimate.roomAllocation}</p>}<ul>{[...pricing.notes, ...optionalNotes, ...(pricing.estimate?.amount != null ? pricing.estimate.notes : [])].map((note, index) => <li key={index}>{note}</li>)}</ul><p>An enquiry is not a confirmed booking. Park fees remain separate, and mandatory non-park surcharges must be costed.</p></div>
    <input type="hidden" name="displayed_pricing" value={displayedPricing} />
    <input type="hidden" name="room_allocation_description" value={pricing.estimate?.roomAllocation ?? (Number(adults) === 1 || roomAllocation === "single" ? `${adults} single rooms; child bedding to confirm` : `${Math.floor(Number(adults) / 2)} twin/double rooms${Number(adults) % 2 ? " + 1 single" : ""}; child bedding to confirm`)} />
    <label>{isTailorMade ? "Additional requests / message" : "Message"}<span aria-hidden="true"> *</span><textarea {...field("message")} required name="message" rows={5} placeholder="We are two adults visiting Victoria Falls and Chobe for a week. Could you suggest a safari?" />{guidance("message", "A short sentence is enough. Include any questions or accessibility needs if you wish.")}</label>
    <label className="form-consent"><input {...field("privacy_consent")} required type="checkbox" name="privacy_consent" value="yes" /> <span>I agree that Galagadi Tours &amp; Safari may use these details to respond to my enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.<span aria-hidden="true"> *</span></span></label>
    {guidance("privacy_consent", "We use your details to respond to this enquiry.")}
    <input className="sr-only" tabIndex={-1} autoComplete="off" name="_honey" aria-hidden="true" />
    <button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send enquiry"}</button>
    <a className="form-whatsapp-link" onClick={event => { const form = event.currentTarget.closest("form"); if (!form) return; const message = checkForContact(form); if (!message) { event.preventDefault(); return; } event.currentTarget.href = whatsappUrl(message); }} href={whatsappUrl(`Enquiry: ${selectedPackage || journeyType}`)} target="_blank" rel="noreferrer">Send these details on WhatsApp</a>
    <a className="form-whatsapp-link" href="mailto:booking@galagadisafari.com" onClick={event => { const form = event.currentTarget.closest("form"); if (!form) return; const message = checkForContact(form); if (!message) { event.preventDefault(); return; } event.currentTarget.href = `mailto:booking@galagadisafari.com?subject=${encodeURIComponent(`Quotation enquiry: ${selectedPackage || journeyType}`)}&body=${encodeURIComponent(message)}`; }}>Send these details by email</a>
  </form>;
}
