import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Bookings" };

const PAGE_SIZE = 25;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-400/20 text-blue-300",
  confirmed: "bg-green-400/20 text-green-300",
  cancelled: "bg-red-400/20 text-red-300",
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
  phone: string;
  service_type: string;
  rental_type: string;
  start_date: string;
  pickup_location: string;
  status: string;
  created_at: string;
}

interface Props {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}

const ALL_STATUSES = ["new", "contacted", "confirmed", "cancelled"];

function buildHref(base: Record<string, string>, overrides: Record<string, string>) {
  const p = new URLSearchParams({ ...base, ...overrides });
  // Remove empty values
  for (const [k, v] of [...p.entries()]) {
    if (!v) p.delete(k);
  }
  const qs = p.toString();
  return `/admin/bookings${qs ? `?${qs}` : ""}`;
}

export default async function AdminBookingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filterStatus = params.status ?? "";
  const search = params.q?.trim() ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let bookings: BookingRow[] = [];
  let total = 0;

  try {
    const supabase = createServiceClient();
    let query = supabase
      .from("booking_requests")
      .select(
        "id, first_name, last_name, email, phone, service_type, rental_type, start_date, pickup_location, status, created_at",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (filterStatus) {
      query = query.eq("status", filterStatus);
    }

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data, count } = await query;
    bookings = (data as BookingRow[]) ?? [];
    total = count ?? 0;
  } catch {
    // Supabase not connected
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const baseParams = {
    ...(filterStatus ? { status: filterStatus } : {}),
    ...(search ? { q: search } : {}),
  };

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-light text-offwhite mb-6">
        Booking Requests
      </h1>

      {/* Search + filters row */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <form method="GET" action="/admin/bookings" className="flex gap-2">
          {filterStatus && (
            <input type="hidden" name="status" value={filterStatus} />
          )}
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search by name or email…"
            className="w-64 bg-offwhite/4 border border-offwhite/10 px-3 py-2 font-sans text-sm text-offwhite/80 placeholder:text-offwhite/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gold font-sans text-[10px] uppercase tracking-[0.15em] text-black hover:bg-gold-lt transition-colors"
          >
            Search
          </button>
          {search && (
            <Link
              href={buildHref({ status: filterStatus }, {})}
              className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50 hover:border-offwhite/40 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Result count */}
        <p className="font-sans text-xs text-offwhite/30">
          {total} result{total !== 1 ? "s" : ""}
          {search ? ` for "${search}"` : ""}
        </p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={buildHref({ q: search }, {})}
          className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] border transition-colors ${
            !filterStatus
              ? "border-gold text-gold bg-gold/10"
              : "border-offwhite/20 text-offwhite/50 hover:border-offwhite/40"
          }`}
        >
          All
        </Link>
        {ALL_STATUSES.map((s) => (
          <Link
            key={s}
            href={buildHref({ q: search }, { status: s })}
            className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] border transition-colors ${
              filterStatus === s
                ? "border-gold text-gold bg-gold/10"
                : "border-offwhite/20 text-offwhite/50 hover:border-offwhite/40"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Table */}
      {bookings.length === 0 ? (
        <p className="font-sans text-sm text-offwhite/30 py-12">
          No booking requests
          {filterStatus ? ` with status "${filterStatus}"` : ""}
          {search ? ` matching "${search}"` : ""}.
        </p>
      ) : (
        <div className="border border-offwhite/[0.06] overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-charcoal border-b border-offwhite/[0.06]">
              <tr>
                {["Name", "Contact", "Service", "Rental", "Date", "Pickup", "Status", "Received"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-sans text-[9px] uppercase tracking-[0.2em] text-offwhite/30 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite/[0.04]">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-offwhite/2 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="font-sans text-sm text-offwhite hover:text-gold transition-colors"
                    >
                      {b.first_name} {b.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-sans text-xs text-offwhite/60">{b.email}</div>
                    <div className="font-sans text-xs text-offwhite/40">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-offwhite/60 whitespace-nowrap">
                    {b.service_type}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-offwhite/60 whitespace-nowrap">
                    {b.rental_type}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-offwhite/60 whitespace-nowrap">
                    {b.start_date}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-offwhite/60 max-w-[180px] truncate">
                    {b.pickup_location}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 font-sans text-xs text-offwhite/35 whitespace-nowrap">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-xs text-offwhite/30">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={buildHref(baseParams, { page: String(page - 1) })}
                className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50 hover:border-offwhite/40 hover:text-offwhite transition-colors"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildHref(baseParams, { page: String(page + 1) })}
                className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50 hover:border-offwhite/40 hover:text-offwhite transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
