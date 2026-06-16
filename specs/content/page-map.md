# Page Map

## Purpose

Maps every page to its route, goal, data source, key components, and SEO focus. Use this as the canonical reference for what each page does and what it needs.

---

## Public Pages

### Home
Route: /
Goal: First impression. Establish brand, generate booking inquiries.
Data: Static copy + vehicles table (featured vehicle only)
Key Sections: Hero, ServicesOverview, FeaturedVehicle, WhyChooseUs, Testimonials, ServiceArea, ReservationProcess, FinalCTA
Primary CTA: Request Reservation
SEO Focus: "Luxury Transportation Seattle", "Executive Transportation Seattle", "Rolls-Royce Rental Seattle"
Structured Data: LocalBusiness, Organization, WebSite

---

### Fleet
Route: /fleet
Goal: Showcase all vehicles. Convert browsers to detail-page visitors.
Data: vehicles table (status = 'active')
Key Components: FleetHero, VehicleGrid, VehicleCard
Primary CTA: View Details (per vehicle)
SEO Focus: "Luxury Car Rental Seattle", "Rolls-Royce Rental Seattle"
Structured Data: BreadcrumbList

---

### Vehicle Detail
Route: /fleet/[slug]
Goal: Communicate vehicle quality and pricing. Convert to booking request.
Data: vehicles table + vehicle_images table (by slug)
Key Components: ImageGallery, VehicleOverview, RentalOptions, VehicleFAQ, BookingCTA
Primary CTA: Request Reservation
Secondary CTA: Call Now
SEO Focus: "Rolls-Royce Rental Seattle", "2021 Rolls-Royce [model] Seattle"
Structured Data: BreadcrumbList, FAQPage (vehicle FAQ section)

---

### Services
Route: /services
Goal: Communicate full service range. SEO for individual service keywords.
Data: Static copy (specs/content/services-copy.md)
Key Components: ServicesHero, ServiceSection (x8, alternating image/text layout)
Primary CTA: Request Reservation (per section)
Services: Executive Transportation, Chauffeur Service, Airport Transfers, VIP Transportation, Corporate Events, Special Occasions, Weddings & Celebrations, Photoshoots & Productions
SEO Focus: "Chauffeur Service Seattle", "Airport Transfer Seattle", "Wedding Transportation Seattle"
Structured Data: BreadcrumbList

---

### About
Route: /about
Goal: Build trust. Family-owned story, mission, values.
Data: Static copy (specs/content/about-copy.md)
Key Components: AboutHero, Story, Mission, Values, ServiceArea, FinalCTA
Primary CTA: Request Reservation
SEO Focus: "Luxury Chauffeur Seattle", "Executive Car Service Seattle"
Structured Data: BreadcrumbList, Organization

---

### FAQ
Route: /faq
Goal: Answer pre-purchase questions. Reduce friction. SEO for long-tail queries.
Data: Static copy (specs/content/faq-copy.md)
Key Components: FAQHero, FAQAccordion (by category)
Categories: Booking & Reservations, Chauffeur Services, Vehicle Rentals, Airport Transfers, Service Area, Special Events, Pricing, Contact
SEO Focus: Long-tail question queries
Structured Data: BreadcrumbList, FAQPage

---

### Contact
Route: /contact
Goal: Provide all contact methods. Collect contact form submissions.
Data: contact_requests table (INSERT only from public)
Key Components: ContactHero, ContactInfo, ContactForm, MapEmbed
Primary CTA: Call Now, Send Message
SEO Focus: "Contact Luxury Car Service Seattle"
Structured Data: BreadcrumbList, LocalBusiness

---

### Booking Request
Route: /book
Goal: Collect qualified booking inquiries. Primary revenue-generating page.
Data: booking_requests table (INSERT) + vehicles table (for vehicle selector)
Key Components: BookingHero, MultiStepForm (3 steps), ProgressIndicator
Step 1: Your Trip
Step 2: Your Details
Step 3: Review & Submit
On Submit: Redirect to /book/confirmation
SEO Focus: Not a primary SEO target — traffic comes from other pages
Structured Data: BreadcrumbList

---

### Booking Confirmation
Route: /book/confirmation
Goal: Reassure the customer after submission. Set expectations for follow-up.
Data: None (static, populated from form submission session state)
Key Components: ConfirmationCard (checkmark icon, thank you message, trip summary, contact options)
Access: Only reachable via redirect after successful form submission. Direct URL navigation should redirect to /book.
SEO: noindex

---

### Privacy Policy
Route: /privacy-policy
Goal: Legal compliance for GA4, Resend, Supabase data collection.
Data: Static legal copy
Key Components: PolicyLayout, PolicyContent
Linked From: Footer (all pages), booking form consent checkbox, customer confirmation email
SEO: noindex recommended (or low priority)

---

## Admin Pages

### Admin Login
Route: /admin/login
Goal: Authenticate admin users.
Data: Supabase Auth
Access: Public (no session required). Authenticated users redirected to /admin.
Key Components: LoginForm

---

### Admin Dashboard
Route: /admin
Goal: Overview of business activity.
Data: booking_requests (count, recent), contact_requests (count), vehicles (count)
Key Components: StatCards, RecentBookingsList, QuickActions
Protected: Yes — middleware redirects unauthenticated requests to /admin/login

---

### Admin Bookings List
Route: /admin/bookings
Goal: Manage all booking requests.
Data: booking_requests table (via service role key)
Key Components: BookingsTable (paginated, 25/page), StatusFilter, DateRangeFilter, SearchInput
Columns: Created, Customer, Service Type, Start Date, Status, Actions

---

### Admin Booking Detail
Route: /admin/bookings/[id]
Goal: View full booking details, update status, add notes.
Data: booking_requests table (single row by id)
Key Components: BookingDetailCard, StatusDropdown, AdminNotesField, ResponseTimestamp

---

### Admin Vehicles
Route: /admin/vehicles
Goal: Manage fleet.
Data: vehicles + vehicle_images tables
Key Components: VehicleList, VehicleStatusBadge, QuickActions (Edit, Archive)

---

### Admin Vehicle New
Route: /admin/vehicles/new
Goal: Add a new vehicle to the fleet.
Data: vehicles + vehicle_images tables (INSERT)
Key Components: VehicleForm, ImageUploader

---

### Admin Vehicle Edit
Route: /admin/vehicles/[id]
Goal: Edit vehicle details and manage images.
Data: vehicles + vehicle_images tables (SELECT + UPDATE)
Key Components: VehicleForm (pre-filled), ImageUploader, ImageReorder

---

### Admin Contacts
Route: /admin/contacts
Goal: Manage contact form submissions.
Data: contact_requests table
Key Components: ContactsTable (paginated, 25/page), StatusFilter, SearchInput, AdminNotesField
