"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";

async function assertAdmin() {
  const role = await getCurrentUserRole();
  if (role !== "admin") throw new Error("Forbidden");
}

export async function inviteUser(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await assertAdmin();

  const email = (formData.get("email") as string)?.trim().toLowerCase() ?? "";
  const role = (formData.get("role") as string) ?? "staff";

  if (!email) return { error: "Email is required." };
  if (!["admin", "staff"].includes(role)) return { error: "Invalid role." };

  const supabase = createServiceClient();
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

  if (error) return { error: error.message };

  if (data.user) {
    await supabase
      .from("profiles")
      .upsert({ id: data.user.id, role }, { onConflict: "id" });
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function setUserRole(userId: string, role: "admin" | "staff") {
  await assertAdmin();

  const supabase = createServiceClient();
  await supabase
    .from("profiles")
    .upsert({ id: userId, role }, { onConflict: "id" });

  revalidatePath("/admin/users");
}

export async function removeUser(userId: string) {
  await assertAdmin();

  const supabase = createServiceClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}
