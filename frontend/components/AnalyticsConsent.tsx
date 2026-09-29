"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const storageKey = "galagadi-analytics-consent";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<"loading" | "accepted" | "declined">("loading");

  useEffect(() => {
    if (!measurementId) return;
    setConsent(window.localStorage.getItem(storageKey) === "accepted" ? "accepted" : window.localStorage.getItem(storageKey) === "declined" ? "declined" : "loading");
  }, []);

  if (!measurementId) return null;

  function saveConsent(choice: "accepted" | "declined") {
    window.localStorage.setItem(storageKey, choice);
    setConsent(choice);
  }

  if (consent === "loading") {
    return <aside className="analytics-consent" role="dialog" aria-label="Analytics preferences" aria-live="polite"><p>We would like to use optional analytics cookies to understand how visitors use this website. You can accept or decline them.</p><div><button type="button" className="button button-primary" onClick={() => saveConsent("accepted")}>Accept analytics</button><button type="button" className="button button-outline" onClick={() => saveConsent("declined")}>Decline</button></div></aside>;
  }

  if (consent === "declined") return null;

  return <><Script src={"https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId)} strategy="afterInteractive" /><Script id="ga4-config" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(measurementId)},{anonymize_ip:true});`}</Script></>;
}
