import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

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

export default function ContactPage() {
  return (
    <>
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
                        href="tel:+12066691109"
                        className="font-sans text-base text-offwhite hover:text-gold transition-colors"
                      >
                        (206) 669-1109
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
                        href="mailto:info@seattleluxurydrive.com"
                        className="font-sans text-base text-offwhite hover:text-gold transition-colors break-all"
                      >
                        info@seattleluxurydrive.com
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
                      {/* TODO: Replace with confirmed business hours */}
                      <p className="font-sans text-base text-offwhite">
                        Mon–Sun · 7am–10pm
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
              <ContactForm />
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

          {/* Map placeholder — replace with Google Maps embed in Phase 7 */}
          <div className="relative w-full h-[360px] bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <MapPin size={18} strokeWidth={1.5} className="text-gold" />
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/25">
                Google Maps Embed
              </p>
              <p className="font-sans text-xs text-offwhite/40 mt-1">
                14723 Aurora Ave N, Shoreline, WA 98133
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
