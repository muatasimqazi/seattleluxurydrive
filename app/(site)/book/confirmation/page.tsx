import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { getSettings, phoneHref } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Reservation Request Received",
  description: "Your reservation request has been received. Our concierge team will be in touch within 4 business hours.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{
    name?: string;
    service?: string;
    date?: string;
    pickup?: string;
  }>;
}

export default async function BookConfirmationPage({ searchParams }: Props) {
  const [params, s] = await Promise.all([searchParams, getSettings()]);
  const name = params.name ? decodeURIComponent(params.name) : null;
  const service = params.service ? decodeURIComponent(params.service) : null;
  const date = params.date ? decodeURIComponent(params.date) : null;
  const pickup = params.pickup ? decodeURIComponent(params.pickup) : null;

  return (
    <section className="bg-black min-h-screen flex items-center px-6 py-32">
      <div className="mx-auto max-w-2xl w-full text-center">

        {/* Check icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <CheckCircle size={28} strokeWidth={1.5} className="text-gold" />
          </div>
        </div>

        {/* Eyebrow */}
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
          Request Received
        </p>

        {/* Heading */}
        <h1 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-6">
          {name ? `Thank You, ${name}.` : "Thank You."}
        </h1>

        <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-lg mx-auto mb-10">
          Your reservation request has been received. Our concierge team will
          review your details and reach out within {s.response_hours} business hours to confirm
          availability and finalize your booking.
        </p>

        {/* Trip summary (if params present) */}
        {(service || date || pickup) && (
          <div className="border border-offwhite/10 bg-charcoal p-6 mb-10 text-left space-y-3 max-w-sm mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-lt mb-4">
              Your Request
            </p>
            {service && (
              <div className="flex justify-between gap-4">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-offwhite/35">
                  Service
                </span>
                <span className="font-sans text-sm text-offwhite/80">{service}</span>
              </div>
            )}
            {date && (
              <div className="flex justify-between gap-4">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-offwhite/35">
                  Date
                </span>
                <span className="font-sans text-sm text-offwhite/80">{date}</span>
              </div>
            )}
            {pickup && (
              <div className="flex justify-between gap-4">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-offwhite/35">
                  Pickup
                </span>
                <span className="font-sans text-sm text-offwhite/80 text-right">{pickup}</span>
              </div>
            )}
          </div>
        )}

        {/* Phone CTA */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Phone size={14} strokeWidth={1.5} className="text-gold" />
          <p className="font-sans text-sm text-offwhite/65">
            Need to reach us sooner?{" "}
            <a
              href={phoneHref(s.contact_phone)}
              className="text-gold hover:text-gold-lt transition-colors font-medium"
            >
              {s.contact_phone}
            </a>
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block bg-gold px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
