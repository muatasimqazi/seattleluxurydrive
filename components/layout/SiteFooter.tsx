import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { phoneHref } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter({
  phone,
  email,
  address,
}: {
  phone: string;
  email: string;
  address: string;
}) {
  return (
    <footer className="bg-charcoal border-t border-offwhite/[0.08]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Seattle Luxury Drive — Home">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-heading text-3xl font-light tracking-[0.12em] text-offwhite">
                  SJD
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-offwhite/60">
                  Seattle Luxury Drive
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-xs">
              Seattle&apos;s premier luxury transportation and concierge service.
              Family-owned and dedicated to delivering a white-glove experience
              throughout the Greater Seattle Area.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-offwhite/70 hover:text-offwhite transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={phoneHref(phone)}
                  className="flex items-center gap-3 font-sans text-sm text-offwhite/70 hover:text-offwhite transition-colors"
                >
                  <Phone size={14} strokeWidth={1.5} className="text-gold shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 font-sans text-sm text-offwhite/70 hover:text-offwhite transition-colors"
                >
                  <Mail size={14} strokeWidth={1.5} className="text-gold shrink-0" />
                  {email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-sans text-sm text-offwhite/70">
                  <MapPin size={14} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </li>
            </ul>

            <Link
              href="/book"
              className="inline-block mt-8 border border-gold px-6 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Request Reservation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-offwhite/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-offwhite/45">
            © {new Date().getFullYear()} Seattle Luxury Drive. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="font-sans text-xs text-offwhite/45 hover:text-offwhite/70 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
