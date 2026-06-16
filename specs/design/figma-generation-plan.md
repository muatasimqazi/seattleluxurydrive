Figma Generation Plan

Purpose

This document defines the exact order, prompts, inputs, and review checkpoints for generating Seattle Luxury Drive designs in Figma AI.

The goal is to avoid generating the full website in one large prompt. Designs should be created in controlled phases so each screen can be reviewed, refined, and approved before moving forward.

⸻

Source Documents

Use the following documents as source material:

Strategy & Requirements

* specs/docs/00-project-overview.md
* specs/docs/01-mvp-requirements.md
* specs/docs/02-ux-specification.md
* specs/docs/03-design-system.md
* specs/docs/04-figma-prompt.md
* specs/docs/05-technical-specification.md
* specs/docs/AI_CONTEXT.md

Content

* specs/content/homepage-copy.md
* specs/content/services-copy.md
* specs/content/about-copy.md
* specs/content/faq-copy.md
* specs/content/contact-copy.md
* specs/content/testimonials.md
* specs/content/brand-voice.md

Visual Reference

Use the existing SJD promotional artwork as the primary visual reference.

Visual themes to preserve:

* Black-and-gold premium aesthetic
* Seattle skyline identity
* Executive transportation tone
* Cinematic luxury lighting
* Rolls-Royce-inspired elegance
* Concierge-level professionalism

⸻

Global Design Direction

The website should feel like:

* 50% Executive Transportation
* 30% Luxury Concierge
* 20% Rolls-Royce Elegance

Design inspiration:

* Blacklane
* NetJets
* Rolls-Royce Motor Cars
* Four Seasons
* Bentley Motors

Avoid:

* Turo-style marketplace design
* Generic limo website design
* Hertz / Enterprise rental car design
* Flashy exotic car rental design
* Discount-focused messaging

⸻

Generation Rules

Rule 1 — Do Not Generate Everything At Once

Generate the website in phases.

Each phase must be reviewed before generating the next phase.

⸻

Rule 2 — Use Real Copy

Use content from specs/content/.

Do not use lorem ipsum.

Do not invent testimonials for production.

Placeholder testimonials may be used only for layout design and must be labeled as placeholders.

⸻

Rule 3 — Design Mobile Intentionally

Mobile should not be an afterthought.

Every major screen should have a mobile version.

⸻

Rule 4 — Preserve Brand Positioning

Every screen should reinforce:

* Executive transportation
* Chauffeur service
* Luxury concierge experience
* Premium Seattle identity
* Trust and professionalism

⸻

Design Readiness Notes

The following phases can begin immediately without waiting for Rolls-Royce vehicle details:

* Phase 1 — Design System
* Phase 2 — Homepage Desktop
* Phase 3 — Homepage Mobile
* Phase 5 — Services, About, FAQ, Contact
* Phase 6 — Booking Request Flow

The following phases require vehicle details before final accuracy can be confirmed, but can proceed using neutral placeholders:

* Phase 4 — Fleet and Vehicle Detail: Use "2021 Rolls-Royce" as the vehicle label. Use placeholder photography. Do not invent model-specific specifications (engine, interior trim, exact dimensions). Mark any vehicle-specific copy as placeholder pending confirmation.

Once exact vehicle details (model, color, features, photography) are provided, update Phase 4 designs and confirm all vehicle-specific copy before development begins.

⸻

Phase 1 — Design System

Goal

Create the visual foundation and reusable components before designing full pages.

Input Documents

* specs/docs/03-design-system.md
* specs/content/brand-voice.md
* Existing SJD promotional artwork

Generate

* Color tokens
* Typography styles
* Spacing system
* Layout grid
* Button components
* Input components
* Navbar component
* Mobile menu component
* Footer component
* Vehicle card component
* Service card component
* Feature card component
* Testimonial card component
* FAQ accordion component
* CTA banner component
* Multi-step form progress component

Figma Prompt

Create a premium design system for Seattle Luxury Drive, a luxury executive transportation and concierge brand serving the Greater Seattle Area.

Use the attached SJD promotional artwork as the primary visual reference. Preserve the black-and-gold aesthetic, cinematic Seattle luxury mood, executive transportation positioning, and understated Rolls-Royce-inspired elegance.

Create reusable components for navbar, mobile menu, buttons, forms, vehicle cards, service cards, feature cards, testimonial cards, FAQ accordions, CTA banners, footer, and multi-step booking progress.

Use these colors:

* Black #090909
* Charcoal #151515
* Luxury Gold #B89B5E
* Off White #F5F2EA

