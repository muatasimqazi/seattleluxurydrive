"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

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

export async function createVehicle(formData: FormData) {
  const supabase = await createServiceClient();
  const fields = parseVehicleForm(formData);

  const { data, error } = await supabase
    .from("vehicles")
    .insert(fields)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${data.id}/edit?saved=1`);
}

export async function updateVehicle(id: string, formData: FormData) {
  const supabase = await createServiceClient();
  const { slug: _slug, ...fields } = parseVehicleForm(formData);

  const { error } = await supabase
    .from("vehicles")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
  redirect(`/admin/vehicles/${id}/edit?saved=1`);
}

export async function setVehicleStatus(id: string, status: "active" | "archived") {
  const supabase = await createServiceClient();
  await supabase.from("vehicles").update({ status }).eq("id", id);
  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
}

export async function setVehicleFeatured(id: string, featured: boolean) {
  const supabase = await createServiceClient();
  await supabase.from("vehicles").update({ featured }).eq("id", id);
  revalidatePath("/admin/vehicles");
  revalidatePath("/fleet", "layout");
}
