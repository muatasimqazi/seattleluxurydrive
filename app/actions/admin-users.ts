"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";
import InviteEmail from "@/emails/InviteEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Generate the invite link without Supabase auto-sending its default email
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/admin/accept-invite`,
    },
  });

  if (error) return { error: error.message };

  const user = data.user;
  const inviteLink = data.properties?.action_link;

  if (!inviteLink) return { error: "Failed to generate invite link." };

  // Persist the role before the invite is accepted
  if (user) {
    await supabase
      .from("profiles")
      .upsert({ id: user.id, role }, { onConflict: "id" });
  }

  // Send branded invite email via Resend
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "notifications@seattleluxurydrive.com";

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "You've been invited to join Seattle Luxury Drive",
    react: InviteEmail({ email, role: role as "admin" | "staff", inviteLink }),
  });

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
