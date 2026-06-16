
# UX Specification

## Purpose

This document defines the user experience, information architecture, page structure, navigation patterns, and layout requirements for the Seattle Luxury Drive MVP.

The website should feel like a premium executive transportation and luxury concierge brand.

Primary inspiration:

- Blacklane
- NetJets
- Rolls-Royce
- Four Seasons

Avoid:

- Turo
- Enterprise
- Hertz
- Generic limousine websites

---

# User Personas

## Persona 1 — Corporate Executive

Goals:

- Book reliable airport transportation
- Arrange corporate meeting transport
- Find professional executive-grade service quickly

Success Criteria:

- Professional, authoritative presentation
- Fast path to booking inquiry (under 3 clicks)
- High trust signals visible immediately

Pain Points:

- Uncertainty about reliability and professionalism
- Wasted time on forms that don't lead to confirmation
- Inability to reach someone directly if they have questions

---

## Persona 2 — VIP Client

Goals:

- Chauffeur-driven luxury experience
- Concierge-level personalized service
- Exclusive, discreet transportation

Success Criteria:

- Premium visual presentation that signals exclusivity
- Clear chauffeur service availability
- Easy way to describe specific needs

Pain Points:

- Services that feel mass-market or generic
- No indication of the level of service to expect
- Lack of a direct contact method

---

## Persona 3 — Special Occasion Customer

Goals:

- Wedding or event transportation
- Photoshoot or production vehicle
- Milestone celebration experience

Success Criteria:

- Luxury imagery that sells the experience visually
- Clear pricing expectations before committing to the form
- Easy booking inquiry with space for event details

Pain Points:

- Uncertainty about vehicle availability for their specific event
- Pricing that requires a phone call to discover at all
- Generic transportation services that don't understand event needs

---

# Site Map

Home

Fleet
└── Vehicle Detail (/fleet/[slug])

Services

About

FAQ

Contact

Booking Request (/book)
└── Booking Confirmation (/book/confirmation)

Privacy Policy

---

# Global Navigation

## Desktop Navigation

Layout (left to right):

- Logo (left)
- Home / Fleet / Services / About / FAQ / Contact (center)
- Phone number with phone icon (right, clickable tel: link)
- Request Reservation CTA button (right, gold)

Behavior:

