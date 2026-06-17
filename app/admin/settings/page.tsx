import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "@/app/actions/admin-settings";

export const metadata: Metadata = { title: "Settings" };

const DAYS_OPTIONS = [
  { value: "Mo-Su", label: "Every day (Mo–Su)" },
  { value: "Mo-Fr", label: "Weekdays only (Mo–Fr)" },
  { value: "Mo-Sa", label: "Monday to Saturday (Mo–Sa)" },
];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["hours_days", "hours_open", "hours_close"]);

  const s = Object.fromEntries(
    (data ?? []).map((r: { key: string; value: string }) => [r.key, r.value])
  );

  const hoursDays  = s.hours_days  ?? "Mo-Su";
  const hoursOpen  = s.hours_open  ?? "07:00";
  const hoursClose = s.hours_close ?? "22:00";

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-heading text-2xl font-light text-offwhite mb-1">Settings</h1>
      <p className="font-sans text-xs text-offwhite/40 mb-8">
        Site configuration managed by admin.
      </p>

      {saved && (
        <div className="flex items-center gap-2 mb-6 border border-gold/30 bg-gold/5 px-4 py-3">
          <CheckCircle size={14} strokeWidth={1.5} className="text-gold shrink-0" />
          <p className="font-sans text-xs text-gold">Settings saved successfully.</p>
        </div>
      )}

      <form action={updateSettings} className="space-y-6">
        {/* Business Hours */}
        <div className="border border-offwhite/[0.08] p-6 space-y-5">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt mb-4">
              Business Hours
            </p>
            <p className="font-sans text-xs text-offwhite/40">
              Shown in Google search results via the LocalBusiness schema.
            </p>
          </div>

          {/* Days */}
          <div>
            <label
              htmlFor="hours_days"
              className="block font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2"
            >
              Operating Days
            </label>
            <select
              id="hours_days"
              name="hours_days"
              defaultValue={hoursDays}
              className="w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
            >
              {DAYS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-charcoal">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Open / Close */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="hours_open"
                className="block font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2"
              >
                Opens
              </label>
              <input
                id="hours_open"
                name="hours_open"
                type="time"
                defaultValue={hoursOpen}
                className="w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="hours_close"
                className="block font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2"
              >
                Closes
              </label>
              <input
                id="hours_close"
                name="hours_close"
                type="time"
                defaultValue={hoursClose}
                className="w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Preview */}
          <p className="font-sans text-[11px] text-offwhite/35">
            Schema value: <span className="text-offwhite/60 font-mono">{hoursDays} {hoursOpen}–{hoursClose}</span>
          </p>
        </div>

        <button
          type="submit"
          className="bg-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
