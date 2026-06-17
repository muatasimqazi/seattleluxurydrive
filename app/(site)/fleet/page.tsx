import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/types/database";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Explore our curated fleet of luxury vehicles available for executive transportation, chauffeur service, and premium experiences throughout Greater Seattle.",
  alternates: { canonical: "https://seattleluxurydrive.com/fleet" },
  openGraph: {
    title: "Our Fleet | Seattle Luxury Drive",
    description:
      "Explore our curated fleet of luxury vehicles available for chauffeur service and self-drive throughout the Greater Seattle Area.",
    url: "https://seattleluxurydrive.com/fleet",
  },
};

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("status", "active")
      .order("featured", { ascending: false });
    if (error) return [];
    return (data as Vehicle[]) ?? [];
  } catch {
    return [];
  }
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const primaryImage = vehicle.vehicle_images
    ?.sort((a, b) => a.sort_order - b.sort_order)
    .at(0);

  return (
    <div className="group bg-charcoal">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        {primaryImage ? (
          <Image
            src={primaryImage.image_url}
            alt={primaryImage.alt_text ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/35">
              Vehicle Photography
            </span>
          </div>
        )}

        {vehicle.chauffeur_available && (
          <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 backdrop-blur-sm">
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-gold">
              Chauffeur Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <h2 className="font-heading text-3xl font-normal text-offwhite mb-1">
          {vehicle.name}
        </h2>
        {vehicle.starting_hourly_rate && (
          <p className="font-sans text-sm text-gold mb-4">
            Starting at ${vehicle.starting_hourly_rate.toLocaleString()}/hour
          </p>
        )}
        {vehicle.description && (
          <p className="font-sans text-sm leading-relaxed text-offwhite/75 mb-8 line-clamp-3">
            {vehicle.description}
          </p>
        )}
        <Link
          href={`/fleet/${vehicle.slug}`}
          className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

function EmptyFleet() {
  return (
    <div className="py-32 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-lt mb-4">
        Fleet
      </p>
      <h2 className="font-heading text-3xl font-light text-offwhite mb-6">
        Fleet Details Coming Soon
      </h2>
      <p className="font-sans text-sm text-offwhite/70 max-w-sm mx-auto mb-10">
        Our fleet information is being finalized. Contact us directly to
        discuss vehicle availability.
      </p>
      <Link
        href="/contact"
        className="border border-gold px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
      >
        Contact Us
      </Link>
    </div>
  );
}

export default async function FleetPage() {
  const vehicles = await getVehicles();

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seattleluxurydrive.com" },
          { "@type": "ListItem", position: 2, name: "Our Fleet", item: "https://seattleluxurydrive.com/fleet" },
        ],
      }} />
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
            Our Fleet
          </p>
          <h1 className="font-heading text-5xl font-light text-offwhite lg:text-6xl mb-6">
            Curated For Distinction.
          </h1>
          <p className="font-sans text-sm leading-relaxed text-offwhite/80">
            Curated luxury vehicles for executive transportation and premium
            experiences throughout the Greater Seattle Area.
          </p>
        </div>
      </section>

      {/* Vehicle grid */}
      <section className="bg-black px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {vehicles.length === 0 ? (
            <EmptyFleet />
          ) : (
            <div className="grid grid-cols-1 gap-px bg-offwhite/[0.06] md:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-3xl font-light text-offwhite mb-4">
            Ready to Reserve?
          </h2>
          <p className="font-sans text-sm text-offwhite/75 mb-8">
            Contact our concierge team to discuss availability, pricing, and
            your transportation needs.
          </p>
          <Link
            href="/book"
            className="inline-block bg-gold px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
          >
            Request Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
