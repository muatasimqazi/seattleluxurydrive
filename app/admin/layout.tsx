import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SJD Admin" },
  robots: { index: false, follow: false },
};

const NAV_ALL = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/contacts", label: "Contact Requests" },
  { href: "/admin/vehicles", label: "Vehicles" },
];

const NAV_ADMIN_ONLY = [
  { href: "/admin/users", label: "Team" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login and accept-invite pages render without the shell
  if (!user) {
    return <>{children}</>;
  }

  const role = await getCurrentUserRole();
  const isAdmin = role === "admin";
  const nav = isAdmin ? [...NAV_ALL, ...NAV_ADMIN_ONLY] : NAV_ALL;

  return (
    <div className="min-h-screen bg-black lg:flex">
      <AdminSidebar nav={nav} email={user.email ?? ""} role={role} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
