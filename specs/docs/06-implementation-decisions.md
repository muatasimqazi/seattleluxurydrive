# Implementation Decisions and Deviations

## Purpose

Records decisions made during implementation (Phases 1–8) that differ from the original specification, along with the rationale. This is the authoritative reference for "what was actually built."

---

## Stack Additions and Changes

### Supabase Client Library

**Spec:** `@supabase/auth-helpers-nextjs` (`createMiddlewareClient`, `createServerComponentClient`, `createClientComponentClient`)

**Built:** `@supabase/ssr` — `createServerClient` and `createBrowserClient`

**Why:** `@supabase/auth-helpers-nextjs` is deprecated as of 2024. `@supabase/ssr` is the current official replacement and works correctly with Next.js 15 App Router.

Utility wrappers live in:
- `lib/supabase/server.ts` — `createClient()` (read-only, uses anon key) and `createServiceClient()` (admin, uses service role key). **Both are async** and must be `await`ed.
- `lib/supabase/client.ts` — `createBrowserClient()` for client components
- `middleware.ts` — uses `createServerClient` from `@supabase/ssr` (not `createMiddlewareClient`)

---

### Tailwind CSS Version

**Spec:** Standard Tailwind CSS v3 with `tailwind.config.ts`

**Built:** Tailwind CSS v4 — CSS-based configuration via `@import "tailwindcss"` and `@theme inline` blocks in `app/globals.css`. No `tailwind.config.ts` file exists.

**Why:** Next.js 15 + Shadcn scaffold defaulted to Tailwind v4.

**Impact:** Tailwind v4 uses canonical class names. Notable differences:
- `aspect-[4/3]` → `aspect-4/3`
- `h-[2px]` → `h-0.5`
- `lg:w-[480px]` → `lg:w-120`
- `focus:z-[100]` → `focus:z-100`
- `outline outline-2 outline-gold` → `outline-2 outline-gold` (no bare `outline` class)

---

### PostHog Analytics

**Spec:** Google Analytics 4 only

**Built:** GA4 + PostHog (`posthog-js`)

**Why:** Owner already had a PostHog account and API key.

PostHog is initialized in `components/providers/PostHogProvider.tsx`:
- `person_profiles: "identified_only"` — no anonymous profiles
- `capture_pageview: false` — manual `$pageview` fires via `usePathname`/`useSearchParams`
- `capture_pageleave: true`
- Inner `PostHogPageView` component wrapped in `<Suspense fallback={null}>` (required for `useSearchParams` in App Router)
- `PostHogProvider` wraps the body in `app/layout.tsx`

---

## New Environment Variables

**Spec:** 5 variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_GA_ID, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY)

**Built:** 9 variables (4 added):

| Variable | Side | Purpose |
|---|---|---|
| `RESEND_FROM_EMAIL` | Server | Sender address for all outbound emails |
| `ADMIN_NOTIFICATION_EMAIL` | Server | Inbox for booking and contact notifications |
| `NEXT_PUBLIC_POSTHOG_KEY` | Public | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Public | PostHog instance URL |

`RESEND_FROM_EMAIL` and `ADMIN_NOTIFICATION_EMAIL` allow the sending address and admin inbox to be configured per environment without code changes.

---

## Database Schema Changes

### contact_requests — name split

**Spec:**
```
name  TEXT NOT NULL
```

**Built:**
```
first_name  TEXT NOT NULL
last_name   TEXT NOT NULL
```

**Why:** Email templates address the customer by first name. A single `name` field would require splitting in every email template. The server action splits the form's `name` input on the first space character to produce `first_name` / `last_name`.

---

### contact_requests — status values

**Spec:** `New | Responded | Closed`

**Built:** `new | contacted | resolved` (all lowercase)

**Why:** Lowercase status values are consistent with booking_requests and simplify SQL comparisons.

---

### booking_requests — status values

**Spec:** `Pending | Contacted | Approved | Declined | Completed`

**Built:** `new | contacted | confirmed | cancelled` (all lowercase)

**Why:** Simpler workflow. "Pending" → "new", "Approved" → "confirmed", removed "Declined"/"Completed" in favor of "cancelled" for the MVP.

Status transitions:
- `new` → `contacted`
- `new` → `confirmed`
- `new` → `cancelled`
- `contacted` → `confirmed`
- `contacted` → `cancelled`

---

### booking_requests — estimated_hours type

**Spec:** `INTEGER`

**Built:** `NUMERIC`

**Why:** `NUMERIC` allows fractional hours (e.g., 1.5) without a schema migration if needed later.

---

### booking_requests — columns not populated in MVP

The following columns are defined in the spec's schema but **not populated** by the current server action. They can exist in the table without causing errors:

- `vehicle_id` — booking form does not ask the customer to choose a specific vehicle
- `ip_address` — rate limiting is not implemented; IP capture was omitted
- `utm_source`, `utm_medium`, `utm_campaign` — UTM capture not implemented
- `responded_at` — not tracked in MVP
- `admin_notes` — admin detail view does not have a notes textarea

These columns may be added in Phase 2 when rate limiting and UTM tracking are implemented.

---

## Spam Prevention

### Honeypot field name

**Spec:** Hidden field named `website`

**Built:** Hidden field named `_hp`

**Why:** `_hp` is less recognizable to bots that specifically target the `website` field name.

### Rate limiting

**Spec:** Max 3 requests per IP per 15 minutes; return HTTP 429 on excess

**Built:** Not implemented

**Status:** Explicitly deferred. Both server actions have a comment indicating where rate limiting should be inserted. Implement before launch using an in-memory map or Upstash Redis.

