
# Technical Specification

## Purpose

This document defines the architecture, technology stack, database schema, integrations, deployment strategy, and implementation requirements for the Seattle Luxury Drive MVP.

This specification serves as the implementation contract for Claude Code.

---

# Architecture Overview

## Application Type

Marketing website with inquiry management.

The application is not a booking platform.

The primary objective is lead generation and concierge-style reservation requests.

---

## Stack

Frontend:

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Shadcn UI

Backend:

- Supabase (PostgreSQL, Auth, Storage, RLS)

Hosting:

- Vercel

Email:

- Resend

Analytics:

- Google Analytics 4
- Google Search Console

---

# Route Structure

## Public Routes

/

/fleet

/fleet/[slug]

/services

/about

/contact

/faq

/book

/book/confirmation

/privacy-policy

---

## Admin Routes

/admin/login

/admin

/admin/bookings

/admin/bookings/[id]

/admin/contacts

/admin/vehicles

/admin/vehicles/new (admin only)

/admin/vehicles/[id]/edit (admin only)

/admin/services (admin only)

/admin/services/[id]/edit (admin only)

/admin/settings (admin only)

/admin/users (admin only — team management)

---

# Authentication

## Scope

Authentication is required only for admin users.

Public users do not create accounts.

Public users do not log in.

---

## Admin Authentication

Provider: Supabase Auth

Admin login page: /admin/login

Roles:

- Admin — full access: bookings, contacts, vehicles (CRUD), settings, team management
- Staff — restricted access: bookings and contacts only; vehicle list is read-only; no access to settings or team management

Role stored in `public.profiles` table (id FK → auth.users, role text CHECK ('admin' | 'staff')).

Role enforcement: `lib/auth.ts` — `getCurrentUserRole()` (React cache, one DB fetch per request) and `requireAdmin()` (redirect to /admin?blocked=1 if not admin). Page-level and action-level guards — middleware remains session-only.

---

## Admin Route Protection — middleware.ts

All routes matching /admin/:path* must be protected.

Middleware behavior:

