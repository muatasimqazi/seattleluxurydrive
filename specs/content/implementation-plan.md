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

## Phase 1 — Project Foundation

**Estimated effort: 1–2 days**

Deliverables:

- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS with custom design tokens (colors, spacing, typography from design system)
- [ ] Install and configure Shadcn UI
- [ ] Install and configure next/font (Cormorant Garamond + Inter)
- [ ] Create .env.local with all 5 required environment variables
- [ ] Create Supabase project and run all database migrations
  - [ ] vehicles table
  - [ ] vehicle_images table
  - [ ] booking_requests table
  - [ ] contact_requests table
  - [ ] All indexes
  - [ ] All RLS policies
- [ ] Vercel project connected to repository
- [ ] Environment variables set in Vercel
- [ ] Configure next.config.ts (image remote patterns, security headers)
- [ ] Create middleware.ts (admin route protection)

Definition of done: `npm run dev` starts without errors, Supabase tables exist with correct schema, /admin redirects to /admin/login when unauthenticated.

---

## Phase 2 — Global Layout and Navigation

**Estimated effort: 1–2 days**

Deliverables:

- [ ] Root layout (app/layout.tsx) with font, GA4 script, metadata defaults
- [ ] Desktop navigation component with phone number and Request Reservation CTA
- [ ] Mobile navigation (hamburger + drawer)
- [ ] Skip-to-content link
- [ ] Footer with navigation links, phone, email, privacy policy link
- [ ] 404 page (app/not-found.tsx)
- [ ] 500 error page (app/error.tsx)

Definition of done: All pages share the same navigation and footer. Admin and public routes load correctly. 404 and error pages render with brand styling.

---

## Phase 3 — Core Public Pages

**Estimated effort: 3–4 days**

Deliverables:

- [ ] Homepage (app/page.tsx) — all 9 sections
- [ ] Fleet page (app/fleet/page.tsx) — vehicle grid from database
- [ ] Vehicle Detail page (app/fleet/[slug]/page.tsx) — dynamic route from vehicles table

Definition of done: Homepage renders all sections with real copy. Fleet page displays active vehicles from Supabase. Vehicle detail page resolves by slug and displays gallery, specs, and rental options. `next/image` used for all images.

---

## Phase 4 — Supporting Public Pages

**Estimated effort: 2–3 days**

Deliverables:

- [ ] Services page (app/services/page.tsx) — 8 service sections
- [ ] About page (app/about/page.tsx)
- [ ] FAQ page (app/faq/page.tsx) — accordion with categories
- [ ] Contact page (app/contact/page.tsx) — contact form + Google Maps embed
- [ ] Privacy policy page (app/privacy-policy/page.tsx)

Definition of done: All pages render with correct copy from content files. FAQ accordion works. Contact form is wired to the server action (Phase 5).

---

## Phase 5 — Booking Flow and Email

**Estimated effort: 3–4 days**

Deliverables:

- [ ] Booking request page (app/book/page.tsx) — 3-step form with progress indicator
- [ ] Booking confirmation page (app/book/confirmation/page.tsx)
- [ ] Booking form server action:
  - [ ] Honeypot check
  - [ ] Rate limiting by IP
  - [ ] Server-side validation (all fields)
  - [ ] Insert into booking_requests (service role key)
  - [ ] Send admin notification email via Resend
  - [ ] Send customer confirmation email via Resend
- [ ] Contact form server action:
  - [ ] Honeypot check
  - [ ] Server-side validation
  - [ ] Insert into contact_requests
  - [ ] Send admin notification email
  - [ ] Send customer acknowledgment email
- [ ] All email templates (React Email components)
  - [ ] Admin booking notification
  - [ ] Customer booking confirmation
  - [ ] Admin contact notification
  - [ ] Customer contact acknowledgment

Definition of done: Booking form completes all 3 steps, submits to Supabase, sends both emails within 60 seconds, and redirects to /book/confirmation. Contact form submits and sends both emails. Honeypot and rate limiting work as specified.

---

## Phase 6 — Admin Dashboard

**Estimated effort: 3–4 days**

Deliverables:

- [ ] Admin login page (app/admin/login/page.tsx)
- [ ] Admin dashboard overview (app/admin/page.tsx) — stats and recent activity
- [ ] Bookings list (app/admin/bookings/page.tsx) — paginated, searchable, filterable
- [ ] Booking detail view (app/admin/bookings/[id]/page.tsx) — status update, notes
- [ ] Vehicles list (app/admin/vehicles/page.tsx)
- [ ] Vehicle create (app/admin/vehicles/new/page.tsx)
- [ ] Vehicle edit (app/admin/vehicles/[id]/page.tsx) — with image upload and reorder
- [ ] Contacts list (app/admin/contacts/page.tsx)

Definition of done: Admin can log in, view and manage all booking requests (search, filter, update status, add notes), manage vehicles (create, edit, upload images), and view contact requests. All admin routes redirect to /admin/login when unauthenticated.

---

## Phase 7 — SEO and Analytics

**Estimated effort: 1–2 days**

Deliverables:

- [ ] Per-page metadata (title, description, Open Graph) for all public pages
- [ ] Structured data (JSON-LD) for all applicable pages:
  - [ ] LocalBusiness (Home, Contact)
  - [ ] Organization (all pages, in layout)
  - [ ] WebSite (Home)
  - [ ] BreadcrumbList (all interior pages)
  - [ ] FAQPage (FAQ page, Vehicle Detail FAQ section)
- [ ] sitemap.ts (app/sitemap.ts)
- [ ] robots.ts (app/robots.ts)
- [ ] GA4 event tracking (all events from spec)

Definition of done: Every public page has a unique title and description. Structured data validates in Google's Rich Results Test. Sitemap returns all active public routes. GA4 events fire correctly in browser.

---

## Phase 8 — Performance and Accessibility Audit

**Estimated effort: 1–2 days**

Deliverables:

- [ ] Lighthouse audit on all primary pages (target: Performance 90+, Accessibility 95+, SEO 95+)
- [ ] Resolve any Lighthouse failures
- [ ] Keyboard navigation test across all interactive components
- [ ] Screen reader test on booking form
- [ ] Contrast ratio check on all text combinations
- [ ] Mobile responsiveness check at 375px, 768px, 1280px

Definition of done: All primary public pages pass Lighthouse targets. Booking form is keyboard-navigable. No critical WCAG AA failures.

---

## Total Estimated Effort

Phase 1: 1–2 days
Phase 2: 1–2 days
Phase 3: 3–4 days
Phase 4: 2–3 days
Phase 5: 3–4 days
Phase 6: 3–4 days
Phase 7: 1–2 days
Phase 8: 1–2 days

Total: 15–23 development days (3–5 weeks)

---

## Launch Checklist

Before going live:

- [ ] All content deliverables received and integrated (no placeholder copy)
- [ ] Real testimonials replace all placeholders
- [ ] Phone number and email are correct in navigation, footer, emails, and all copy
- [ ] Privacy policy copy finalized and published
- [ ] Supabase RLS policies verified — public cannot read booking or contact data
- [ ] Admin account created in Supabase Auth
- [ ] Admin email notifications tested end-to-end
- [ ] Customer confirmation emails tested end-to-end
- [ ] Honeypot and rate limiting tested
- [ ] All Lighthouse targets met on staging
- [ ] Google Analytics confirmed receiving data
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile claimed and linked
- [ ] Domain CNAME / DNS configured
- [ ] SSL certificate active
- [ ] Vercel production deployment verified
