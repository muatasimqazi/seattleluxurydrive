"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSettings } from "@/lib/settings";
import BookingAdminEmail from "@/emails/BookingAdminEmail";
import BookingCustomerEmail from "@/emails/BookingCustomerEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export type BookingFormState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; general?: string }
  | { status: "success" };

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v: string) {
  return /^[\d\s\-().+]{7,}$/.test(v);
}

export async function submitBookingRequest(
  _prev: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  // Honeypot
  if (formData.get("_hp")) {
    return { status: "success" };
  }

  // Rate limiting
  const { allowed, ip } = await checkRateLimit();
  if (!allowed) {
    return {
      status: "error",
      errors: {},
      general: "Too many requests. Please try again in 15 minutes or call us directly at (206) 669-1109.",
    };
  }

  const raw = {
    serviceType: (formData.get("serviceType") as string | null)?.trim() ?? "",
    rentalType: (formData.get("rentalType") as string | null)?.trim() ?? "",
    startDate: (formData.get("startDate") as string | null)?.trim() ?? "",
    startTime: (formData.get("startTime") as string | null)?.trim() ?? "",
    endDate: (formData.get("endDate") as string | null)?.trim() ?? "",
    estimatedHours: (formData.get("estimatedHours") as string | null)?.trim() ?? "",
    pickupLocation: (formData.get("pickupLocation") as string | null)?.trim() ?? "",
    dropoffLocation: (formData.get("dropoffLocation") as string | null)?.trim() ?? "",
    firstName: (formData.get("firstName") as string | null)?.trim() ?? "",
    lastName: (formData.get("lastName") as string | null)?.trim() ?? "",
    email: (formData.get("email") as string | null)?.trim() ?? "",
    phone: (formData.get("phone") as string | null)?.trim() ?? "",
    preferredContactMethod: (formData.get("preferredContactMethod") as string | null)?.trim() ?? "",
    occasion: (formData.get("occasion") as string | null)?.trim() ?? "",
    specialRequests: (formData.get("specialRequests") as string | null)?.trim() ?? "",
    privacyConsent: formData.get("privacyConsent") === "true",
    utmSource: (formData.get("utm_source") as string | null)?.trim() ?? "",
    utmMedium: (formData.get("utm_medium") as string | null)?.trim() ?? "",
    utmCampaign: (formData.get("utm_campaign") as string | null)?.trim() ?? "",
  };

  // Validation
  const errors: Record<string, string> = {};

  const VALID_SERVICE_TYPES = ["Self Drive", "With Chauffeur"];
  if (!VALID_SERVICE_TYPES.includes(raw.serviceType)) {
    errors.serviceType = "Please select a service type.";
  }

  const VALID_RENTAL_TYPES = ["Hourly", "Full Day", "Multi-Day"];
  if (!VALID_RENTAL_TYPES.includes(raw.rentalType)) {
    errors.rentalType = "Please select a rental type.";
  }

  if (!raw.startDate) errors.startDate = "Start date is required.";
  if (!raw.startTime) errors.startTime = "Start time is required.";

  if ((raw.rentalType === "Full Day" || raw.rentalType === "Multi-Day") && !raw.endDate) {
    errors.endDate = "End date is required for this rental type.";
  }

  if (raw.rentalType === "Hourly") {
    const hours = parseFloat(raw.estimatedHours);
    if (!raw.estimatedHours || isNaN(hours) || hours < 1) {
      errors.estimatedHours = "Please enter estimated hours (minimum 1).";
    }
  }

  if (!raw.pickupLocation) errors.pickupLocation = "Pickup location is required.";
  if (!raw.firstName) errors.firstName = "First name is required.";
  if (!raw.lastName) errors.lastName = "Last name is required.";

  if (!raw.email) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(raw.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!raw.phone) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(raw.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  const VALID_CONTACT_METHODS = ["Phone Call", "Text Message", "Email"];
  if (!VALID_CONTACT_METHODS.includes(raw.preferredContactMethod)) {
    errors.preferredContactMethod = "Please select a preferred contact method.";
  }

  if (!raw.privacyConsent) {
    errors.privacyConsent = "You must agree to the privacy policy to submit a request.";
  }

  if (raw.specialRequests.length > 500) {
    errors.specialRequests = "Special requests must be 500 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  // Insert into Supabase
  let submissionId = crypto.randomUUID();
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("booking_requests")
      .insert({
        service_type: raw.serviceType,
        rental_type: raw.rentalType,
        start_date: raw.startDate,
        start_time: raw.startTime,
        end_date: raw.endDate || null,
        estimated_hours: raw.estimatedHours ? parseFloat(raw.estimatedHours) : null,
        pickup_location: raw.pickupLocation,
        dropoff_location: raw.dropoffLocation || null,
        first_name: raw.firstName,
        last_name: raw.lastName,
        email: raw.email,
        phone: raw.phone,
        preferred_contact_method: raw.preferredContactMethod,
        occasion: raw.occasion || null,
        special_requests: raw.specialRequests || null,
        utm_source: raw.utmSource || null,
        utm_medium: raw.utmMedium || null,
        utm_campaign: raw.utmCampaign || null,
        ip_address: ip !== "unknown" ? ip : null,
        status: "new",
      })
      .select("id")
      .single();

    if (!error && data?.id) {
      submissionId = data.id;
    }
  } catch {
    // DB not connected — continue without failing the user experience
  }

  // Send emails non-blocking (fire and forget, errors are non-fatal)
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "notifications@seattleluxurydrive.com";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? "info@seattleluxurydrive.com";
  const settings = await getSettings();

  const emailProps = {
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone,
    preferredContactMethod: raw.preferredContactMethod,
    serviceType: raw.serviceType,
    rentalType: raw.rentalType,
    startDate: raw.startDate,
    startTime: raw.startTime,
    endDate: raw.endDate || undefined,
    estimatedHours: raw.estimatedHours || undefined,
    pickupLocation: raw.pickupLocation,
    dropoffLocation: raw.dropoffLocation || undefined,
    occasion: raw.occasion || undefined,
    specialRequests: raw.specialRequests || undefined,
    submissionId,
  };

  Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Booking Request — ${raw.firstName} ${raw.lastName}`,
      react: BookingAdminEmail(emailProps),
    }),
    resend.emails.send({
      from: fromEmail,
      to: raw.email,
      subject: "Your Reservation Request — Seattle Luxury Drive",
      react: BookingCustomerEmail({
        firstName: raw.firstName,
        serviceType: raw.serviceType,
        rentalType: raw.rentalType,
        startDate: raw.startDate,
        startTime: raw.startTime,
        endDate: raw.endDate || undefined,
        estimatedHours: raw.estimatedHours || undefined,
        pickupLocation: raw.pickupLocation,
        dropoffLocation: raw.dropoffLocation || undefined,
        occasion: raw.occasion || undefined,
        phone: settings.contact_phone,
        email: settings.contact_email,
        address: settings.site_address,
        responseHours: settings.response_hours,
      }),
    }),
  ]).catch(() => {
    // Email errors are non-fatal
  });

  const params = new URLSearchParams({
    name: raw.firstName,
    service: raw.serviceType,
    date: raw.startDate,
    pickup: raw.pickupLocation,
  });

  redirect(`/book/confirmation?${params.toString()}`);
}
