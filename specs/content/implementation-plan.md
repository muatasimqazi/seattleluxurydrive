# Implementation Plan

## Purpose

Defines the phased development order for the Seattle Luxury Drive MVP. Each phase has clear deliverables and a definition of done.

Prerequisites before Phase 1:
- Figma designs approved
- All content deliverables received (see specs/docs/README.md checklist)
- Supabase project created
- Vercel project created
- Resend account and verified sending domain set up
- Domain name configured

---

## Phase 1 — Project Foundation ✅ COMPLETE

**Estimated effort: 1–2 days**

Deliverables:

- [x] Initialize Next.js 15 project with TypeScript
- [x] Configure Tailwind CSS v4 with custom design tokens (CSS-based @theme inline blocks — no tailwind.config.ts)
- [x] Install and configure Shadcn UI
- [x] Install and configure next/font (Cormorant Garamond + Inter)
- [x] Create .env.local with all 9 required environment variables (see 06-implementation-decisions.md — 4 added beyond original spec)
- [ ] Create Supabase project and run all database migrations
  - [ ] vehicles table
  - [ ] vehicle_images table
  - [ ] booking_requests table
  - [ ] contact_requests table
  - [ ] All indexes
  - [ ] All RLS policies
- [x] Vercel project connected to repository
- [ ] Environment variables set in Vercel
- [x] Configure next.config.ts (image remote patterns, security headers)
- [x] Create middleware.ts (admin route protection via @supabase/ssr)

**Note:** Supabase tables have not been created yet — service role key is still a placeholder. This is the critical blocking item before any form submission or admin dashboard function can work.

---

## Phase 2 — Global Layout and Navigation ✅ COMPLETE

**Estimated effort: 1–2 days**

Deliverables:

- [x] Root layout (app/layout.tsx) with font, GA4 script, PostHog provider, full metadata defaults
- [x] Desktop navigation component with phone number and Request Reservation CTA
- [x] Mobile navigation (hamburger + drawer) with full ARIA focus trap
- [x] Skip-to-content link
- [x] Footer with navigation links, phone, email, privacy policy link
- [x] 404 page (app/not-found.tsx)
- [x] 500 error page (app/error.tsx)

---

## Phase 3 — Core Public Pages ✅ COMPLETE

**Estimated effort: 3–4 days**

Deliverables:

- [x] Homepage (app/page.tsx) — 8 sections (testimonials section hidden pending real reviews)
- [x] Fleet page (app/fleet/page.tsx) — vehicle grid from database
- [x] Vehicle Detail page (app/fleet/[slug]/page.tsx) — dynamic route from vehicles table

---

## Phase 4 — Supporting Public Pages ✅ COMPLETE

**Estimated effort: 2–3 days**

Deliverables:

- [x] Services page (app/services/page.tsx) — service sections
- [x] About page (app/about/page.tsx)
- [x] FAQ page (app/faq/page.tsx) — accordion with category navigation
- [x] Contact page (app/contact/page.tsx) — contact form
- [x] Privacy policy page (app/privacy-policy/page.tsx)

---

## Phase 5 — Booking Flow and Email ✅ COMPLETE

**Estimated effort: 3–4 days**

Deliverables:

- [x] Booking request page (app/book/page.tsx) — 3-step form with progress indicator
- [x] Booking confirmation page (app/book/confirmation/page.tsx)
- [x] Booking form server action (app/actions/booking.ts):
  - [x] Honeypot check (field named `_hp`)
  - [ ] Rate limiting by IP — **DEFERRED, required before launch**
  - [x] Server-side validation (all fields)
  - [x] Insert into booking_requests (service role key)
  - [x] Send admin notification email via Resend (non-blocking)
  - [x] Send customer confirmation email via Resend (non-blocking)
- [x] Contact form server action (app/actions/contact.ts):
  - [x] Honeypot check
  - [x] Server-side validation
  - [x] Insert into contact_requests
  - [x] Send admin notification email
  - [x] Send customer acknowledgment email
- [x] All email templates (React Email components in /emails/):
  - [x] Admin booking notification (BookingAdminEmail.tsx)
  - [x] Customer booking confirmation (BookingCustomerEmail.tsx)
  - [x] Admin contact notification (ContactAdminEmail.tsx)
  - [x] Customer contact acknowledgment (ContactCustomerEmail.tsx)

**Deviations from spec:**
- Honeypot field is named `_hp` (spec said `website`)
- Rate limiting not implemented
- `INITIAL_BOOKING_STATE` is defined in BookingForm.tsx, not exported from the server action file (required by "use server" constraint)
- Multi-step form uses hidden inputs in Step 3's native form element for all Step 1+2 data

---