- Check for active Supabase session
- No session and accessing any route other than /admin/login → redirect to /admin/login
- Active session and accessing /admin/login → redirect to /admin
- Active session and accessing /admin/* → allow

Implementation:

- Use createMiddlewareClient from @supabase/auth-helpers-nextjs
- Match pattern: ['/admin/:path*']
- Refresh session on each request to handle token expiry

---

# Database Schema

## services

```
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
eyebrow     TEXT NOT NULL                        -- display number e.g. "01"
name        TEXT NOT NULL
headline    TEXT NOT NULL                        -- italic subheading
description TEXT NOT NULL
benefits    TEXT[] NOT NULL DEFAULT '{}'         -- bulleted list items
cta         TEXT NOT NULL                        -- button label
image_url   TEXT NOT NULL DEFAULT ''             -- per-service photo (site-images bucket)
sort_order  INTEGER NOT NULL DEFAULT 0
status      TEXT NOT NULL DEFAULT 'active'       -- 'active' | 'archived'
created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
```

RLS: public SELECT on `status = 'active'`; authenticated users can INSERT/UPDATE/DELETE.

Seeded with 8 services via migration `007_services.sql`. Managed via `/admin/services`.

---

## vehicles

```
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
slug            TEXT UNIQUE NOT NULL
name            TEXT NOT NULL
year            INTEGER NOT NULL
make            TEXT NOT NULL
model           TEXT NOT NULL
description     TEXT
starting_hourly_rate  NUMERIC(10, 2)
chauffeur_available   BOOLEAN DEFAULT true
featured        BOOLEAN DEFAULT false
status          TEXT DEFAULT 'active'  -- 'active' | 'archived'
created_at      TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at      TIMESTAMP WITH TIME ZONE DEFAULT now()
```

---

## vehicle_images

```
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
vehicle_id  UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE
image_url   TEXT NOT NULL
alt_text    TEXT
sort_order  INTEGER DEFAULT 0
created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
```

---

## booking_requests

```
id                       UUID PRIMARY KEY DEFAULT gen_random_uuid()
first_name               TEXT NOT NULL
last_name                TEXT NOT NULL
email                    TEXT NOT NULL
phone                    TEXT NOT NULL
pickup_location          TEXT NOT NULL
dropoff_location         TEXT
vehicle_id               UUID REFERENCES vehicles(id)
service_type             TEXT NOT NULL  -- 'Self Drive' | 'Chauffeur'
rental_type              TEXT NOT NULL  -- 'Hourly' | 'Full Day' | 'Multi-Day'
start_date               DATE NOT NULL
start_time               TIME NOT NULL
end_date                 DATE
estimated_hours          INTEGER
occasion                 TEXT
special_requests         TEXT
preferred_contact_method TEXT NOT NULL  -- 'Phone Call' | 'Text Message' | 'Email'
status                   TEXT DEFAULT 'Pending'
admin_notes              TEXT
ip_address               TEXT
utm_source               TEXT
utm_medium               TEXT
utm_campaign             TEXT
responded_at             TIMESTAMP WITH TIME ZONE
created_at               TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at               TIMESTAMP WITH TIME ZONE DEFAULT now()
```

Status values: Pending | Contacted | Approved | Declined | Completed

responded_at: Set automatically when status is first changed from Pending to any other value.

ip_address: Stored for spam detection. Not displayed in customer-facing contexts.

utm_source / utm_medium / utm_campaign: Captured from URL query parameters on page load and stored with the submission for marketing attribution.

---

## contact_requests

```
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
name         TEXT NOT NULL
email        TEXT NOT NULL
phone        TEXT NOT NULL
message      TEXT NOT NULL
status       TEXT DEFAULT 'New'  -- 'New' | 'Responded' | 'Closed'
admin_notes  TEXT
responded_at TIMESTAMP WITH TIME ZONE
ip_address   TEXT
created_at   TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now()
```

---

## Database Indexes

```sql
-- booking_requests
CREATE INDEX idx_booking_requests_status ON booking_requests(status);
CREATE INDEX idx_booking_requests_start_date ON booking_requests(start_date);
CREATE INDEX idx_booking_requests_created_at ON booking_requests(created_at DESC);
CREATE INDEX idx_booking_requests_email ON booking_requests(email);

-- contact_requests
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- vehicle_images
CREATE INDEX idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX idx_vehicle_images_sort_order ON vehicle_images(vehicle_id, sort_order);
```

---

# Row Level Security (RLS) Policies

Enable RLS on all tables.

---

## vehicles

```sql
-- Public can read active vehicles
CREATE POLICY "vehicles_select_public"
  ON vehicles FOR SELECT
  USING (status = 'active');

-- Admin can read all vehicles including archived
CREATE POLICY "vehicles_select_admin"
  ON vehicles FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin only for mutations
CREATE POLICY "vehicles_insert_admin"
  ON vehicles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicles_update_admin"
  ON vehicles FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicles_delete_admin"
  ON vehicles FOR DELETE
  USING (auth.role() = 'authenticated');
```

---

## vehicle_images

```sql
-- Public can read vehicle images
CREATE POLICY "vehicle_images_select_public"
  ON vehicle_images FOR SELECT
  USING (true);

-- Admin only for mutations
CREATE POLICY "vehicle_images_insert_admin"
  ON vehicle_images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_update_admin"
  ON vehicle_images FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_delete_admin"
  ON vehicle_images FOR DELETE
  USING (auth.role() = 'authenticated');
```

---

## booking_requests

```sql
-- Public can insert (form submission from unauthenticated users)
CREATE POLICY "booking_requests_insert_public"
  ON booking_requests FOR INSERT
  WITH CHECK (true);

-- Admin only can read
CREATE POLICY "booking_requests_select_admin"
  ON booking_requests FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin only can update
CREATE POLICY "booking_requests_update_admin"
  ON booking_requests FOR UPDATE
  USING (auth.role() = 'authenticated');

-- No delete policy (use status field for soft management)
```

---

## contact_requests

```sql
-- Public can insert (contact form from unauthenticated users)
CREATE POLICY "contact_requests_insert_public"
  ON contact_requests FOR INSERT
  WITH CHECK (true);

-- Admin only can read
CREATE POLICY "contact_requests_select_admin"
  ON contact_requests FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin only can update
CREATE POLICY "contact_requests_update_admin"
  ON contact_requests FOR UPDATE
  USING (auth.role() = 'authenticated');
```

Note: Use the Supabase service role key (server-only) for admin dashboard operations that need to bypass RLS. Never expose the service role key to the browser.

---

# Spam Prevention

Both public form server actions must implement the following checks before inserting into the database.

---

## Honeypot Check

The booking form and contact form each contain a hidden input named `website`.

Server action logic:

1. Check if `website` field is present in form data.
2. If the `website` field contains any value: return a success-like response (HTTP 200) but do not insert into the database, do not send any email, and do not log an error.
3. If the `website` field is empty: proceed with validation and insertion.

This prevents alerting bots that they have been detected.

---

## Rate Limiting

Implement via Vercel Edge Middleware or a simple in-memory rate limit within the server action using the IP address from request headers.

Limit: 3 requests per IP address per 15 minutes.

On limit exceeded:

- Return HTTP 429
- Response body: `{ error: "Too many requests. Please try again later or call us directly at [phone]." }`
- Do not insert into database
- Do not send email

IP address capture: Extract from `x-forwarded-for` header in the server action. Store the IP in ip_address column for audit purposes.

---

# Booking Status Workflow

State transitions:

Pending → Contacted
Pending → Declined
Contacted → Approved
Contacted → Declined
Approved → Completed
Any state → Declined

When status changes from Pending to any other state for the first time:
- Set responded_at to current timestamp

---

# File Storage

Provider: Supabase Storage

---

## vehicle-images bucket

- Access: Public read
- Upload: Authenticated admin only
- Accepted types: image/jpeg, image/png, image/webp
- Max file size: 10MB per image
- Path format: vehicles/{vehicle_id}/{uuid}.{ext}

---

## Storage Security

Configure bucket policy to allow public GET requests.

Restrict PUT, POST, DELETE to authenticated users only via Supabase Storage policies.

---

# Admin Dashboard

## Dashboard Overview

Display:

- Total booking requests (all time)
- Pending booking requests (count)
- New contact requests (count)
- Recent activity (5 most recent bookings)
- Active fleet count

---

## Booking Management

Table columns:

- Created date
- Customer name
- Service type
- Start date
- Status (badge)
- Actions (View, Update Status)

Pagination: 25 per page

Search: By customer name or email

Filters: By status, by date range (start_date field)

Sort: By created_at descending (default), created_at ascending, start_date ascending

Detail view (/admin/bookings/[id]):

- All booking fields displayed
- Status update dropdown
- Admin notes textarea (autosave or save button)
- responded_at display
- Customer contact quick-links (tel: and mailto:)

---

## Vehicle Management

List view: all vehicles including archived.

Create/Edit form fields: all vehicle table fields.

Image management: Upload, reorder (drag or sort order input), delete.

---

## Contact Management

Table columns:

- Created date
- Name
- Email
- Status
- Actions (View, Mark Completed)

Pagination: 25 per page

Search: By name or email

Filter: By status

---

# Form Handling

## Server Actions

All form mutations use Next.js Server Actions.

No API routes for form submission.

---

## Booking Request Form — Server Action

1. Parse form data
2. Check honeypot field — if filled, return success response without processing
3. Check rate limit by IP address
4. Validate all required fields server-side
5. Insert into booking_requests table (using Supabase service role key)
6. Send admin notification email via Resend (async, do not block response)
7. Send customer confirmation email via Resend (async, do not block response)
8. Return success response

---

## Contact Form — Server Action

1. Parse form data
2. Check honeypot field — if filled, return success response without processing
3. Validate all required fields server-side
4. Insert into contact_requests table
5. Send admin notification email via Resend (async)
6. Send customer acknowledgment email via Resend (async)
7. Return success response

---

# Email Integration

Provider: Resend

Send all emails from: a verified domain email (example: hello@seattleluxurydrive.com)

All email templates use React Email components for consistent, brand-aligned HTML rendering.

---

## Booking Request — Admin Notification

Sent to: Admin email address

Subject: New Booking Request — {first_name} {last_name}

Body includes:

- Customer: full name, email, phone, preferred contact method
- Trip: service type, vehicle, rental type, start date, start time, end date or estimated hours
- Locations: pickup location, dropoff location
- Details: occasion, special requests
- Direct link to admin booking detail page

---

## Booking Request — Customer Confirmation

Sent to: Submitted email address

Subject: Your Reservation Request — Seattle Luxury Drive

Body includes:

- Greeting: "Hi {first_name},"
- Confirmation: "We've received your reservation request."
- Trip summary: service type, date, pickup location
- Response time: "A member of our concierge team will contact you within 4 business hours."
- Direct contact: business phone number (tel: link), business email
- Footer with Privacy Policy link

---

## Contact Request — Admin Notification

Sent to: Admin email address

Subject: New Contact Request — {name}

Body includes:

- Name, email, phone, message
- Received timestamp
- Link to admin contacts page

---

## Contact Request — Customer Acknowledgment

Sent to: Submitted email address

Subject: We Received Your Message — Seattle Luxury Drive

Body includes:

- Greeting with name
- Confirmation message received
- Expected response time
- Business phone number for immediate contact

---

# SEO Implementation

## Per-Page Metadata

Every page uses Next.js 15 Metadata API.

Each page exports a `metadata` object or `generateMetadata` function with:

- title (unique per page)
- description (unique per page, 150–160 characters)
- openGraph.title
- openGraph.description
- openGraph.images (array with 1200x630 image)
- openGraph.type
- alternates.canonical (absolute URL)

---

## Structured Data

Implement via JSON-LD script tags in each page's `<head>`.

### LocalBusiness Schema

Pages: Home, Contact

Includes:

- @type: LocalBusiness
- name: "Seattle Luxury Drive"
- description
- telephone
- email
- address
- areaServed (list of 11 cities)
- url
- priceRange: "$$$"

---

### Organization Schema

Pages: All pages (in root layout)

Includes:

- @type: Organization
- name
- url
- logo
- contactPoint

---

### WebSite Schema

Page: Home only

Includes:

- @type: WebSite
- name
- url
- potentialAction (SearchAction)

---

### BreadcrumbList Schema

Pages: All interior pages (not Home)

Structure reflects page hierarchy.

Example for /fleet/rolls-royce-phantom:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "/fleet" },
    { "@type": "ListItem", "position": 3, "name": "Rolls-Royce Phantom", "item": "/fleet/rolls-royce-phantom" }
  ]
}
```

---

### FAQPage Schema

Pages: FAQ page, Vehicle Detail page (FAQ section)

Each question-answer pair included as a Question entity.

---

### Vehicle Schema (Phase 2)

Deferred to Phase 2.

---

## sitemap.ts

File location: app/sitemap.ts

Static routes to include:

- /
- /fleet
- /services
- /about
- /faq
- /contact
- /book
- /privacy-policy

Dynamic routes:

- /fleet/[slug] for each vehicle where status = 'active'

Generated with appropriate lastModified, changeFrequency, and priority values.

Exclude all /admin/* routes.

---

## robots.ts

File location: app/robots.ts

Rules:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /book/confirmation

Sitemap: https://seattleluxurydrive.com/sitemap.xml
```

---

# next.config.ts

Required configuration:

## Image Remote Patterns

Allow images from Supabase Storage domain:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

## Security Headers

Apply via `headers()` configuration:

- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

Content Security Policy (CSP) — relaxed for MVP but defined:

- default-src: 'self'
- script-src: 'self' 'unsafe-inline' (required for GA4 and JSON-LD) https://www.googletagmanager.com
- style-src: 'self' 'unsafe-inline' https://fonts.googleapis.com
- font-src: 'self' https://fonts.gstatic.com
- img-src: 'self' data: *.supabase.co
- connect-src: 'self' *.supabase.co https://www.google-analytics.com

---

# Error Pages

## 404 Not Found — app/not-found.tsx

Display:

- Brand-consistent layout (dark background, logo in header)
- Headline: Page Not Found
- Message: "The page you're looking for doesn't exist or has been moved."
- Primary CTA: Return Home
- Secondary CTA: Contact Us
- Phone number visible

---

## 500 Error — app/error.tsx

Display:

- Brand-consistent layout
- Headline: Something Went Wrong
- Message: "We're experiencing a technical issue. Please try again or contact us directly."
- Phone number (large, clickable)
- Email address
- Primary CTA: Try Again (triggers `reset()` from error boundary props)
- Secondary CTA: Return Home

---

# Analytics

## Google Analytics 4

Track the following events:

| Event Name | Trigger |
|---|---|
| page_view | Every page (automatic) |
| booking_form_start | User begins Step 1 of booking form |
| booking_form_step_2 | User advances to Step 2 |
| booking_form_step_3 | User advances to Step 3 |
| booking_form_submit | User clicks Send Request |
| booking_form_success | Successful submission (redirect to confirmation) |
| contact_form_submit | User submits contact form |
| contact_form_success | Successful contact form submission |
| cta_click | Any primary CTA button click (include button label in event data) |
| phone_number_click | User taps phone number (tel: link) |

---

## Google Search Console

At launch:

- Submit sitemap URL
- Verify domain ownership
- Monitor Core Web Vitals reports

---

# Performance Requirements

Lighthouse targets (all primary public pages):

- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

Implementation requirements:

- Use `next/image` for all images. Never use raw `<img>` tags.
- Specify `width` and `height` props on all `<Image>` components to prevent layout shift.
- Use `priority` prop on above-the-fold images (hero images).
- Use `loading="lazy"` (default) on below-fold images.
- Route-based code splitting (default in App Router — maintain this, do not bundle everything in layout).
- Server Components by default. Use `'use client'` only when interactivity or browser APIs are required.
- Font optimization: use `next/font` for Cormorant Garamond and Inter to eliminate font render-blocking.
- Minimize use of large client-side JavaScript bundles. Prefer server-rendered content.

---

# Security Requirements

- Validate all form input on both client and server side.
- Server-side validation must not trust client-side validation as a substitute.
- Use Server Actions for all form mutations. No client-side API routes for mutations.
- Protect all /admin/* routes via middleware (see Middleware section).
- Enable RLS on all Supabase tables (see RLS Policies section).
- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser. Use server-only contexts only.
- Never use NEXT_PUBLIC_ prefix for any private credentials.
- Restrict Supabase Storage uploads to authenticated admin users only.
- Sanitize all user-submitted text before rendering in the admin dashboard (prevent stored XSS).
- Implement honeypot spam prevention on all public forms.
- Implement rate limiting on all public form server actions.
- Apply security headers in next.config.ts (see above).
- Do not log or expose customer PII in error messages or client-side console logs.

---

# Environment Variables

## Server-Only (Never use NEXT_PUBLIC_ prefix)

SUPABASE_SERVICE_ROLE_KEY

Used for admin dashboard queries that bypass RLS. Must never be exposed to the browser.

RESEND_API_KEY

Used for sending transactional emails. Server-only.

---

## Public (Safe to expose, required in browser)

NEXT_PUBLIC_SUPABASE_URL

Supabase project URL. Used by the browser Supabase client.

NEXT_PUBLIC_SUPABASE_ANON_KEY

Supabase anonymous key. Used for public queries (fleet display) and unauthenticated form insertions (with RLS policies enforcing security).

NEXT_PUBLIC_GA_ID

Google Analytics measurement ID.

---

## Required for all environments

All five variables must be present in:

- .env.local (local development — not committed to version control)
- Vercel project environment variables (staging and production)

Add .env.local to .gitignore. Never commit credentials to the repository.

---

# Future Roadmap

## Phase 2

- Online payments (Stripe)
- City-specific SEO landing pages
- Availability calendar (view-only, no booking enforcement)
- Blog or content hub
- Vehicle Schema structured data
- Automated follow-up email sequences

## Phase 3

- Customer accounts and dashboard
- Real-time availability management
- Driver mobile app
- Digital agreements and e-signatures
- Fleet scheduling tools
- SMS notifications (Twilio)
- Loyalty and membership programs

---

# Implementation Notes For Claude Code

Priority order:

1. Correctness and security first
2. Performance second
3. Maintainability third

Key rules:

- All database mutations use the service role key on the server. All public reads use the anon key.
- All /admin/* routes are protected by middleware before any page renders.
- Server Actions handle all form submissions. Never submit forms directly to Supabase from the browser.
- Use `next/image` everywhere. No exceptions.
- Use `next/font` for all custom fonts.
- Keep Server Components as the default. Add `'use client'` only when necessary.
- Error boundaries at the page level for all admin routes.
- All emails are non-blocking — fire and do not await in the critical path if using background email sending is not available. Prefer using async email sending that does not block the user response.

The application is a premium lead-generation platform. Speed of response and form reliability are more important than any visual feature.
