import type { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm";
import { getSettings, phoneHref } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Request a Reservation",
  description:
    "Request a luxury vehicle reservation with Seattle Luxury Drive. Choose self drive or chauffeur service for airport transfers, corporate events, weddings, and more throughout the Greater Seattle Area.",
  alternates: { canonical: "https://seattleluxurydrive.com/book" },
  openGraph: {
    title: "Request a Reservation | Seattle Luxury Drive",
    description:
      "Book self-drive or chauffeur service for airport transfers, corporate events, weddings, and special occasions throughout Greater Seattle.",
    url: "https://seattleluxurydrive.com/book",
  },
};

export default async function BookPage() {
  const s = await getSettings();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seattleluxurydrive.com" },
          { "@type": "ListItem", position: 2, name: "Request a Reservation", item: "https://seattleluxurydrive.com/book" },
        ],
      }} />
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Reserve Your Experience
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Request a Reservation
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65">
            Complete the form below and our concierge team will confirm availability
            and reach out within {s.response_hours} business hours. For immediate assistance, call{" "}
            <a
              href={phoneHref(s.contact_phone)}
              className="text-gold hover:text-gold-lt transition-colors"
            >
              {s.contact_phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="bg-black px-6 pb-32">
        <div className="mx-auto max-w-2xl">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
