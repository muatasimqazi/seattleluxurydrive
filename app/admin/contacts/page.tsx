import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { updateContactStatus } from "@/app/actions/admin-data";
import { ContactNotesForm } from "./contact-notes-form";

export const metadata: Metadata = { title: "Contact Requests" };

const PAGE_SIZE = 25;

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-400/20 text-blue-300",
  resolved: "bg-green-400/20 text-green-300",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest rounded-sm ${
        STATUS_COLORS[status] ?? "bg-offwhite/10 text-offwhite/65"
      }`}
    >
      {status}
    </span>
  );
}

interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  admin_notes: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at?: string;
}

interface Props {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}

function buildHref(base: Record<string, string>, overrides: Record<string, string>) {
  const p = new URLSearchParams({ ...base, ...overrides });
  for (const [k, v] of [...p.entries()]) {
    if (!v) p.delete(k);
  }
  const qs = p.toString();
  return `/admin/contacts${qs ? `?${qs}` : ""}`;
}

export default async function AdminContactsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filterStatus = params.status ?? "";
  const search = params.q?.trim() ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let contacts: ContactRow[] = [];
  let total = 0;

  try {
    const supabase = createServiceClient();
    let query = supabase
      .from("contact_requests")
      .select(
        "id, first_name, last_name, email, phone, message, status, admin_notes, responded_at, created_at, updated_at",
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
    contacts = (data as ContactRow[]) ?? [];
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
    <div className="p-8 max-w-5xl">
      <h1 className="font-heading text-3xl font-light text-offwhite mb-6">
        Contact Requests
      </h1>

      {/* Search + count */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <form method="GET" action="/admin/contacts" className="flex gap-2">
          {filterStatus && (
            <input type="hidden" name="status" value={filterStatus} />
          )}
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search by name or email…"
            className="w-64 bg-offwhite/4 border border-offwhite/10 px-3 py-2 font-sans text-sm text-offwhite/80 placeholder:text-offwhite/35 focus:outline-none focus:border-gold/50 transition-colors"
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
              className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/65 hover:border-offwhite/40 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>
        <p className="font-sans text-xs text-offwhite/50">
          {total} result{total !== 1 ? "s" : ""}
          {search ? ` for "${search}"` : ""}
        </p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href={buildHref({ q: search }, {})}
          className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] border transition-colors ${
            !filterStatus
              ? "border-gold text-gold bg-gold/10"
              : "border-offwhite/20 text-offwhite/65 hover:border-offwhite/40"
          }`}
        >
          All
        </Link>
        {STATUS_OPTIONS.map((s) => (
          <Link
            key={s}
            href={buildHref({ q: search }, { status: s })}
            className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] border transition-colors ${
              filterStatus === s
                ? "border-gold text-gold bg-gold/10"
                : "border-offwhite/20 text-offwhite/65 hover:border-offwhite/40"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Cards */}
      {contacts.length === 0 ? (
        <p className="font-sans text-sm text-offwhite/50 py-12">
          No contact requests
          {filterStatus ? ` with status "${filterStatus}"` : ""}
          {search ? ` matching "${search}"` : ""}.
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => {
            const updateWithId = updateContactStatus.bind(null, c.id);
            return (
              <div key={c.id} className="border border-offwhite/6 bg-charcoal p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-sans text-sm text-offwhite font-medium">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="font-sans text-xs text-offwhite/65 mt-0.5">
                      <a href={`mailto:${c.email}`} className="hover:text-gold transition-colors">
                        {c.email}
                      </a>{" "}
                      ·{" "}
                      <a href={`tel:${c.phone}`} className="hover:text-gold transition-colors">
                        {c.phone}
                      </a>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={c.status} />
                    <p className="font-sans text-[10px] text-offwhite/50 mt-1">
                      {new Date(c.created_at).toLocaleDateString()}
                    </p>
                    {c.responded_at && (
                      <p className="font-sans text-[10px] text-offwhite/35 mt-0.5">
                        Responded {new Date(c.responded_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <p className="font-sans text-sm text-offwhite/85 leading-relaxed whitespace-pre-wrap mb-5 border-l-2 border-offwhite/10 pl-4">
                  {c.message}
                </p>

                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <form key={s} action={updateWithId.bind(null, s)}>
                      <button
                        type="submit"
                        disabled={c.status === s}
                        className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                          c.status === s
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-offwhite/20 text-offwhite/60 hover:border-offwhite/40 hover:text-offwhite/85"
                        }`}
                      >
                        {s}
                      </button>
                    </form>
                  ))}
                </div>

                <ContactNotesForm contactId={c.id} initialNotes={c.admin_notes} />
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-xs text-offwhite/50">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={buildHref(baseParams, { page: String(page - 1) })}
                className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/65 hover:border-offwhite/40 hover:text-offwhite transition-colors"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildHref(baseParams, { page: String(page + 1) })}
                className="px-4 py-2 border border-offwhite/20 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/65 hover:border-offwhite/40 hover:text-offwhite transition-colors"
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