Use an editorial luxury heading style such as Cormorant Garamond and a clean body font such as Inter.

The design should feel like a blend of Blacklane, NetJets, Rolls-Royce, and Four Seasons. Avoid Turo, Hertz, Enterprise, generic limousine websites, and flashy exotic car rental design.

Do not create full website pages yet. Create only the design system and reusable components.

Review Checkpoint

Approve before Phase 2:

* Color palette feels premium
* Typography feels luxury and readable
* Buttons feel refined, not flashy
* Forms are accessible and spacious
* Components are reusable
* Mobile components are included

⸻

Phase 2 — Homepage Desktop

Goal

Create the desktop homepage using approved design system components and real homepage copy.

Input Documents

* specs/docs/02-ux-specification.md
* specs/docs/03-design-system.md
* specs/content/homepage-copy.md
* specs/content/testimonials.md
* specs/content/brand-voice.md

Generate

Desktop homepage with these sections:

1. Hero
2. Services Overview
3. Featured Vehicle
4. Why Choose Seattle Luxury Drive
5. Testimonials
6. Service Area
7. Reservation Process
8. Final CTA
9. Footer

Figma Prompt

Using the approved Seattle Luxury Drive design system, create a desktop homepage for a premium executive transportation and luxury concierge brand.

Use real copy from homepage-copy.md. Do not use lorem ipsum.

Hero headline:
Seattle’s Premier Luxury Transportation Experience.

The homepage should include:

1. Hero section
2. Services overview
3. Featured 2021 Rolls-Royce section
4. Why Choose Seattle Luxury Drive
5. Testimonials section using placeholder cards clearly marked as placeholders
6. Greater Seattle service area
7. Reservation process
8. Final CTA
9. Footer

The page should feel premium, cinematic, executive, and trustworthy. Use large photography, generous spacing, refined typography, black-and-gold styling, and a clear Request Reservation CTA.

Phone number should be visible in the header. The primary CTA should be visible above the fold.

Review Checkpoint

Approve before Phase 3:

* Brand is understandable within 5 seconds
* Primary CTA is clear above fold
* Phone contact is prominent
* Homepage feels executive, not rental-marketplace
* Visual hierarchy is strong
* No fake testimonials appear as real reviews

⸻

Phase 3 — Homepage Mobile

Goal

Create a mobile homepage that preserves the approved desktop hierarchy while optimizing for conversion and readability.

Input Documents

* Approved Phase 2 desktop homepage
* specs/docs/02-ux-specification.md
* specs/docs/03-design-system.md

Generate

Mobile homepage including all major sections from desktop.

Figma Prompt

Create the mobile version of the approved Seattle Luxury Drive homepage.

Maintain the same brand positioning and content hierarchy, but optimize for mobile readability, fast scanning, and easy booking inquiry submission.

Requirements:

* Sticky or highly accessible Request Reservation CTA
* Phone number accessible from mobile header
* Large tap targets
* No cramped text
* Strong visual hierarchy
* Premium dark luxury aesthetic
* Mobile-friendly service cards
* Mobile-friendly reservation process

Review Checkpoint

Approve before Phase 4:

* Hero works on mobile
* CTA is easy to tap
* Phone action is obvious
* Forms and cards have sufficient spacing
* Page does not feel cluttered

⸻

Phase 4 — Fleet And Vehicle Detail

Goal

Create designs for the fleet page and 2021 Rolls-Royce vehicle detail page.

Input Documents

* specs/docs/02-ux-specification.md
* specs/docs/03-design-system.md
* specs/content/homepage-copy.md
* specs/content/vehicles/rolls-royce-2021.md if available

Generate

* Fleet page desktop
* Fleet page mobile
* Vehicle detail page desktop
* Vehicle detail page mobile

Figma Prompt

Create the Fleet page and Vehicle Detail page for Seattle Luxury Drive using the approved design system.

The fleet currently launches with one 2021 Rolls-Royce but must visually support future expansion to up to 5 vehicles.

Fleet page requirements:

* Premium hero section
* Vehicle card grid
* Featured 2021 Rolls-Royce card
* Starting at $350/hour
* Chauffeur and self-drive availability messaging
* Request Reservation CTA

Vehicle detail page requirements:

* Large luxury image gallery
* Vehicle overview
* Starting at $350/hour
* Custom pricing available
* Chauffeur and self-drive options available depending on the reservation
* Key feature area
* Vehicle FAQ area
* Request Reservation CTA

If exact Rolls-Royce model details are unavailable, use neutral copy such as 2021 Rolls-Royce and avoid inventing model-specific specifications.

