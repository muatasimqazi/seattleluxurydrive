

# Design Decision Log

## Purpose

This document records approved design, UX, content, and product decisions.

It serves as the source of truth when questions arise during design or implementation.

If a future design conflicts with a decision recorded here, the documented decision wins unless explicitly changed and approved.

---

# Project Information

Project:

Seattle Luxury Drive

Current Phase:

Design

Status:

Preparing for Figma Generation

---

# Source of Truth Order

When documents conflict, resolve using this hierarchy (highest authority first):

1. Design Decision Log (this document)
2. Approved Figma Designs (once generated and reviewed)
3. UX Specification (specs/docs/02-ux-specification.md)
4. Technical Specification (specs/docs/05-technical-specification.md)
5. AI_CONTEXT (specs/docs/AI_CONTEXT.md)

If a decision is not recorded in this log and not visible in an approved Figma screen, escalate before implementing.

---

# Brand Decisions

## Brand Positioning

Approved

- 50% Executive Transportation
- 30% Luxury Concierge
- 20% Rolls-Royce Elegance

Reason:

The company should primarily appeal to executive and VIP transportation clients while maintaining a premium luxury image.

---

## Brand Personality

Approved

The brand should feel:

- Professional
- Premium
- Trustworthy
- Welcoming
- Sophisticated
- Reliable
- Concierge-Oriented

The brand should NOT feel:

- Flashy
- Exotic-car focused
- Discount-oriented
- Marketplace-driven

---

# Homepage Decisions

## Hero Headline

Approved

Seattle's Premier Luxury Transportation Experience.

Note: "Executive Transportation. Elevated." was considered but rejected in favor of the above — it includes "Seattle" for local SEO value and a warmer, more descriptive tone.

---

## Hero Focus

Approved

Primary emphasis:

1. Executive Transportation
2. Chauffeur Services
3. Airport Transfers
4. VIP Transportation

Luxury vehicle rentals are secondary.

---

## Homepage Sections

Approved Order

1. Hero
2. Services Overview
3. Featured Vehicle
4. Why Choose Seattle Luxury Drive
5. Testimonials
6. Service Area
7. Reservation Process
8. Final CTA
9. Footer

---

# Navigation Decisions

## Primary Navigation

Approved

- Home
- Fleet
- Services
- About
- FAQ
- Contact

Primary CTA:

Request Reservation

---

## Phone Number Visibility

Approved

Phone number must be visible on desktop and mobile navigation.

---

# Content Decisions

## About Page Direction

Approved

Seattle Luxury Drive is presented as a family-owned company focused on hospitality, service, and premium transportation.

---

## Testimonials

Approved

Placeholder testimonials may be used during design.

Placeholder testimonials must not appear on the production website.

Preferred source order:

1. Google Reviews
2. Facebook Reviews
3. Manual Testimonials

---

# Booking Decisions

## Booking Model

Approved

Seattle Luxury Drive uses a concierge reservation request model.

The website does not support instant booking.

The website does not support online payment during MVP.

---

## Booking Flow

Approved

3-step process:

1. Your Trip — Service Type, Vehicle, Rental Type, Dates/Times, Locations
2. Your Details — Name, Email, Phone, Preferred Contact Method
3. Review & Submit — Occasion (optional), Special Requests (optional), summary, privacy consent

Reason: Simplified from a 6-step form. Reduces abandonment, eliminates the meaningless vehicle-selection-only step, and keeps optional enrichment fields (Occasion, Special Requests) at the end where commitment is highest.

---

## CTA Language

Approved

Use:

- Request Reservation
- Contact Us
- Speak With Our Concierge Team

Avoid:

- Book Now
- Rent Now
- Reserve Instantly

---

# Vehicle Decisions

## Launch Fleet

Approved

Launch with a single vehicle.

- 2021 Rolls-Royce

The system must support future expansion up to at least 5 vehicles without redesign.

---

## Vehicle Details

Pending

Exact model information has not yet been finalized.

Designs and copy should reference:

2021 Rolls-Royce

until final specifications are available.

---

## Self-Drive Policy

Approved

Messaging:

Self-drive and chauffeur options available depending on the reservation.

---

# Visual Design Decisions

## Color Palette

Approved

Primary Black: #090909

Secondary Charcoal: #151515

Luxury Gold: #B89B5E

Off White: #F5F2EA

---

## Visual Direction

Approved

Design inspiration:

- Blacklane
- NetJets
- Rolls-Royce Motor Cars
- Four Seasons
- Bentley Motors

Avoid:

- Turo
- Hertz
- Enterprise
- Generic limo sites
- Flashy exotic car rental sites

---

# Technical Decisions

## Platform

Approved

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Supabase
- Resend
- Vercel

---

## Authentication

Approved

Admin authentication only.

No customer accounts in MVP.

---

# Locked Decisions

The following decisions are final. They cannot be changed without a formal documented review and approval.

- Brand positioning: 50% Executive Transportation / 30% Luxury Concierge / 20% Rolls-Royce Elegance
- Hero headline: "Seattle's Premier Luxury Transportation Experience."
- Booking request flow: 3 steps — Your Trip / Your Details / Review & Submit
- Primary CTA language: "Request Reservation" (not "Book Now", not "Reserve Instantly")
- No instant booking in MVP
- No online payments in MVP
- No customer accounts in MVP

---

# Rejected Decisions

The following were considered and explicitly rejected. Do not reintroduce without documented justification.

- Instant booking: Rejected for MVP. Conflicts with the concierge-first business model. May be revisited in Phase 2.
- Online payments: Rejected for MVP. Payments are collected offline after concierge contact.
- Customer accounts: Rejected for MVP. No self-serve customer portal.
- Fake testimonials in production: Rejected permanently. Placeholder testimonials are allowed only in Figma mocks and local development. If no real reviews exist at launch, the testimonials section must be hidden.
- 6-step booking form: Rejected. Replaced with 3-step form to reduce abandonment risk.

---

# Services Decision

## Number of Services

Approved: 8 services

1. Executive Transportation
2. Chauffeur Service
3. Airport Transfers
4. VIP Transportation
5. Corporate Events
6. Special Occasions
7. Weddings & Celebrations
8. Photoshoots & Productions

Reason: More specific than the original 6. "Weddings & Celebrations" and "Photoshoots & Productions" provide SEO value as distinct landing sections and clearly communicate availability to those audiences. "VIP Transportation" replaces "Luxury Vehicle Rentals" to better reflect the concierge-first positioning.

---

# Open Decisions

The following items remain unresolved:

- Final phone number
- Final email address
- Business hours
- Admin notification email address
- Exact Rolls-Royce model (Phantom, Ghost, Cullinan, Wraith?)
- Vehicle exterior and interior color
- Vehicle passenger capacity
- Vehicle specifications and features
- Pricing for Full Day and Multi-Day rentals
- Minimum booking duration
- Real testimonials (minimum 3)
- Privacy Policy copy
- Vehicle photography (minimum 8 images)
- Service page photography (8 service-specific images)

---

# Change Log

## Version 1.0

Created during specification phase.

Represents approved decisions prior to Figma generation.