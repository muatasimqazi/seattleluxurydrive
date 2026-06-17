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
- `lib/supabase/server.ts` — `createClient()` (async, read-only, uses anon key) and `createServiceClient()` (synchronous, admin, uses service role key, bypasses RLS). **Only `createClient()` is async.** `createServiceClient()` is synchronous — do NOT `await` it.
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

**Built:** Implemented — `lib/rate-limit.ts` uses a module-level `Map` keyed by IP address. Limit: 3 requests per IP per 15-minute window. Both `app/actions/booking.ts` and `app/actions/contact.ts` call `checkRateLimit()` before any DB or email operation.

**Trade-off:** In-memory Map resets on cold starts (acceptable for MVP on Vercel). IP extracted from `x-forwarded-for` header. Upgrade to Upstash Redis for persistent rate limiting in Phase 2 if needed.

---

## Admin Dashboard

### Vehicle management — built

**Spec:** `/admin/vehicles`, `/admin/vehicles/new`, `/admin/vehicles/[id]` with image upload and reorder

**Built:** All three routes implemented:
- `/admin/vehicles` — list view with active/archived status and featured toggle
- `/admin/vehicles/new` — create form using `useActionState` for inline error handling; redirects to edit on success
- `/admin/vehicles/[id]/edit` — edit form + image upload + image delete; note the path uses `/edit` suffix (not bare `[id]`)

Image reorder via `sort_order` integer input (drag-and-drop not implemented — manual sort_order editing).

Add Vehicle form uses `useActionState` (React 19) rather than a plain form action, so DB errors surface inline instead of throwing unhandled.

---

### Booking list — fully implemented

**Spec:** Pagination (25/page), search by name/email, filter by status and date range, sort options

**Built:** `?q=` search (first_name, last_name, email ilike), `?status=` filter, `?page=` pagination (25/page via `.range()` + `count: exact`). Date range filter and sort toggle not implemented.

`buildHref()` helper in the page preserves active filters when switching pages or vice versa.

---

### Booking detail — fully implemented

**Spec:** Status update dropdown, admin notes textarea (autosave), responded_at display

**Built:** Status update via server action form buttons (new | contacted | confirmed | cancelled). `AdminNotesForm` client component uses `useActionState` with a Save button. `responded_at` set automatically on first status change out of `new` (fetches current status before update to avoid overwriting). All three displayed in the detail page.

---

### Contact requests — fully implemented

**Spec:** Table with separate detail view, pagination, search, status filter

**Built:** Card layout with message displayed inline (no separate detail view). `?q=`, `?status=`, `?page=` params; search via ilike on first_name/last_name/email; 25/page pagination. `ContactNotesForm` client component on each card for inline notes. `responded_at` shown in card header when set.

---

## SEO Implementation

### Implemented

- Per-page metadata (title, description, canonical, Open Graph) — all public pages
- LocalBusiness schema — homepage and /contact page (dynamic from `getSettings()`, with geo coordinates and 12-city areaServed)
- FAQPage schema — FAQ page and Vehicle Detail page FAQ section
- Organization schema — all public pages via `app/(site)/layout.tsx`
- WebSite schema — all public pages via `app/(site)/layout.tsx`
- BreadcrumbList schema — all interior public pages (about, fleet, fleet/[slug], services, faq, contact, book, privacy-policy). Fleet detail breadcrumb includes dynamic vehicle name as third crumb.
- `app/sitemap.ts` — static routes + dynamic vehicle routes (graceful fallback)
- `app/robots.ts` — disallows /admin/ and /admin
- `app/opengraph-image.tsx` — Next.js built-in OG image generation (1200×630, edge runtime). Not in original spec.

### robots.ts deviation

**Spec:** `Disallow: /book/confirmation`

**Built:** `/book/confirmation` not listed in robots.txt. The page has `robots: { index: false }` in its page metadata instead, which achieves the same result via `X-Robots-Tag`.

### Organization schema placement deviation

**Spec:** Organization schema in root layout (all pages including admin)

**Built:** Organization + WebSite schemas in `app/(site)/layout.tsx` — scoped to public pages only, which is the correct intent.

---

## Homepage

### Testimonials section

**Built:** Section is live with two placeholder reviews (Marcus T. — Airport Transfer; Jennifer & David M. — Anniversary Evening). Copy is intentionally placeholder and should be replaced with real client reviews before or shortly after launch.

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

**`createServiceClient()` is synchronous** — do NOT `await` it. It returns a `SupabaseClient` directly. Only `createClient()` is async (it needs to read cookies). Incorrectly `await`ing `createServiceClient()` causes a TypeScript error: `Property 'from' does not exist on type 'Promise<SupabaseClient...>'`.

---

## Multi-Step Form Pattern

The booking form's 3-step UX with a single server action uses this pattern:

- Steps 1 and 2 collect data in React state
- Step 3 renders a `<form action={formAction}>` with all Step 1 + 2 data as hidden `<input>` elements
- `useActionState(submitBookingRequest, INITIAL_BOOKING_STATE)` is used directly — the action is a true server action reference, not a client-side wrapper
- The server action reads all fields from native `FormData`

