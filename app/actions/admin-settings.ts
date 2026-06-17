"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const hoursDays  = (formData.get("hours_days")  as string)?.trim() ?? "Mo-Su";
  const hoursOpen  = (formData.get("hours_open")  as string)?.trim() ?? "07:00";
  const hoursClose = (formData.get("hours_close") as string)?.trim() ?? "22:00";

  const supabase = await createServiceClient();

  await supabase.from("site_settings").upsert(
    [
      { key: "hours_days",  value: hoursDays  },
      { key: "hours_open",  value: hoursOpen  },
      { key: "hours_close", value: hoursClose },
    ],
    { onConflict: "key" }
  );

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
