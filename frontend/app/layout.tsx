import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: { default: "Galagadi Tours & Safari", template: "%s | Galagadi Tours & Safari" },
  description: "Personalized Victoria Falls and Chobe safari journeys, guided by local insight.",
  metadataBase: new URL(siteUrl),
  applicationName: "Galagadi Tours & Safari",
  robots: { index: true, follow: true }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Galagadi Tours & Safari",
  url: siteUrl,
  description: "Personalized Victoria Falls and Chobe safari journeys, guided by local insight.",
  email: "booking@galagadisafari.com",
  telephone: "+263789652298",
  address: { "@type": "PostalAddress", addressLocality: "Victoria Falls", addressCountry: "ZW" },
  areaServed: ["Victoria Falls, Zimbabwe", "Hwange, Zimbabwe", "Chobe, Botswana"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar /><main>{children}</main><Footer /><WhatsAppButton /><AnalyticsConsent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
