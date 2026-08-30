import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = { title: { default: "Galagadi Tours & Safari", template: "%s | Galagadi Tours & Safari" }, description: "Personalized Victoria Falls and Chobe safari journeys, guided by local insight.", metadataBase: new URL("https://galagadisafari.com") };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Navbar /><main>{children}</main><Footer /><WhatsAppButton /></body></html>; }
