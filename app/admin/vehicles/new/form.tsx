"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createVehicle } from "@/app/actions/admin-vehicles";

const inputCls =
  "w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/75 mb-2">
        {label}
      </p>
      {children}
      {hint && (
        <p className="font-sans text-[11px] text-offwhite/50 mt-1.5">{hint}</p>
      )}
    </div>
  );
}

export function NewVehicleForm() {
  const [state, action, pending] = useActionState(createVehicle, {});

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="font-sans text-xs text-red-400">{state.error}</p>
        </div>
      )}

      <section className="border border-offwhite/8 p-6 space-y-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
          Identity
        </p>

        <Field
          label="Display Name"
          hint='Shown on fleet page and booking form, e.g. "2021 Rolls-Royce Ghost"'
        >
          <input
            name="name"
            type="text"
            required
            className={inputCls}
            placeholder="2021 Rolls-Royce Ghost"
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Year">
            <input
              name="year"
              type="number"
              required
              min="1900"
              max="2100"
              className={inputCls}
              placeholder="2021"
            />
          </Field>
          <Field label="Make">
            <input
              name="make"
              type="text"
              required
              className={inputCls}
              placeholder="Rolls-Royce"
            />
          </Field>
          <Field label="Model">
            <input
              name="model"
              type="text"
              required
              className={inputCls}
              placeholder="Ghost"
            />
          </Field>
        </div>

        <Field
          label="URL Slug"
          hint="Auto-generated from Year + Make + Model if left blank. Cannot be changed after creation."
        >
          <input
            name="slug"
            type="text"
            className={inputCls}
            placeholder="2021-rolls-royce-ghost"
          />
        </Field>
      </section>

      <section className="border border-offwhite/8 p-6 space-y-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
          Details
        </p>

        <Field label="Description">
          <textarea
            name="description"
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="A brief description of the vehicle for customers..."
          />
        </Field>

        <Field label="Starting Hourly Rate (USD)">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-offwhite/60">
              $
            </span>
            <input
              name="starting_hourly_rate"
              type="number"
              min="0"
              step="0.01"
              className={`${inputCls} pl-8`}
              placeholder="350"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-xs text-offwhite/60">
              /hr
            </span>
          </div>
        </Field>
      </section>

      <section className="border border-offwhite/8 p-6 space-y-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
          Options
        </p>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            name="chauffeur_available"
            type="checkbox"
            defaultChecked
            className="w-4 h-4 accent-[#B89B5E]"
          />
          <span className="font-sans text-sm text-offwhite/85">
            Chauffeur service available
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            className="w-4 h-4 accent-[#B89B5E]"
          />
          <span className="font-sans text-sm text-offwhite/85">
            Feature on homepage
          </span>
        </label>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Creating…" : "Create Vehicle"}
        </button>
        <Link
          href="/admin/vehicles"
          className="font-sans text-xs text-offwhite/60 hover:text-offwhite/85 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
