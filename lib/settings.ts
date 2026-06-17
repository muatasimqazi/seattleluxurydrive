import { createClient } from "@/lib/supabase/server";
export { phoneHref } from "@/lib/utils";

export const SETTING_DEFAULTS: Record<string, string> = {
  site_name: "Seattle Luxury Drive",
  site_address: "14723 Aurora Ave N, Shoreline, WA 98133",
  hours_days: "Mo-Su",
  hours_open: "07:00",
  hours_close: "22:00",
  contact_phone: "(206) 669-1109",
  contact_email: "info@seattleluxurydrive.com",
  starting_rate: "350",
  response_hours: "4",
};

export async function getSettings(): Promise<Record<string, string>> {
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
}

