"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";

const BUCKET = "site-images";

export async function uploadSiteImage(key: string, formData: FormData) {
  const role = await getCurrentUserRole();
  if (role !== "admin") throw new Error("Forbidden");

  const supabase = createServiceClient();
  const file = formData.get("image") as File;

  if (!file || file.size === 0) throw new Error("No file provided");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${key}/${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);

  await supabase
    .from("site_settings")
    .upsert({ key, value: publicUrl }, { onConflict: "key" });

  revalidatePath("/", "layout");
  revalidatePath("/about");
  redirect("/admin/settings?saved=1");
}

export async function removeSiteImage(key: string, imageUrl: string) {
  const role = await getCurrentUserRole();
  if (role !== "admin") throw new Error("Forbidden");

  const supabase = createServiceClient();

  try {
    const storagePath = decodeURIComponent(
      new URL(imageUrl).pathname.split(`/public/${BUCKET}/`)[1] ?? ""
    );
    if (storagePath) {
      await supabase.storage.from(BUCKET).remove([storagePath]);
    }
  } catch {
    // If path extraction fails, still clear the setting
  }

  await supabase
    .from("site_settings")
    .upsert({ key, value: "" }, { onConflict: "key" });

  revalidatePath("/", "layout");
  revalidatePath("/about");
  redirect("/admin/settings?saved=1");
}