- Transparent background over hero sections
- Transitions to solid Charcoal (#151515) background after 80px scroll
- Active page link highlighted with gold underline or color
- Phone number remains visible at all scroll positions

---

## Mobile Navigation

Layout:

- Logo (left)
- Phone number (center or below logo, clickable)
- Hamburger icon (right)

Menu Drawer (slides in from right):

- Close button
- Navigation links (full width, generous tap targets)
- Phone number (large, prominent)
- Request Reservation CTA button

---

# Home Page

## Hero Section

Goal: Establish premium positioning within 3 seconds.

Layout: Full-viewport height, full-bleed image or subtle video background.

Visual: Cinematic Rolls-Royce photography, dark overlay for text legibility.

Content:

Headline: Seattle's Premier Luxury Transportation Experience.

Subheadline: Luxury chauffeur services, executive transportation, airport transfers, and exclusive vehicle rentals throughout the Greater Seattle Area. From corporate travel to special occasions, Seattle Luxury Drive delivers a personalized, white-glove experience from start to finish.

Primary CTA: Request Reservation (gold button)

Secondary CTA: Explore Fleet (ghost button)

---

## Services Overview

Display 3 featured service cards.

Services shown:

- Executive Transportation
- Airport Transfers
- VIP Transportation

Each card:

- Icon or image
- Service name
- 1–2 sentence description
- Learn More CTA

---

## Featured Vehicle

Magazine-style layout with editorial photography.

Display:

- Full-bleed or large featured image of the 2021 Rolls-Royce
- Vehicle name
- Starting at $350/hour
- Self-drive available / Chauffeur available
- CTA: View Vehicle (links to fleet detail page)

---

## Why Choose SJD

Four-column or two-by-two pillar layout.

Pillars:

- White Glove Service
- Flexible Pickup & Delivery
- Chauffeur Available
- Seattle Based

Each pillar: thin line icon (gold), title, 1–2 sentence description.

---

## Testimonials

Three-column testimonial card grid (stacked on mobile).

Per card:

- Decorative quotation mark (gold)
- Client quote
- Client name (first name + last initial)
- Service type used

Section headline: What Our Clients Say

Background: Charcoal or Black (alternating from surrounding sections).

---

## Service Area

Layout: Two-column — city list on one side, Seattle skyline imagery on the other.

Headline: Serving the Greater Seattle Area

City list:

- Seattle
- Bellevue
- Redmond
- Kirkland
- Mercer Island
- Lynnwood
- Everett
- Edmonds
- Mukilteo
- Tacoma
- SeaTac Airport

---

## Reservation Process

Step-by-step visual layout.

Steps:

1. Submit Request
2. Speak With Concierge
3. Confirm Details
4. Enjoy The Experience

Each step: number, icon, label, brief description.

---

## Final CTA

Full-width CTA banner.

Headline: Reserve Your Experience

CTA: Request Reservation

---

# Fleet Page

## Hero

Headline: Our Fleet

Subheadline: Curated luxury vehicles for executive transportation and premium experiences.

---

## Vehicle Grid

Supports single vehicle at launch; scales to multiple vehicles without layout changes.

Vehicle Card:

- Image (4:3 ratio)
- Vehicle name (year, make, model)
- Starting price (gold)
- Chauffeur availability badge
- Short description
- View Details CTA

---

# Vehicle Detail Page

## Above The Fold

Display:

- Large vehicle image or image gallery
- Vehicle name (H1)
- Starting price: Starting at $350/hour
- Key specifications (year, capacity, key features)
- Primary CTA: Request Reservation
- Secondary CTA: Call Now (tel: link)

---

## Vehicle Overview

Full description of the vehicle.

Features and amenities listed (bulleted).

---

## Rental Options

Two-option display:

- Self Drive — description, availability, notes
- With Chauffeur — description, availability, professional driver notes

---

## Gallery

Desktop: Masonry or editorial grid layout.

Mobile: Swipeable carousel (touch-enabled).

Image count: minimum 4, no maximum.

---

## Vehicle FAQ

Accordion layout.

Minimum 3 vehicle-specific questions and answers.

---

## CTA Section

Full-width banner.

CTA: Request Reservation

---

# Services Page

## Hero

Headline: Luxury Transportation Services

Subheadline: Personalized executive transportation and concierge experiences throughout the Greater Seattle Area.

---

## Service Sections

One section per service, alternating image left/right layout.

Services:

1. Executive Transportation
2. Chauffeur Service
3. Airport Transfers
4. VIP Transportation
5. Corporate Events
6. Special Occasions
7. Weddings & Celebrations
8. Photoshoots & Productions

Each section:

- Large image (contextually relevant to service)
- Headline
- Description (2+ paragraphs)
- Benefits list (3–5 bullet points)
- CTA: Request Reservation

---

# About Page

## Hero

Headline: About Seattle Luxury Drive

---

## Company Story

Founder story and company origin.

---

## Mission

Company mission statement.

---

## Values

Brand values (3–5).

---

## Service Commitment

Luxury service promise.

---

## Service Area

Brief coverage overview with city list.

---

## CTA

Request Reservation

---

# Contact Page

## Hero

Headline: Contact Us

---

## Contact Information

Display prominently above the form:

- Phone number (large, gold, clickable)
- Email address (clickable)
- Business hours

---

## Contact Form

Fields:

- Name (required)
- Email (required)
- Phone (required)
- Message (required)

### Validation

- All fields required
- Email must be valid format
- Phone must be valid US format
- Message minimum 10 characters

### States

Loading: Submit button shows spinner, fields disabled.

Success: Form replaced with success panel — "Message Sent. We'll be in touch shortly."

Error: Inline error banner above form. "Something went wrong. Please try again or call us directly at [phone number]."

Submit Button Label: Send Message

---

## Map Section

Google Maps embed showing Seattle area service coverage.

---

# FAQ Page

## Layout

Accordion layout.

Category navigation at the top (tabs or anchor links).

---

## Categories

- Booking
- Chauffeur Services
- Pricing
- Airport Transfers
- Service Areas

Minimum 3 questions per category.

---

## Accessibility

Each accordion item uses correct ARIA:

- `aria-expanded` on the trigger
- `aria-controls` linking to the panel
- Panel uses `role="region"`

---

# Booking Request Page

## Goal

Maximize qualified inquiry submissions while maintaining premium brand experience.

---

## Layout

- Page headline: Request a Reservation
- Subheadline: Complete the form below and a member of our concierge team will contact you within 4 business hours.
- Progress indicator (3 steps visible)
- Form section below

---

## Multi-Step Form

### Progress Indicator

Three-step indicator displayed above the form at all times.

Steps labeled:

1. Your Trip
2. Your Details
3. Review & Submit

Active step is visually highlighted (gold). Completed steps show a checkmark.

---

### Step 1 — Your Trip

Fields:

- Service Type (required) — radio cards: "Self Drive" / "With Chauffeur"
- Vehicle (required) — vehicle card display showing image, name, and price; pre-selected when only one vehicle is active; card selector or dropdown when multiple vehicles exist
- Rental Type (required) — radio buttons: "Hourly" / "Full Day" / "Multi-Day"
- Start Date (required) — date picker; past dates disabled
- Start Time (required) — time picker
- End Date (conditional) — shown and required when Rental Type is Full Day or Multi-Day
- Estimated Hours (conditional) — shown and required when Rental Type is Hourly; integer input 1–24
- Pickup Location (required) — text input
- Dropoff Location (optional) — text input with "Same as pickup" checkbox option

Validation on Next:

- All required fields complete
- Start Date is in the future
- Conditional fields satisfied based on Rental Type

---

### Step 2 — Your Details

Fields:

- First Name (required) — `autocomplete="given-name"` `type="text"`
- Last Name (required) — `autocomplete="family-name"` `type="text"`
- Email Address (required) — `autocomplete="email"` `type="email"`
- Phone Number (required) — `autocomplete="tel"` `type="tel"` — auto-formatted to (XXX) XXX-XXXX
- Preferred Contact Method (required) — radio buttons: "Phone Call" / "Text Message" / "Email"

Validation on Next:

- All required fields complete
- Email is valid format
- Phone is valid US format

---

### Step 3 — Review & Submit

Fields:

- Occasion (optional) — select dropdown: Wedding, Corporate Event, Airport Transfer, Date Night, Photoshoot, Music Video, Special Occasion, Other
- Special Requests (optional) — textarea, `maxlength="500"`, character counter displayed
- Honeypot field — hidden, `name="website"`, `tabindex="-1"`, `aria-hidden="true"`

Review Summary:

- Non-editable card displaying all Step 1 and Step 2 values
- Each section with an "Edit" link that navigates back to that step without data loss

Privacy Policy Consent:

- Checkbox (required): "By submitting this request, you agree to our Privacy Policy."
- "Privacy Policy" is a link to /privacy-policy (opens in same tab)

Submit Button: "Send Request" (gold, full-width on mobile)

---

### Step Navigation

Back button: Ghost button, left-aligned below the form.

Next / Submit button: Primary gold button, right-aligned.

Pressing Back always preserves all data entered in prior steps.

---

### Form Loading State

On submission:

- Submit button text replaced with loading spinner
- Submit button disabled
- All form fields disabled
- Duration: until server responds

---

### Form Submission Failure State

If server returns error:

- Error banner appears above the form: "Something went wrong. Please try again or call us directly at [phone number]."
- All data preserved
- Submit button re-enabled
- User does not lose any input

---

### Form Success State

On successful submission:

- Redirect to /book/confirmation
- Back navigation from /book/confirmation should go to the home page, not back to the form

---

# Booking Confirmation Page (/book/confirmation)

Layout:

- Centered, minimal
- Checkmark icon (gold)
- Headline: Your Request Has Been Received
- Message: Thank you, [First Name]. A member of our concierge team will contact you within 4 business hours to confirm your reservation details.
- Trip summary: service type, date, pickup location
- Phone number: "Need to reach us sooner? Call [phone number]"
- Email address
- CTA: Return Home

---

# Privacy Policy Page (/privacy-policy)

Layout:

- Standard document layout
- Last updated date at top
- Sections with clear headings
- Contact email for privacy inquiries

Linked from:

- Footer (all pages)
- Booking form consent checkbox
- Customer confirmation email

---

# Mobile UX Requirements

## General

- Mobile-first design
- Touch targets minimum 44x44px (48px preferred for form elements)
- Avoid horizontal scroll at any breakpoint
- Fast page loads (Lighthouse 90+ on mobile)

## Navigation

- Phone number visible without opening the menu
- Hamburger menu accessible with one tap
- Menu items large enough to tap without precision

## Forms

- 56px minimum input height
- Inputs use correct keyboard types:
  - Phone: `type="tel"`
  - Email: `type="email"`
  - Numbers (hours, passengers): `type="number"`
  - Dates: `type="date"` or native date picker behavior
- Browser autofill enabled via `autocomplete` attributes:
  - First name: `autocomplete="given-name"`
  - Last name: `autocomplete="family-name"`
  - Email: `autocomplete="email"`
  - Phone: `autocomplete="tel"`
- On input focus: page does not jump or layout does not shift (use `font-size: 16px` on inputs to prevent iOS zoom)
- Error messages visible without scrolling on mobile

## Gallery

- Vehicle gallery is swipeable with touch gestures
- Swipe indicator (dots or arrows) visible on mobile

## CTA Accessibility

- Primary CTAs reachable with thumb (below center of screen on mobile)
- Floating phone CTA or sticky CTA bar not required for MVP, but phone number must be easy to find

---

# Component Inventory

## Navigation

- Desktop Navbar (transparent + solid variants)
- Mobile Navbar
- Mobile Drawer Menu
- Skip-to-Content Link

## Buttons

- Primary Button
- Secondary Button
- Ghost Button
- Phone Number Link (nav)

## Cards

- Vehicle Card
- Service Card
- Feature Card
- Testimonial Card

## Forms

- Contact Form
- Booking Form (3-step)
- Form Progress Indicator
- Form Error Banner
- Form Success Panel

## Layout Components

- CTA Banner
- Section Header
- Footer
- Service Area Grid
- Testimonial Grid
- Reservation Process Steps

## Content Components

- FAQ Accordion (with ARIA)
- Gallery Component (desktop grid + mobile carousel)
- Hero with Overlay

## Feedback Components

- Loading Spinner
- Skeleton Loader
- Error State
- Success State

---

# UX Success Criteria

Users should be able to:

1. Understand the brand and service offering within 5 seconds of landing on the homepage.
2. Find a phone number within the first 3 seconds, without scrolling.
3. Discover services quickly from the homepage.
4. View the fleet and understand pricing before filling out a form.
5. Submit a booking request without friction in under 3 minutes.
6. Contact the business by phone or form from any page.
7. Trust the service based on testimonials and professional presentation.

The experience must consistently communicate professionalism, luxury, trust, and concierge-level service.

Users must never feel confused about what to do next, uncertain about whether a form submitted successfully, or unable to reach the business in an emergency.
