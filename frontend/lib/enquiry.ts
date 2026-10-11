export function enquirySummary(data: FormData) {
  return Array.from(new Set(Array.from(data.keys())))
    .filter(key => !key.startsWith("_") && key !== "privacy_consent")
    .map(key => `${key.replaceAll("_", " ")}: ${data.getAll(key).filter(value => String(value).trim()).join(", ")}`)
    .filter(line => !line.endsWith(": ")).join("\n");
}

export function enquiryMessage(data: FormData) {
  return `Hello Galagadi Tours & Safari, I would like a quotation. This is an enquiry, not a confirmed booking.\n${enquirySummary(data)}`;
}
