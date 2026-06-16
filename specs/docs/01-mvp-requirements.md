
# MVP Requirements

## MVP Objective

Build a premium luxury transportation website that generates qualified booking inquiries and establishes Seattle Luxury Drive as a trusted executive transportation and concierge service.

The MVP focuses on lead generation, credibility, and concierge-style reservations rather than booking automation.

---

## Business Goals

### Goal 1
Generate qualified booking inquiries.

### Goal 2
Establish trust with corporate and VIP clients.

### Goal 3
Showcase the flagship Rolls-Royce vehicle.

### Goal 4
Create a scalable foundation for future fleet growth.

---

## Pages In Scope

1. Home
2. Fleet
3. Vehicle Detail
4. Services
5. About
6. Contact
7. FAQ
8. Booking Request
9. Booking Confirmation
10. Privacy Policy

---

## Navigation Requirements

### Desktop Header

Must include:

- Logo (left-aligned)
- Navigation links: Home, Fleet, Services, About, FAQ, Contact
- Business phone number (prominently displayed, styled as a tel: clickable link)
- Primary CTA button: Request Reservation

The phone number must be visible at all times — before and after scroll — on every page.

### Mobile Header

Must include:

- Logo
- Business phone number (clickable, visible without opening menu)
- Hamburger menu icon
- Primary CTA button: Request Reservation

---

## Home Page Requirements

Required Sections:

1. Hero Section
2. Services Overview
3. Featured Vehicle
4. Why Choose Us
5. Testimonials
6. Service Area
7. Reservation Process
8. Final CTA
9. Footer

Primary CTA: Request Reservation

Secondary CTA: Explore Fleet

### Hero Section

Requirements:

- Full-screen or near full-screen layout
- Full-bleed Rolls-Royce / cinematic photography background
- Headline: Executive Transportation. Elevated.
- Subheadline: Luxury chauffeur services, airport transfers, executive transportation, and exclusive vehicle rentals throughout the Greater Seattle Area.
- Primary CTA: Request Reservation
- Secondary CTA: Explore Fleet

### Services Overview

Display 3 featured services with icon or image, short description, and Learn More CTA.

Featured services:

- Executive Transportation
- Airport Transfers
- VIP Transportation

### Featured Vehicle

Magazine-style editorial layout.

Display:

- Hero image of the 2021 Rolls-Royce
- Starting at $350/hour
- Self-drive available
- Chauffeur available
- CTA: View Vehicle

### Why Choose Us

Four value pillars:

- White Glove Service
- Flexible Pickup & Delivery
- Chauffeur Available
- Seattle Based

### Testimonials Section

Display 3 client testimonials.

Per testimonial:

- Client quote (required)
- Client first name and last initial (required)
- Service used (required, example: Airport Transfer, Corporate Event)

Acceptance criteria: Testimonial content must be provided as a content deliverable before development begins.

### Service Area

Display:

- Heading and brief copy about Greater Seattle coverage
- List of all 11 service cities
- Seattle skyline or area imagery

### Reservation Process

4-step process display:

1. Submit Request
2. Speak With Concierge
3. Confirm Details
4. Enjoy The Experience

### Final CTA

Headline: Reserve Your Experience

CTA: Request Reservation

---

## Fleet Page Requirements

The fleet page must support future fleet expansion beyond a single vehicle.

Vehicle Card Requirements:

- Vehicle image (high quality)
- Vehicle name (year, make, model)
- Starting price
- Chauffeur availability badge
- Short description
- View Details CTA

---

## Vehicle Detail Page Requirements

Required Sections:

- Image gallery (swipeable on mobile, editorial on desktop)
- Vehicle name and key specifications
- Pricing information (Starting at $350/hour, custom pricing available)
- Vehicle overview and description
- Features and amenities list
- Rental options (Self Drive / With Chauffeur)
- Vehicle-specific FAQ (minimum 3 questions)
- Booking CTA section

Primary CTA: Request Reservation

Secondary CTA: Call Now (tel: link)

---

## Services Page Requirements

Service categories:

- Executive Transportation
- Chauffeur Service
- Airport Transfers
- VIP Transportation
- Corporate Events
- Special Occasions
- Weddings & Celebrations
- Photoshoots & Productions

Each service section must include:

