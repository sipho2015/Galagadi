import { whatsappUrl } from "@/lib/contact";

export function WhatsAppButton() {
  return <a className="whatsapp-button" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp">WhatsApp <span>Chat</span></a>;
}
