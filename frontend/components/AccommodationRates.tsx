import Link from "next/link";
import { insikaConditions, stayOptions } from "@/data/package-pricing";
import { money } from "@/lib/package-pricing";

export function AccommodationRates({ optionIds }: { optionIds: string[] }) {
  const options = stayOptions.filter(option => optionIds.includes(option.id));
  return <div className="accommodation-rates">
    <p>Accommodation amounts below are per person, per night in USD. B&amp;B includes breakfast; DB&amp;B includes dinner and breakfast. Activities, airport transfers and regional travel are separate.</p>
    {options.map(option => <section key={option.id}>
      <h3>{option.property}: {option.room} — {option.board}</h3>
      <div className="rate-table-scroll" role="region" aria-label={`${option.room} nightly rates`} tabIndex={0}><table className="rate-table">
        <thead><tr><th scope="col">Dates</th><th scope="col">Adult sharing</th><th scope="col">Single adult</th></tr></thead>
        <tbody>{option.rates.map(rate => <tr key={rate.from}><td>{new Date(`${rate.from}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} to {new Date(`${rate.to}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</td><td>{money(rate.sharing)}</td><td>{money(rate.single)}</td></tr>)}</tbody>
      </table></div>
      {!option.rates.length && <p>Contact us for rates for your dates.</p>}
      {option.rates.some(rate => rate.kind === "provisional-reference") && <p>Rates are subject to confirmation for your dates.</p>}
      <Link className="text-link" href={`/contact?interest=Accommodation&accommodation=${option.id}`}>Enquire about this room</Link>
    </section>)}
    {options.some(option => option.childPolicy === "insika") && <details className="supplier-conditions"><summary>Insika cancellation and group conditions</summary><ul>{insikaConditions.map(note => <li key={note}>{note}</li>)}</ul></details>}
  </div>;
}
