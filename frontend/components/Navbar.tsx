"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Home", "/"], ["Packages", "/safaris"], ["Activities", "/activities"], ["Destinations", "/destinations"],
  ["Gallery", "/gallery"], ["About", "/about"], ["Contact", "/contact"]
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/" onClick={() => setOpen(false)}>
      <img src="/logo/logo.jpeg" alt="Galagadi Tours & Safari" />
      <span>Galagadi Tours & Safari</span>
    </Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-nav">
      <span className="sr-only">Toggle menu</span><i /><i /><i />
    </button>
    <nav id="primary-nav" className={open ? "primary-nav open" : "primary-nav"} aria-label="Primary navigation">
      {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Plan your trip</Link>
    </nav>
  </header>;
}
