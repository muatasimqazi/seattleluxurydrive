import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import { getSettings, phoneHref } from "@/lib/settings";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/types/database";
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

async function getFeaturedVehicle(): Promise<Vehicle | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("status", "active")
      .eq("featured", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    return (data as Vehicle) ?? null;
  } catch {
    return null;
  }
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HeroSection({ startingRate, heroImage }: { startingRate: string; heroImage: string }) {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen flex-col bg-black"
    >
      {heroImage && (
        <Image
          src={heroImage}
          alt="Seattle Luxury Drive hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-8 pt-20 pb-8">
        <div className="w-full max-w-4xl">
          {/* Eyebrow — condensed on mobile, full on desktop */}
          <p className="lg:hidden font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold-lt mb-4">
            Luxury Transportation · Greater Seattle
          </p>
          <p className="hidden lg:block font-sans text-sm font-medium uppercase tracking-[0.3em] text-gold-lt mb-6">
            — Chauffeur Service · Executive Transportation · Greater Seattle —
          </p>

          <h1 className="font-heading text-4xl font-light leading-tight text-offwhite lg:text-7xl">
            Seattle&apos;s Premier Luxury<br className="hidden sm:block" />Transportation Experience.
          </h1>
          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-offwhite/85 lg:text-lg lg:mt-8">
            Luxury chauffeur services, executive transportation, airport transfers,
            and exclusive vehicle rentals throughout the Greater Seattle Area.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4 lg:mt-10">
            <Link
              href="/book"
              className="bg-gold px-4 sm:px-10 py-3 sm:py-4 font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors text-center"
            >
              Request Reservation
            </Link>
            <Link
              href="/fleet"
              className="border border-offwhite/40 px-4 sm:px-10 py-3 sm:py-4 font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-offwhite hover:border-offwhite/80 transition-colors text-center"
            >
              Explore Fleet
            </Link>
          </div>
        </div>
      </div>

      {/* Trust bar — 2×2 grid on mobile, 4-item spread on desktop */}
      <div className="relative z-10 border-t border-offwhite/8">
        <div className="grid grid-cols-2 divide-x divide-y divide-offwhite/8 lg:hidden">
          {[
            "24/7 Availability",
            `$${startingRate}/hr Starting`,
            "4hr Response Time",
            "Greater Seattle",
          ].map((item) => (
            <div
              key={item}
              className="px-6 py-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-offwhite/65"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex max-w-7xl mx-auto px-8 py-5 items-center justify-between">
          {[
            "Chauffeur Service Available",
            "Serving Greater Seattle",
            "Corporate & VIP Transportation",
            `Starting at $${startingRate} / Hour`,
          ].map((item) => (
            <span
              key={item}
              className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-offwhite/65"
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
            Our Services
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
            Luxury Transportation,<br />Tailored To Every Occasion.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-relaxed text-offwhite/80">
            Whether you&apos;re traveling for business, arriving at the airport,
            entertaining clients, or celebrating a milestone, our concierge-driven
            service ensures every journey is seamless and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="bg-charcoal p-10 lg:p-12">
              <div className="mb-6 text-gold">{s.icon}</div>
              <h3 className="font-heading text-3xl font-normal text-offwhite mb-3">
                {s.name}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/80 mb-8">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-offwhite/75 hover:text-offwhite transition-colors border-b border-offwhite/20 pb-0.5"
          >
            View All 8 Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedVehicleSection({
  vehicle,
  fallbackRate,
}: {
  vehicle: Vehicle | null;
  fallbackRate: string;
}) {
  if (!vehicle) return null;

  const primaryImage = vehicle.vehicle_images
    ?.sort((a, b) => a.sort_order - b.sort_order)
    .at(0);

  const rate = vehicle.starting_hourly_rate
    ? vehicle.starting_hourly_rate.toLocaleString()
    : fallbackRate;

  return (
    <section className="bg-black px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0 lg:items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-charcoal lg:aspect-auto lg:h-[560px]">
            {primaryImage ? (
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text ?? vehicle.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/35">
                  Vehicle Photography
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gold" />
          </div>

          {/* Content */}
          <div className="lg:pl-20">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
              Featured Vehicle
            </p>
            <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-2">
              {vehicle.name}
            </h2>
            <p className="font-sans text-lg text-gold mb-6">
              Starting at ${rate}/hour
            </p>
            {vehicle.description && (
              <p className="font-sans text-sm leading-relaxed text-offwhite/80 mb-8">
                {vehicle.description}
              </p>
            )}

            <div className="flex gap-6 mb-10">
              {vehicle.chauffeur_available && (
                <>
                  <div className="font-sans text-xs text-offwhite/70">
                    <span className="block text-offwhite/55 uppercase tracking-[0.15em] text-xs mb-1">Chauffeur</span>
                    Available
                  </div>
                  <div className="w-px bg-offwhite/10" />
                </>
              )}
              <div className="font-sans text-xs text-offwhite/70">
                <span className="block text-offwhite/55 uppercase tracking-[0.15em] text-xs mb-1">Self-Drive</span>
                Available
              </div>
              <div className="w-px bg-offwhite/10" />
              <div className="font-sans text-xs text-offwhite/70">
                <span className="block text-offwhite/55 uppercase tracking-[0.15em] text-xs mb-1">Pricing</span>
                Custom available
              </div>
            </div>

            <Link
              href={`/fleet/${vehicle.slug}`}
              className="inline-block bg-gold px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
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
              <h3 className="font-heading text-3xl font-normal text-offwhite mb-3">
                {p.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/80">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Seattle Luxury Drive made our trip to SeaTac completely stress-free. The driver arrived early, the vehicle was immaculate, and we arrived at the airport feeling relaxed rather than rushed. An exceptional experience from start to finish.",
    name: "Marcus T.",
    service: "Airport Transfer — SeaTac",
  },
  {
    quote:
      "We booked Seattle Luxury Drive for our anniversary evening in the city and it was absolutely first class. Professional, attentive, and the Rolls-Royce was stunning. We'll be using them for every special occasion going forward.",
    name: "Jennifer & David M.",
    service: "Anniversary Evening — Seattle",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-black px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
            Client Experiences
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
            What Our Clients Say.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] md:grid-cols-2 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-black p-10 lg:p-12 flex flex-col">
              <p className="text-gold tracking-widest text-sm mb-6">★★★★★</p>
              <blockquote className="font-heading text-xl italic font-light text-offwhite/85 leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-sans text-sm text-offwhite">{t.name}</p>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-gold-lt mt-1">
                  {t.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreaSection({ seattleImage }: { seattleImage: string }) {
  return (
    <section className="bg-black px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
              Service Area
            </p>
            <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-8">
              Serving The Greater<br />Seattle Area.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-offwhite/80 mb-10">
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
                  className="flex items-center gap-2.5 font-sans text-sm text-offwhite/85"
                >
                  <span className="h-px w-4 bg-gold/60 shrink-0" />
                  {city}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-block mt-10 border border-gold/50 px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="relative aspect-square bg-charcoal lg:aspect-auto lg:h-[560px]">
            {seattleImage ? (
              <Image src={seattleImage} alt="Seattle area" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/35">
                  Seattle Photography
                </span>
              </div>
            )}
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
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
                <span className="font-heading text-4xl font-light text-gold/60">
                  {step.number}
                </span>
                <div className="text-gold">{step.icon}</div>
              </div>
              <h3 className="font-heading text-xl font-medium text-offwhite mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/75">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-block bg-gold px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
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
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-6">
          Begin Your Journey
        </p>
        <h2 className="font-heading text-4xl font-light text-offwhite lg:text-6xl mb-8">
          Reserve Your Experience.
        </h2>
        <p className="font-sans text-sm leading-relaxed text-offwhite/80 mb-12 max-w-xl mx-auto">
          From executive transportation and airport transfers to luxury events and
          special occasions, Seattle Luxury Drive is ready to deliver a
          transportation experience tailored around you.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="w-full sm:w-auto bg-gold px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto border border-offwhite/30 px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-offwhite/85 hover:border-offwhite/60 hover:text-offwhite transition-colors"
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
  const [s, featuredVehicle] = await Promise.all([getSettings(), getFeaturedVehicle()]);

  const localBusinessSchema = {
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
    openingHours: `${s.hours_days} ${s.hours_open}-${s.hours_close}`,
    sameAs: ["https://seattleluxurydrive.com"],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroSection startingRate={s.starting_rate} heroImage={s.image_home_hero} />
      <ServicesSection />
      <FeaturedVehicleSection vehicle={featuredVehicle} fallbackRate={s.starting_rate} />
      <WhyChooseSection />
      <TestimonialsSection />
      <ServiceAreaSection seattleImage={s.image_service_area} />
      <ReservationProcessSection />
      <FinalCTASection />
    </>
  );
}
