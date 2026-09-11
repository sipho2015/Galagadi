import { whatsappUrl } from "@/lib/contact";

export function WhatsAppButton() {
  return <a className="whatsapp-button" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><svg aria-hidden="true" viewBox="0 0 32 32" focusable="false"><path fill="currentColor" d="M16 3a12.8 12.8 0 0 0-10.9 19.6L3.7 28l5.6-1.4A12.8 12.8 0 1 0 16 3Zm0 23.3c-2 0-3.9-.5-5.5-1.5l-.4-.2-3.3.8.9-3.2-.3-.4A10.4 10.4 0 1 1 16 26.3Zm5.7-7.8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.5Z" /></svg><span className="whatsapp-label">WhatsApp <span>Chat</span></span></a>;
}
