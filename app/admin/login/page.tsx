"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { signIn } from "@/app/actions/admin-auth";

const INITIAL = { status: "idle" as const };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, INITIAL);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
            Seattle Luxury Drive
          </p>
          <h1 className="font-heading text-3xl font-light text-offwhite">
            Admin Login
          </h1>
        </div>

        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/65 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full bg-transparent border border-offwhite/20 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/65 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-transparent border border-offwhite/20 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {state.status === "error" && (
            <div className="flex items-center gap-2 border border-red-400/30 bg-red-400/5 px-4 py-3">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="font-sans text-sm text-red-300">{state.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gold py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
