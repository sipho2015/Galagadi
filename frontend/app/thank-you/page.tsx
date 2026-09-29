import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";

export const metadata = {
  title: "Thank you",
  description: "Thank you for your Galagadi Tours & Safari enquiry.",
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return <><Hero compact eyebrow="Enquiry received" title="Your journey is taking shape." description="Thank you for sharing your plans with Galagadi. We will review the details you sent and use the email address provided to continue the conversation." image="/images/gallery/Zambezi_River.jpg" /><section className="section"><div className="container narrow thank-you-copy"><p className="eyebrow">What happens next</p><h2>Keep exploring while we prepare your options.</h2><ol><li><strong>Your enquiry is with us.</strong><span>We will use the information you supplied to understand what you are looking for.</span></li><li><strong>We will continue by email.</strong><span>Look out for a reply at the email address you entered in the form.</span></li><li><strong>You can also continue on WhatsApp.</strong><span>If there is anything else you would like us to know, send us a message directly.</span></li></ol><div className="hero-actions"><Button href="/experiences#packages">Explore packages</Button><a className="button button-outline" href={whatsappUrl("Hello Galagadi Tours & Safari, I have submitted an enquiry and would like to continue planning here.")} target="_blank" rel="noreferrer">Continue on WhatsApp</a></div></div></section></>;
}
