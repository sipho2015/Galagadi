import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Frequently asked questions", "Answers to common Galagadi safari planning questions.");
export default function FAQPage() { return <><Hero compact eyebrow="Planning help" title="A little more clarity before you go." description="The answers to the questions we hear most often." image="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container narrow"><FAQ /><div className="centered"><p>Still have a question?</p><Button href="/contact">Talk to us</Button></div></div></section></>; }
