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

- [x] Business phone number — **(206) 669-1109** (updated in nav, footer, contact page 2026-06-16)
- [x] Business email address — **info@seattleluxurydrive.com** (updated in footer, contact page 2026-06-16)
- [x] Business address — **14723 Aurora Ave N, Shoreline, WA 98133** (confirmed 2026-06-16)
- [ ] Business hours — currently showing Mon–Sun · 7am–10pm as placeholder; confirm actual hours
- [ ] Admin notification email address (required for Resend configuration)
- [ ] Privacy Policy copy (required before GA4 and data collection can be active — may use a legal template)
- [ ] Vehicle photography finalized (required to replace placeholders before launch)
- [ ] Service section photography finalized (required to replace placeholders before launch)
- [ ] Non-hourly pricing confirmed (required for vehicle detail page and FAQ accuracy)
- [ ] Real testimonials — minimum 3 client quotes with first name, last initial, and service used (section is hidden in production if unavailable at launch)

---

## Design Gaps Found in Phase 7 Review (2026-06-16)

These items were identified during the full cross-reference of all Figma screens against the UX spec and MVP requirements.

### Fixed — Already Corrected in Figma

- [x] Contact page address label said "Service Area" — corrected to "Address" (desktop 120:45, mobile 120:139)
- [x] Preferred Contact Method options were "Phone / Email / Either" — corrected to "Phone Call / Text Message / Email" per spec (desktop + mobile Step 2)
- [x] Booking Step 3 submit button said "Submit Reservation Request" — corrected to "Send Request" per spec (desktop 125:157, mobile 126:358)
- [x] Service area city list included "Bothell" but omitted the business city — replaced with "Shoreline" (desktop 72:41, mobile 81:25)
- [x] Mobile homepage had a stale footer copyright override from before component update — corrected to "© 2026 Seattle Luxury Drive. All rights reserved." (81:108)
- [x] Nav and footer tagline said "LUXURY CAR RENTALS" — corrected to "SEATTLE LUXURY DRIVE" across all components

### Flagged for Developer Implementation (not design gaps)

These require conditional/dynamic behavior that is implemented in code, not static design. The design shows the field locations and layout; developers implement the interaction logic.

- **Booking Step 1 — Vehicle selector**: Spec requires a vehicle card display (image, name, price) that is pre-selected when only one vehicle is active. Since only one vehicle exists at launch, dev should render it as a pre-selected static display. Design shows the step layout; no Figma screen change needed.
- **Booking Step 1 — End Date conditional field**: Shown and required when Rental Type is Full Day or Multi-Day. Dev shows/hides this field based on selection. Annotate in development handoff.
- **Booking Step 3 — Occasion field**: Should be a `<select>` dropdown (Wedding, Corporate Event, Airport Transfer, Date Night, Photoshoot, Music Video, Special Occasion, Other). Currently shown as a text input in the design mock. Dev implements as a styled select/dropdown using the design system input style.
- **Booking form — inline field validation errors**: Spec requires errors shown below each invalid field on blur and submit. Design shows the general error banner state. Dev implements per-field inline validation using the existing input/error style tokens.
- **Confirmation page — personalized greeting**: Spec says "Thank you, [First Name]." and trip summary display. These are dynamic values populated by the server. Dev implements; design shows the layout without personalized data.

### Design Gaps — Still Open

These are screens or sections called for in the spec that were not built.

- [x] **Mobile Menu Drawer** — Built 2026-06-16 on 🧭 Navigation page (node 144:2). Full-height 390×812px overlay: SJD logo + "SEATTLE LUXURY DRIVE" tagline, × close button, 5 nav links with chevrons and gold dividers, "CALL US DIRECTLY" label + (206) 669-1109 in Cormorant Garamond, REQUEST RESERVATION gold CTA.
- [x] **Contact page — Google Maps section** — Built 2026-06-16. "Find Us in Shoreline" section inserted before footer on both desktop (120:3, now 2,516px) and mobile (120:110, now 2,462px). Full-bleed placeholder map area with location pin, address overlay card (name, address, phone, hours), and "GOOGLE MAPS EMBED" watermark for dev reference.
- [ ] **Privacy Policy page** — Required route `/privacy-policy`. Not designed (acceptable — copy is pending and not required before dev). Placeholder page or standard document layout can be scaffolded in code without a Figma design.

### Acceptable Deviations From Spec

These deviate from the original spec but the deviation is intentional and an improvement.

- **FAQ categories**: Spec listed Booking, Chauffeur Services, Pricing, Airport Transfers, Service Areas. Built as General, Chauffeur & Self-Drive, Booking & Reservations, Pricing & Payments, Vehicle & Fleet. The built set better fits a single-vehicle fleet launch. "Airport Transfers" and "Service Areas" content is covered within the existing categories. Can be revisited before development if preferred.
- **Service area city list**: Spec listed 11 cities (including Lynnwood, Everett, Edmonds, Mukilteo). Design shows 12 cities with a different eastside/southside mix (Issaquah, Sammamish, Renton, Woodinville). Shoreline added (business location). Update the city list in copy and code to match wherever the business actually serves.
- **Booking confirmation page**: Spec specifies trip summary (service type, date, pickup location) and a phone number "Need to reach us sooner?" section. Built version shows "What Happens Next" numbered steps instead of a trip summary. The "What Happens Next" approach is warmer for a concierge service. Dev should add the phone number fallback link below the card.

---

## Open Design Questions

These are unresolved design decisions. Answer before the relevant Figma phase is finalized.

- [ ] Should the homepage hero display the phone number inline, or only in the navigation bar?
- [ ] Should the Fleet page hero use a static full-bleed image or a subtle looping video of the vehicle?
- [ ] Should service pages use individual SEO-friendly URLs (/services/airport-transfers) or anchor sections on a single /services page?
- [ ] Should the footer include a Google Business Profile link once the profile is claimed?
- [ ] Should the testimonials section include a "Read more reviews on Google" link, or keep it self-contained?
- [ ] What are the actual business hours? (currently Mon–Sun · 7am–10pm as placeholder in footer and contact page)

---

## Resolved Gaps

- ✅ Hero headline: "Seattle's Premier Luxury Transportation Experience." (confirmed)
- ✅ Booking form structure: 3 steps — Your Trip / Your Details / Review & Submit (confirmed)
- ✅ Services count: 8 services (confirmed — Executive Transportation, Chauffeur Service, Airport Transfers, VIP Transportation, Corporate Events, Special Occasions, Weddings & Celebrations, Photoshoots & Productions)
- ✅ Response time commitment: 4 business hours (confirmed, consistent across all docs)
- ✅ Testimonials not required for launch: section hidden if no real reviews exist (confirmed)
- ✅ Business phone number: (206) 669-1109 (confirmed 2026-06-16)
- ✅ Business email address: info@seattleluxurydrive.com (confirmed 2026-06-16)
- ✅ Business address: 14723 Aurora Ave N, Shoreline, WA 98133 (confirmed 2026-06-16)
- ✅ Brand name: SJD monogram + Seattle Luxury Drive as public DBA (confirmed 2026-06-16)
- ✅ Preferred Contact Method options: Phone Call / Text Message / Email (aligned with spec 2026-06-16)
- ✅ Submit button label: "Send Request" (aligned with spec 2026-06-16)
- ✅ Service area city list: Shoreline added, replacing Bothell (2026-06-16)
