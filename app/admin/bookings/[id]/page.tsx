import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { updateBookingStatus } from "@/app/actions/admin-data";
import { AdminNotesForm } from "./notes-form";

export const metadata: Metadata = { title: "Booking Detail" };

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-400/20 text-blue-300",
  confirmed: "bg-green-400/20 text-green-300",
  cancelled: "bg-red-400/20 text-red-300",
};

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-6 py-3 border-b border-offwhite/[0.06]">
      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/35 w-40 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="font-sans text-sm text-offwhite/80">{value}</span>
    </div>
  );
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;

  let booking: Record<string, string | null> | null = null;

  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("booking_requests")
      .select("*")
      .eq("id", id)
      .single();
    booking = data;
  } catch {
    // Supabase not connected
  }

  if (!booking) notFound();

  const updateWithId = updateBookingStatus.bind(null, id);

  return (
    <div className="p-8 max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/40 hover:text-gold transition-colors mb-8"
      >
        ← All Bookings
      </Link>

      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-light text-offwhite">
            {booking.first_name} {booking.last_name}
          </h1>
          <p className="font-sans text-xs text-offwhite/35 mt-1">ID: {id}</p>
        </div>

        {/* Status badge */}
        <span
          className={`shrink-0 inline-block px-3 py-1 font-sans text-[10px] uppercase tracking-[0.1em] rounded-sm ${
            STATUS_COLORS[booking.status ?? "new"] ?? "bg-offwhite/10 text-offwhite/50"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Contact */}
      <section className="mb-8">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
          Contact
        </p>
        <DetailRow label="Email" value={booking.email} />
        <DetailRow label="Phone" value={booking.phone} />
        <DetailRow label="Contact Via" value={booking.preferred_contact_method} />
      </section>

      {/* Trip */}
      <section className="mb-8">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
          Trip Details
        </p>
        <DetailRow label="Service Type" value={booking.service_type} />
        <DetailRow label="Rental Type" value={booking.rental_type} />
        <DetailRow label="Start Date" value={booking.start_date} />
        <DetailRow label="Start Time" value={booking.start_time} />
        <DetailRow label="End Date" value={booking.end_date} />
        <DetailRow
          label="Est. Hours"
          value={booking.estimated_hours ? String(booking.estimated_hours) : null}
        />
        <DetailRow label="Pickup" value={booking.pickup_location} />
        <DetailRow label="Dropoff" value={booking.dropoff_location} />
      </section>

      {/* Optional */}
      {(booking.occasion || booking.special_requests) && (
        <section className="mb-8">
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Additional
          </p>
          <DetailRow label="Occasion" value={booking.occasion} />
          {booking.special_requests && (
            <div className="py-3 border-b border-offwhite/[0.06]">
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/35 block mb-2">
                Special Requests
              </span>
              <p className="font-sans text-sm text-offwhite/80 whitespace-pre-wrap">
                {booking.special_requests}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Meta */}
      <section className="mb-10">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
          Record
        </p>
        <DetailRow
          label="Received"
          value={
            booking.created_at
              ? new Date(booking.created_at).toLocaleString()
              : null
          }
        />
        <DetailRow
          label="Updated"
          value={
            booking.updated_at
              ? new Date(booking.updated_at).toLocaleString()
              : null
          }
        />
      </section>

      {/* Status update */}
      <section className="border-t border-offwhite/[0.06] pt-8">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
          Update Status
        </p>
        <div className="flex flex-wrap gap-3">
          {STATUS_OPTIONS.map((s) => (
            <form key={s} action={updateWithId.bind(null, s)}>
              <button
                type="submit"
                disabled={booking.status === s}
                className={`px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.15em] border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  booking.status === s
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-offwhite/20 text-offwhite/50 hover:border-offwhite/40 hover:text-offwhite"
                }`}
              >
                {s}
              </button>
            </form>
          ))}
        </div>
      </section>

      <AdminNotesForm bookingId={id} initialNotes={booking.admin_notes ?? null} />
    </div>
  );
}