This avoids the need for multi-step server action chaining or session storage.

---

## Storage Bucket Name

**Spec:** `vehicle-images`

**Built:** `vehicle` — renamed during initial setup for simplicity.

Upload path format: `vehicle/{vehicle_id}/{filename}` (e.g. `vehicle/2f51f.../image-1.jpg`)

Public URL format: `https://{project}.supabase.co/storage/v1/object/public/vehicle/{vehicle_id}/{filename}`

---

## Bug Fixed During Documentation Update

`app/sitemap.ts` had `.eq("is_active", true)` — the vehicles table uses `status = 'active'`, not an `is_active` boolean. Fixed to `.eq("status", "active")`.

---

## (site) Route Group — Not In Spec

**Spec:** All public pages directly under `app/` with SiteNav + SiteFooter in the root layout.

**Built:** Public pages moved to `app/(site)/` route group. `app/(site)/layout.tsx` holds SiteNav and SiteFooter. Root `app/layout.tsx` stripped to html/body/fonts/analytics only.

**Why:** SiteNav is `position: fixed` with a high z-index. When it was in the root layout it rendered on admin pages too, blocking click targets on `/admin/vehicles`. The route group scopes nav to public pages without any URL changes (parenthesized folder names are invisible to the Next.js router).

Result: all public URLs are unchanged. Admin pages render no site navigation.

---

## site_settings Table — Not In Spec

**Built:** A `site_settings` key-value table in Supabase allows admin-editable content without a code deploy.

Admin UI: `/admin/settings`

Utility: `lib/settings.ts` — exports `getSettings()` (async, merges DB over defaults, falls back to defaults on error) and re-exports `phoneHref()` from `lib/utils.ts`.

Keys: `site_name`, `site_address`, `contact_phone`, `contact_email`, `starting_rate`, `response_hours`, `hours_days`, `hours_open`, `hours_close`, `image_home_hero`, `image_service_area`, `image_about_brand`.

Phone numbers, email, and address throughout the public site and JSON-LD schemas are pulled from `getSettings()` rather than hardcoded.

RLS: public SELECT (anon key), UPDATE admin only (service role key).

---

## Privacy Policy

**Spec:** Placeholder acceptable before development; full copy required before launch.

**Built:** Full 12-section policy is live at `/privacy-policy`. Covers: information collected, how it is used, third-party providers (Google Analytics, PostHog, Resend, Supabase), cookies, data retention, privacy rights, security, children's privacy, policy changes, and contact details. Phone/email/address pulled dynamically from `getSettings()`. Page is marked `robots: noindex`.

**Note:** Copy was AI-generated and has not been reviewed by a qualified attorney. Legal review is recommended before launch.

---

## X-Frame-Options Deviation

**Spec:** `X-Frame-Options: SAMEORIGIN`

**Built:** `X-Frame-Options: DENY` — stricter, prevents all framing including same-origin. No business requirement for same-origin iframes exists.

---

## Role-Based Access Control (RBAC)

**Spec:** Admin role only (MVP). Manager/Concierge listed as future roles.

**Built:** Two roles — `admin` and `staff` — implemented via a `profiles` table.

### profiles table

```sql
id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
role       TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff'))
full_name  TEXT
created_at TIMESTAMPTZ DEFAULT now()
```

RLS: users can SELECT their own row. All writes go through `createServiceClient()` (service role bypasses RLS).

### Enforcement layers

**1. `lib/auth.ts`:**
- `getCurrentUserRole()` — async, wrapped in React `cache()`. Fetches auth user via `createClient()`, then profile via `createServiceClient()`. Returns `'admin' | 'staff' | null`. One DB call per request regardless of how many components call it.
- `requireAdmin()` — calls `getCurrentUserRole()`, redirects to `/admin?blocked=1` if not admin.

**2. Page-level:** Settings, vehicles/new, vehicles/[id]/edit call `await requireAdmin()` at the top of the page component.

**3. Server action-level:** All vehicle mutations and settings/site-image actions call `assertAdmin()` (local helper that calls `getCurrentUserRole()` and throws `"Forbidden"` if not admin). This means direct form POSTs are also blocked even if a staff user bypasses the UI.

**4. UI-level:** Admin sidebar hides Settings and Team nav items for staff. Vehicles list hides Add Vehicle button, Edit links, Archive/Restore, and Featured toggle. Role label shown under email in sidebar.

**5. Middleware:** Unchanged — still session-only check. Role enforcement happens in pages and actions, not in middleware (avoids a DB call on every request).

### Access matrix

| Area | Admin | Staff |
|---|---|---|
| Dashboard | ✅ | ✅ |
| Bookings (list + detail + notes) | ✅ | ✅ |
| Contacts (list + notes) | ✅ | ✅ |
| Vehicles list (read-only) | ✅ | ✅ |
| Add / edit / delete vehicles | ✅ | ✗ |
| Site settings | ✅ | ✗ |
| Team management | ✅ | ✗ |

