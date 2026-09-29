"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/", paths: ["/"] },
  { label: "Experiences", href: "/experiences", paths: ["/experiences", "/activities"] },
  { label: "Packages", href: "/safaris", paths: ["/safaris"] },
  { label: "Discover", href: "/discover", paths: ["/discover", "/destinations", "/accommodation"] },
  { label: "Gallery", href: "/gallery", paths: ["/gallery"] },
  { label: "About", href: "/about", paths: ["/about"] },
  { label: "Contact", href: "/contact", paths: ["/contact"] }
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return <header ref={header} className="site-header">
    <Link className="brand" href="/" onClick={() => setOpen(false)}>
      <Image src="/logo/logo.jpeg" alt="Galagadi Tours & Safari" width={46} height={46} priority />
      <span>Galagadi Tours & Safari</span>
    </Link>
    <button ref={menuButton} className="menu-button" type="button" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-controls="primary-nav" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
      <span className="menu-button-icon" aria-hidden="true"><i /><i /><i /></span>
    </button>
    <nav id="primary-nav" className={open ? "primary-nav open" : "primary-nav"} aria-label="Primary navigation">
      {links.map(({ label, href, paths }) => {
        const active = paths.some(path => path === "/" ? pathname === path : pathname.startsWith(path));
        return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
      })}
    </nav>
  </header>;
}
