import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, ImageIcon, X } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { updateSettings } from "@/app/actions/admin-settings";
import { uploadSiteImage, removeSiteImage } from "@/app/actions/admin-site-images";
import { requireAdmin } from "@/lib/auth";
import { ImageUploadForm } from "@/components/admin/ImageUploadForm";

export const metadata: Metadata = { title: "Settings" };

const DAYS_OPTIONS = [
  { value: "Mo-Su", label: "Every day (Mo–Su)" },
  { value: "Mo-Fr", label: "Weekdays only (Mo–Fr)" },
  { value: "Mo-Sa", label: "Monday to Saturday (Mo–Sa)" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/75 mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { saved } = await searchParams;
  const s = await getSettings();

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-heading text-2xl font-light text-offwhite mb-1">Settings</h1>
      <p className="font-sans text-xs text-offwhite/60 mb-8">
        Site-wide configuration. Changes take effect immediately.
      </p>

      {saved && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Settings saved successfully.</p>
        </div>
      )}

      <form action={updateSettings} className="space-y-6">

        {/* ── Site Identity ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Site Identity
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Appears in the footer, emails, and structured schema data.
            </p>
          </div>

          <Field label="Business Name">
            <input
              name="site_name"
              type="text"
              defaultValue={s.site_name}
              placeholder="Seattle Luxury Drive"
              className={inputCls}
            />
          </Field>

          <Field label="Business Address">
            <input
              name="site_address"
              type="text"
              defaultValue={s.site_address}
              placeholder="14723 Aurora Ave N, Shoreline, WA 98133"
              className={inputCls}
            />
          </Field>
        </section>

        {/* ── Business Hours ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Business Hours
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Shown in Google search results via the LocalBusiness schema.
            </p>
          </div>

          <Field label="Operating Days">
            <select
              name="hours_days"
              defaultValue={s.hours_days}
              className={inputCls}
            >
              {DAYS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-charcoal">
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Opens">
              <input name="hours_open" type="time" defaultValue={s.hours_open} className={inputCls} />
            </Field>
            <Field label="Closes">
              <input name="hours_close" type="time" defaultValue={s.hours_close} className={inputCls} />
            </Field>
          </div>

          <p className="font-sans text-[11px] text-offwhite/50">
            Schema value:{" "}
            <span className="font-mono text-offwhite/65">
              {s.hours_days} {s.hours_open}–{s.hours_close}
            </span>
          </p>
        </section>

        {/* ── Contact Information ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Contact Information
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Appears in navigation, footer, and all customer-facing emails.
            </p>
          </div>

          <Field label="Phone Number">
            <input
              name="contact_phone"
              type="tel"
              defaultValue={s.contact_phone}
              placeholder="(206) 669-1109"
              className={inputCls}
            />
          </Field>

          <Field label="Email Address">
            <input
              name="contact_email"
              type="email"
              defaultValue={s.contact_email}
              placeholder="info@seattleluxurydrive.com"
              className={inputCls}
            />
          </Field>
        </section>

        {/* ── Pricing ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Pricing
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Display rate shown in hero, services section, and FAQ. Enter the number only.
            </p>
          </div>

          <Field label="Starting Hourly Rate (USD)">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-offwhite/60">
                $
              </span>
              <input
                name="starting_rate"
                type="number"
                min="1"
                step="1"
                defaultValue={s.starting_rate}
                placeholder="350"
                className={`${inputCls} pl-8`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-xs text-offwhite/60">
                /hr
              </span>
            </div>
          </Field>
        </section>

        {/* ── Response Time ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Response Time Commitment
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              The &ldquo;within X business hours&rdquo; promise shown on booking, contact, and in emails.
            </p>
          </div>

          <Field label="Response Time (hours)">
            <div className="relative">
              <input
                name="response_hours"
                type="number"
                min="1"
                step="1"
                defaultValue={s.response_hours}
                placeholder="4"
                className={`${inputCls} pr-24`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-xs text-offwhite/60">
                business hrs
              </span>
            </div>
          </Field>

          <p className="font-sans text-[11px] text-offwhite/50">
            Displays as:{" "}
            <span className="font-mono text-offwhite/65">
              within {s.response_hours} business hours
            </span>
          </p>
        </section>

        {/* ── Social Media ── */}
        <section className="border border-offwhite/8 p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Social Media
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Leave blank to hide. Full URL including https://.
            </p>
          </div>

          <Field label="Instagram">
            <input
              name="social_instagram"
              type="url"
              defaultValue={s.social_instagram}
              placeholder="https://instagram.com/seattleluxurydrive"
              className={inputCls}
            />
          </Field>

          <Field label="Facebook">
            <input
              name="social_facebook"
              type="url"
              defaultValue={s.social_facebook}
              placeholder="https://facebook.com/seattleluxurydrive"
              className={inputCls}
            />
          </Field>

          <Field label="X (Twitter)">
            <input
              name="social_x"
              type="url"
              defaultValue={s.social_x}
              placeholder="https://x.com/seattleluxurydrive"
              className={inputCls}
            />
          </Field>

          <Field label="LinkedIn">
            <input
              name="social_linkedin"
              type="url"
              defaultValue={s.social_linkedin}
              placeholder="https://linkedin.com/company/seattleluxurydrive"
              className={inputCls}
            />
          </Field>

          <Field label="YouTube">
            <input
              name="social_youtube"
              type="url"
              defaultValue={s.social_youtube}
              placeholder="https://youtube.com/@seattleluxurydrive"
              className={inputCls}
            />
          </Field>
        </section>

        <button
          type="submit"
          className="bg-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
        >
          Save Settings
        </button>
      </form>

      {/* ── Site Images ── (separate forms — file uploads can't share a form with text fields) */}
      <div className="mt-6 space-y-4">
        <section className="border border-offwhite/8 p-6 space-y-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-1">
              Site Images
            </p>
            <p className="font-sans text-xs text-offwhite/55">
              Uploaded to the <span className="font-mono">site-images</span> bucket. JPEG, PNG, WebP or AVIF · Max 10 MB.
            </p>
          </div>

          <SiteImageSlot
            label="Home Hero Background"
            hint="Full-screen background on the home page hero section."
            settingKey="image_home_hero"
            currentUrl={s.image_home_hero}
          />

          <SiteImageSlot
            label="Seattle / Service Area Photo"
            hint="Shown in the service area section on both the home page and about page."
            settingKey="image_service_area"
            currentUrl={s.image_service_area}
          />

          <SiteImageSlot
            label="About — Brand / Story Photo"
            hint="Shown in the 'Our Story' section on the about page."
            settingKey="image_about_brand"
            currentUrl={s.image_about_brand}
          />

        </section>
      </div>
    </div>
  );
}

function SiteImageSlot({
  label,
  hint,
  settingKey,
  currentUrl,
}: {
  label: string;
  hint: string;
  settingKey: string;
  currentUrl: string;
}) {
  const uploadAction = uploadSiteImage.bind(null, settingKey);
  const removeAction = removeSiteImage.bind(null, settingKey, currentUrl);

  return (
    <div className="border-t border-offwhite/8 pt-5 space-y-3">
      <div>
        <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/75">{label}</p>
        <p className="font-sans text-[11px] text-offwhite/50 mt-0.5">{hint}</p>
      </div>

      {currentUrl ? (
        <div className="flex items-start gap-4">
          <div className="relative w-32 aspect-video overflow-hidden bg-charcoal shrink-0">
            <Image src={currentUrl} alt={label} fill className="object-cover" sizes="128px" />
          </div>
          <div className="flex flex-col gap-2">
            <ImageUploadForm action={uploadAction} className="flex items-center gap-2">
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
            </ImageUploadForm>
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
        <ImageUploadForm action={uploadAction} className="flex items-center gap-3">
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
        </ImageUploadForm>
      )}
    </div>
  );
}
