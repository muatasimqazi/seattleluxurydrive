"use client";

import { useActionState } from "react";
import { inviteUser } from "@/app/actions/admin-users";

export function InviteForm() {
  const [state, formAction, pending] = useActionState(inviteUser, {});

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50 mb-2">
          Email
        </p>
        <input
          type="email"
          name="email"
          required
          placeholder="staff@example.com"
          className="w-64 bg-black/40 border border-offwhite/15 px-3 py-2.5 font-sans text-sm text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/50 mb-2">
          Role
        </p>
        <select
          name="role"
          defaultValue="staff"
          className="bg-black/40 border border-offwhite/15 px-3 py-2.5 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2.5 bg-gold font-sans text-[11px] uppercase tracking-[0.18em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send Invite"}
      </button>
      {state.success && !pending && (
        <p className="font-sans text-xs text-green-400">Invite sent.</p>
      )}
      {state.error && !pending && (
        <p className="font-sans text-xs text-red-400">{state.error}</p>
      )}
    </form>
  );
}
