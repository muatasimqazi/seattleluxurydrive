import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Seattle Luxury Drive, a family-owned luxury transportation company providing executive transportation, chauffeur services, airport transfers, and premium travel experiences throughout the Greater Seattle Area.",
  alternates: { canonical: "https://seattleluxurydrive.com/about" },
  openGraph: {
    title: "About | Seattle Luxury Drive",
    description:
      "Family-owned luxury transportation serving the Greater Seattle Area with executive transfers, chauffeur service, and premium vehicle rentals.",
    url: "https://seattleluxurydrive.com/about",
  },
};

const VALUES = [
  {
    title: "Hospitality",
    description: "Every client deserves attentive, respectful, and personalized service.",
  },
  {
    title: "Professionalism",
    description: "We hold ourselves to the highest standards of reliability, presentation, and communication.",
  },
  {
    title: "Excellence",
    description: "From vehicle quality to customer service, we are committed to delivering an elevated experience.",
  },
  {
    title: "Integrity",
    description: "Trust is earned through consistency, transparency, and accountability.",
  },
];

const SERVICE_AREA_CITIES = [
  "Seattle", "Shoreline", "Bellevue", "Redmond",
  "Kirkland", "Mercer Island", "Lynnwood", "Everett",
  "Edmonds", "Mukilteo", "Tacoma", "SeaTac Airport",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-40 pb-24 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            About Us
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Luxury Transportation.<br />Family Values.<br />Exceptional Service.
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65 max-w-xl mx-auto">
            Seattle Luxury Drive is a family-owned company dedicated to delivering
            premium transportation experiences with professionalism, hospitality,
            and attention to detail.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-charcoal px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] bg-black lg:aspect-auto lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/20">
                  Brand Photography
                </span>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-12 bg-gold" />
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-8">
                Built Around Service.
              </h2>
              <div className="space-y-5 font-sans text-sm leading-relaxed text-offwhite/65">
                <p>
                  Seattle Luxury Drive was founded with a simple belief: luxury
                  transportation should be more than just getting from one destination
                  to another.
                </p>
                <p>
                  As a family-owned business, we understand the value of hospitality,
                  reliability, and personal service. Our goal is to provide
                  transportation experiences that feel seamless, professional, and
                  tailored to each client&apos;s needs.
                </p>
                <p>
                  Whether serving corporate travelers, airport transfer clients, VIP
                  guests, or individuals celebrating special occasions, we approach
                  every reservation with the same commitment to excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Our Mission
          </p>
          <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-8">
            Elevating Every Journey.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-offwhite/65">
            Our mission is to provide luxury transportation services that combine
            comfort, professionalism, and personalized attention. We strive to create
            memorable experiences for every client by delivering dependable service,
            exceptional vehicles, and concierge-level support throughout the Greater
            Seattle Area.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
              Our Values
            </p>
            <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl">
              The Principles That Guide Us.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-charcoal p-10 lg:p-14">
                <div className="h-px w-8 bg-gold mb-8" />
                <h3 className="font-heading text-2xl font-light text-offwhite mb-3">
                  {v.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-offwhite/65">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-black px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
                Service Area
              </p>
              <h2 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-6">
                Serving The Greater<br />Seattle Area.
              </h2>
              <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-10">
                Whether your transportation needs involve executive travel, airport
                transfers, corporate events, or special occasions, our team is
                committed to delivering a first-class experience wherever you need
                to go.
              </p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {SERVICE_AREA_CITIES.map((city) => (
                  <li key={city} className="flex items-center gap-2.5 font-sans text-sm text-offwhite/65">
                    <span className="h-px w-4 bg-gold/60 shrink-0" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image placeholder */}
            <div className="relative aspect-square bg-charcoal lg:aspect-auto lg:h-[480px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/20">
                  Seattle Photography
                </span>
              </div>
              <div className="absolute bottom-0 right-0 h-[2px] w-12 bg-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal px-6 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <div className="h-px w-12 bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-4xl font-light text-offwhite mb-4">
            Experience The Difference.
          </h2>
          <p className="font-sans text-sm text-offwhite/60 mb-10 max-w-md mx-auto">
            Discover why clients throughout the Greater Seattle Area trust Seattle
            Luxury Drive for luxury transportation, chauffeur services, and
            personalized travel experiences.
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
