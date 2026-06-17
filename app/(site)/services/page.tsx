import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";

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

type Service = {
  id: string;
  eyebrow: string;
  name: string;
  headline: string;
  description: string;
  benefits: string[];
  cta: string;
  sort_order: number;
  image_url: string;
};

function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const bg = isEven ? "bg-black" : "bg-charcoal";

  return (
    <section id={service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className={`${bg} px-6 py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        <div className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Image */}
          <div className="relative aspect-4/3 w-full shrink-0 bg-charcoal lg:w-120 overflow-hidden">
            {service.image_url ? (
              <Image
                src={service.image_url}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/20">
                  Service Photography
                </span>
              </div>
            )}
            <div className={`absolute bottom-0 ${isEven ? "left-0" : "right-0"} h-0.5 w-12 bg-gold`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-lt mb-2">
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
              className="inline-block border border-gold px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
            >
              {service.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("id, eyebrow, name, headline, description, benefits, cta, sort_order, image_url")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seattleluxurydrive.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://seattleluxurydrive.com/services" },
        ],
      }} />
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
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

      {/* Service sections */}
      {(services ?? []).map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
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
              className="w-full sm:w-auto bg-gold px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              Request Reservation
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-offwhite/30 px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
