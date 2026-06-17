"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const PHONE = "(206) 669-1109";
const PHONE_HREF = "tel:+12066691109";

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Focus management + Escape + focus trap
  useEffect(() => {
    if (drawerOpen) {
      // Move focus into drawer on open
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Return focus to hamburger on close
      hamburgerRef.current?.focus();
    }
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      // Trap Tab within the drawer
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-charcoal shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" aria-label="Seattle Luxury Drive — Home">
            <span className="font-heading text-2xl font-light tracking-[0.12em] text-offwhite">
              SJD
            </span>
            <span className="font-sans text-[9px] font-normal tracking-[0.22em] text-offwhite/70 uppercase">
              Seattle Luxury Drive
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-xs uppercase tracking-[0.15em] transition-colors ${
                  isActive(href)
                    ? "text-gold border-b border-gold pb-0.5"
                    : "text-offwhite/80 hover:text-offwhite"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-offwhite/80 hover:text-offwhite transition-colors"
            >
              <Phone size={13} strokeWidth={1.5} />
              {PHONE}
            </a>
            <Link
              href="/book"
              className="border border-gold px-5 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Request Reservation
            </Link>
          </div>

          {/* Mobile right: phone icon + hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              href={PHONE_HREF}
              aria-label={`Call us at ${PHONE}`}
              className="text-offwhite/80 hover:text-offwhite transition-colors"
            >
              <Phone size={18} strokeWidth={1.5} />
            </a>
            <button
              ref={hamburgerRef}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="text-offwhite/80 hover:text-offwhite transition-colors"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-[320px] bg-charcoal flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer top bar */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-offwhite/[0.08]">
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl font-light tracking-[0.12em] text-offwhite">
              SJD
            </span>
            <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-offwhite/60">
              Seattle Luxury Drive
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-offwhite/70 hover:text-offwhite transition-colors"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 flex flex-col" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-6 h-[68px] font-sans text-base tracking-[0.08em] border-b border-offwhite/[0.07] transition-colors ${
                isActive(href)
                  ? "text-gold"
                  : "text-offwhite/80 hover:text-offwhite"
              }`}
            >
              {label}
              <span className="text-gold/50 text-lg">›</span>
            </Link>
          ))}
        </nav>

        {/* Drawer phone section */}
        <div className="px-6 py-8 border-t border-offwhite/[0.08]">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-2">
            Call Us Directly
          </p>
          <a
            href={PHONE_HREF}
            className="font-heading text-3xl font-light text-offwhite hover:text-gold transition-colors"
          >
            {PHONE}
          </a>
          <p className="font-sans text-xs text-offwhite/40 mt-1">
            Tap to call
          </p>
        </div>

        {/* Drawer CTA */}
        <div className="px-6 pb-8">
          <Link
            href="/book"
            className="block w-full bg-gold text-black text-center font-sans text-[11px] uppercase tracking-[0.18em] py-4 hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
        </div>
      </div>
    </>
  );
}
