import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings, phoneHref } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Seattle Luxury Drive for executive transportation, chauffeur services, airport transfers, corporate events, and luxury travel throughout the Greater Seattle Area.",
  alternates: { canonical: "https://seattleluxurydrive.com/contact" },
  openGraph: {
    title: "Contact | Seattle Luxury Drive",
    description:
      "Reach our concierge team to arrange executive transportation, chauffeur service, airport transfers, and luxury travel throughout the Greater Seattle Area.",
    url: "https://seattleluxurydrive.com/contact",
  },
};

export default async function ContactPage() {
  const s = await getSettings();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seattleluxurydrive.com" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://seattleluxurydrive.com/contact" },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: s.site_name,
        description:
          "Premier luxury transportation and concierge service in the Greater Seattle Area. Chauffeur-driven and self-drive luxury vehicles for executive transfers, airport pickups, corporate events, weddings, and special occasions.",
        url: "https://seattleluxurydrive.com",
        telephone: phoneHref(s.contact_phone).replace("tel:", ""),
        email: s.contact_email,
        address: {
          "@type": "PostalAddress",
          streetAddress: s.site_address,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 47.7577,
          longitude: -122.3443,
        },
        areaServed: [
          "Seattle, WA", "Shoreline, WA", "Bellevue, WA", "Redmond, WA",
          "Kirkland, WA", "Mercer Island, WA", "Lynnwood, WA", "Edmonds, WA",
          "Bothell, WA", "Tacoma, WA", "Everett, WA", "Renton, WA",
        ],
        priceRange: "$$$",
        openingHours: `${s.hours_days} ${s.hours_open}-${s.hours_close}`,
        sameAs: ["https://seattleluxurydrive.com"],
      }} />
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Contact Us
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Let&apos;s Plan Your<br />Transportation Experience.
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-xl mx-auto">
            Whether you need executive transportation, chauffeur service, airport
            transfers, or luxury transportation for a special occasion, our team
            is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="bg-black px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr]">

            {/* Left: contact info */}
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-6">
                Get In Touch
              </p>
              <h2 className="font-heading text-3xl font-light text-offwhite mb-4">
                Speak With Our<br />Concierge Team
              </h2>
              <p className="font-sans text-sm leading-relaxed text-offwhite/60 mb-10">
                Our concierge team is available to answer questions, discuss
                transportation options, and help coordinate your reservation.
              </p>

              <ul className="space-y-8">
                <li>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-gold shrink-0">
                      <Phone size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40 mb-1">
                        Phone
                      </p>
                      <a
                        href={phoneHref(s.contact_phone)}
                        className="font-sans text-base text-offwhite hover:text-gold transition-colors"
                      >
                        {s.contact_phone}
                      </a>
                      <p className="font-sans text-xs text-offwhite/40 mt-1">
                        Call or text anytime
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-gold shrink-0">
                      <Mail size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${s.contact_email}`}
                        className="font-sans text-base text-offwhite hover:text-gold transition-colors break-all"
                      >
                        {s.contact_email}
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-gold shrink-0">
                      <MapPin size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40 mb-1">
                        Address
                      </p>
                      <p className="font-sans text-base text-offwhite">
                        14723 Aurora Ave N<br />
                        Shoreline, WA 98133
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-gold shrink-0">
                      <Clock size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40 mb-1">
                        Hours
                      </p>
                      <p className="font-sans text-base text-offwhite">
                        {s.hours_days} · {s.hours_open}–{s.hours_close}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-12">
                <Link
                  href="/book"
                  className="inline-block bg-gold px-8 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
                >
                  Request Reservation
                </Link>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-6">
                Send Us A Message
              </p>
              <h2 className="font-heading text-3xl font-light text-offwhite mb-8">
                How Can We Help?
              </h2>
              <ContactForm responseHours={s.response_hours} />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps section */}
      <section className="bg-charcoal border-t border-offwhite/[0.06] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-3">
              Our Location
            </p>
            <h2 className="font-heading text-3xl font-light text-offwhite">
              Find Us in Shoreline
            </h2>
            <p className="font-sans text-sm text-offwhite/55 mt-2">
              14723 Aurora Ave N, Shoreline, WA 98133
            </p>
          </div>

          <div className="relative w-full h-100 overflow-hidden">
            <iframe
              title="Seattle Luxury Drive location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.3!2d-122.3443!3d47.7577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490117b9a55b7e5%3A0x1!2s14723+Aurora+Ave+N%2C+Shoreline%2C+WA+98133!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