- Image (high quality, contextually relevant)
- Headline
- Description (minimum 2 paragraphs)
- 3–5 key benefits (bulleted)
- CTA linking to booking page

Content requirement: All service descriptions and benefit copy must be delivered before development begins.

---

## About Page Requirements

Required Sections:

- Hero
- Company story
- Mission statement
- Values
- Service commitment
- Service area overview
- CTA: Request Reservation

Content requirement: Founder story, mission statement, values, and service commitment copy must be delivered before development begins.

---

## Contact Page Requirements

Display prominently:

- Phone number (above the fold, clickable)
- Email address
- Business hours
- Contact form
- Google Maps embed (service area or business location)

Contact Form Fields:

- Name (required)
- Email (required)
- Phone (required)
- Message (required)

---

## FAQ Page Requirements

Accordion layout organized by category.

Categories:

- Booking
- Chauffeur Services
- Pricing
- Airport Transfers
- Service Areas

Minimum 3 questions per category (15 questions total minimum).

Content requirement: All FAQ questions and answers must be delivered before development begins.

---

## Privacy Policy Page Requirements

Required page at /privacy-policy.

Must cover:

- What personal information is collected (name, email, phone)
- How it is used (service fulfillment, email communication)
- Whether data is shared with third parties (Resend for email, Supabase for storage)
- Google Analytics 4 data collection disclosure
- Cookie usage policy
- User rights (access, deletion requests)
- Contact information for data inquiries
- Last updated date

Content requirement: Privacy policy copy must be reviewed by a qualified attorney or generated from a trusted legal template. Required before launch, not before development.

---

## Booking Request Requirements

### Form Structure

3-step multi-step form. Steps must display a visible progress indicator.

#### Step 1 — Your Trip

Fields:

- Service Type (required) — radio buttons: Self Drive / With Chauffeur
- Vehicle (required) — displayed as a vehicle card; pre-selected when only one vehicle is active; dropdown or card selector when multiple vehicles exist
- Rental Type (required) — radio buttons: Hourly / Full Day / Multi-Day
- Start Date (required)
- Start Time (required)
- End Date (conditional — required when Rental Type is Full Day or Multi-Day)
- Estimated Hours (conditional — required when Rental Type is Hourly; integer 1–24)
- Pickup Location (required)
- Dropoff Location (optional)

#### Step 2 — Your Details

Fields:

- First Name (required)
- Last Name (required)
- Email Address (required)
- Phone Number (required)
- Preferred Contact Method (required) — radio buttons: Phone Call / Text Message / Email

#### Step 3 — Finishing Touches

Fields:

- Occasion (optional) — dropdown: Wedding, Corporate Event, Airport Transfer, Date Night, Photoshoot, Music Video, Special Occasion, Other
- Special Requests (optional, max 500 characters) — character counter displayed
- Review summary card (displays all Step 1 and Step 2 values, non-editable)
- Privacy Policy consent checkbox (required) — links to /privacy-policy
- Honeypot field — hidden input named `website`; if submitted with any value, reject silently and show success state

Submit button label: Send Request

### Form Validation Rules

#### Step 1

- Service Type: Required. Must select one.
- Vehicle: Required. Must select one.
- Rental Type: Required. Must select one.
- Start Date: Required. Must be a future date (not today or past).
- Start Time: Required.
- End Date: Required when Rental Type is Full Day or Multi-Day. Must be on or after Start Date.
- Estimated Hours: Required when Rental Type is Hourly. Integer between 1 and 24 inclusive.
- Pickup Location: Required. Minimum 5 characters.

#### Step 2

- First Name: Required. Minimum 2 characters.
- Last Name: Required. Minimum 2 characters.
- Email Address: Required. Must be a valid email format.
- Phone Number: Required. Must be a valid US phone number. Auto-format on input.
- Preferred Contact Method: Required. Must select one.

#### Step 3

- Special Requests: Optional. Maximum 500 characters.
- Privacy Policy Consent: Required. Must be checked to submit.

### Form Error States

- Inline errors shown below each field, on blur and on submit attempt.
- Error border color applied to invalid fields.
- On submit with errors: scroll to first invalid field.
- Error messages announced to screen readers via aria-live region.
- Error messages are specific (example: "Please enter a date in the future" not "Invalid date").

### Form Loading State

On submission:

- Submit button shows loading spinner and is disabled.
- Form fields are disabled.
- No double-submission possible.

