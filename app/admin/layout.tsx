import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/actions/admin-auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SLD Admin" },
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/contacts", label: "Contact Requests" },
  { href: "/admin/vehicles", label: "Vehicles" },
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
          {NAV.map(({ href, label }) => (
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
            <p className="font-sans text-[10px] text-offwhite/35 truncate mb-3">
              {user.email}
            </p>
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
