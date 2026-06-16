# AI Context — Seattle Luxury Drive

This file is a condensed context injection for AI assistants building the Seattle Luxury Drive application. Read 01-mvp-requirements.md and 05-technical-specification.md for full detail.

---

## What This Is

A premium luxury transportation marketing website.

Not a booking platform. Not a rental marketplace.

The goal is qualified lead generation through a concierge-style reservation request form.

---

## Stack

- Next.js 15 App Router (Server Components by default)
- TypeScript
- Tailwind CSS + Shadcn UI
- Supabase (PostgreSQL + Auth + Storage + RLS)
- Vercel (hosting)
- Resend (transactional email)
- Google Analytics 4

---

## Key Architecture Decisions

- All form mutations use Next.js Server Actions (no client-side API routes)
- Admin routes (/admin/*) protected by middleware.ts (Supabase Auth)
- Public routes are unauthenticated; forms insert into DB using anon key with RLS policies
- Admin dashboard operations use service role key (server-only, never browser-exposed)
- Use next/image for all images — no raw img tags
- Use next/font for Cormorant Garamond and Inter

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
/book/confirmation — Post-submission confirmation
/privacy-policy — Privacy policy

## Admin Pages

/admin/login — Login (public)
/admin — Dashboard
/admin/bookings — Booking list
/admin/bookings/[id] — Booking detail
/admin/vehicles — Fleet management
/admin/vehicles/new — Add vehicle
/admin/vehicles/[id] — Edit vehicle
/admin/contacts — Contact requests

---

## Database Tables

### vehicles
id, slug, name, year, make, model, description, starting_hourly_rate, chauffeur_available, featured, status, created_at, updated_at

### vehicle_images
id, vehicle_id (FK), image_url, alt_text, sort_order, created_at

### booking_requests
id, first_name, last_name, email, phone, pickup_location, dropoff_location, vehicle_id (FK), service_type, rental_type, start_date, start_time, end_date, estimated_hours, occasion, special_requests, preferred_contact_method, status, admin_notes, ip_address, utm_source, utm_medium, utm_campaign, responded_at, created_at, updated_at

Status values: Pending | Contacted | Approved | Declined | Completed

### contact_requests
id, name, email, phone, message, status, admin_notes, responded_at, ip_address, created_at, updated_at

Status values: New | Responded | Closed

---

## Booking Form (3 Steps)

Step 1 — Your Trip:
Service type (Self Drive / Chauffeur), vehicle, rental type (Hourly / Full Day / Multi-Day), start date, start time, end date (conditional), estimated hours (conditional), pickup location, dropoff location (optional)

Step 2 — Your Details:
First name, last name, email, phone, preferred contact method

Step 3 — Review & Submit:
Occasion (optional), special requests (optional, 500 char max), review summary, privacy consent checkbox (required), honeypot field (hidden)

On success: redirect to /book/confirmation

---

## Spam Prevention

Both forms (booking + contact) require:
1. Honeypot field named `website` — if filled, silently return success without DB insert or email send
2. Rate limiting — max 3 submissions per IP per 15 minutes, return 429 on excess

---

## Emails (Resend)

On booking submission:
- Admin notification: subject "New Booking Request — {name}", all booking details, link to admin
- Customer confirmation: subject "Your Reservation Request — Seattle Luxury Drive", trip summary, 4-hour response promise, business phone

On contact submission:
- Admin notification: subject "New Contact Request — {name}", all contact details
- Customer acknowledgment: subject "We Received Your Message — Seattle Luxury Drive"

---

## RLS Summary

booking_requests: INSERT public, SELECT/UPDATE admin only
contact_requests: INSERT public, SELECT/UPDATE admin only
vehicles: SELECT public (active only), all mutations admin only
vehicle_images: SELECT public, all mutations admin only

---

## Environment Variables

Server-only (never NEXT_PUBLIC_):
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY

Public (NEXT_PUBLIC_):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GA_ID

---

## Business Details

Starting price: $350/hour

Service area (11 cities): Seattle, Bellevue, Redmond, Kirkland, Mercer Island, Lynnwood, Everett, Edmonds, Mukilteo, Tacoma, SeaTac Airport

Fleet at launch: 1 vehicle — 2021 Rolls-Royce

Business model: Concierge-first, manual reservations, offline payments, 4-business-hour response commitment

---

## What Is Explicitly Out of Scope

- Online payments
- Customer accounts or dashboard
- Automated booking approval
- Availability calendars
- SMS notifications
- City-specific landing pages (Phase 2)