### Form Submission Failure State

If a network or server error occurs:

- Inline error banner displayed above the form.
- Message: "Something went wrong. Please try again or call us directly at [phone number]."
- All form data preserved.
- Submit button re-enabled.

---

## Booking Confirmation Page (/book/confirmation)

Displayed after successful submission.

Headline: Your Request Has Been Received

Message: Thank you, [First Name]. A member of our concierge team will contact you within 4 business hours to confirm your reservation details.

Display:

- Trip summary: service type, date, pickup location
- Business phone number (clickable)
- Business email (clickable)
- CTA: Return Home

Note: this page must not be accessible by direct URL navigation; should only be reachable after a successful form submission.

---

## Booking Workflow

1. Customer submits booking request form.
2. Honeypot check — if triggered, reject silently, no further processing.
3. Rate limit check — if exceeded, reject with 429 response.
4. Request stored in booking_requests table.
5. Admin notification email sent immediately via Resend.
6. Customer confirmation email sent immediately via Resend.
7. Customer redirected to /book/confirmation.
8. Admin contacts customer within 4 business hours.
9. Reservation details finalized manually.
10. Payment collected offline.

---

## Contact Form Workflow

1. Customer submits contact form.
2. Honeypot check — if triggered, reject silently.
3. Request stored in contact_requests table.
4. Admin notification email sent immediately.
5. Customer acknowledgment email sent immediately.

---

## Admin Dashboard Requirements

### Booking Requests

Admin can:

- View all requests in a paginated table (25 per page)
- Search by customer name or email
- Filter by status
- Filter by date range (by start_date field)
- Sort by created_at, newest first by default
- Click into individual booking request detail view
- Update booking status
- Add or edit internal admin notes
- View responded_at timestamp (set automatically when status is first changed from Pending)

Statuses:

- Pending
- Contacted
- Approved
- Declined
- Completed

### Fleet Management

Admin can:

- Create vehicles
- Edit vehicles
- Upload vehicle images
- Reorder vehicle images (drag or sort order input)
- Mark a vehicle as featured
- Archive a vehicle (status change, not deletion)

### Contact Requests

Admin can:

- View all submissions in a paginated table (25 per page)
- Search by name or email
- Filter by status
- Add internal notes
- Mark as completed

---

## Spam Prevention Requirements

Both public forms must implement:

### Honeypot Field

A hidden text input named `website` in the form HTML.

Rules:

- Hidden via CSS (not `display: none` — use positioning)
- `tabindex="-1"` and `aria-hidden="true"` to prevent screen reader and keyboard access
- If submitted with any value: reject submission, log the attempt, return success state to the user (do not alert bots)
- No entry created in the database

### Rate Limiting

Maximum 3 submissions per IP address per 15-minute window.

On limit exceeded:

- Return HTTP 429
- Display inline message: "Too many requests. Please try again later or call us directly at [phone number]."
- Do not show the success state

---

## Email Requirements

### Admin Notification — Booking Request

Sent to: Admin email address

Subject: New Booking Request — [First Name] [Last Name]

Contents:

- Customer: full name, email, phone
- Trip: service type, vehicle, rental type, start date, start time, end date or estimated hours
- Locations: pickup, dropoff
- Details: occasion, special requests
- Link: direct link to admin booking detail page

### Admin Notification — Contact Request

Sent to: Admin email address

Subject: New Contact Request — [Name]

Contents:

- Name, email, phone
- Message
- Link to admin contact requests page

### Customer Confirmation — Booking Request

Sent to: Customer email address

Subject: Your Reservation Request — Seattle Luxury Drive

Contents:

- Greeting with first name
- Confirmation that request was received
- Trip summary (service type, date, pickup location)
- Expected response time: within 4 business hours
- Business phone number (tel: link)
- Business email (mailto: link)
- Privacy policy link

### Customer Acknowledgment — Contact Request

Sent to: Customer email address

Subject: We Received Your Message — Seattle Luxury Drive

Contents:

- Confirmation that the message was received
- Expected response time
- Business phone number

---

## SEO Requirements

### Target Keywords

Primary:

- Luxury Car Rental Seattle
- Rolls Royce Rental Seattle
- Luxury Chauffeur Seattle
- Executive Transportation Seattle
- Airport Transfer Seattle
- VIP Transportation Seattle

