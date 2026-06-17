import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { updateVehicle } from "@/app/actions/admin-vehicles";

export const metadata: Metadata = { title: "Edit Vehicle" };

const inputCls =
  "w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2">{label}</p>
      {children}
      {hint && <p className="font-sans text-[11px] text-offwhite/30 mt-1.5">{hint}</p>}
    </div>
  );
}

export default async function EditVehiclePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const supabase = await createServiceClient();
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehicle) notFound();

  const updateWithId = updateVehicle.bind(null, id);

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/vehicles"
          className="font-sans text-[11px] text-offwhite/40 hover:text-offwhite/70 transition-colors"
        >
          ← Vehicles
        </Link>
        <h1 className="font-heading text-2xl font-light text-offwhite mt-3 mb-1">{vehicle.name}</h1>
        <p className="font-sans text-xs text-offwhite/40">
          Slug: <span className="font-mono text-offwhite/50">{vehicle.slug}</span>
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Vehicle saved successfully.</p>
        </div>
      )}

      <form action={updateWithId} className="space-y-6">
        <section className="border border-offwhite/8 p-6 space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">Identity</p>

          <Field label="Display Name">
            <input name="name" type="text" required defaultValue={vehicle.name} className={inputCls} />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Year">
              <input
                name="year"
                type="number"
                required
                min="1900"
                max="2100"
                defaultValue={vehicle.year}
                className={inputCls}
              />
            </Field>
            <Field label="Make">
              <input name="make" type="text" required defaultValue={vehicle.make} className={inputCls} />
            </Field>
            <Field label="Model">
              <input name="model" type="text" required defaultValue={vehicle.model} className={inputCls} />
            </Field>
          </div>

          <Field label="Status">
            <select name="status" defaultValue={vehicle.status} className={inputCls}>
              <option value="active" className="bg-charcoal">Active — visible to customers</option>
              <option value="archived" className="bg-charcoal">Archived — hidden from fleet page</option>
            </select>
          </Field>
        </section>

        <section className="border border-offwhite/8 p-6 space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">Details</p>

          <Field label="Description">
            <textarea
              name="description"
              rows={4}
              defaultValue={vehicle.description ?? ""}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Starting Hourly Rate (USD)">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-offwhite/40">$</span>
              <input
                name="starting_hourly_rate"
                type="number"
                min="0"
                step="0.01"
                defaultValue={vehicle.starting_hourly_rate ?? ""}
                className={`${inputCls} pl-8`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-xs text-offwhite/40">/hr</span>
            </div>
          </Field>
        </section>

        <section className="border border-offwhite/8 p-6 space-y-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">Options</p>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="chauffeur_available"
              type="checkbox"
              defaultChecked={vehicle.chauffeur_available}
              className="w-4 h-4 accent-[#B89B5E]"
            />
            <span className="font-sans text-sm text-offwhite/70">Chauffeur service available</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={vehicle.featured}
              className="w-4 h-4 accent-[#B89B5E]"
            />
            <span className="font-sans text-sm text-offwhite/70">Feature on homepage</span>
          </label>
        </section>

        <button
          type="submit"
          className="bg-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
