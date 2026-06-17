import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSettings, phoneHref } from "@/lib/settings";
import type { Vehicle } from "@/types/database";
import JsonLd from "@/components/seo/JsonLd";

async function getVehicle(slug: string): Promise<Vehicle | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("slug", slug)
      .eq("status", "active")
      .single();
    if (error) return null;
    return data as Vehicle;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const url = `https://seattleluxurydrive.com/fleet/${slug}`;
  const desc =
    vehicle.description ??
    `${vehicle.name} available for luxury chauffeur service and self-drive throughout the Greater Seattle Area.`;

  return {
    title: vehicle.name,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${vehicle.name} | Seattle Luxury Drive`,
      description: desc,
      url,
    },
  };
}

const VEHICLE_FAQ = [
  {
    q: "Is a chauffeur required?",
    a: "No. We offer both chauffeur-driven and self-drive options depending on the reservation type and your preferences. Contact us to discuss which option is right for your trip.",
  },
  {
    q: "What is included in the hourly rate?",
    a: "The hourly rate covers the vehicle and, for chauffeur service, a professional driver. Tolls, parking, and gratuity are additional. Custom full-day and multi-day pricing is available — contact our concierge team.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 48–72 hours in advance to ensure availability. For peak dates, weddings, and large events, earlier is always better. Same-day requests may be accommodated based on availability.",
  },
];

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [vehicle, s] = await Promise.all([getVehicle(slug), getSettings()]);
  if (!vehicle) notFound();

  const images =
    vehicle.vehicle_images?.sort((a, b) => a.sort_order - b.sort_order) ?? [];
  const primaryImage = images.at(0);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seattleluxurydrive.com" },
          { "@type": "ListItem", position: 2, name: "Our Fleet", item: "https://seattleluxurydrive.com/fleet" },
          { "@type": "ListItem", position: 3, name: vehicle.name, item: `https://seattleluxurydrive.com/fleet/${slug}` },
        ],
      }} />
      {/* Breadcrumb */}
      <div className="bg-black pt-24 pb-0 px-6">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-xs text-offwhite/40">
            <Link href="/" className="hover:text-offwhite/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/fleet" className="hover:text-offwhite/70 transition-colors">Fleet</Link>
            <ChevronRight size={12} />
            <span className="text-offwhite/60">{vehicle.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero: primary image + key info */}
      <section className="bg-black px-6 pt-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* Gallery — primary image */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                {primaryImage ? (
                  <Image
                    src={primaryImage.image_url}
                    alt={primaryImage.alt_text ?? vehicle.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/20">
                      Vehicle Photography
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(1, 5).map((img) => (
                    <div key={img.id} className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                      <Image
                        src={img.image_url}
                        alt={img.alt_text ?? vehicle.name}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle info */}
            <div className="lg:sticky lg:top-28">
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-3">
                {vehicle.year} {vehicle.make}
              </p>
              <h1 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-3">
                {vehicle.name}
              </h1>
              {vehicle.starting_hourly_rate && (
                <p className="font-sans text-lg text-gold mb-6">
                  Starting at ${vehicle.starting_hourly_rate.toLocaleString()}/hour
                  <span className="text-offwhite/40 text-sm ml-2">· Custom pricing available</span>
                </p>
              )}

              {vehicle.description && (
                <p className="font-sans text-sm leading-relaxed text-offwhite/65 mb-8">
                  {vehicle.description}
                </p>
              )}

              <div className="flex gap-6 mb-10 pb-10 border-b border-offwhite/[0.08]">
                {vehicle.chauffeur_available && (
                  <div className="font-sans text-xs text-offwhite/55">
                    <span className="block text-offwhite/35 uppercase tracking-[0.12em] text-xs mb-1">Chauffeur</span>
                    Available
                  </div>
                )}
                <div className="font-sans text-xs text-offwhite/55">
                  <span className="block text-offwhite/35 uppercase tracking-[0.12em] text-xs mb-1">Self-Drive</span>
                  Available
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="flex-1 bg-gold text-center px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.18em] text-black hover:bg-gold-lt transition-colors"
                >
                  Request Reservation
                </Link>
                <a
                  href={phoneHref(s.contact_phone)}
                  className="flex items-center justify-center gap-2 border border-offwhite/30 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.15em] text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite transition-colors"
                >
                  <Phone size={13} strokeWidth={1.5} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental options */}
      <section className="bg-charcoal px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-8">
            Rental Options
          </p>
          <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] lg:grid-cols-2">
            <div className="bg-charcoal p-10">
              <h3 className="font-heading text-3xl font-normal text-offwhite mb-3">
                Self-Drive
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/65">
                Experience the freedom of driving our Rolls-Royce yourself.
                Self-drive availability is subject to approval and specific terms.
                Contact our concierge team to discuss eligibility and conditions.
              </p>
            </div>
            <div className="bg-charcoal p-10">
              <h3 className="font-heading text-3xl font-normal text-offwhite mb-3">
                With Chauffeur
              </h3>
              <p className="font-sans text-sm leading-relaxed text-offwhite/65">
                Sit back and enjoy a fully attended luxury experience with our
                professional, discreet chauffeur. Ideal for executive travel,
                airport transfers, corporate events, and special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-8">
            Vehicle FAQ
          </p>
          <h2 className="font-heading text-3xl font-light text-offwhite mb-12">
            Common Questions
          </h2>
          <dl className="space-y-0">
            {VEHICLE_FAQ.map((item, i) => (
              <div
                key={i}
                className="border-b border-gold/20 py-8"
              >
                <dt className="font-heading text-xl font-medium text-offwhite mb-3">
                  {item.q}
                </dt>
                <dd className="font-sans text-sm leading-relaxed text-offwhite/65">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Link
              href="/faq"
              className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-3xl font-light text-offwhite mb-4">
            Ready to Book?
          </h2>
          <p className="font-sans text-sm text-offwhite/60 mb-8">
            Request a reservation and our concierge team will confirm details
            within 4 business hours.
          </p>
          <Link
            href="/book"
            className="inline-block bg-gold px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
