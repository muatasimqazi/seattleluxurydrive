"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";

async function assertTeamMember() {
  const role = await getCurrentUserRole();
  if (role !== "admin" && role !== "staff") throw new Error("Forbidden");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseVehicleForm(formData: FormData) {
  const get = (k: string) => (formData.get(k) as string)?.trim() ?? "";
  const name = get("name");
  const year = parseInt(get("year"), 10);
  const make = get("make");
  const model = get("model");
  const slug = get("slug") || slugify(`${year}-${make}-${model}`);
  const description = get("description") || null;
  const starting_hourly_rate = parseFloat(get("starting_hourly_rate")) || null;
  const chauffeur_available = formData.get("chauffeur_available") === "on";
  const featured = formData.get("featured") === "on";
  const status = get("status") || "active";

  return { name, year, make, model, slug, description, starting_hourly_rate, chauffeur_available, featured, status };
}

export async function createVehicle(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  await assertTeamMember();
  const supabase = createServiceClient();
  const fields = parseVehicleForm(formData);

  const { data, error } = await supabase
    .from("vehicles")
    .insert(fields)
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${data.id}/edit?saved=1`);
  return {};
}

export async function updateVehicle(id: string, formData: FormData) {
  await assertTeamMember();
  const supabase = createServiceClient();
  const { slug: _, ...fields } = parseVehicleForm(formData);

  const { error } = await supabase
    .from("vehicles")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${id}/edit?saved=1`);
}

export async function uploadVehicleImage(vehicleId: string, formData: FormData) {
  await assertTeamMember();
  const supabase = createServiceClient();
  const file = formData.get("image") as File;
  const altText = (formData.get("alt_text") as string)?.trim() || null;

  if (!file || file.size === 0) throw new Error("No file provided");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${vehicleId}/${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("vehicle")
    .upload(path, bytes, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from("vehicle").getPublicUrl(path);

  const { data: last } = await supabase
    .from("vehicle_images")
    .select("sort_order")
    .eq("vehicle_id", vehicleId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("vehicle_images").insert({
    vehicle_id: vehicleId,
    image_url: publicUrl,
    alt_text: altText,
    sort_order: last ? last.sort_order + 1 : 0,
  });

  revalidatePath(`/admin/vehicles/${vehicleId}/edit`);
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${vehicleId}/edit?uploaded=1`);
}

export async function deleteVehicleImage(imageId: string, vehicleId: string, imageUrl: string) {
  await assertTeamMember();
  const supabase = createServiceClient();

  try {
    const storagePath = decodeURIComponent(
      new URL(imageUrl).pathname.split("/public/vehicle/")[1] ?? ""
    );
    if (storagePath) {
      await supabase.storage.from("vehicle").remove([storagePath]);
    }
  } catch {
    // If path extraction fails, still remove the DB record
  }

  await supabase.from("vehicle_images").delete().eq("id", imageId);

  revalidatePath(`/admin/vehicles/${vehicleId}/edit`);
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${vehicleId}/edit`);
}

export async function setVehicleStatus(id: string, status: "active" | "archived") {
  await assertTeamMember();
  const supabase = createServiceClient();
  await supabase.from("vehicles").update({ status }).eq("id", id);
  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
}

export async function setVehicleFeatured(id: string, featured: boolean) {
  await assertTeamMember();
  const supabase = createServiceClient();
  await supabase.from("vehicles").update({ featured }).eq("id", id);
  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
}
