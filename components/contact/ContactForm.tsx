"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { CheckCircle, AlertCircle } from "lucide-react";

const INITIAL_STATE: ContactFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 font-sans text-xs text-red-400">{message}</p>
  );
}

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  required,
  error,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2"
      >
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold transition-colors"
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

export default function ContactForm() {
  const [state, action, isPending] = useActionState(
    submitContactForm,
    INITIAL_STATE
  );

  const errors =
    state.status === "validation" ? state.errors : {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle size={40} strokeWidth={1} className="text-gold" />
        <h3 className="font-heading text-3xl font-light text-offwhite">
          Message Received
        </h3>
        <p className="font-sans text-sm text-offwhite/60 max-w-sm">
          Thank you for contacting Seattle Luxury Drive. A member of our team
          will review your message and respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users */}
      <input type="text" name="_hp" className="hidden" tabIndex={-1} aria-hidden="true" />

      {state.status === "error" && (
        <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-4 py-3">
          <AlertCircle size={16} strokeWidth={1.5} className="text-red-400 shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-red-400">{state.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputField
          label="Your Name"
          id="name"
          placeholder="Jane Smith"
          required
          autoComplete="name"
          error={errors.name}
        />
        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="(206) 555-0100"
          required
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <InputField
        label="Email Address"
        id="email"
        type="email"
        placeholder="jane@example.com"
        required
        autoComplete="email"
        error={errors.email}
      />

      <div>
        <label
          htmlFor="message"
          className="block font-sans text-[11px] uppercase tracking-[0.15em] text-offwhite/60 mb-2"
        >
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your transportation needs…"
          required
          className="w-full bg-black/40 border border-offwhite/15 px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold transition-colors resize-none"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && <FieldError message={errors.message} />}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gold py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send Request"}
      </button>

      <p className="font-sans text-xs text-offwhite/35 text-center">
        We respond to all inquiries within 4 business hours.
      </p>
    </form>
  );
}
