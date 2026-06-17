"use client";

import { useActionState } from "react";
import { updateContactNotes } from "@/app/actions/admin-data";

export function ContactNotesForm({
  contactId,
  initialNotes,
}: {
  contactId: string;
  initialNotes: string | null;
}) {
  const action = updateContactNotes.bind(null, contactId);
  const [state, formAction, pending] = useActionState(action, { saved: false });

  return (
    <form action={formAction} className="mt-5 pt-5 border-t border-offwhite/6 space-y-3">
      <textarea
        name="admin_notes"
        defaultValue={initialNotes ?? ""}
        rows={2}
        placeholder="Internal notes…"
        className="w-full bg-offwhite/4 border border-offwhite/10 px-3 py-2 font-sans text-xs text-offwhite/80 placeholder:text-offwhite/20 resize-y focus:outline-none focus:border-gold/50 transition-colors"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-1.5 bg-gold font-sans text-[10px] uppercase tracking-[0.15em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50"
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
  );
}
