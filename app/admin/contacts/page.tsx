import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";
import { updateContactStatus } from "@/app/actions/admin-data";

export const metadata: Metadata = { title: "Contact Requests" };

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-400/20 text-blue-300",
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

interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export default async function AdminContactsPage() {
  let contacts: ContactRow[] = [];

  try {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("contact_requests")
      .select("id, first_name, last_name, email, phone, message, status, created_at, updated_at")
      .order("created_at", { ascending: false });
    contacts = (data as ContactRow[]) ?? [];
  } catch {
    // Supabase not connected
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="font-heading text-3xl font-light text-offwhite mb-8">
        Contact Requests
      </h1>

      {contacts.length === 0 ? (
        <p className="font-sans text-sm text-offwhite/30 py-12">
          No contact requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => {
            const updateWithId = updateContactStatus.bind(null, c.id);
            return (
              <div
                key={c.id}
                className="border border-offwhite/[0.06] bg-charcoal p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-sans text-sm text-offwhite font-medium">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="font-sans text-xs text-offwhite/50 mt-0.5">
                      <a
                        href={`mailto:${c.email}`}
                        className="hover:text-gold transition-colors"
                      >
                        {c.email}
                      </a>{" "}
                      ·{" "}
                      <a
                        href={`tel:${c.phone}`}
                        className="hover:text-gold transition-colors"
                      >
                        {c.phone}
                      </a>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={c.status} />
                    <p className="font-sans text-[10px] text-offwhite/30 mt-1">
                      {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="font-sans text-sm text-offwhite/70 leading-relaxed whitespace-pre-wrap mb-5 border-l-2 border-offwhite/10 pl-4">
                  {c.message}
                </p>

                {/* Status update */}
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <form key={s} action={updateWithId.bind(null, s)}>
                      <button
                        type="submit"
                        disabled={c.status === s}
                        className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.1em] border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                          c.status === s
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-offwhite/20 text-offwhite/40 hover:border-offwhite/40 hover:text-offwhite/70"
                        }`}
                      >
                        {s}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
