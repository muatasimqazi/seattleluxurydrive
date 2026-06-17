"use client";

import { useActionState, useState } from "react";
import { ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import {
  submitBookingRequest,
  type BookingFormState,
} from "@/app/actions/booking";

const INITIAL_BOOKING_STATE: BookingFormState = { status: "idle" };

const SERVICE_TYPES = ["Self Drive", "With Chauffeur"] as const;
const RENTAL_TYPES = ["Hourly", "Full Day", "Multi-Day"] as const;
const CONTACT_METHODS = ["Phone Call", "Text Message", "Email"] as const;
const OCCASIONS = [
  "Airport Transfer",
  "Corporate / Business",
  "Wedding",
  "Prom / Formal Event",
  "Anniversary / Date Night",
  "Wine Tour",
  "Concert / Show",
  "Sporting Event",
  "Birthday Celebration",
  "Other",
];

interface BookingData {
  serviceType: string;
  rentalType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  estimatedHours: string;
  pickupLocation: string;
  dropoffLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  occasion: string;
  specialRequests: string;
  privacyConsent: boolean;
}

const EMPTY: BookingData = {
  serviceType: "",
  rentalType: "",
  startDate: "",
  startTime: "",
  endDate: "",
  estimatedHours: "",
  pickupLocation: "",
  dropoffLocation: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContactMethod: "",
  occasion: "",
  specialRequests: "",
  privacyConsent: false,
};

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 font-sans text-[11px] text-red-400">
      {msg}
    </p>
  );
}

function ChipButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.15em] border transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
        selected
          ? "border-gold bg-gold/10 text-gold"
          : "border-offwhite/20 text-offwhite/50 hover:border-offwhite/40 hover:text-offwhite/70"
      }`}
    >
      {label}
    </button>
  );
}

function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  error,
  placeholder,
  min,
}: {
  label: string;
  id: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-2"
      >
        {label}
        {required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name ?? id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={`w-full bg-transparent border px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/25 focus:outline-none focus:border-gold transition-colors ${
          error ? "border-red-400/60" : "border-offwhite/20"
        }`}
      />
      <FieldError id={errorId} msg={error} />
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const labels = ["Trip Details", "Contact Info", "Review & Submit"];
  return (
    <div className="flex items-center gap-3 mb-10">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs transition-colors ${
              step === n
                ? "bg-gold text-black"
                : step > n
                ? "bg-gold/30 text-gold"
                : "bg-offwhite/10 text-offwhite/35"
            }`}
          >
            {n}
          </div>
          {n < 3 && (
            <div
              className={`h-px w-12 transition-colors ${
                step > n ? "bg-gold/40" : "bg-offwhite/10"
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/40">
        {labels[step - 1]}
      </span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/35 shrink-0">
        {label}
      </span>
      <span className="font-sans text-sm text-offwhite/80 text-right">{value}</span>
    </div>
  );
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(EMPTY);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const [state, formAction, isPending] = useActionState(
    submitBookingRequest,
    INITIAL_BOOKING_STATE
  );

  const serverErrors = state.status === "error" ? state.errors : {};
  const errors = { ...serverErrors, ...localErrors };

  function set(field: keyof BookingData, value: string | boolean) {
    setData((prev) => ({ ...prev, [field]: value }));
    setLocalErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateStep1(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!data.serviceType) e.serviceType = "Please select a service type.";
    if (!data.rentalType) e.rentalType = "Please select a rental type.";
    if (!data.startDate) e.startDate = "Start date is required.";
    if (!data.startTime) e.startTime = "Start time is required.";
    if (
      (data.rentalType === "Full Day" || data.rentalType === "Multi-Day") &&
      !data.endDate
    )
      e.endDate = "End date is required for this rental type.";
    if (data.rentalType === "Hourly") {
      const h = parseFloat(data.estimatedHours);
      if (!data.estimatedHours || isNaN(h) || h < 1)
        e.estimatedHours = "Please enter estimated hours (minimum 1).";
    }
    if (!data.pickupLocation) e.pickupLocation = "Pickup location is required.";
    return e;
  }

  function validateStep2(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!data.firstName) e.firstName = "First name is required.";
    if (!data.lastName) e.lastName = "Last name is required.";
    if (!data.email) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Please enter a valid email address.";
    if (!data.phone) e.phone = "Phone number is required.";
    else if (!/^[\d\s\-().+]{7,}$/.test(data.phone))
      e.phone = "Please enter a valid phone number.";
    if (!data.preferredContactMethod)
      e.preferredContactMethod = "Please select a preferred contact method.";
    return e;
  }

  function goTo2() {
    const e = validateStep1();
    if (Object.keys(e).length) { setLocalErrors(e); return; }
    setLocalErrors({});
    setStep(2);
    scrollTop();
  }

  function goTo3() {
    const e = validateStep2();
    if (Object.keys(e).length) { setLocalErrors(e); return; }
    setLocalErrors({});
    setStep(3);
    scrollTop();
  }

  function goBack() {
    setLocalErrors({});
    setStep((s) => s - 1);
    scrollTop();
  }

  const today = new Date().toISOString().split("T")[0];

  // ── STEP 1 ──────────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div>
        <StepIndicator step={1} />
        <div className="space-y-8">
          {/* Service type */}
          <fieldset>
            <legend className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-3">
              Service Type <span className="text-gold" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </legend>
            <div className="flex flex-wrap gap-3" role="group" aria-labelledby="service-type-legend">
              {SERVICE_TYPES.map((s) => (
                <ChipButton
                  key={s}
                  label={s}
                  selected={data.serviceType === s}
                  onClick={() => set("serviceType", s)}
                />
              ))}
            </div>
            <FieldError id="serviceType-error" msg={errors.serviceType} />
          </fieldset>

          {/* Rental type */}
          <fieldset>
            <legend className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-3">
              Rental Type <span className="text-gold" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {RENTAL_TYPES.map((r) => (
                <ChipButton
                  key={r}
                  label={r}
                  selected={data.rentalType === r}
                  onClick={() => set("rentalType", r)}
                />
              ))}
            </div>
            <FieldError id="rentalType-error" msg={errors.rentalType} />
          </fieldset>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              id="startDate"
              label="Start Date"
              type="date"
              value={data.startDate}
              onChange={(v) => set("startDate", v)}
              required
              error={errors.startDate}
              min={today}
            />
            <InputField
              id="startTime"
              label="Start Time"
              type="time"
              value={data.startTime}
              onChange={(v) => set("startTime", v)}
              required
              error={errors.startTime}
            />
          </div>

          {(data.rentalType === "Full Day" || data.rentalType === "Multi-Day") && (
            <InputField
              id="endDate"
              label="End Date"
              type="date"
              value={data.endDate}
              onChange={(v) => set("endDate", v)}
              required
              error={errors.endDate}
              min={data.startDate || today}
            />
          )}

          {data.rentalType === "Hourly" && (
            <InputField
              id="estimatedHours"
              label="Estimated Hours"
              type="number"
              value={data.estimatedHours}
              onChange={(v) => set("estimatedHours", v)}
              required
              error={errors.estimatedHours}
              placeholder="e.g. 3"
              min="1"
            />
          )}

          <InputField
            id="pickupLocation"
            label="Pickup Location"
            value={data.pickupLocation}
            onChange={(v) => set("pickupLocation", v)}
            required
            error={errors.pickupLocation}
            placeholder="Address, hotel, airport, etc."
          />
          <InputField
            id="dropoffLocation"
            label="Dropoff Location (optional)"
            value={data.dropoffLocation}
            onChange={(v) => set("dropoffLocation", v)}
            error={errors.dropoffLocation}
            placeholder="Leave blank if same as pickup or TBD"
          />

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={goTo2}
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              Continue <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2 ──────────────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div>
        <StepIndicator step={2} />
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              id="firstName"
              label="First Name"
              value={data.firstName}
              onChange={(v) => set("firstName", v)}
              required
              error={errors.firstName}
            />
            <InputField
              id="lastName"
              label="Last Name"
              value={data.lastName}
              onChange={(v) => set("lastName", v)}
              required
              error={errors.lastName}
            />
          </div>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={data.email}
            onChange={(v) => set("email", v)}
            required
            error={errors.email}
            placeholder="you@example.com"
          />
          <InputField
            id="phone"
            label="Phone Number"
            type="tel"
            value={data.phone}
            onChange={(v) => set("phone", v)}
            required
            error={errors.phone}
            placeholder="(206) 555-0000"
          />

          <fieldset>
            <legend className="font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-3">
              Preferred Contact Method <span className="text-gold" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {CONTACT_METHODS.map((m) => (
                <ChipButton
                  key={m}
                  label={m}
                  selected={data.preferredContactMethod === m}
                  onClick={() => set("preferredContactMethod", m)}
                />
              ))}
            </div>
            <FieldError id="preferredContactMethod-error" msg={errors.preferredContactMethod} />
          </fieldset>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-offwhite/50 hover:text-offwhite transition-colors"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={goTo3}
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors"
            >
              Continue <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3 ──────────────────────────────────────────────────────────────
  return (
    <div>
      <StepIndicator step={3} />
      <form action={formAction} className="space-y-8">
        {/* Honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* All step 1 + 2 data as hidden inputs */}
        <input type="hidden" name="serviceType" value={data.serviceType} />
        <input type="hidden" name="rentalType" value={data.rentalType} />
        <input type="hidden" name="startDate" value={data.startDate} />
        <input type="hidden" name="startTime" value={data.startTime} />
        <input type="hidden" name="endDate" value={data.endDate} />
        <input type="hidden" name="estimatedHours" value={data.estimatedHours} />
        <input type="hidden" name="pickupLocation" value={data.pickupLocation} />
        <input type="hidden" name="dropoffLocation" value={data.dropoffLocation} />
        <input type="hidden" name="firstName" value={data.firstName} />
        <input type="hidden" name="lastName" value={data.lastName} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="phone" value={data.phone} />
        <input type="hidden" name="preferredContactMethod" value={data.preferredContactMethod} />
        {/* privacyConsent controlled below */}

        {/* Occasion */}
        <div>
          <label
            htmlFor="occasion"
            className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-2"
          >
            Occasion (optional)
          </label>
          <select
            id="occasion"
            name="occasion"
            value={data.occasion}
            onChange={(e) => set("occasion", e.target.value)}
            className="w-full bg-black border border-offwhite/20 px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select an occasion…</option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Special requests */}
        <div>
          <label
            htmlFor="specialRequests"
            className="block font-sans text-[10px] uppercase tracking-[0.2em] text-offwhite/50 mb-2"
          >
            Special Requests (optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={data.specialRequests}
            onChange={(e) => set("specialRequests", e.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Any special requirements, preferences, or questions…"
            className={`w-full bg-transparent border px-4 py-3 font-sans text-sm text-offwhite placeholder:text-offwhite/25 focus:outline-none focus:border-gold transition-colors resize-none ${
              errors.specialRequests ? "border-red-400/60" : "border-offwhite/20"
            }`}
          />
          <div className="flex justify-between mt-1">
            <FieldError id="specialRequests-error" msg={errors.specialRequests} />
            <span className="font-sans text-[10px] text-offwhite/30 ml-auto" aria-live="polite">
              {data.specialRequests.length}/500
            </span>
          </div>
        </div>

        {/* Review summary */}
        <div className="border border-offwhite/10 bg-charcoal p-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">
              Reservation Summary
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/40 hover:text-gold transition-colors"
            >
              Edit Trip
            </button>
          </div>
          <SummaryRow label="Service" value={data.serviceType} />
          <SummaryRow label="Rental" value={data.rentalType} />
          <SummaryRow label="Date" value={data.startDate} />
          <SummaryRow label="Time" value={data.startTime} />
          {data.endDate && <SummaryRow label="End Date" value={data.endDate} />}
          {data.estimatedHours && (
            <SummaryRow label="Duration" value={`${data.estimatedHours} hrs`} />
          )}
          <SummaryRow label="Pickup" value={data.pickupLocation} />
          {data.dropoffLocation && (
            <SummaryRow label="Dropoff" value={data.dropoffLocation} />
          )}

          <div className="border-t border-offwhite/10 pt-4 flex items-center justify-between">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lt">Contact</p>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/40 hover:text-gold transition-colors"
            >
              Edit Contact
            </button>
          </div>
          <SummaryRow label="Name" value={`${data.firstName} ${data.lastName}`} />
          <SummaryRow label="Email" value={data.email} />
          <SummaryRow label="Phone" value={data.phone} />
          <SummaryRow label="Contact Via" value={data.preferredContactMethod} />
        </div>

        {/* Privacy consent */}
        <div>
          <input
            type="hidden"
            name="privacyConsent"
            value={data.privacyConsent ? "true" : "false"}
          />
          <div className="flex items-start gap-3">
            <button
              type="button"
              id="privacyConsent"
              role="checkbox"
              aria-checked={data.privacyConsent}
              aria-describedby={errors.privacyConsent ? "privacyConsent-error" : undefined}
              onClick={() => set("privacyConsent", !data.privacyConsent)}
              className={`mt-0.5 shrink-0 w-4 h-4 border flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                data.privacyConsent ? "border-gold bg-gold/20" : "border-offwhite/30"
              }`}
            >
              {data.privacyConsent && <div className="w-2 h-2 bg-gold" aria-hidden="true" />}
            </button>
            <label htmlFor="privacyConsent" className="font-sans text-xs text-offwhite/55 leading-relaxed cursor-pointer">
              I agree to the{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-gold hover:text-gold-lt transition-colors underline"
              >
                Privacy Policy
              </a>{" "}
              and consent to Seattle Luxury Drive contacting me regarding my reservation request.
            </label>
          </div>
          <FieldError id="privacyConsent-error" msg={errors.privacyConsent} />
        </div>

        {/* General error */}
        {state.status === "error" && state.general && (
          <div className="flex items-start gap-3 border border-red-400/30 bg-red-400/5 px-4 py-3">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-red-300">{state.general}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-offwhite/50 hover:text-offwhite transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-gold px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] text-black hover:bg-gold-lt transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending…" : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