Review Checkpoint

Approve before Phase 5:

* Vehicle page does not invent unknown vehicle details
* Pricing is clear but flexible
* Future fleet expansion is supported
* CTA is repeated at appropriate points
* Mobile gallery works well

⸻

Phase 5 — Services, About, FAQ, Contact

Goal

Create the supporting public pages using approved components and content.

Input Documents

* specs/content/services-copy.md
* specs/content/about-copy.md
* specs/content/faq-copy.md
* specs/content/contact-copy.md
* specs/content/brand-voice.md

Generate

* Services desktop and mobile
* About desktop and mobile
* FAQ desktop and mobile
* Contact desktop and mobile

Figma Prompt

Create the Services, About, FAQ, and Contact pages for Seattle Luxury Drive using the approved design system and real copy from the content documents.

Services page should include:

* Executive Transportation
* Chauffeur Service
* Airport Transfers
* VIP Transportation
* Corporate Events
* Special Occasions
* Weddings & Celebrations
* Photoshoots & Productions

About page should emphasize Seattle Luxury Drive as a family-owned company focused on hospitality, service, and premium transportation.

FAQ page should use accordion components and be easy to scan.

Contact page should include contact information, service area, contact form, and clear phone CTA.

Use real copy. Do not use lorem ipsum.

Review Checkpoint

Approve before Phase 6:

* Service categories are clear
* About page feels authentic and premium
* FAQ is scannable
* Contact page makes phone/email/request options obvious
* Mobile pages remain uncluttered

⸻

Phase 6 — Booking Request Flow

Goal

Create the highest-conversion page in the product: the reservation request flow.

Input Documents

* specs/docs/01-mvp-requirements.md
* specs/docs/02-ux-specification.md
* specs/docs/03-design-system.md
* specs/content/contact-copy.md
* specs/content/brand-voice.md

Generate

* Booking request desktop
* Booking request mobile
* Step 1: Your Trip
* Step 2: Your Details
* Step 3: Review & Submit
* Loading state
* Validation error state
* Submission failure state
* Booking confirmation page

Figma Prompt

Create a premium multi-step booking request flow for Seattle Luxury Drive.

This is not instant booking. It is a concierge reservation request.

Use a 3-step form:

Step 1: Your Trip

* Service Type (Self Drive / With Chauffeur)
* Vehicle
* Rental Type (Hourly / Full Day / Multi-Day)
* Start Date
* Start Time
* End Date (shown for Full Day / Multi-Day)
* Estimated Hours (shown for Hourly)
* Pickup Location
* Dropoff Location

Step 2: Your Details

* First Name
* Last Name
* Email
* Phone Number
* Preferred Contact Method

Step 3: Review & Submit

* Occasion (optional)
* Special Requests (optional, 500 character max)
* Summary of trip details from Step 1
* Summary of contact details from Step 2
* Privacy Policy consent checkbox
* Submit Request CTA

Design states:

* Default
* Loading
* Field validation error
* Submission failure
* Success / confirmation page

Tone should be reassuring and concierge-focused. The form should feel premium, calm, and easy to complete.

Review Checkpoint

Approve before implementation planning:

* Form is easy to complete
* Mobile form is not overwhelming
* Validation states are clear
* Confirmation page is reassuring
* Privacy acknowledgment is visible
* CTA language says Request Reservation, not Book Now

⸻

Phase 7 — Final Design Review

Goal

Review all generated Figma screens before implementation.

Review Criteria

Brand:

* Feels like executive transportation
* Feels like luxury concierge
* Does not feel like Turo
* Does not feel like a generic limo site

UX:

* Navigation is clear
* Phone number is visible
* Request Reservation CTA is prominent
* Booking flow is easy
* Mobile screens are usable

Visual Design:

* Typography hierarchy is consistent
* Spacing is generous
* Gold is used sparingly
* Contrast meets accessibility expectations
* Photography feels premium

Implementation:

* Components map cleanly to code
* Layouts are practical for responsive implementation
* No overly complex animations are required
* No unknown vehicle details are invented

⸻

Final Approval Checklist

Before development begins:

* Design system approved
* Homepage desktop approved
* Homepage mobile approved
* Fleet page approved
* Vehicle detail page approved
* Services page approved
* About page approved
* FAQ page approved
* Contact page approved
* Booking request flow approved
* Booking confirmation page approved
* Placeholder testimonials removed or clearly hidden from production
* Vehicle details reviewed for accuracy
* Phone number and email finalized
* Privacy Policy copy finalized