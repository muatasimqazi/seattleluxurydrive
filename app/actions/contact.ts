"use server";

import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSettings } from "@/lib/settings";
import ContactAdminEmail from "@/emails/ContactAdminEmail";
import ContactCustomerEmail from "@/emails/ContactCustomerEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "validation"; errors: Record<string, string> };

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[\d\s\-+().]{7,20}$/.test(phone);
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  // Honeypot — bots fill hidden fields, humans don't
  const honeypot = formData.get("_hp") as string;
  if (honeypot) return { status: "success" };

  // Rate limiting
  const { allowed } = await checkRateLimit();
  if (!allowed) {
    return {
      status: "error",
      message: "Too many requests. Please try again in 15 minutes or call us directly at (206) 669-1109.",
    };
  }

  // Validate
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!validateEmail(email)) errors.email = "Please enter a valid email address.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!validatePhone(phone)) errors.phone = "Please enter a valid phone number.";
  if (!message) errors.message = "Message is required.";
  else if (message.length < 10) errors.message = "Please provide more detail (at least 10 characters).";

  if (Object.keys(errors).length > 0) {
    return { status: "validation", errors };
  }

  // Split name into first/last for email templates
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? name;
  const lastName = nameParts.slice(1).join(" ") || "";

  let submissionId = crypto.randomUUID();

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        message,
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

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "notifications@seattleluxurydrive.com";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? "info@seattleluxurydrive.com";
  const settings = await getSettings();

  Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Contact Message — ${name}`,
      react: ContactAdminEmail({ firstName, lastName, email, phone, message, submissionId }),
    }),
    resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We Received Your Message — Seattle Luxury Drive",
      react: ContactCustomerEmail({
        firstName,
        phone: settings.contact_phone,
        email: settings.contact_email,
        address: settings.site_address,
        responseHours: settings.response_hours,
      }),
    }),
  ]).catch(() => {
    // Email errors are non-fatal
  });

  return { status: "success" };
}