---

## Admin Dashboard

### Vehicle management — deferred

**Spec:** `/admin/vehicles`, `/admin/vehicles/new`, `/admin/vehicles/[id]` with image upload and reorder

**Built:** Not implemented

**Status:** Deferred to after launch. The admin sidebar contains the Vehicles link but the routes do not exist. Initial vehicle data will be seeded directly in Supabase.

---

### Booking list — simplified

**Spec:** Pagination (25/page), search by name/email, filter by status and date range, sort options

**Built:** Status filter via `?status=` query param only. No pagination, no search, no date range filter, no sort toggle.

**Status:** Acceptable for MVP (low volume). Add pagination + search if list grows beyond ~100 rows.

---

### Booking detail — simplified

**Spec:** Status update dropdown, admin notes textarea (autosave), responded_at display

**Built:** Status update via server action buttons (new | contacted | confirmed | cancelled). No admin notes textarea. No responded_at display.

---

### Contact requests — card layout

**Spec:** Table with separate detail view, pagination, search, status filter

**Built:** Card layout with message displayed inline. Status update buttons on each card. No pagination, no search, no separate detail view.

---

## SEO Implementation

### Implemented

- Per-page metadata (title, description, canonical, Open Graph) — all public pages
- LocalBusiness schema — homepage only (not contact page)
- FAQPage schema — FAQ page
- `app/sitemap.ts` — static routes + dynamic vehicle routes (graceful fallback)
- `app/robots.ts` — disallows /admin/ and /admin
- `app/opengraph-image.tsx` — Next.js built-in OG image generation (1200×630, edge runtime). Not in original spec.

### Not implemented

| Schema | Spec requirement | Status |
|---|---|---|
| Organization | All pages (root layout) | Deferred |
| WebSite | Homepage | Deferred |
| BreadcrumbList | All interior pages | Deferred |
| LocalBusiness on /contact | Contact page | Deferred |

### robots.ts deviation

**Spec:** `Disallow: /book/confirmation`

**Built:** `/book/confirmation` not listed in robots.txt. The page has `robots: { index: false }` in its page metadata instead, which achieves the same result via `X-Robots-Tag`.

---

## Homepage

### Testimonials section

**Built:** Section is present in the component tree but hidden (`hidden`) pending real customer reviews.

### Service area

**Spec:** 11 cities

**Built:** 12 cities — Shoreline added as the business address is 14723 Aurora Ave N, Shoreline, WA 98133.

### priceRange in LocalBusiness schema

**Spec:** `"$$$"`

**Built:** `"$$"` — adjusted to reflect the actual price point positioning.

---

## Accessibility (Phase 8 additions beyond spec)

The Phase 8 spec listed a general audit checklist. The following specific patterns were implemented and should be preserved:

**Mobile navigation drawer:**
- `role="dialog"` + `aria-modal="true"` on drawer
- Focus moves to close button on open; returns to hamburger on close
- Tab/Shift-Tab focus trap within drawer — queries all focusable elements, wraps at boundaries
- Escape key closes drawer
- `aria-expanded` on hamburger button, `aria-controls="mobile-drawer"`

**FAQ accordion:**
- Each trigger wrapped in `<h3>` for heading hierarchy
- `aria-controls={panelId}` on trigger, `role="region"` + `aria-labelledby={btnId}` on panel
- Panels use `hidden` attribute (not conditional render) — required for `aria-controls` to point to an existing DOM element
- `aria-current` on active category nav button
- Category content area has `aria-live="polite"` + `aria-atomic="true"`

**Booking form:**
- Chip button groups use `<fieldset>` + `<legend>` for semantic grouping
- Each chip button has `aria-pressed`
- Privacy consent uses `role="checkbox"` + `aria-checked` (not a native checkbox — custom styled button)
- All inputs have `id` / `htmlFor` pairing, `aria-describedby` pointing to error ID, `aria-invalid` when error present
- `FieldError` has `id` prop and `role="alert"` for live announcement
- Required field asterisks have `aria-hidden="true"` + adjacent `<span className="sr-only">(required)</span>`

**Contact form:**
- Same `aria-describedby` / `aria-invalid` / `role="alert"` pattern as booking form
- Error banner has `role="alert"`

---

## Server Action Constraints

**"use server" files can only export async functions** — no exported objects or constants. This affected `app/actions/booking.ts`:

- `INITIAL_BOOKING_STATE` was initially exported from the server action file → build error
- Moved to `components/booking/BookingForm.tsx` (client component)
- Import in BookingForm is type-only: `import { submitBookingRequest, type BookingFormState }`

**`createServiceClient()` is async** — must be `await`ed in every server action that needs the service role client. Forgetting this causes a TypeScript error: `Property 'from' does not exist on type 'Promise<SupabaseClient...>'`.

---

## Multi-Step Form Pattern

The booking form's 3-step UX with a single server action uses this pattern:

- Steps 1 and 2 collect data in React state
- Step 3 renders a `<form action={formAction}>` with all Step 1 + 2 data as hidden `<input>` elements
- `useActionState(submitBookingRequest, INITIAL_BOOKING_STATE)` is used directly — the action is a true server action reference, not a client-side wrapper
- The server action reads all fields from native `FormData`

This avoids the need for multi-step server action chaining or session storage.

---

## Bug Fixed During Documentation Update

`app/sitemap.ts` had `.eq("is_active", true)` — the vehicles table uses `status = 'active'`, not an `is_active` boolean. Fixed to `.eq("status", "active")`.
