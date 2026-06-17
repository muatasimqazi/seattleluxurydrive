import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Luxury chauffeur services, executive transportation, airport transfers, corporate events, weddings, and premium vehicle rentals throughout the Greater Seattle Area.",
  alternates: { canonical: "https://seattleluxurydrive.com/services" },
  openGraph: {
    title: "Services | Seattle Luxury Drive",
    description:
      "Executive transportation, airport transfers, corporate events, weddings, and premium vehicle rentals throughout the Greater Seattle Area.",
    url: "https://seattleluxurydrive.com/services",
  },
};

const SERVICES = [
  {
    eyebrow: "01",
    name: "Executive Transportation",
    headline: "Professional Transportation For Business Without Compromise.",
    description:
      "Seattle Luxury Drive provides premium executive transportation designed for professionals who value punctuality, discretion, and comfort. Whether you're traveling between meetings, hosting important clients, or attending a corporate event, our luxury transportation services ensure you arrive prepared and on time.",
    benefits: [
      "Professional presentation",
      "Flexible scheduling",
      "Luxury vehicle experience",
      "Concierge-level service",
      "Greater Seattle coverage",
    ],
    cta: "Request Executive Transportation",
  },
  {
    eyebrow: "02",
    name: "Chauffeur Service",
    headline: "A Personal Chauffeur. A First-Class Experience.",
    description:
      "Our chauffeur service combines luxury, convenience, and professionalism. Whether you require transportation for a special event, executive travel, airport transfer, or private engagement, our team delivers a seamless experience from pickup to arrival.",
    benefits: [
      "Professional chauffeur service",
      "Personalized itineraries",
      "Stress-free transportation",
      "Premium comfort and privacy",
      "Flexible pickup and dropoff options",
    ],
    cta: "Book Chauffeur Service",
  },
  {
    eyebrow: "03",
    name: "Airport Transfers",
    headline: "Luxury Airport Transportation Without The Hassle.",
    description:
      "Skip the uncertainty of rideshare services and enjoy a luxury airport transfer experience. Whether traveling for business or leisure, Seattle Luxury Drive provides dependable transportation designed around your schedule.",
    benefits: [
      "SeaTac Airport service",
      "Luxury pickup and dropoff",
      "Flight-aware scheduling",
      "Executive-level comfort",
      "Concierge support",
    ],
    cta: "Request Airport Transfer",
  },
  {
    eyebrow: "04",
    name: "VIP Transportation",
    headline: "Transportation Designed For Exceptional Experiences.",
    description:
      "From private engagements to high-profile events, Seattle Luxury Drive delivers discreet, professional transportation tailored to your needs. Every reservation is managed with attention to detail and a commitment to excellence.",
    benefits: [
      "White-glove service",
      "Personalized experience",
      "Privacy and discretion",
      "Luxury vehicle options",
      "Flexible arrangements",
    ],
    cta: "Request VIP Transportation",
  },
  {
    eyebrow: "05",
    name: "Corporate Events",
    headline: "Elevate Your Next Corporate Event.",
    description:
      "Create a lasting impression with luxury transportation that reflects your organization's standards. Our corporate event services help ensure guests, executives, and clients travel comfortably and arrive on schedule.",
    benefits: [
      "Executive transportation",
      "Client hospitality",
      "Professional image",
      "Flexible scheduling",
      "Luxury experience",
    ],
    cta: "Plan Corporate Transportation",
  },
  {
    eyebrow: "06",
    name: "Special Occasions",
    headline: "Make Every Arrival Memorable.",
    description:
      "Whether you're celebrating an anniversary, date night, milestone event, or private gathering, Seattle Luxury Drive adds an extra level of sophistication to your experience.",
    benefits: [
      "Luxury arrivals",
      "Personalized service",
      "Memorable experiences",
      "Flexible transportation options",
      "Premium vehicle selection",
    ],
    cta: "Request Transportation",
  },
  {
    eyebrow: "07",
    name: "Weddings & Celebrations",
    headline: "Arrive In Style On Your Special Day.",
    description:
      "Your celebration deserves exceptional transportation. From wedding day arrivals to anniversary dinners and formal events, our luxury vehicles provide comfort, elegance, and unforgettable presentation.",
    benefits: [
      "Wedding transportation",
      "Luxury arrivals",
      "Chauffeur availability",
      "Professional service",
      "Flexible scheduling",
    ],
    cta: "Request Wedding Transportation",
  },
  {
    eyebrow: "08",
    name: "Photoshoots & Productions",
    headline: "Luxury Vehicles For Creative Projects.",
    description:
      "Our luxury vehicles are available for photoshoots, commercial productions, promotional campaigns, and creative projects. Add a distinctive visual element that elevates the quality and presentation of your work.",
    benefits: [
      "Photoshoots",
      "Commercial productions",
      "Music videos",
      "Marketing campaigns",
      "Luxury visual appeal",
    ],
    cta: "Request Vehicle Availability",
  },
];

function ServiceSection({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const bg = isEven ? "bg-black" : "bg-charcoal";

  return (
    <section id={service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className={`${bg} px-6 py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        <div className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Image placeholder */}
          <div className="relative aspect-4/3 w-full shrink-0 bg-charcoal lg:w-120">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/20">
                Service Photography
              </span>
            </div>
            <div className={`absolute bottom-0 ${isEven ? "left-0" : "right-0"} h-0.5 w-12 bg-gold`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-lt mb-2">
              {service.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-light text-offwhite lg:text-4xl mb-4">
              {service.name}
            </h2>
            <p className="font-heading text-xl font-light text-offwhite/70 italic mb-6 lg:text-2xl">
              {service.headline}
            </p>
            <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-8">
              {service.description}
            </p>

            <ul className="space-y-2 mb-10">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 font-sans text-sm text-offwhite/60">
                  <span className="h-px w-4 bg-gold/60 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="/book"
              className="inline-block border border-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              {service.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Our Services
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Luxury Transportation,<br />Tailored To Every Occasion.
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-xl mx-auto">
            Whether you&apos;re traveling for business, arriving at the airport,
            entertaining clients, or celebrating a milestone, our concierge-driven
            service ensures every journey is seamless and memorable.
          </p>
        </div>
      </section>

      {/* 8 service sections */}
      {SERVICES.map((service, i) => (
        <ServiceSection key={service.name} service={service} index={i} />
      ))}

      {/* Final CTA */}
      <section className="bg-charcoal px-6 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <div className="h-px w-12 bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-4xl font-light text-offwhite mb-4">
            Ready to Begin?
          </h2>
          <p className="font-sans text-sm text-offwhite/60 mb-10">
            Contact our concierge team to discuss your transportation needs and
            request a reservation.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-gold px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              Request Reservation
            </Link>
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
