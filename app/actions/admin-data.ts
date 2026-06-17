"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: string): Promise<void> {
  const VALID = ["new", "contacted", "confirmed", "cancelled"];
  if (!VALID.includes(status)) throw new Error("Invalid status");

  const supabase = createServiceClient();
  await supabase
    .from("booking_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
}

export async function updateContactStatus(id: string, status: string): Promise<void> {
  const VALID = ["new", "contacted", "resolved"];
  if (!VALID.includes(status)) throw new Error("Invalid status");

  const supabase = createServiceClient();
  await supabase
    .from("contact_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/contacts");
}