Secondary:

- Rolls Royce Wedding Car Seattle
- Corporate Car Service Seattle
- Executive Car Service Bellevue
- Black Car Service Seattle
- Seattle Airport Luxury Transfer
- Luxury Car Service Kirkland
- Chauffeur Service Seattle

### Per-Page Requirements

Every page must include:

- Unique SEO title (under 60 characters)
- Unique meta description (150–160 characters)
- Open Graph title
- Open Graph description
- Open Graph image (1200x630px minimum)
- Canonical URL

### Technical SEO

- sitemap.xml — auto-generated, submitted to Google Search Console at launch
- robots.txt — disallow /admin/*, allow all else
- BreadcrumbList structured data on all pages except Home
- LocalBusiness schema on Home and Contact pages
- Organization schema on all pages
- WebSite schema on Home page
- FAQPage schema on FAQ page and Vehicle Detail page FAQ section
- Canonical URL on all pages

---

## Mobile Requirements

The website must be mobile-first and fully responsive.

Requirements:

- Touch targets minimum 44x44px
- Fast load times (Lighthouse Performance 90+ on mobile)
- Simple navigation with hamburger menu
- Phone number tappable and initiates a phone call (tel: link)
- Form inputs use correct input type (type="tel" for phone, type="email" for email, type="number" for hours)
- Form inputs have correct autocomplete attributes (given-name, family-name, email, tel)
- Date pickers behave correctly on iOS and Android
- Gallery is swipeable on touch devices

---

## Content Deliverables Required Before Development

The following must be finalized and handed off before development begins:

- [ ] Business phone number
- [ ] Business email address
- [ ] Business hours
- [ ] Admin notification email address
- [ ] Vehicle photography (minimum 8 high-resolution, cinematic images of the 2021 Rolls-Royce)
- [ ] Services page copy for all 6 services (description + benefits per service)
- [ ] About page copy (company story, mission, values, service commitment)
- [ ] FAQ content (minimum 15 questions and answers across 5 categories)
- [ ] Testimonials (minimum 3 client quotes with first name and last initial)
- [ ] Homepage hero copy (approved headline and subheadline)
- [ ] Reservation process copy (step labels and descriptions)

The following must be finalized before launch (not required before development):

- [ ] Privacy policy copy

---

## Out Of Scope

The following are excluded from MVP:

- Online payments
- Customer accounts
- Customer dashboard
- Driver verification
- License uploads
- Insurance uploads
- Automated approvals
- Availability calendars
- Fleet scheduling
- SMS notifications
- Loyalty programs
- Membership features
- City-specific landing pages (Phase 2)
- Blog or content hub (Phase 2)

---

## MVP Acceptance Criteria

### Booking Form

- [ ] All required fields are validated before allowing step progression
- [ ] Conditional fields appear and disappear correctly based on Rental Type selection
- [ ] Past dates cannot be selected as Start Date
- [ ] Progress indicator correctly reflects current step
- [ ] Back navigation preserves previously entered data
- [ ] Submission stores a record in booking_requests
- [ ] Admin notification email is sent within 60 seconds
- [ ] Customer confirmation email is sent within 60 seconds
- [ ] Success redirects to /book/confirmation
- [ ] Honeypot-triggered submissions do not create database records
- [ ] Rate-limited submissions do not create database records

### Contact Form

- [ ] All required fields are validated
- [ ] Submission stores a record in contact_requests
- [ ] Admin notification email sent within 60 seconds
- [ ] Customer acknowledgment email sent within 60 seconds
- [ ] Success state is shown after submission

### Admin Dashboard

- [ ] Only authenticated admin users can access /admin/* routes
- [ ] Unauthenticated requests redirect to /admin/login
- [ ] All booking requests are visible and paginated
- [ ] Status can be updated per booking
- [ ] Notes can be added per booking
- [ ] Filter by status returns correct results
- [ ] Search by name returns correct results

### General

- [ ] All pages render correctly on mobile (375px), tablet (768px), and desktop (1280px)
- [ ] Lighthouse Performance 90+, Accessibility 95+, SEO 95+ on all primary pages
- [ ] Phone number is visible and tappable on all pages on mobile
- [ ] All pages have unique SEO titles and meta descriptions
- [ ] No customer data is accessible without admin authentication
