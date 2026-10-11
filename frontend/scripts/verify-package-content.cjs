// Focused checks without adding a test framework or production dependencies.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative + ".ts");
  if (cache.has(file)) return cache.get(file);
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  const localRequire = name => name.startsWith("@/") ? load(name.slice(2)) : require(name);
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`, { filename: file })(localRequire, module, module.exports);
  cache.set(file, module.exports);
  return module.exports;
}
const { safaris } = load("data/safaris");
const { stayOptions } = load("data/package-pricing");
const { accommodationEstimate, enquiryPricing, validatePackageSelection, parseTravelDate } = load("lib/package-pricing");
const { enquiryMessage } = load("lib/enquiry");
const { whatsappUrl } = load("lib/contact");
const bySlug = slug => safaris.find(item => item.slug === slug);
for (const safari of safaris) {
  assert.equal(safari.price, "Request a quotation", safari.slug);
  assert.equal(safari.pricing.amount, null, safari.slug);
  assert.ok(safari.pricing.missing.length > 0);
  if (!safari.days) continue;
  assert.equal(safari.itinerary.length, safari.days, safari.slug);
  assert.equal(safari.itinerary.filter(day => day.overnight !== "No overnight included").length, safari.nights);
  for (const day of safari.itinerary) {
    assert.ok(day.title && day.description && day.overnight);
    assert.ok(day.meals.length && day.travelInformation.length && day.includedActivities.length);
    assert.ok(Array.isArray(day.optionalActivities));
  }
  for (const image of [safari.image, ...safari.gallery]) assert.ok(fs.existsSync(path.join(root, "public", image)), image);
}
const signature = bySlug("southern-africa-signature-safari");
assert.equal(signature.days, 12);
assert.equal(signature.nights, 11);
assert.ok(!JSON.stringify(signature).toLowerCase().includes("hwange"));
assert.deepEqual(signature.itinerary.slice(0, 11).map(day => day.overnight), ["Victoria Falls", "Victoria Falls", "Victoria Falls", "Chobe", "Chobe", "Chobe", "Okavango camp one", "Okavango camp one", "Okavango camp one", "Okavango camp two", "Okavango camp two"]);
const seven = bySlug("7-day-victoria-falls-chobe-makgadikgadi-okavango");
assert.deepEqual(seven.itinerary.slice(0, 6).map(day => day.overnight), ["Victoria Falls", "Victoria Falls", "Chobe", "Gweta/Makgadikgadi area", "Maun", "Maun"]);
assert.ok(seven.itinerary[1].includedActivities.includes("Guided Falls tour"));
assert.ok(!seven.activitiesIncluded.some(activity => /helicopter/i.test(activity)));
const zimbabwe = bySlug("zimbabwe-highlights-journey");
assert.deepEqual(zimbabwe.itinerary.slice(0, 8).map(day => day.overnight), ["Harare", "Masvingo", "Matobo", "Matobo", "Hwange", "Hwange", "Victoria Falls", "Victoria Falls"]);
const estimate = (adults, ages = [], arrival = "2027-02-01", nights = 3, option = "insika-luxury-bb", rooms = "sharing") => accommodationEstimate(option, arrival, nights, adults, ages, rooms);
assert.equal(estimate(1).amount, 720.72);
assert.equal(estimate(2).amount, 1108.80);
assert.equal(estimate(2, [6, 10]).amount, 1663.20);
assert.equal(estimate(4).amount, 2217.60);
assert.equal(estimate(6).amount, 3326.40);
assert.equal(estimate(10).amount, 5544);
assert.equal(estimate(2, [0, 3]).amount, 1108.80);
assert.equal(estimate(2, [11, 12]).amount, 1940.40);
assert.equal(estimate(2, [], "2027-02-01", 3, "insika-luxury-bb", "single").amount, 1441.44);
assert.equal(estimate(3).roomAllocation, "1 twin/double rooms + 1 single room");
assert.equal(estimate(2, [], "2026-12-31").amount, null);
assert.equal(estimate(2, [], "2027-12-31").amount, null);
assert.equal(estimate(2, [], "2027-12-31", 1).amount, 369.6);
assert.equal(estimate(2, [6], "2027-01-01", 3, "explorers-standard").amount, null);
assert.equal(estimate(2, [], "2027-01-01", 3, "explorers-tent").amount, null);
assert.equal(estimate(2, [], "2026-12-30", 3, "explorers-standard").amount, 672);
assert.equal(estimate(2, [], "2027-04-30", 3, "explorers-standard").amount, 716);
assert.ok(estimate(2, [6, 10]).notes.some(note => /occupancy.*approved/.test(note)));
assert.ok(estimate(10).notes.some(note => /group/.test(note)));
assert.equal(parseTravelDate("2027-02-30"), null);
const selection = { arrival: "2027-02-01", departure: "2027-02-04", adults: 2, childCount: 0, ages: [], optionId: "insika-luxury-bb", transport: "Private transfers requested", roomAllocation: "sharing" };
assert.deepEqual(validatePackageSelection(selection), {});
assert.ok(validatePackageSelection({ ...selection, departure: selection.arrival }).departure_date);
assert.ok(validatePackageSelection({ ...selection, adults: 0 }).adults);
assert.ok(validatePackageSelection({ ...selection, childCount: -1 }).children);
assert.ok(validatePackageSelection({ ...selection, childCount: 1, ages: [null] }).child_ages);
assert.ok(validatePackageSelection({ ...selection, arrival: "2028-01-01" }).arrival_date);
const priced = enquiryPricing(bySlug("victoria-falls-escape"), selection);
assert.equal(priced.estimate.amount, 1108.8);
assert.ok(priced.text.includes("Accommodation only; complete package quotation required"));
assert.ok(priced.notes.some(note => /Private transport/.test(note)));
assert.ok(enquiryPricing(bySlug("hwange-full-day-safari"), { ...selection, adults: 1 }).notes.some(note => /4 fully paying/.test(note)));
assert.equal(enquiryPricing(signature, selection).estimate, null, "Do not price a longer itinerary using a shorter holiday");
const form = new FormData();
for (const [key, value] of Object.entries({ package: "Victoria Falls Escape", accommodation_description: "Insika Lodge, Luxury, B&B", arrival_date: selection.arrival, departure_date: selection.departure, adults: "2", children: "2", child_age_0: "6", child_age_1: "10", room_allocation_description: "Family occupancy pending approval", transport_preference: "Private transfers requested", displayed_pricing: priced.text, name: "Test traveller", email: "test@example.com", message: "Please quote this journey", _honey: "", privacy_consent: "yes" })) form.append(key, value);
form.append("activities", "Boma dinner and transport"); form.append("activities", "Explore the Zambezi (22 minutes)");
const message = enquiryMessage(form);
for (const expected of ["Victoria Falls Escape", "Insika Lodge", "2027-02-01", "adults: 2", "child age 0: 6", "child age 1: 10", "Private transfers", "USD 1,108.80", "Boma dinner", "22 minutes", "not a confirmed booking"]) assert.ok(message.includes(expected), expected);
assert.equal(new URL(whatsappUrl(message)).searchParams.get("text"), message);
assert.ok(!message.includes("_honey") && !message.includes("privacy consent"));
for (const option of stayOptions) {
  for (const rate of option.rates) assert.ok(rate.sharing > 0 && rate.single > 0 && rate.from <= rate.to);
  assert.ok(!JSON.stringify(option).match(/"nett"|"agentCost"|"markup"/i));
}
console.log("PASS: package routes, overnights, public accommodation calculations, validity boundaries, family rules, minimum departures and enquiry message contents.");
