import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const SETTING_DEFAULTS: Record<string, string> = {
  hours_days: "Mo-Su",
  hours_open: "07:00",
  hours_close: "22:00",
  contact_phone: "(206) 669-1109",
  contact_email: "info@seattleluxurydrive.com",
  starting_rate: "350",
  response_hours: "4",
};

// cache() deduplicates per-request — layout + page share one DB round-trip
export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    const fromDb = Object.fromEntries(
      (data ?? []).map((r: { key: string; value: string }) => [r.key, r.value])
    );
    return { ...SETTING_DEFAULTS, ...fromDb };
  } catch {
    return { ...SETTING_DEFAULTS };
  }
});

export function phoneHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
