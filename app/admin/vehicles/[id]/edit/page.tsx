import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, Trash2, ImageIcon } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { updateVehicle, uploadVehicleImage, deleteVehicleImage } from "@/app/actions/admin-vehicles";
import type { VehicleImage } from "@/types/database";
import { requireTeamMember } from "@/lib/auth";

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
  searchParams: Promise<{ saved?: string; uploaded?: string }>;
}) {
  await requireTeamMember();
  const { id } = await params;
  const { saved, uploaded } = await searchParams;

  const supabase = createServiceClient();
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", id)
    .single();

  if (!vehicle) notFound();

  const images: VehicleImage[] = (vehicle.vehicle_images ?? []).sort(
    (a: VehicleImage, b: VehicleImage) => a.sort_order - b.sort_order
  );

  const updateWithId = updateVehicle.bind(null, id);
  const uploadWithId = uploadVehicleImage.bind(null, id);

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

      {uploaded && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Image uploaded successfully.</p>
        </div>
      )}

      {/* ── Vehicle details form ── */}
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
              className="w-4 h-4 accent-gold"
            />
            <span className="font-sans text-sm text-offwhite/70">Chauffeur service available</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={vehicle.featured}
              className="w-4 h-4 accent-gold"
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

      {/* ── Images ── */}
      <div className="mt-10 space-y-6">
        <div className="border-t border-offwhite/8 pt-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">Images</p>
          <p className="font-sans text-xs text-offwhite/35 mb-6">
            First image is used as the primary photo on the fleet page and homepage.
          </p>

          {/* Existing images grid */}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3">
              {images.map((img, i) => {
                const deleteAction = deleteVehicleImage.bind(null, img.id, id, img.image_url);
                return (
                  <div key={img.id} className="group relative">
                    <div className="relative aspect-4/3 overflow-hidden bg-charcoal border border-offwhite/8">
                      <Image
                        src={img.image_url}
                        alt={img.alt_text ?? `${vehicle.name} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      {i === 0 && (
                        <div className="absolute top-2 left-2 bg-gold px-2 py-0.5">
                          <span className="font-sans text-[9px] uppercase tracking-widest text-black">Primary</span>
                        </div>
                      )}
                    </div>
                    {img.alt_text && (
                      <p className="font-sans text-[11px] text-offwhite/40 mt-1.5 truncate">{img.alt_text}</p>
                    )}
                    <form action={deleteAction} className="mt-1">
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 font-sans text-[11px] text-offwhite/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={11} strokeWidth={1.5} />
                        Delete
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-offwhite/15 py-12 mb-6">
              <ImageIcon size={28} strokeWidth={1} className="text-offwhite/20 mb-3" />
              <p className="font-sans text-xs text-offwhite/35">No images yet</p>
            </div>
          )}

          {/* Upload form */}
          <form action={uploadWithId} className="border border-offwhite/8 p-5 space-y-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50">Add Image</p>

            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2">File</p>
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                required
                className="w-full font-sans text-sm text-offwhite/70 file:mr-4 file:bg-offwhite/8 file:border-0 file:px-4 file:py-2 file:font-sans file:text-[11px] file:uppercase file:tracking-[0.12em] file:text-offwhite/70 hover:file:bg-offwhite/12 file:transition-colors file:cursor-pointer"
              />
              <p className="font-sans text-[11px] text-offwhite/30 mt-1.5">JPEG, PNG, WebP or AVIF · Max 10 MB</p>
            </div>

            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2">
                Alt Text <span className="normal-case tracking-normal text-offwhite/30">(optional)</span>
              </p>
              <input
                name="alt_text"
                type="text"
                placeholder="e.g. 2021 Rolls-Royce Ghost — exterior front view"
                className={inputCls}
              />
            </div>

            <button
              type="submit"
              className="bg-offwhite/8 px-6 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-offwhite/70 hover:bg-offwhite/12 hover:text-offwhite transition-colors"
            >
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
