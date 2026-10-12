import { stayOptions, type StayOption, type StayRate } from "@/data/package-pricing";
import type { SafariPackage } from "@/types";

export const money = (amount: number) => `USD ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const msDay = 86400000;
export function parseTravelDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : null;
}
export function rateForNight(option: StayOption, date: string): StayRate | undefined {
  return parseTravelDate(date) === null ? undefined : option.rates.find(rate => rate.from <= date && rate.to >= date);
}
export type AccommodationEstimate = {
  amount: number | null; label: string; notes: string[]; nights: number; roomAllocation: string;
};
// Calculates only from public selling amounts/references; never supplier costs.
// Every overnight is checked independently, including seasonal/year boundaries.
export function accommodationEstimate(optionId: string, arrival: string, nights: number, adults: number, ages: number[], roomAllocation: "sharing" | "single" = "sharing"): AccommodationEstimate {
  const option = stayOptions.find(item => item.id === optionId);
  const start = parseTravelDate(arrival);
  const roomText = adults === 1 || roomAllocation === "single" ? `${adults} single room${adults === 1 ? "" : "s"}` : adults % 2 === 0 ? `${adults / 2} twin/double room${adults === 2 ? "" : "s"}` : `${Math.floor(adults / 2)} twin/double rooms + 1 single room`;
  const result: AccommodationEstimate = { amount: null, label: "Accommodation quotation required", notes: [], nights, roomAllocation: ages.length ? `${roomText}; child bedding/room allocation requires approval` : roomText };
  if (!option || start === null || !Number.isInteger(nights) || nights < 1 || nights > 366 || !Number.isInteger(adults) || adults < 1 || adults > 100 || ages.some(age => !Number.isInteger(age) || age < 0 || age > 17)) return result;
  if (ages.length && (option.childPolicy !== "insika" || adults !== 2 || roomAllocation === "single")) {
    result.notes.push("Child rates or this family room arrangement need a supplier quotation."); return result;
  }
  let cents = 0;
  let isReference = false;
  let provisional = false;
  for (let i = 0; i < nights; i++) {
    const date = new Date(start + i * msDay).toISOString().slice(0, 10);
    const rate = rateForNight(option, date);
    if (!rate) { result.notes.push(`No supported accommodation rate for ${date}; no earlier-year rate is carried forward.`); return result; }
    isReference ||= rate.kind !== "calculated"; provisional ||= rate.kind === "provisional-reference";
    const singleAdults = adults === 1 || roomAllocation === "single" ? adults : adults % 2;
    const sharingAdults = adults - singleAdults;
    cents += Math.round(rate.single * 100) * singleAdults + Math.round(rate.sharing * 100) * sharingAdults;
    if (ages.length) {
      for (const age of ages) cents += age <= 3 ? 0 : age <= 11 ? Math.round(rate.sharing * 100 / 2) : Math.round(rate.sharing * 100);
    }
  }
  result.amount = cents / 100;
  result.label = isReference ? "Estimated accommodation subtotal" : "Calculated accommodation subtotal";
  result.notes = ["Party total for accommodation only; excludes activities, airport/regional transport and park fees.", ...option.notes];
  if (provisional) result.notes.unshift("2027 public reference only; supplier confirmation required.");
  if (ages.length) result.notes.unshift("Illustrative family calculation only; maximum occupancy, bedding and family-room arrangements must be approved before booking.");
  if (adults + ages.filter(age => age > 3).length >= 10 && option.childPolicy === "insika") result.notes.push("Insika group cancellation terms and 60-day rooming-list deadline apply to 10+ paying guests.");
  return result;
}
export type EnquirySelection = { arrival: string; departure: string; adults: number; childCount: number; ages: (number | null)[]; optionId: string; transport: string; roomAllocation: "sharing" | "single" };
export function validatePackageSelection(selection: EnquirySelection): Record<string, string> {
  const errors: Record<string, string> = {};
  const start = selection.arrival ? parseTravelDate(selection.arrival) : null;
  const end = selection.departure ? parseTravelDate(selection.departure) : null;
  if (selection.arrival && (start === null || selection.arrival < "2026-10-11" || selection.arrival > "2027-12-31")) errors.arrival_date = "Choose travel from 11 October 2026 to 31 December 2027, or leave dates blank for advice.";
  if (selection.departure && (end === null || selection.departure < "2026-10-12" || selection.departure > "2028-01-01")) errors.departure_date = "Choose a valid departure within the supported planning period, or leave blank for advice.";
  if ((selection.arrival && !selection.departure) || (!selection.arrival && selection.departure)) errors.departure_date = "Provide both dates, or leave both blank for advice.";
  if (start !== null && end !== null && end <= start) errors.departure_date = "Departure must be after arrival. For a day-only experience, use your overall holiday dates.";
  if (!Number.isInteger(selection.adults) || selection.adults < 1 || selection.adults > 100) errors.adults = "Enter a whole number of adults between 1 and 100.";
  if (!Number.isInteger(selection.childCount) || selection.childCount < 0 || selection.childCount > 20) errors.children = "Enter a whole number of children between 0 and 20.";
  if (selection.ages.length !== selection.childCount || selection.ages.some(age => age === null || !Number.isInteger(age) || age < 0 || age > 17)) errors.child_ages = "Enter every child’s age at the time of travel, from 0 to 17.";
  return errors;
}
export function enquiryPricing(safari: SafariPackage | undefined, selection: EnquirySelection): { text: string; notes: string[]; estimate: AccommodationEstimate | null } {
  const notes: string[] = [];
  if (safari?.minimumAdults && selection.adults < safari.minimumAdults) notes.push(`This departure needs ${safari.minimumAdults} fully paying guests in total. Your party needs a confirmed combined departure or separately quoted private arrangement; no price is assumed.`);
  if (selection.transport === "Private transfers requested") notes.push("Private transport is quote-required and does not make flights, cruises or game drives private.");
  if (selection.transport === "Fully private safari requested") notes.push("Exclusive vehicles and every activity require separate supplier confirmation and quotations.");
  let estimate: AccommodationEstimate | null = null;
  const start = parseTravelDate(selection.arrival), end = parseTravelDate(selection.departure);
  const errors = validatePackageSelection(selection);
  if (!Object.keys(errors).length && selection.optionId && start !== null && end !== null) {
    const stayNights = safari ? safari.fallsNights ?? 0 : Math.round((end - start) / msDay);
    if (stayNights > 0) {
      // Zimbabwe Highlights reaches Falls after six other overnights.
      const offset = safari?.slug === "zimbabwe-highlights-journey" ? 6 : 0;
      if (end - start < (offset + stayNights) * msDay) notes.push("Your selected holiday dates are shorter than this itinerary’s overnight plan; we will discuss an adjusted route.");
      else estimate = accommodationEstimate(selection.optionId, new Date(start + offset * msDay).toISOString().slice(0, 10), stayNights, selection.adults, selection.ages as number[], selection.roomAllocation);
    } else notes.push("This day programme has no overnight stay; any additional accommodation needs a separate quotation.");
  }
  if (safari?.nights && start !== null && end !== null && end - start !== safari.nights * msDay) notes.push(`The draft has ${safari.days} days / ${safari.nights} nights. Your dates request a different duration; any adjustment requires a new quotation.`);
  if (estimate?.amount === null) notes.push(...estimate.notes);
  const subtotal = estimate?.amount !== null && estimate?.amount !== undefined ? `${estimate.label}: ${money(estimate.amount)} for ${estimate.nights} Falls nights, party total, ${estimate.roomAllocation}. Accommodation only; complete package quotation required.${estimate.notes.some(note => note.includes("family")) ? " Family occupancy pending approval." : ""}${estimate.notes.some(note => note.includes("2027 public")) ? " 2027 reference pending supplier confirmation." : ""}` : "Complete package: Request a quotation. No supported complete total is displayed.";
  return { text: subtotal, notes, estimate };
}
