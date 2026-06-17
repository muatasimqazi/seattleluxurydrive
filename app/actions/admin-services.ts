"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";

const BUCKET = "site-images";

async function assertAdmin() {
  const role = await getCurrentUserRole();
  if (role !== "admin") throw new Error("Forbidden");
}

export async function updateService(id: string, formData: FormData) {
  await assertAdmin();

  const supabase = createServiceClient();

  const benefitsRaw = (formData.get("benefits") as string) ?? "";
  const benefits = benefitsRaw
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  await supabase
    .from("services")
    .update({
      eyebrow: formData.get("eyebrow") as string,
      name: formData.get("name") as string,
      headline: formData.get("headline") as string,
      description: formData.get("description") as string,
      benefits,
      cta: formData.get("cta") as string,
      sort_order: parseInt(formData.get("sort_order") as string, 10),
      status: formData.get("status") as string,
    })
    .eq("id", id);

  revalidatePath("/services");
  redirect(`/admin/services/${id}/edit?saved=1`);
}

export async function uploadServiceImage(serviceId: string, formData: FormData) {
  await assertAdmin();

  const supabase = createServiceClient();
  const file = formData.get("image") as File;

  if (!file || file.size === 0) throw new Error("No file provided");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `services/${serviceId}/${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const { data: existing } = await supabase
    .from("services")
    .select("image_url")
    .eq("id", serviceId)
    .single();

  if (existing?.image_url) {
    try {
      const oldPath = decodeURIComponent(
        new URL(existing.image_url).pathname.split(`/public/${BUCKET}/`)[1] ?? ""
      );
      if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath]);
    } catch { /* ignore stale path */ }
  }

  await supabase
    .from("services")
    .update({ image_url: publicUrl })
    .eq("id", serviceId);

  revalidatePath("/services");
  redirect(`/admin/services/${serviceId}/edit?uploaded=1`);
}

export async function removeServiceImage(serviceId: string, imageUrl: string) {
  await assertAdmin();

  const supabase = createServiceClient();

  try {
    const storagePath = decodeURIComponent(
      new URL(imageUrl).pathname.split(`/public/${BUCKET}/`)[1] ?? ""
    );
    if (storagePath) await supabase.storage.from(BUCKET).remove([storagePath]);
  } catch { /* ignore */ }

  await supabase
    .from("services")
    .update({ image_url: "" })
    .eq("id", serviceId);

  revalidatePath("/services");
  redirect(`/admin/services/${serviceId}/edit?saved=1`);
}