## Phase 6 — Admin Dashboard ✅ PARTIAL — Vehicle Management Deferred

**Estimated effort: 3–4 days**

Deliverables:

- [x] Admin login page (app/admin/login/page.tsx)
- [x] Admin dashboard overview (app/admin/page.tsx) — stats and recent activity
- [x] Bookings list (app/admin/bookings/page.tsx) — status filter only (no pagination/search)
- [x] Booking detail view (app/admin/bookings/[id]/page.tsx) — status update buttons
- [ ] Vehicles list (app/admin/vehicles/page.tsx) — **DEFERRED**
- [ ] Vehicle create (app/admin/vehicles/new/page.tsx) — **DEFERRED**
- [ ] Vehicle edit (app/admin/vehicles/[id]/page.tsx) — **DEFERRED**
- [x] Contacts list (app/admin/contacts/page.tsx) — card layout with inline message

**Deviations from spec:**
- Vehicle management not built — seed vehicle data directly in Supabase for launch
- No pagination (25/page) on any list
- No search by name or email
- No date range filters on bookings
- No admin notes textarea on booking detail
- No responded_at tracking
- Contact view is cards (not table + separate detail)

---

## Phase 7 — SEO and Analytics ✅ COMPLETE (partial structured data)

**Estimated effort: 1–2 days**

Deliverables:

- [x] Per-page metadata (title, description, Open Graph, canonical) for all public pages
- [x] Structured data (JSON-LD) via JsonLd component:
  - [x] LocalBusiness (Homepage)
  - [ ] Organization (all pages, in layout) — deferred
  - [ ] WebSite (Home) — deferred
  - [ ] BreadcrumbList (all interior pages) — deferred
  - [x] FAQPage (FAQ page)
  - [ ] FAQPage on Vehicle Detail — deferred (no FAQ section on vehicle detail pages)
- [x] sitemap.ts (app/sitemap.ts) — static routes + dynamic vehicle routes
- [x] robots.ts (app/robots.ts)
- [x] OG image (app/opengraph-image.tsx) — edge runtime, 1200×630 (not in original spec)
- [x] PostHog integration added in this phase

**GA4 event tracking:** GA4 script is loaded. Custom event tracking (booking_form_start, booking_form_step_2, etc.) is not implemented — GA4 will auto-track page_view events only.

---

## Phase 8 — Performance and Accessibility Audit ✅ COMPLETE

**Estimated effort: 1–2 days**

Deliverables:

- [x] Lighthouse audit on all primary pages
- [x] Keyboard navigation across all interactive components
- [x] Booking form accessibility (keyboard + screen reader)
- [x] Contrast ratio check on all text combinations
- [x] Mobile responsiveness check

**Accessibility implementations (beyond original spec checklist):**
- Mobile nav: full Tab/Shift-Tab focus trap, Escape to close, focus returns to hamburger on close
- FAQ accordion: `<h3>` wrappers on triggers, `role="region"` + `aria-labelledby` on panels, `hidden` attribute (not conditional render), `aria-current` on active category, `aria-live` on content area
- Booking form: `<fieldset>`/`<legend>` for chip groups, `aria-pressed` on chips, `role="checkbox"` + `aria-checked` for privacy consent, `aria-describedby`/`aria-invalid`/`role="alert"` on all error-linked fields
- Contact form: same error-linkage pattern as booking form

---

## Total Estimated Effort

Phases 1–8: Complete

---

## Pre-Launch Checklist

**Critical blockers before any public traffic:**

- [ ] Supabase project created and all tables migrated (blocking — nothing works without this)
- [ ] Environment variables set in Vercel (SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL, NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST)
- [ ] Rate limiting implemented on booking and contact server actions
- [ ] Admin account created in Supabase Auth
- [ ] End-to-end booking submission test (form → DB → both emails)
- [ ] End-to-end contact form test

**Content:**

- [ ] Real testimonials replace testimonials section (currently hidden)
- [ ] Vehicle photos uploaded and vehicle record seeded in Supabase
- [ ] Privacy policy copy finalized
- [ ] Confirmed business hours for LocalBusiness schema (currently Mo-Su 07:00–22:00)
- [ ] Confirmed admin email address

**Launch verification:**

- [ ] Supabase RLS policies verified — public cannot read booking or contact data
- [ ] Admin email notifications tested end-to-end
- [ ] Customer confirmation emails tested end-to-end
- [ ] Google Analytics confirmed receiving data
- [ ] PostHog confirmed receiving pageview events
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile claimed and linked
- [ ] Domain CNAME / DNS configured
- [ ] SSL certificate active
- [ ] Vercel production deployment verified
- [ ] All Lighthouse targets met on production URL
