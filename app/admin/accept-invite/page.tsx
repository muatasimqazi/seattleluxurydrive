"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "loading" | "ready" | "invalid";

export default function AcceptInvitePage() {
  const [status, setStatus] = useState<Status>("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      // Invite links use implicit flow — tokens arrive in the URL hash
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        // Remove tokens from URL so they aren't re-processed on refresh
        window.history.replaceState(null, "", window.location.pathname);
        setStatus(error ? "invalid" : "ready");
        return;
      }

      // No hash — check for existing session (e.g. page refresh after invite)
      const { data: { session } } = await supabase.auth.getSession();
      setStatus(session ? "ready" : "invalid");
    }

    init();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirm) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      setPending(true);
      setError("");

      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        setPending(false);
      } else {
        // Full navigation so the server picks up the fresh session cookies.
        // router.push triggers an RSC fetch before cookies are flushed,
        // causing the sidebar to be missing until a manual refresh.
        window.location.href = "/admin";
      }
    },
    [password, confirm]
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="font-sans text-sm text-offwhite/60">Setting up your account…</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
            Seattle Luxury Drive
          </p>
          <AlertCircle size={32} className="text-red-400 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-light text-offwhite mb-3">
            Invite Link Expired
          </h1>
          <p className="font-sans text-sm text-offwhite/65 mb-8">
            This invitation link is invalid or has expired. Please contact an
            admin to send a new invite.
          </p>
          <Link
            href="/admin/login"
            className="font-sans text-sm text-gold hover:text-gold-lt transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
            Seattle Luxury Drive
          </p>
          <h1 className="font-heading text-3xl font-light text-offwhite mb-3">
            Set Your Password
          </h1>
          <p className="font-sans text-sm text-offwhite/65">
            Create a password you&apos;ll use to log in to the admin portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/65 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full bg-transparent border border-offwhite/20 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/65 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full bg-transparent border border-offwhite/20 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 border border-red-400/30 bg-red-400/5 px-4 py-3">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="font-sans text-sm text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-gold py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {pending ? "Saving…" : "Set Password & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
