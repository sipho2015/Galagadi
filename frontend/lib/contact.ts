export const whatsappNumber = "263789652298";

export function whatsappUrl(message?: string) {
  const baseUrl = `https://wa.me/${whatsappNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}
