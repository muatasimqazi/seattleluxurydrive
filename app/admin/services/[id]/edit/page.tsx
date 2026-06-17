import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ImageIcon, X } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import {
  updateService,
  uploadServiceImage,
  removeServiceImage,
} from "@/app/actions/admin-services";

export const metadata: Metadata = { title: "Edit Service" };

const inputCls =
  "w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/75 mb-2">
        {label}
      </p>
      {children}
      {hint && (
        <p className="font-sans text-[11px] text-offwhite/50 mt-1.5">{hint}</p>
      )}
    </div>
  );
}

export default async function EditServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; uploaded?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { saved, uploaded } = await searchParams;

  const supabase = createServiceClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) notFound();

  const updateAction = updateService.bind(null, id);
  const uploadAction = uploadServiceImage.bind(null, id);
  const removeAction = removeServiceImage.bind(null, id, service.image_url);

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="font-sans text-[11px] text-offwhite/60 hover:text-offwhite/85 transition-colors"
        >
          ← Services
        </Link>
        <h1 className="font-heading text-2xl font-light text-offwhite mt-3 mb-1">
          {service.name}
        </h1>
        <p className="font-sans text-xs text-offwhite/60">
          Service {service.eyebrow}
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Service saved successfully.</p>
        </div>
      )}

      {uploaded && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Image uploaded successfully.</p>
        </div>
      )}

      {/* ── Content form ── */}
      <form action={updateAction} className="space-y-6">
        <section className="border border-offwhite/8 p-6 space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
            Identity
          </p>

          <div className="grid grid-cols-4 gap-4">
            <Field label="Number" hint="e.g. 01">
              <input
                name="eyebrow"
                type="text"
                required
                defaultValue={service.eyebrow}
                className={inputCls}
              />
            </Field>
            <div className="col-span-3">
              <Field label="Service Name">
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={service.name}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          <Field label="Headline" hint="Italic subheading shown beneath the name.">
            <input
              name="headline"
              type="text"
              required
              defaultValue={service.headline}
              className={inputCls}
            />
          </Field>
        </section>

        <section className="border border-offwhite/8 p-6 space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
            Content
          </p>

          <Field label="Description">
            <textarea
              name="description"
              rows={5}
              required
              defaultValue={service.description}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field
            label="Benefits"
            hint="One benefit per line. Displayed as a bulleted list."
          >
            <textarea
              name="benefits"
              rows={6}
              defaultValue={(service.benefits as string[]).join("\n")}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="CTA Button Label">
            <input
              name="cta"
              type="text"
              required
              defaultValue={service.cta}
              className={inputCls}
            />
          </Field>
        </section>

        <section className="border border-offwhite/8 p-6 space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
            Settings
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Sort Order" hint="Lower numbers appear first.">
              <input
                name="sort_order"
                type="number"
                min="1"
                step="1"
                required
                defaultValue={service.sort_order}
                className={inputCls}
              />
            </Field>

            <Field label="Status">
              <select
                name="status"
                defaultValue={service.status}
                className={inputCls}
              >
                <option value="active" className="bg-charcoal">
                  Active — visible on site
                </option>
                <option value="archived" className="bg-charcoal">
                  Archived — hidden from site
                </option>
              </select>
            </Field>
          </div>
        </section>

        <button
          type="submit"
          className="bg-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
        >
          Save Changes
        </button>
      </form>

      {/* ── Image ── (separate form — file uploads can't share a form with text fields) */}
      <div className="mt-10 border-t border-offwhite/8 pt-8 space-y-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
            Photo
          </p>
          <p className="font-sans text-xs text-offwhite/55">
            JPEG, PNG, WebP or AVIF · Max 10 MB.
          </p>
        </div>

        {service.image_url ? (
          <div className="flex items-start gap-4">
            <div className="relative w-40 aspect-4/3 overflow-hidden bg-charcoal shrink-0">
              <Image
                src={service.image_url}
                alt={service.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="flex flex-col gap-2">
              <form action={uploadAction} className="flex items-center gap-2">
                <input
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  required
                  className="font-sans text-xs text-offwhite/75 file:mr-3 file:bg-offwhite/8 file:border-0 file:px-3 file:py-1.5 file:font-sans file:text-[11px] file:uppercase file:tracking-[0.12em] file:text-offwhite/75 hover:file:bg-offwhite/12 file:transition-colors file:cursor-pointer"
                />
                <button
                  type="submit"
                  className="shrink-0 font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/65 hover:text-offwhite transition-colors"
                >
                  Replace
                </button>
              </form>
              <form action={removeAction}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 font-sans text-[11px] text-offwhite/50 hover:text-red-400 transition-colors"
                >
                  <X size={11} strokeWidth={1.5} />
                  Remove
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form action={uploadAction} className="flex items-center gap-3">
            <div className="flex items-center justify-center w-16 h-12 bg-offwhite/4 border border-dashed border-offwhite/15 shrink-0">
              <ImageIcon size={16} strokeWidth={1} className="text-offwhite/35" />
            </div>
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              required
              className="flex-1 font-sans text-xs text-offwhite/75 file:mr-3 file:bg-offwhite/8 file:border-0 file:px-3 file:py-1.5 file:font-sans file:text-[11px] file:uppercase file:tracking-[0.12em] file:text-offwhite/75 hover:file:bg-offwhite/12 file:transition-colors file:cursor-pointer"
            />
            <button
              type="submit"
              className="shrink-0 font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/65 hover:text-offwhite transition-colors"
            >
              Upload
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
