# Design Gaps

## Purpose

This document tracks open content and design questions organized by what they block. Use this to determine what must be resolved before each phase can proceed.

---

## Blocking Figma Design

These items must be resolved before the indicated Figma phases can be finalized.

### Non-Hourly Rental Pricing
Blocking: Phase 4 (Fleet & Vehicle Detail), Phase 6 (Booking Flow)

The booking form Step 1 includes Rental Type: Hourly / Full Day / Multi-Day. It is unclear whether Full Day and Multi-Day have flat rates or different pricing logic. Until resolved, design with "Contact for pricing" for non-hourly types.

- [ ] Full Day pricing structure (flat rate or calculated from hourly?)
- [ ] Multi-Day pricing structure (daily rate?)
- [ ] Minimum booking duration for hourly rentals (1 hour minimum? 2 hours?)
- [ ] Maximum advance booking window (how far in advance can a customer book?)

### Service Section Photography
Blocking: Phase 5 (Services page — final design)

Each of the 8 service sections requires a contextually relevant image. Placeholder photography may be used in initial design mocks but should be replaced before final approval.

- [ ] Executive Transportation image
- [ ] Chauffeur Service image
- [ ] Airport Transfers image
- [ ] VIP Transportation image
- [ ] Corporate Events image
- [ ] Special Occasions image
- [ ] Weddings & Celebrations image
- [ ] Photoshoots & Productions image

Interim approach: Use existing SJD promotional artwork or high-quality luxury stock photography as placeholders. Label clearly in Figma as placeholder.

---

## Blocking Final Vehicle Detail Page

These items do **not** block the Design System, Homepage, Services, About, FAQ, Contact, or Booking Flow phases.

They block only the final accuracy of the Vehicle Detail page (/fleet/[slug]) and Fleet page (/fleet).

- [ ] Exact Rolls-Royce model (Phantom, Ghost, Cullinan, Wraith, Spectre?)
- [ ] Vehicle exterior color
- [ ] Vehicle interior color
- [ ] Passenger capacity
- [ ] Vehicle features and amenities list
- [ ] Vehicle photography — minimum 8 cinematic high-resolution images

Interim approach: Design all Vehicle Detail and Fleet screens using "2021 Rolls-Royce" as the vehicle label. Use placeholder photography. Do not invent model-specific specifications. Mark vehicle copy sections as pending in Figma. Update and confirm before development begins on the vehicle detail page.

---

## Blocking Production Launch

These must be resolved before the website can go live. They do not block Figma design or development.

- [ ] Business phone number (required in navigation, footer, emails, and all copy)
- [ ] Business email address (required in footer, contact page, and email templates)
- [ ] Business hours (required on contact page)
- [ ] Admin notification email address (required for Resend configuration)
- [ ] Privacy Policy copy (required before GA4 and data collection can be active — may use a legal template)
- [ ] Vehicle photography finalized (required to replace placeholders before launch)
- [ ] Service section photography finalized (required to replace placeholders before launch)
- [ ] Non-hourly pricing confirmed (required for vehicle detail page and FAQ accuracy)

Note: Real testimonials are **not** required for launch. If unavailable, the testimonials section is hidden in production. See specs/content/testimonials.md for the full policy.

---

## Open Design Questions

These are unresolved design decisions. Answer before the relevant Figma phase is finalized.

- [ ] Should the homepage hero display the phone number inline, or only in the navigation bar?
- [ ] Should the Fleet page hero use a static full-bleed image or a subtle looping video of the vehicle?
- [ ] Should service pages use individual SEO-friendly URLs (/services/airport-transfers) or anchor sections on a single /services page?
- [ ] Should the footer include a Google Business Profile link once the profile is claimed?
- [ ] Should the testimonials section include a "Read more reviews on Google" link, or keep it self-contained?

---

## Resolved Gaps

Move items here when confirmed.

- ✅ Hero headline: "Seattle's Premier Luxury Transportation Experience." (confirmed)
- ✅ Booking form structure: 3 steps — Your Trip / Your Details / Review & Submit (confirmed)
- ✅ Services count: 8 services (confirmed — Executive Transportation, Chauffeur Service, Airport Transfers, VIP Transportation, Corporate Events, Special Occasions, Weddings & Celebrations, Photoshoots & Productions)
- ✅ Response time commitment: 4 business hours (confirmed, consistent across all docs)
- ✅ Testimonials not required for launch: section hidden if no real reviews exist (confirmed)
