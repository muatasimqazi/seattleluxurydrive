import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/actions/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SLD Admin" },
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

  const role = await getCurrentUserRole();
  const isAdmin = role === "admin";
  const nav = isAdmin ? [...NAV_ALL, ...NAV_ADMIN_ONLY] : NAV_ALL;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-charcoal border-r border-offwhite/6 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-offwhite/6">
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
            SLD Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2.5 font-sans text-xs text-offwhite/60 hover:text-offwhite hover:bg-offwhite/4 transition-colors rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="px-6 py-5 border-t border-offwhite/6">
          {user && (
            <>
              <p className="font-sans text-[10px] text-offwhite/35 truncate mb-1">
                {user.email}
              </p>
              {role && (
                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-offwhite/20 mb-3">
                  {role}
                </p>
              )}
            </>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/40 hover:text-gold transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
