import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Frequently asked questions", "Find answers to common questions about Galagadi safari planning, enquiries, activities and travel arrangements for Victoria Falls, Zimbabwe and Botswana.", "/faq");

export default function FAQPage() {
  return <><Hero compact eyebrow="Planning help" title="A little more clarity before you go." description="The answers to the questions we hear most often." image="/images/gallery/Night_Game.jpg" /><section className="section"><div className="container narrow"><FAQ /><div className="centered"><p>Still have a question?</p><Button href="/contact">Talk to us</Button></div></div></section></>;
}
