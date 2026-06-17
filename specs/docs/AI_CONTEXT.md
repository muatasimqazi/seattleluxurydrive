# AI Context — Seattle Luxury Drive

This file is a condensed context injection for AI assistants building the Seattle Luxury Drive application. Read 01-mvp-requirements.md and 05-technical-specification.md for full detail. For decisions that deviate from the spec, read 06-implementation-decisions.md.

---

## What This Is

A premium luxury transportation marketing website.

Not a booking platform. Not a rental marketplace.

The goal is qualified lead generation through a concierge-style reservation request form.

---

## Stack

- Next.js 15 App Router (Server Components by default, `'use client'` only where needed)
- TypeScript
- Tailwind CSS v4 (CSS-based `@theme inline` config in globals.css — no tailwind.config.ts)
- Shadcn UI
- Supabase (PostgreSQL + Auth + Storage + RLS) via **`@supabase/ssr`** (NOT the deprecated @supabase/auth-helpers-nextjs)
- Vercel (hosting)
- Resend + @react-email/components (transactional email)
- Google Analytics 4
- PostHog (`posthog-js`) — added alongside GA4

---

## Key Architecture Decisions

- All form mutations use Next.js Server Actions (no client-side API routes)
- Server actions use `useActionState` — form state is managed with this hook, not useState
- Admin routes (/admin/*) protected by middleware.ts using @supabase/ssr
- Public form inserts use the anon key with RLS policies
- Admin dashboard operations use service role key via `createServiceClient()` — **this function is async, always `await` it**
- **"use server" files may only export async functions** — no exported objects or constants
- `INITIAL_BOOKING_STATE` is defined in BookingForm.tsx (client component), not in the server action file
- Use next/image for all images — no raw img tags
- Use next/font for Cormorant Garamond and Inter
- Brand is always dark — no light mode

---

## Supabase Client Utilities

`lib/supabase/server.ts`:
- `createClient()` — async, uses anon key, for public reads in Server Components
- `createServiceClient()` — async, uses service role key, bypasses RLS, for admin operations

`lib/supabase/client.ts`:
- `createBrowserClient()` — for Client Components

---

## Public Pages

/ — Home
/fleet — Fleet overview
/fleet/[slug] — Vehicle detail
/services — Services
/about — About
/faq — FAQ
/contact — Contact
/book — Booking request form (3 steps)
/book/confirmation — Post-submission confirmation (robots: noindex)
/privacy-policy — Privacy policy

## Admin Pages

/admin/login — Login (public)
/admin — Dashboard
/admin/bookings — Booking list
/admin/bookings/[id] — Booking detail
/admin/contacts — Contact requests
/admin/vehicles — NOT BUILT (deferred)
/admin/vehicles/new — NOT BUILT (deferred)
/admin/vehicles/[id] — NOT BUILT (deferred)

---

## Database Tables

### vehicles
id, slug, name, year, make, model, description, starting_hourly_rate, chauffeur_available, featured, status ('active' | 'archived'), created_at, updated_at

Query active vehicles: `.eq("status", "active")` — NOT `.eq("is_active", true)`

### vehicle_images
id, vehicle_id (FK), image_url, alt_text, sort_order, created_at

### booking_requests
id, first_name, last_name, email, phone, pickup_location, dropoff_location, service_type, rental_type, start_date, start_time, end_date, estimated_hours (NUMERIC), occasion, special_requests, preferred_contact_method, status, created_at, updated_at

**Status values: `new` | `contacted` | `confirmed` | `cancelled`** (all lowercase)

Columns in schema but NOT populated by MVP server action: vehicle_id, ip_address, utm_source, utm_medium, utm_campaign, responded_at, admin_notes

### contact_requests
id, **first_name**, **last_name**, email, phone, message, status, created_at, updated_at

**Note:** Uses `first_name` + `last_name` (not `name`). Server action splits the form's `name` input on first space.

**Status values: `new` | `contacted` | `resolved`** (all lowercase)

---

## Booking Form (3 Steps)

Step 1 — Your Trip:
Service type (Self Drive / With Chauffeur), rental type (Hourly / Full Day / Multi-Day), start date, start time, end date (conditional on Multi-Day), estimated hours (conditional on Hourly), pickup location, dropoff location (optional)

Step 2 — Your Details:
First name, last name, email, phone, preferred contact method

Step 3 — Review & Submit:
Occasion (optional), special requests (optional, 500 char max), review summary of Steps 1+2 (hidden inputs), privacy consent (role="checkbox" button), honeypot field `_hp` (hidden)

On success: redirect to /book/confirmation with name/service/date/pickup as search params

---

## Spam Prevention

Both forms (booking + contact) have:
1. Honeypot field named `_hp` (not `website`) — if filled, silently return success without DB insert or email
2. Rate limiting — **NOT IMPLEMENTED** (deferred before launch)

---

## Emails (Resend)

Sender address from `RESEND_FROM_EMAIL` env var.
Admin inbox from `ADMIN_NOTIFICATION_EMAIL` env var.

Emails are non-blocking: sent via `Promise.all([...]).catch(() => {})`.

4 templates in `/emails/`:
- `BookingAdminEmail.tsx` — new booking notification to admin
- `BookingCustomerEmail.tsx` — confirmation to customer
- `ContactAdminEmail.tsx` — new contact notification to admin
- `ContactCustomerEmail.tsx` — acknowledgment to customer

---

## RLS Summary

booking_requests: INSERT public (anon), SELECT/UPDATE admin only (service role)
contact_requests: INSERT public (anon), SELECT/UPDATE admin only (service role)
vehicles: SELECT public (status = 'active' only), all mutations admin only
vehicle_images: SELECT public, all mutations admin only

---

## Environment Variables

Server-only (never NEXT_PUBLIC_):
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- ADMIN_NOTIFICATION_EMAIL

Public (NEXT_PUBLIC_):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GA_ID
- NEXT_PUBLIC_POSTHOG_KEY
- NEXT_PUBLIC_POSTHOG_HOST

---

## SEO

**Implemented:** Per-page metadata, LocalBusiness schema (homepage), FAQPage schema, sitemap.ts, robots.ts, OG image via app/opengraph-image.tsx (edge runtime, 1200×630)

**Not implemented:** Organization schema, WebSite schema, BreadcrumbList schema

---

## Business Details

Starting price: $350/hour

Service area (12 cities): Seattle, Bellevue, Redmond, Kirkland, Mercer Island, Lynnwood, Everett, Edmonds, Mukilteo, Tacoma, SeaTac Airport, Shoreline

Business address: 14723 Aurora Ave N, Shoreline, WA 98133

Fleet at launch: 1 vehicle — 2021 Rolls-Royce

Business model: Concierge-first, manual reservations, offline payments, 4-business-hour response commitment

---

## What Is Explicitly Out of Scope (MVP)

- Online payments
- Customer accounts or dashboard
- Automated booking approval
- Availability calendars
- SMS notifications
- City-specific landing pages (Phase 2)
- Vehicle management admin pages (deferred post-launch)
- Rate limiting (TODO before launch)
- Admin notes on bookings (deferred)
- UTM parameter capture (deferred)
