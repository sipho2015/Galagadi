"use client";

import { useId, useState } from "react";
import { stayOptions, travellerChoices, quoteLabel } from "@/data/package-pricing";
import { accommodationEstimate, money } from "@/lib/package-pricing";
import type { SafariPackage } from "@/types";

export function PackagePricePanel({ safari }: { safari: SafariPackage }) {
  const id = useId();
  const [arrival, setArrival] = useState("2027-01-15");
  const [optionId, setOptionId] = useState("explorers-standard");
  const [travellerId, setTravellerId] = useState("couple");
  const traveller = travellerChoices.find(choice => choice.id === travellerId)!;
  const fallsArrival = safari.slug === "zimbabwe-highlights-journey" && arrival ? new Date(Date.parse(arrival + "T00:00:00Z") + 6 * 86400000).toISOString().slice(0, 10) : arrival;
  const subtotal = safari.fallsNights ? accommodationEstimate(optionId, fallsArrival, safari.fallsNights, traveller.adults, traveller.ages) : null;
  const departure = arrival && safari.nights ? new Date(Date.parse(arrival + "T00:00:00Z") + safari.nights * 86400000).toISOString().slice(0, 10) : "";
  const query = new URLSearchParams({ package: safari.title, accommodation: optionId, adults: String(traveller.adults), children: String(traveller.ages.length), room_allocation: "sharing" });
  if (arrival && departure) { query.set("arrival", arrival); query.set("departure", departure); }
  traveller.ages.forEach(age => query.append("child_age", String(age)));
  return <section className="package-detail-block package-price-panel" id="package-price" aria-labelledby={id + "title"}>
    <p className="eyebrow">Your quotation</p><h2 id={id + "title"}>{quoteLabel}</h2>
    <p>Complete package prices are quoted in USD for your dates and party. We confirm rooms, meals, activities, airport transfers and every regional connection before booking.</p>
    {safari.pricing?.missing.length ? <><h3>To confirm for your journey</h3><ul>{safari.pricing.missing.map(item => <li key={item}>{item}</li>)}</ul></> : null}
    <h3>Additional compulsory costs</h3><ul>{safari.pricing?.extras.map(item => <li key={item}>{item}</li>)}</ul>
    <p>Mandatory non-park charges, including fuel surcharges, must be included in the complete quotation. Park entrance fees remain separate.</p>
    {safari.minimumAdults && <p>This referenced departure requires {safari.minimumAdults} fully paying guests. Solo travellers and smaller parties may enquire about joining a confirmed departure or a separately quoted arrangement.</p>}
    <p>Shared services are subject to the operator’s departure minimums. Private transfers and a fully private safari require separate confirmation and pricing.</p>
    {!!safari.fallsNights && <>
      <h3>Explore your Falls accommodation subtotal</h3>
      <p>This covers {safari.fallsNights} Falls nights only. It is not the package price. For the Zimbabwe Highlights route, the Falls stay starts six nights after Harare arrival.</p>
      <div className="form-grid">
        <label htmlFor={id + "arrival"}>Journey arrival<input id={id + "arrival"} type="date" min="2026-10-11" max="2027-12-31" value={arrival} onChange={event => setArrival(event.target.value)} /></label>
        <label htmlFor={id + "room"}>Falls accommodation<select id={id + "room"} value={optionId} onChange={event => setOptionId(event.target.value)}>{stayOptions.map(option => <option key={option.id} value={option.id}>{option.property} · {option.room} · {option.board}{option.category === "Serviced tent" ? " · camping" : ""}</option>)}</select></label>
        <label htmlFor={id + "travellers"}>Travellers<select id={id + "travellers"} value={travellerId} onChange={event => setTravellerId(event.target.value)}>{travellerChoices.map(choice => <option key={choice.id} value={choice.id}>{choice.label}</option>)}</select></label>
      </div>
      <p>{traveller.rooms}</p>
      <div className="accommodation-subtotal" aria-live="polite"><strong>{subtotal?.amount == null ? "Accommodation quotation required" : `${subtotal.label}: ${money(subtotal.amount)}`}</strong><p>Party total for {safari.fallsNights} nights of accommodation only.</p><ul>{subtotal?.notes.map(note => <li key={note}>{note}</li>)}</ul></div>
    </>}
    <a className="button button-primary" href={`/contact?${safari.fallsNights ? query.toString() : new URLSearchParams({ package: safari.title }).toString()}`}>Enquire with these preferences</a>
  </section>;
}
