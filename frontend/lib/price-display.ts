export function displayPrice(price?: string): string {
  if (!price) return "Enquire";
  const amount = price.match(/(?:US\$|USD|\$)\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (amount) return `USD ${amount[1]}`;
  return /quotation|on request/i.test(price) ? "Enquire" : price;
}
