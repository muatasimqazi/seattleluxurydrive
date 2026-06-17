import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { setVehicleStatus, setVehicleFeatured } from "@/app/actions/admin-vehicles";

export const metadata: Metadata = { title: "Vehicles" };

export default async function VehiclesPage() {
  const supabase = await createServiceClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, slug, name, year, make, model, starting_hourly_rate, chauffeur_available, featured, status")
    .order("created_at", { ascending: false });

  const active = vehicles?.filter((v) => v.status === "active") ?? [];
  const archived = vehicles?.filter((v) => v.status === "archived") ?? [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-light text-offwhite mb-1">Vehicles</h1>
          <p className="font-sans text-xs text-offwhite/40">
            {active.length} active · {archived.length} archived
          </p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="bg-gold px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-black hover:bg-gold-lt transition-colors"
        >
          Add Vehicle
        </Link>
      </div>

      <VehicleTable vehicles={active} title="Active" />
      {archived.length > 0 && <VehicleTable vehicles={archived} title="Archived" className="mt-10" />}
    </div>
  );
}

type Vehicle = {
  id: string;
  slug: string;
  name: string;
  year: number;
  make: string;
  model: string;
  starting_hourly_rate: number | null;
  chauffeur_available: boolean;
  featured: boolean;
  status: string;
};

function VehicleTable({
  vehicles,
  title,
  className = "",
}: {
  vehicles: Vehicle[];
  title: string;
  className?: string;
}) {
  if (vehicles.length === 0) return null;

  return (
    <div className={className}>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-3">{title}</p>
      <div className="border border-offwhite/8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-offwhite/8">
              {["Vehicle", "Rate", "Chauffeur", "Featured", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/35"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => {
              const archiveAction = setVehicleStatus.bind(null, v.id, v.status === "active" ? "archived" : "active");
              const featuredAction = setVehicleFeatured.bind(null, v.id, !v.featured);
              return (
                <tr key={v.id} className="border-b border-offwhite/6 hover:bg-offwhite/2 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-sans text-sm text-offwhite">{v.name}</p>
                    <p className="font-sans text-xs text-offwhite/40">
                      {v.year} · {v.make} {v.model}
                    </p>
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-offwhite/70">
                    {v.starting_hourly_rate ? `$${v.starting_hourly_rate}/hr` : "—"}
                  </td>
                  <td className="px-4 py-4 font-sans text-xs text-offwhite/50">
                    {v.chauffeur_available ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-4">
                    <form action={featuredAction}>
                      <button
                        type="submit"
                        className={`font-sans text-xs transition-colors ${
                          v.featured
                            ? "text-gold hover:text-offwhite/60"
                            : "text-offwhite/25 hover:text-offwhite/60"
                        }`}
                      >
                        {v.featured ? "★ Featured" : "☆ Set featured"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.1em] ${
                        v.status === "active" ? "text-emerald-400" : "text-offwhite/35"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          v.status === "active" ? "bg-emerald-400" : "bg-offwhite/30"
                        }`}
                      />
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4 justify-end">
                      <form action={archiveAction}>
                        <button
                          type="submit"
                          className="font-sans text-[11px] text-offwhite/35 hover:text-offwhite/70 transition-colors"
                        >
                          {v.status === "active" ? "Archive" : "Restore"}
                        </button>
                      </form>
                      <Link
                        href={`/admin/vehicles/${v.id}/edit`}
                        className="font-sans text-[11px] text-gold hover:text-gold-lt transition-colors"
                      >
                        Edit →
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
