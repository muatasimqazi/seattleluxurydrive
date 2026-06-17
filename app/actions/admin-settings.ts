"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const get = (key: string) => (formData.get(key) as string)?.trim() ?? "";

  const supabase = await createServiceClient();

  await supabase.from("site_settings").upsert(
    [
      { key: "hours_days",     value: get("hours_days")     || "Mo-Su" },
      { key: "hours_open",     value: get("hours_open")     || "07:00" },
      { key: "hours_close",    value: get("hours_close")    || "22:00" },
      { key: "contact_phone",  value: get("contact_phone")  },
      { key: "contact_email",  value: get("contact_email")  },
      { key: "starting_rate",  value: get("starting_rate")  },
      { key: "response_hours", value: get("response_hours") },
    ],
    { onConflict: "key" }
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
