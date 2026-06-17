"use client";

import { useActionState } from "react";
import { updateBookingNotes } from "@/app/actions/admin-data";

export function AdminNotesForm({
  bookingId,
  initialNotes,
}: {
  bookingId: string;
  initialNotes: string | null;
}) {
  const action = updateBookingNotes.bind(null, bookingId);
  const [state, formAction, pending] = useActionState(action, { saved: false });

  return (
    <section className="border-t border-offwhite/[0.06] pt-8 mt-2">
      <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-lt mb-4">
        Internal Notes
      </p>
      <form action={formAction} className="space-y-3">
        <textarea
          name="admin_notes"
          defaultValue={initialNotes ?? ""}
          rows={4}
          placeholder="Add internal notes visible only to admin…"
          className="w-full bg-offwhite/[0.04] border border-offwhite/10 px-4 py-3 font-sans text-sm text-offwhite/80 placeholder:text-offwhite/20 resize-y focus:outline-none focus:border-gold/50 transition-colors"
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 bg-gold font-sans text-[10px] uppercase tracking-[0.15em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save Notes"}
          </button>
          {state.saved && !pending && (
            <span className="font-sans text-[10px] text-green-400 uppercase tracking-[0.1em]">
              Saved
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
