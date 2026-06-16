> **Read this file first.**

# Claude Bootstrap

## Purpose

This is the context file for Claude Code when starting a development session on the Seattle Luxury Drive project. Read this file before reading anything else. Then read the spec file most relevant to the task at hand.

**Do not redesign. Do not add features. Do not remove approved requirements.**

All product decisions are already made and documented. If something in the specs seems wrong or missing, flag it — do not silently change it.

---

## What This Project Is

A premium luxury transportation marketing website and lead-generation platform.

NOT a booking platform. NOT an e-commerce site. NOT a marketplace.

The site collects booking inquiries via a 3-step form and stores them for manual follow-up by the concierge team. No payments. No customer accounts. No availability calendars.

---

## Stack

- Next.js 15 App Router (TypeScript)
- Tailwind CSS + Shadcn UI
- Supabase (PostgreSQL + Auth + Storage + RLS)
- Vercel (hosting + edge functions)
- Resend (transactional email)
- Google Analytics 4

---

## Source of Truth Order

When documents conflict, use this hierarchy (highest authority first):

1. specs/design/design-decision-log.md
2. Approved Figma designs
3. specs/docs/02-ux-specification.md
4. specs/docs/05-technical-specification.md
5. specs/docs/AI_CONTEXT.md

---

## Absolute Rules

1. Use `next/image` for every image. Never use raw `<img>`.
2. Use `next/font` for Cormorant Garamond and Inter. No Google Fonts CDN links.
3. Server Components by default. Add `'use client'` only when browser APIs or interactivity are required.
4. All form mutations use Server Actions. No client-side fetch to Supabase.
5. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. Server-only.
6. Never prefix private credentials with `NEXT_PUBLIC_`.
7. All `/admin/*` routes are protected by `middleware.ts`. Do not build admin pages without this working.
8. Validate all form input on the server, not just the client.
9. Every public form must include a honeypot field check and rate limiting before inserting into the database.
10. All emails are sent via Resend server-side, non-blocking (do not await email in the critical path if it risks slowing the response).

---

## Environment Variables

Server-only (never NEXT_PUBLIC_):
- `SUPABASE_SERVICE_ROLE_KEY` — admin DB operations
- `RESEND_API_KEY` — sending email

Public:
- `NEXT_PUBLIC_SUPABASE_URL` — browser Supabase client
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — browser Supabase client (RLS enforced)
- `NEXT_PUBLIC_GA_ID` — Google Analytics

---

## Database Tables (Quick Reference)

**vehicles** — Fleet management. Public SELECT (active only). Admin mutations.
**vehicle_images** — Vehicle photos. Public SELECT. Admin mutations.
**booking_requests** — Booking inquiries from the public form. Public INSERT, admin SELECT/UPDATE.
**contact_requests** — Contact form submissions. Public INSERT, admin SELECT/UPDATE.

Full schema: see `specs/docs/05-technical-specification.md` → Database Schema section.
RLS policies: same document → Row Level Security section.

---

## Key Routes

Public: /, /fleet, /fleet/[slug], /services, /about, /faq, /contact, /book, /book/confirmation, /privacy-policy

Admin: /admin/login (public), /admin, /admin/bookings, /admin/bookings/[id], /admin/vehicles, /admin/vehicles/new, /admin/vehicles/[id], /admin/contacts

---

## Booking Form (3 Steps)

Step 1 — Your Trip: Service type, vehicle, rental type, dates, times, locations
Step 2 — Your Details: Name, email, phone, preferred contact method
Step 3 — Review & Submit: Occasion (optional), special requests (optional), review summary, privacy consent

On submit: insert to booking_requests → send emails → redirect to /book/confirmation

---

## Colors (Tailwind Config Required)

- `black`: #090909
- `charcoal`: #151515
- `gold`: #B89B5E
- `offwhite`: #F5F2EA

These must be added as custom colors in `tailwind.config.ts`.

---

## Typography

Headings: Cormorant Garamond (serif, editorial)
Body: Inter (sans-serif, clean)

Both loaded via `next/font/google`.

---

## Content Files

All site copy is in `specs/content/`:
- `homepage-copy.md` — hero, services, vehicle, testimonials, process, CTA
- `services-copy.md` — 8 services with descriptions and benefits
- `about-copy.md` — story, mission, values, service area
- `faq-copy.md` — 15+ Q&A across categories
- `contact-copy.md` — contact page + booking page + form states copy
- `brand-voice.md` — tone guidelines, words to use/avoid
- `testimonials.md` — strategy and placeholder content

Vehicle details: `specs/content/vehicles/rolls-royce-2021.md` — STATUS: PENDING. Use "2021 Rolls-Royce" as a neutral placeholder until the file is completed.

---

## Specs Reference

- Requirements: `specs/docs/01-mvp-requirements.md`
- UX: `specs/docs/02-ux-specification.md`
- Design System: `specs/docs/03-design-system.md`
- Technical: `specs/docs/05-technical-specification.md`
- Page Map: `specs/content/page-map.md`
- Implementation Order: `specs/content/implementation-plan.md`

---

## What Is Out of Scope

Do not build:
- Online payment processing
- Customer login or dashboard
- Automated booking confirmation
- Availability calendar or scheduling
- SMS notifications
- City-specific landing pages

If asked to implement any of the above, flag it and defer to Phase 2/3.
