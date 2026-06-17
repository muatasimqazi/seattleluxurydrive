import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  await requireAdmin();

  const supabase = createServiceClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, eyebrow, name, status, image_url")
    .order("sort_order", { ascending: true });

  const active = services?.filter((s) => s.status === "active") ?? [];
  const archived = services?.filter((s) => s.status === "archived") ?? [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-light text-offwhite mb-1">Services</h1>
        <p className="font-sans text-xs text-offwhite/40">
          {active.length} active · {archived.length} archived
        </p>
      </div>

      <ServiceTable services={active} title="Active" />
      {archived.length > 0 && (
        <ServiceTable services={archived} title="Archived" className="mt-10" />
      )}
    </div>
  );
}

type ServiceRow = {
  id: string;
  eyebrow: string;
  name: string;
  status: string;
  image_url: string;
};

function ServiceTable({
  services,
  title,
  className = "",
}: {
  services: ServiceRow[];
  title: string;
  className?: string;
}) {
  if (services.length === 0) return null;

  return (
    <div className={className}>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-3">{title}</p>
      <div className="border border-offwhite/8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-offwhite/8">
              {["#", "Service", "Image", "Status", ""].map((h) => (
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
            {services.map((s) => (
              <tr key={s.id} className="border-b border-offwhite/6 hover:bg-offwhite/2 transition-colors">
                <td className="px-4 py-4 font-sans text-xs text-gold-lt w-10">{s.eyebrow}</td>
                <td className="px-4 py-4 font-sans text-sm text-offwhite">{s.name}</td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-xs ${s.image_url ? "text-emerald-400" : "text-offwhite/25"}`}>
                    {s.image_url ? "Uploaded" : "No photo"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest ${
                      s.status === "active" ? "text-emerald-400" : "text-offwhite/35"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        s.status === "active" ? "bg-emerald-400" : "bg-offwhite/30"
                      }`}
                    />
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/admin/services/${s.id}/edit`}
                    className="font-sans text-[11px] text-gold hover:text-gold-lt transition-colors"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
