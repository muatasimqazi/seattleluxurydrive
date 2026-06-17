"use server";

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
  if (honeypot) return { status: "success" }; // silently accept

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

  // TODO (Phase 5): Insert into contact_requests via Supabase service role client
  // TODO (Phase 5): Send admin notification email via Resend
  // TODO (Phase 5): Send customer acknowledgment email via Resend

  try {
    // Placeholder — replace with real Supabase insert in Phase 5
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "We were unable to submit your message at this time. Please try again or call us directly at (206) 669-1109.",
    };
  }
}
