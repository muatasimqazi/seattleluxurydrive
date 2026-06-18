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

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.5a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white" />
    </svg>
  );
}

type Social = { instagram: string; facebook: string; x: string; linkedin: string; youtube: string };

export default function SiteFooter({
  phone,
  email,
  address,
  social,
}: {
  phone: string;
  email: string;
  address: string;
  social: Social;
}) {
  const socialLinks = [
    { url: social.instagram, label: "Instagram",  Icon: IconInstagram },
    { url: social.facebook,  label: "Facebook",   Icon: IconFacebook  },
    { url: social.x,         label: "X",          Icon: IconX         },
    { url: social.linkedin,  label: "LinkedIn",   Icon: IconLinkedIn  },
    { url: social.youtube,   label: "YouTube",    Icon: IconYouTube   },
  ].filter((s) => s.url);

  return (
    <footer className="bg-charcoal border-t border-offwhite/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* Brand column */}
          <div>
            <Link href="/" aria-label="SJD — Seattle Luxury Drive — Home">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-heading text-3xl font-light tracking-[0.12em] text-gold">
                  SJD
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-offwhite/75">
                  Seattle Luxury Drive
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-offwhite/80 max-w-xs">
              Seattle&apos;s premier luxury transportation and concierge service.
              Family-owned and dedicated to delivering a white-glove experience
              throughout the Greater Seattle Area.
            </p>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-offwhite/50 hover:text-gold transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-lt mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-offwhite/85 hover:text-offwhite transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-lt mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={phoneHref(phone)}
                  className="flex items-center gap-3 font-sans text-sm text-offwhite/85 hover:text-offwhite transition-colors"
                >
                  <Phone size={14} strokeWidth={1.5} className="text-gold shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 font-sans text-sm text-offwhite/85 hover:text-offwhite transition-colors"
                >
                  <Mail size={14} strokeWidth={1.5} className="text-gold shrink-0" />
                  {email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-sans text-sm text-offwhite/85">
                  <MapPin size={14} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </li>
            </ul>

            <Link
              href="/book"
              className="inline-block mt-8 border border-gold px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Request Reservation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-offwhite/6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-offwhite/60">
            © {new Date().getFullYear()} Seattle Luxury Drive. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="font-sans text-xs text-offwhite/60 hover:text-offwhite/85 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
