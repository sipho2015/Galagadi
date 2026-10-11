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
        <thead><tr><th scope="col">Dates</th><th scope="col">Adult sharing</th><th scope="col">Single adult</th><th scope="col">Price basis</th></tr></thead>
        <tbody>{option.rates.map(rate => <tr key={rate.from}><td>{rate.from} to {rate.to}</td><td>{money(rate.sharing)}</td><td>{money(rate.single)}</td><td>{rate.kind === "calculated" ? "Calculated accommodation price" : <><span>{rate.kind === "provisional-reference" ? "Public reference; confirmation needed" : "Public accommodation reference"}</span> <a href={rate.source} target="_blank" rel="noreferrer">Source</a></>}</td></tr>)}</tbody>
      </table></div>
      <ul>{option.notes.map(note => <li key={note}>{note}</li>)}</ul>
      <Link className="text-link" href={`/contact?interest=Accommodation&accommodation=${option.id}`}>Enquire about this room</Link>
    </section>)}
    {options.some(option => option.childPolicy === "insika") && <details className="supplier-conditions"><summary>Insika cancellation and group conditions</summary><ul>{insikaConditions.map(note => <li key={note}>{note}</li>)}</ul></details>}
  </div>;
}
