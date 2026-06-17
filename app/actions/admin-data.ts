"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: string): Promise<void> {
  const VALID = ["new", "contacted", "confirmed", "cancelled"];
  if (!VALID.includes(status)) throw new Error("Invalid status");

  const supabase = createServiceClient();

  // Fetch current status to decide whether to set responded_at
  const { data: current } = await supabase
    .from("booking_requests")
    .select("status, responded_at")
    .eq("id", id)
    .single();

  const now = new Date().toISOString();
  const setRespondedAt =
    current?.status === "new" && status !== "new" && !current?.responded_at;

  await supabase
    .from("booking_requests")
    .update({
      status,
      updated_at: now,
      ...(setRespondedAt ? { responded_at: now } : {}),
    })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
}

export async function updateBookingNotes(
  id: string,
  _prevState: { saved: boolean },
  formData: FormData
): Promise<{ saved: boolean }> {
  const notes = (formData.get("admin_notes") as string)?.trim() ?? "";
  const supabase = createServiceClient();
  await supabase
    .from("booking_requests")
    .update({ admin_notes: notes || null, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath(`/admin/bookings/${id}`);
  return { saved: true };
}

export async function updateContactStatus(id: string, status: string): Promise<void> {
  const VALID = ["new", "contacted", "resolved"];
  if (!VALID.includes(status)) throw new Error("Invalid status");

  const supabase = createServiceClient();

  const { data: current } = await supabase
    .from("contact_requests")
    .select("status, responded_at")
    .eq("id", id)
    .single();

  const now = new Date().toISOString();
  const setRespondedAt =
    current?.status === "new" && status !== "new" && !current?.responded_at;

  await supabase
    .from("contact_requests")
    .update({
      status,
      updated_at: now,
      ...(setRespondedAt ? { responded_at: now } : {}),
    })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/contacts");
}

export async function updateContactNotes(
  id: string,
  _prevState: { saved: boolean },
  formData: FormData
): Promise<{ saved: boolean }> {
  const notes = (formData.get("admin_notes") as string)?.trim() ?? "";
  const supabase = createServiceClient();
  await supabase
    .from("contact_requests")
    .update({ admin_notes: notes || null, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin/contacts");
  return { saved: true };
}
