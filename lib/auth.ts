import { cache } from "react";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type UserRole = "admin" | "staff";

export const getCurrentUserRole = cache(async (): Promise<UserRole | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const service = createServiceClient();
    const { data } = await service
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return (data?.role as UserRole) ?? null;
  } catch {
    return null;
  }
});

export async function requireAdmin(): Promise<void> {
  const role = await getCurrentUserRole();
  if (role !== "admin") {
    redirect("/admin?blocked=1");
  }
}
