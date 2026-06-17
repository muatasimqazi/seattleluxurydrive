import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-charcoal border border-offwhite/[0.06] p-6 hover:border-gold/30 transition-colors"
    >
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40 mb-2">
        {label}
      </p>
      <p className="font-heading text-4xl font-light text-offwhite">{value}</p>
    </Link>
  );
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-400/20 text-blue-300",
  confirmed: "bg-green-400/20 text-green-300",
  cancelled: "bg-red-400/20 text-red-300",
  resolved: "bg-green-400/20 text-green-300",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] rounded-sm ${
        STATUS_COLORS[status] ?? "bg-offwhite/10 text-offwhite/50"
      }`}
    >
      {status}
    </span>
  );
}

interface BookingRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  start_date: string;
  status: string;
  created_at: string;
}

interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
}

export default async function AdminDashboardPage() {
  let newBookings = 0;
  let newContacts = 0;
  let recentBookings: BookingRow[] = [];
  let recentContacts: ContactRow[] = [];

  try {
    const supabase = await createServiceClient();

    const [
      { count: bCount },
      { count: cCount },
      { data: bookings },
      { data: contacts },
    ] = await Promise.all([
      supabase
        .from("booking_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("contact_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("booking_requests")
        .select("id, first_name, last_name, email, service_type, start_date, status, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("contact_requests")
        .select("id, first_name, last_name, email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    newBookings = bCount ?? 0;
    newContacts = cCount ?? 0;
    recentBookings = (bookings as BookingRow[]) ?? [];
    recentContacts = (contacts as ContactRow[]) ?? [];
  } catch {
    // Supabase not connected — show empty state
  }

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="font-heading text-3xl font-light text-offwhite mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm">
        <StatCard label="New Bookings" value={newBookings} href="/admin/bookings" />
        <StatCard label="New Contacts" value={newContacts} href="/admin/contacts" />
      </div>

      {/* Recent bookings */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40">
            Recent Booking Requests
          </h2>
          <Link
            href="/admin/bookings"
            className="font-sans text-[10px] uppercase tracking-[0.15em] text-gold hover:text-gold-lt transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="font-sans text-sm text-offwhite/30 py-8">No booking requests yet.</p>
        ) : (
          <div className="border border-offwhite/[0.06] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-charcoal border-b border-offwhite/[0.06]">
                <tr>
                  {["Name", "Email", "Service", "Date", "Status", "Received"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-sans text-[9px] uppercase tracking-[0.2em] text-offwhite/30"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-offwhite/[0.04]">
                {recentBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-offwhite/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="font-sans text-sm text-offwhite hover:text-gold transition-colors"
                      >
                        {b.first_name} {b.last_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-offwhite/60">
                      {b.email}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-offwhite/60">
                      {b.service_type}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-offwhite/60">
                      {b.start_date}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-offwhite/35">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent contacts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40">
            Recent Contact Requests
          </h2>
          <Link
            href="/admin/contacts"
            className="font-sans text-[10px] uppercase tracking-[0.15em] text-gold hover:text-gold-lt transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="font-sans text-sm text-offwhite/30 py-8">No contact requests yet.</p>
        ) : (
          <div className="border border-offwhite/[0.06] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-charcoal border-b border-offwhite/[0.06]">
                <tr>
                  {["Name", "Email", "Status", "Received"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-sans text-[9px] uppercase tracking-[0.2em] text-offwhite/30"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-offwhite/[0.04]">
                {recentContacts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-offwhite/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 font-sans text-sm text-offwhite">
                      {c.first_name} {c.last_name}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-offwhite/60">
                      {c.email}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-offwhite/35">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
