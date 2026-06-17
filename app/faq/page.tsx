import type { Metadata } from "next";
import Link from "next/link";
import { FaqPanel } from "@/components/faq/FaqAccordion";
import type { FaqCategory } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about Seattle Luxury Drive's luxury transportation services, chauffeur options, airport transfers, vehicle rentals, and reservation process.",
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    name: "Booking & Reservations",
    items: [
      {
        q: "How do I make a reservation?",
        a: "Simply submit a booking request through our website. A member of our concierge team will review your request, contact you to discuss details, and finalize your reservation.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking as early as possible, especially for weekends, corporate events, weddings, and peak travel periods. However, we will do our best to accommodate last-minute requests whenever availability permits.",
      },
      {
        q: "Do you require a deposit?",
        a: "Deposit and payment requirements vary based on the reservation, vehicle, and service requested. Our team will provide details during the reservation process.",
      },
      {
        q: "How can I contact Seattle Luxury Drive?",
        a: "You can submit a booking request online, complete our contact form, call us directly at (206) 669-1109, or email our team at info@seattleluxurydrive.com. We will respond as quickly as possible.",
      },
      {
        q: "How quickly will someone respond to my inquiry?",
        a: "Our goal is to respond to all booking and contact requests within 4 business hours during normal business hours.",
      },
    ],
  },
  {
    name: "Chauffeur & Self-Drive",
    items: [
      {
        q: "Do you offer chauffeur services?",
        a: "Yes. Chauffeur service is available for executive transportation, airport transfers, special occasions, corporate events, and other luxury transportation needs.",
      },
      {
        q: "Can I request a custom itinerary?",
        a: "Absolutely. Our concierge team can help coordinate customized transportation arrangements based on your schedule and requirements.",
      },
      {
        q: "Can I drive the vehicle myself?",
        a: "Self-drive and chauffeur options are available depending on the reservation. Availability is determined based on the vehicle, itinerary, and reservation details.",
      },
      {
        q: "Is chauffeur service required?",
        a: "Not always. Depending on the reservation, customers may choose between self-drive and chauffeur service options. Contact our team to discuss what works best for your needs.",
      },
    ],
  },
  {
    name: "Vehicle & Fleet",
    items: [
      {
        q: "What vehicles do you currently offer?",
        a: "Our launch fleet features a 2021 Rolls-Royce, with additional luxury vehicles planned as part of our future expansion.",
      },
      {
        q: "Can your vehicles be used for photoshoots or productions?",
        a: "Yes. Vehicle availability for photoshoots, commercial productions, marketing campaigns, and music videos can be arranged upon request.",
      },
      {
        q: "Do you provide transportation for weddings and celebrations?",
        a: "Yes. We offer luxury transportation for weddings, anniversaries, milestone celebrations, formal events, and other special occasions.",
      },
    ],
  },
  {
    name: "Pricing & Payments",
    items: [
      {
        q: "How much does a reservation cost?",
        a: "Pricing starts at $350 per hour. Final pricing varies based on vehicle selection, reservation duration, service type, destination, and other requirements.",
      },
      {
        q: "Do you offer custom pricing?",
        a: "Yes. Custom quotes are available for airport transfers, corporate events, weddings, special occasions, and extended reservations. Contact our concierge team to discuss your specific needs.",
      },
    ],
  },
  {
    name: "General",
    items: [
      {
        q: "What areas do you serve?",
        a: "We proudly serve Seattle, Shoreline, Bellevue, Redmond, Kirkland, Mercer Island, Lynnwood, Everett, Edmonds, Mukilteo, Tacoma, SeaTac Airport, and surrounding communities throughout the Greater Seattle Area.",
      },
      {
        q: "Do you provide airport transportation?",
        a: "Yes. We offer luxury airport transfers to and from Seattle-Tacoma International Airport (SeaTac) and destinations throughout the Greater Seattle Area.",
      },
      {
        q: "Do you monitor flight arrivals?",
        a: "When flight information is provided, our team can coordinate transportation based on your arrival schedule.",
      },
      {
        q: "Can transportation be arranged outside the Greater Seattle Area?",
        a: "Depending on the reservation, custom transportation arrangements may be available. Please contact our team to discuss your specific requirements.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            FAQ
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-xl mx-auto">
            Find answers to common questions about our luxury transportation
            services, chauffeur options, airport transfers, vehicle rentals,
            and reservation process.
          </p>
        </div>
      </section>

      {/* FAQ panel */}
      <section className="bg-black px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <FaqPanel categories={FAQ_CATEGORIES} />
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-charcoal px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-3xl font-light text-offwhite mb-4">
            Still Have Questions?
          </h2>
          <p className="font-sans text-sm text-offwhite/60 mb-8">
            Our concierge team is happy to help. Reach out by phone, email, or
            the contact form and we&apos;ll get back to you within 4 business hours.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+12066691109"
              className="w-full sm:w-auto bg-gold px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              Call (206) 669-1109
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-offwhite/30 px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