### Provisioning

Admin creates users via **Authentication → Users → Invite** in the Supabase dashboard or via the `/admin/users` Team page. Profile row is created on invite with the specified role.

First admin must be seeded manually:
```sql
INSERT INTO public.profiles (id, role) VALUES ('<auth-user-id>', 'admin');
```

---

## UTM Capture, IP Address, Admin Notes, responded_at

**Spec:** Defined in schema, implementation deferred.

**Built (now implemented):**

- **UTM capture** — `BookingForm.tsx` reads `utm_source`, `utm_medium`, `utm_campaign` from `useSearchParams()` on mount and passes them as hidden inputs in Step 3. Server action stores them in `booking_requests`. `BookingForm` is wrapped in `<Suspense fallback={null}>` in `book/page.tsx` (required for `useSearchParams` in App Router).

- **IP address** — `checkRateLimit()` in `lib/rate-limit.ts` extracts IP from `x-forwarded-for` header and returns `{ allowed, ip }`. Both `booking.ts` and `contact.ts` destructure `ip` from the return value and store it in the DB.

- **Admin notes** — `AdminNotesForm` (bookings) and `ContactNotesForm` (contacts) are client components using `useActionState`. Each calls `updateBookingNotes` / `updateContactNotes` server actions. Notes are nullable text, saved with a button (not autosaved).

- **responded_at** — Set in `updateBookingStatus` and `updateContactStatus` server actions: fetch current status first; if currently `new` and moving to any other status and `responded_at` is not already set, stamp it with the current timestamp.

---

## Team Management Page

**Not in spec.** Built as `/admin/users` (admin only).

Uses `supabase.auth.admin.listUsers()` (service role) to fetch all auth users, joined with the `profiles` table.

Features:
- **Invite** — `inviteUserByEmail(email)` sends a Supabase invite email; profile row with the selected role is created immediately so role is set before the invitee accepts.
- **Role toggle** — server action form buttons (same pattern as booking/contact status buttons). Cannot change own role.
- **Status** — Active (email confirmed) vs Pending (invite sent, not accepted).
- **Remove** — `supabase.auth.admin.deleteUser(id)` (cascades to profiles). Cannot remove self.

Nav item "Team" added to `NAV_ADMIN_ONLY` in admin layout (hidden from staff).

---

## Figma Design Reconciliation (Typography & Visual Polish)

Audit conducted against Figma file `jZygZG4CqGO86BPn8O87fK` (Foundations page — design tokens only, no page screens). All changes align the site to the Figma type scale and color palette.

### Typography Scale (Figma → Code)

| Level | Figma | Implementation |
|---|---|---|
| Display/Hero | 72px Light CG | `text-5xl lg:text-7xl font-light` (H1 hero) |
| H1 | 56px Light CG | `text-5xl font-light` |
| H2 | 44px Light CG | `text-4xl lg:text-5xl font-light` |
| H3 | 36px Regular CG | `text-3xl font-normal` |
| H4 | 28px Medium CG | `text-xl font-medium` (dt, sub-headings) |
| H5 | 22px Medium CG | `text-lg lg:text-xl font-medium` (FAQ questions) |
| Body/Small | 14px Regular Inter | `text-sm` |
| Label/CTA | 14px Medium Inter ↑ | `text-sm font-medium uppercase tracking-[0.2em]` |
| Label/Eyebrow | 12px Regular Inter ↑↑ | `text-xs uppercase tracking-[0.25em]` |
| Body/Quote | 20px Italic CG | `text-xl italic` |

**What changed:** Previously the site used `text-[10px]` (eyebrow) and `text-[11px]` (CTA) custom sizes. All replaced with standard Tailwind classes. H3 was `font-light` — changed to `font-normal`. H4/H5 level items were `font-light` — changed to `font-medium`. Blockquote was missing `italic`.

### Color Tokens

All Figma color tokens confirmed matching. One new token added:

- `--color-gold-dark: #9A7E47` — Gold Dark, confirmed in Figma palette, added to `@theme inline` in `app/globals.css`.

### Font Rendering

Changed `body` class from `antialiased` to `subpixel-antialiased` in `app/layout.tsx`. `-webkit-font-smoothing: antialiased` thins strokes significantly on Mac, making fonts appear lighter than Figma's rendering. Subpixel antialiasing matches Figma's weight more closely.

### Hero Section

- **Overlay darkened:** `from-black/40 via-black/60` → `from-black/80 via-black/70`. Previous values left the nav area (top of hero) at only 40% opacity, making gold/white text unreadable against the hero image.
- **Trust bar repositioned:** Moved out of the vertically-centered content block and absolutely positioned to `bottom-0`. Previously it floated in the middle of the viewport as part of the centered flex container.

### Logo Mark

The SJD monogram in SiteNav and SiteFooter changed from `text-offwhite` to `text-gold` to use the brand accent color for the mark, consistent with the admin sidebar.
