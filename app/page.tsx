import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import {
  Briefcase,
  Plane,
  Crown,
  Sparkles,
  MapPin,
  Car,
  Building2,
  FileText,
  Phone,
  CheckCircle,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Seattle Luxury Drive | Luxury Chauffeur & Executive Transportation Seattle",
  description:
    "Luxury chauffeur services, executive transportation, airport transfers, and Rolls-Royce rentals throughout Seattle, Bellevue, Redmond, and the Greater Seattle Area.",
  alternates: { canonical: "https://seattleluxurydrive.com" },
  openGraph: {
    title: "Seattle Luxury Drive | Luxury Chauffeur & Executive Transportation",
    description:
      "Premier luxury transportation in the Greater Seattle Area. Chauffeur-driven Rolls-Royce for executive transfers, airport pickups, corporate events, and weddings.",
    url: "https://seattleluxurydrive.com",
  },
};

const SERVICE_AREA_CITIES = [
  "Seattle",
  "Shoreline",
  "Bellevue",
  "Redmond",
  "Kirkland",
  "Mercer Island",
  "Lynnwood",
  "Everett",
  "Edmonds",
  "Mukilteo",
  "Tacoma",
  "SeaTac Airport",
];

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center"
    >
      {/* Image placeholder — replace with next/image when photography is available */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"
      />

      <div className="relative z-10 max-w-4xl pt-20">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-lt mb-6">
          Seattle Luxury Drive
        </p>
        <h1 className="font-heading text-5xl font-light leading-tight text-offwhite lg:text-7xl">
          Seattle&apos;s Premier Luxury<br />Transportation Experience.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-offwhite/70 lg:text-lg">
          Luxury chauffeur services, executive transportation, airport transfers,
          and exclusive vehicle rentals throughout the Greater Seattle Area. From
          corporate travel to special occasions, Seattle Luxury Drive delivers a
          personalized, white-glove experience from start to finish.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="w-full sm:w-auto bg-gold px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
          <Link
            href="/fleet"
            className="w-full sm:w-auto border border-offwhite/40 px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-offwhite hover:border-offwhite/80 transition-colors"
          >
            Explore Fleet
          </Link>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-offwhite/[0.08] pt-10">
          {[
            "Chauffeur Service Available",
            "Serving Greater Seattle",
            "Corporate & VIP Transportation",
            "Starting at $350/hour",
          ].map((item) => (
            <span
              key={item}
              className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/55"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: <Briefcase size={22} strokeWidth={1.25} />,
      name: "Executive Transportation",
      description:
        "Professional transportation solutions for executives, business travelers, and corporate events.",
      href: "/services",
    },
    {
      icon: <Plane size={22} strokeWidth={1.25} />,
      name: "Airport Transfers",
      description:
        "Reliable luxury transportation to and from SeaTac Airport with personalized service and attention to detail.",
      href: "/services",
    },
    {
      icon: <Crown size={22} strokeWidth={1.25} />,
      name: "VIP Transportation",
      description:
        "Exclusive transportation experiences designed for discerning clients who expect comfort, privacy, and professionalism.",
      href: "/services",
    },
  ];

  return (
    <section className="bg-charcoal px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Our Services
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
            Luxury Transportation,<br />Tailored To Every Occasion.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-relaxed text-offwhite/65">
            Whether you&apos;re traveling for business, arriving at the airport,
            entertaining clients, or celebrating a milestone, our concierge-driven
            service ensures every journey is seamless and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="bg-charcoal p-10 lg:p-12">
              <div className="mb-6 text-gold">{s.icon}</div>
              <h3 className="font-heading text-2xl font-light text-offwhite mb-3">
                {s.name}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-8">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-offwhite/60 hover:text-offwhite transition-colors border-b border-offwhite/20 pb-0.5"
          >
            View All 8 Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedVehicleSection() {
  return (
    <section className="bg-black px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0 lg:items-center">
          {/* Image placeholder */}
          <div className="relative aspect-[4/3] bg-charcoal lg:aspect-auto lg:h-[560px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/20">
                Vehicle Photography
              </span>
            </div>
            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gold" />
          </div>

          {/* Content */}
          <div className="lg:pl-20">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
              Featured Vehicle
            </p>
            <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-2">
              2021 Rolls-Royce
            </h2>
            <p className="font-sans text-lg text-gold mb-6">
              Starting at $350/hour
            </p>
            <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-8">
              Experience the pinnacle of luxury with our flagship Rolls-Royce.
              Combining timeless craftsmanship, exceptional comfort, and
              unmistakable presence, it is the ideal choice for executive travel,
              special events, airport transfers, and unforgettable arrivals.
            </p>

            <div className="flex gap-6 mb-10">
              <div className="font-sans text-xs text-offwhite/55">
                <span className="block text-offwhite/35 uppercase tracking-[0.15em] text-[10px] mb-1">Chauffeur</span>
                Available
              </div>
              <div className="w-px bg-offwhite/10" />
              <div className="font-sans text-xs text-offwhite/55">
                <span className="block text-offwhite/35 uppercase tracking-[0.15em] text-[10px] mb-1">Self-Drive</span>
                Available
              </div>
              <div className="w-px bg-offwhite/10" />
              <div className="font-sans text-xs text-offwhite/55">
                <span className="block text-offwhite/35 uppercase tracking-[0.15em] text-[10px] mb-1">Pricing</span>
                Custom available
              </div>
            </div>

            <Link
              href="/fleet"
              className="inline-block bg-gold px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              View Vehicle Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const pillars = [
    {
      icon: <Sparkles size={20} strokeWidth={1.25} />,
      title: "White-Glove Experience",
      description:
        "Every reservation is handled with care, professionalism, and attention to detail.",
    },
    {
      icon: <MapPin size={20} strokeWidth={1.25} />,
      title: "Flexible Pickup & Delivery",
      description:
        "Convenient pickup and delivery options tailored to your schedule.",
    },
    {
      icon: <Car size={20} strokeWidth={1.25} />,
      title: "Chauffeur & Self-Drive Options",
      description:
        "Choose the experience that best fits your transportation needs.",
    },
    {
      icon: <Building2 size={20} strokeWidth={1.25} />,
      title: "Local Expertise",
      description:
        "Proudly serving Seattle and the surrounding communities with personalized service.",
    },
  ];

  return (
    <section className="bg-charcoal px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Why Seattle Luxury Drive
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
            A Higher Standard Of Service.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="bg-charcoal p-10 lg:p-14">
              <div className="mb-5 text-gold">{p.icon}</div>
              <h3 className="font-heading text-2xl font-light text-offwhite mb-3">
                {p.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/65">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials are hidden until real reviews are collected (minimum 3).
// See specs/content/testimonials.md and design-decision-log.md.
// Enable this section once real testimonials are available.
// function TestimonialsSection() { ... }

function ServiceAreaSection() {
  return (
    <section className="bg-black px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
              Service Area
            </p>
            <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-8">
              Serving The Greater<br />Seattle Area.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-10">
              Seattle Luxury Drive proudly serves clients throughout the Greater
              Seattle Area. Whether your destination is a downtown meeting, a
              luxury hotel, an airport terminal, or a special event venue, our
              team is committed to delivering a first-class transportation
              experience.
            </p>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {SERVICE_AREA_CITIES.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-2.5 font-sans text-sm text-offwhite/70"
                >
                  <span className="h-px w-4 bg-gold/60 shrink-0" />
                  {city}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-block mt-10 border border-gold/50 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-square bg-charcoal lg:aspect-auto lg:h-[560px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/20">
                Seattle Photography
              </span>
            </div>
            <div className="absolute bottom-0 right-0 h-[2px] w-16 bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReservationProcessSection() {
  const steps = [
    {
      number: "01",
      icon: <FileText size={20} strokeWidth={1.25} />,
      title: "Submit Your Request",
      description: "Tell us about your transportation needs.",
    },
    {
      number: "02",
      icon: <Phone size={20} strokeWidth={1.25} />,
      title: "Speak With Our Concierge Team",
      description: "We'll review your request and discuss the details.",
    },
    {
      number: "03",
      icon: <CheckCircle size={20} strokeWidth={1.25} />,
      title: "Confirm Your Reservation",
      description: "Finalize your itinerary and service preferences.",
    },
    {
      number: "04",
      icon: <Star size={20} strokeWidth={1.25} />,
      title: "Enjoy The Experience",
      description: "Relax and enjoy a premium transportation experience.",
    },
  ];

  return (
    <section className="bg-charcoal px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
            Simple. Personalized. Professional.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-charcoal p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-heading text-4xl font-light text-gold/30">
                  {step.number}
                </span>
                <div className="text-gold">{step.icon}</div>
              </div>
              <h3 className="font-heading text-xl font-light text-offwhite mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-block bg-gold px-12 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-black px-6 py-24 lg:py-32 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="h-px w-16 bg-gold mx-auto mb-12" />
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-6">
          Begin Your Journey
        </p>
        <h2 className="font-heading text-4xl font-light text-offwhite lg:text-6xl mb-8">
          Reserve Your Experience.
        </h2>
        <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-12 max-w-xl mx-auto">
          From executive transportation and airport transfers to luxury events and
          special occasions, Seattle Luxury Drive is ready to deliver a
          transportation experience tailored around you.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="w-full sm:w-auto bg-gold px-12 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto border border-offwhite/30 px-12 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <div className="h-px w-16 bg-gold mx-auto mt-12" />
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["hours_days", "hours_open", "hours_close"]);

  const s = Object.fromEntries(
    (data ?? []).map((r: { key: string; value: string }) => [r.key, r.value])
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Seattle Luxury Drive",
    description:
      "Premier luxury transportation and concierge service in the Greater Seattle Area. Chauffeur-driven and self-drive luxury vehicles for executive transfers, airport pickups, corporate events, weddings, and special occasions.",
    url: "https://seattleluxurydrive.com",
    telephone: "+12066691109",
    email: "info@seattleluxurydrive.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14723 Aurora Ave N",
      addressLocality: "Shoreline",
      addressRegion: "WA",
      postalCode: "98133",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.7577,
      longitude: -122.3443,
    },
    areaServed: [
      "Seattle, WA",
      "Shoreline, WA",
      "Bellevue, WA",
      "Redmond, WA",
      "Kirkland, WA",
      "Mercer Island, WA",
      "Lynnwood, WA",
      "Edmonds, WA",
      "Bothell, WA",
      "Tacoma, WA",
      "Everett, WA",
      "Renton, WA",
    ],
    priceRange: "$$$",
    openingHours: `${s.hours_days ?? "Mo-Su"} ${s.hours_open ?? "07:00"}-${s.hours_close ?? "22:00"}`,
    sameAs: ["https://seattleluxurydrive.com"],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroSection />
      <ServicesSection />
      <FeaturedVehicleSection />
      <WhyChooseSection />
      {/* TestimonialsSection hidden — enable once minimum 3 real reviews collected */}
      <ServiceAreaSection />
      <ReservationProcessSection />
      <FinalCTASection />
    </>
  );
}
