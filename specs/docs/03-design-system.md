
# Design System

## Purpose

This document defines the visual language, design tokens, components, and UI patterns used throughout Seattle Luxury Drive.

The design system creates a premium executive transportation experience that feels trustworthy, sophisticated, and exclusive.

---

# Brand Personality

## Positioning

50% Executive Transportation

30% Luxury Concierge

20% Rolls-Royce Elegance

---

## Brand Attributes

- Professional
- Premium
- Sophisticated
- Reliable
- Discreet
- Modern
- Executive
- Trustworthy

---

## Emotional Response

Users should feel:

- Confidence
- Trust
- Prestige
- Professionalism
- Exclusivity

---

# Color System

## Primary Colors

### Black

Hex: #090909

Usage:

- Primary backgrounds
- Hero sections
- Footer

---

### Charcoal

Hex: #151515

Usage:

- Secondary surfaces
- Cards
- Section backgrounds

---

### Off White

Hex: #F5F2EA

Usage:

- Primary text on dark backgrounds
- Light section backgrounds

---

### Luxury Gold

Hex: #B89B5E

Usage:

- Accent color
- Primary CTA buttons
- Focus states
- Dividers
- Highlights

Gold must be used sparingly. It is an accent, not a primary color.

Do not use gold as body text color on dark backgrounds. Use Off White for body text.

---

## Neutral Palette

Gray 100: #F7F7F7
Gray 200: #EAEAEA
Gray 300: #D0D0D0
Gray 400: #A0A0A0
Gray 500: #7A7A7A
Gray 600: #5A5A5A
Gray 700: #3A3A3A
Gray 800: #222222
Gray 900: #111111

---

## Semantic Colors

Error Red: #DC2626

Success Green: #16A34A

Warning Amber: #D97706

---

## Contrast Requirements

All text must meet WCAG AA minimum contrast ratios:

- Normal text (under 18px): minimum 4.5:1
- Large text (18px+ or 14px+ bold): minimum 3:1
- UI components and focus indicators: minimum 3:1

Verified combinations:

- Off White (#F5F2EA) on Black (#090909): passes AA
- Off White (#F5F2EA) on Charcoal (#151515): passes AA
- Black (#090909) on Luxury Gold (#B89B5E): passes AA for large text; use only for button text and headings
- Do not use Luxury Gold (#B89B5E) as body text on dark backgrounds

---

# Typography

## Design Direction

Typography should feel editorial, luxurious, and timeless.

Avoid tech-startup typography.

---

## Heading Font

Preferred:

- Cormorant Garamond

Alternatives:

- Canela
- Editorial New

---

## Body Font

Preferred:

- Inter

Alternatives:

- SF Pro
- Geist

---

## Type Scale

Display: 72px / Line Height: 1.1 / Letter Spacing: -0.02em
H1: 56px / Line Height: 1.1 / Letter Spacing: -0.02em
H2: 44px / Line Height: 1.15 / Letter Spacing: -0.01em
H3: 36px / Line Height: 1.2
H4: 28px / Line Height: 1.3
H5: 22px / Line Height: 1.3
Body Large: 20px / Line Height: 1.6
Body: 16px / Line Height: 1.6
Small: 14px / Line Height: 1.5
Caption: 12px / Line Height: 1.4

---

# Spacing System

## Base Scale

4px
8px
12px
16px
24px
32px
48px
64px
96px
128px

---

## Section Spacing

Desktop: 120px top and bottom

Mobile: 72px top and bottom

---

# Layout Grid

## Desktop

Max Width: 1440px

Content Width: 1280px

Columns: 12

Gutter: 24px

---

## Tablet

Columns: 8

---

## Mobile

Columns: 4

---

# Border Radius

Small: 8px
Medium: 12px
Large: 20px
Extra Large: 32px

Avoid excessive rounding. These are luxury design elements, not consumer app pill buttons.

---

# Shadows

## Small

Used for cards.

box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

## Medium

Used for elevated components.

box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4)

## Large

Used sparingly for modals and dropdowns.

Avoid aggressive startup-style shadows.

---

# Buttons

## Primary Button

Background: Luxury Gold (#B89B5E)

Text: Black (#090909)

Text Style: 14px, uppercase, letter-spacing: 0.1em, font-weight: 600

Height: 52px minimum

Padding: 16px 32px

Usage: Primary CTAs — Request Reservation, Contact Us, Send Request

Hover state: Gold darkened by 10%

Active state: Gold darkened by 15%

Disabled state: 40% opacity

Loading state: Gold background, centered spinner (16px), no text

---

## Secondary Button

Background: Transparent

Border: 1px solid Luxury Gold (#B89B5E)

Text: Luxury Gold (#B89B5E)

Text Style: 14px, uppercase, letter-spacing: 0.1em

Height: 52px minimum

Hover state: Background fill at 10% gold opacity

---

## Ghost Button

Background: Transparent

Text: Off White (#F5F2EA)

Border: 1px solid Gray 700

Usage: Secondary navigation, less prominent actions

---

## Phone Number CTA (Navigation)

Displayed in the desktop and mobile navigation header.

Style:

- Text: Off White (#F5F2EA)
- Icon: Phone icon (thin line) to the left
- Font size: 14px, letter-spacing: 0.05em
- Hover: Gold color transition

The phone number is a tel: link and must be tappable on mobile.

---

# Cards

## Vehicle Card

Contains:

- Vehicle image (aspect ratio 4:3 or 16:9)
- Vehicle name (H4)
- Starting price (Body, gold accent)
- Chauffeur availability badge
- Short description (Body Small)
- View Details CTA (Ghost button)

Background: Charcoal

---

## Service Card

Contains:

- Icon or image
- Title (H5)
- Description (Body Small)
- Learn More CTA (Ghost button)

---

## Feature Card

Contains:

- Icon (thin line, gold)
- Title (H5)
- Supporting copy (Body Small)

---

## Testimonial Card

Contains:

- 5-star rating (★★★★★, gold, 16px)
- Large quotation mark (decorative, gold)
- Quote text (Body Large, italic, Off White)
- Client name (Small, Off White, 80% opacity)
- Service type (Caption, gold)

Background: Charcoal

Layout: Centered text, generous padding

Section background: Black or Charcoal

Display 3 testimonial cards in a 3-column grid on desktop, stacked on mobile.

---

# Forms

## Design Principles

- Spacious and premium
- Minimal cognitive load
- Labels always visible (never placeholder-only)
- Every field has a visible, descriptive label
- Required fields indicated with asterisk (*)

---

## Input Fields

Height: 56px minimum

Border: 1px solid Gray 700

Background: Gray 900 (on dark sections) or White (on light sections)

Text: Off White or Black depending on background

Label style: Small text, Gold or Off White, displayed above the field

Placeholder text: Gray 500, descriptive but not the label

---

## Input States

### Default

Border: 1px solid Gray 700

### Focus

Border: 1px solid Luxury Gold

Box shadow: 0 0 0 3px rgba(184, 155, 94, 0.2)

Outline: none (custom focus ring replaces it)

### Filled

Border: 1px solid Gray 600

### Error

Border: 1px solid Error Red (#DC2626)

Error message: Error Red text, 12px, displayed below the field

Error icon: Inline with field

### Disabled

Background: Gray 900

Opacity: 40%

Cursor: not-allowed

---

## Form Error Banner

Used when submission fails entirely (network error, server error).

Style:

- Background: Error Red at 10% opacity
- Border-left: 3px solid Error Red
- Icon: Warning icon
- Text: "Something went wrong. Please try again or call us directly at [phone number]."
- Displayed above the form fields
- aria-live="assertive" for screen reader announcement

---

## Form Success State

For inline success (contact form):

- Replace form with a success message panel
- Icon: Checkmark (gold)
- Headline: "Message Sent"
- Body: "Thank you. A member of our team will be in touch shortly."

For booking form: redirect to /book/confirmation (not inline).

---

## Multi-Step Booking Form

### Progress Indicator

Displayed above the form.

Style:

- 3 numbered steps
- Active step: gold circle with step number
- Completed steps: gold circle with checkmark
- Incomplete steps: gray circle with step number
- Step labels below circles: "Your Trip", "Your Details", "Review & Submit"
- Connector lines between steps (gray, turns gold when step is completed)

### Step Navigation

Back button: Ghost button, left-aligned

Next button: Primary button, right-aligned

Submit button: Primary button, right-aligned, label "Send Request"

### Back Navigation

Pressing Back preserves all previously entered data in the form state.

No data is lost when navigating between steps.

---

## Textarea

Min height: 120px

Max height: 240px (scrollable after)

Character counter: displayed below, right-aligned (example: 142 / 500)

---

## Radio and Checkbox Groups

Radio and checkbox inputs styled as custom pill or card selectors.

Selected state: Gold border and subtle gold background tint.

Unselected state: Gray border.

Focus state: Gold outline.

---

## Honeypot Field

Visually hidden from all users.

Implementation:

- Position: absolute, left: -9999px
- tabindex="-1"
- aria-hidden="true"
- autocomplete="off"
- Label text: "Leave this field empty"

---

# Navigation

## Desktop Navbar

Transparent over hero.

Becomes solid Charcoal (#151515) on scroll (after 80px).

Contains (left to right):

- Logo
- Navigation links: Home, Fleet, Services, About, FAQ, Contact
- Phone number (with phone icon)
- Request Reservation CTA button

All navigation links are 14px, uppercase, letter-spacing: 0.08em.

Active link: gold underline or gold color.

---

## Mobile Navigation

Hamburger icon top-right.

Logo top-left.

Phone number top-center or visible below logo.

Slide-out drawer from right.

Drawer contents:

- Close button (X)
- Navigation links (stacked, 18px)
- Phone number (large, with icon)
- Request Reservation CTA button

All touch targets minimum 48px height.

---

# Photography Direction

## Preferred Imagery

- Rolls-Royce exterior and interior
- Professional chauffeurs
- Executive clients in transit
- Seattle skyline and landmarks (Space Needle, waterfront)
- SeaTac Airport luxury arrivals
- Evening and night photography

---

## Visual Style

- Cinematic and high contrast
- Premium lighting (golden hour, blue hour, interior ambient)
- Editorial composition
- Wide aspect ratios (16:9 or wider for hero sections)

---

## Avoid

- Generic stock photography
- Dealership-style catalog shots
- Bright flashy supercar imagery
- Cheap limousine imagery
- Heavily filtered or oversaturated images

---

# Iconography

Style:

- Thin line icons (1.5px stroke)
- Elegant, minimal
- Consistent visual weight

Source: Lucide Icons or similar thin-line library.

Avoid:

- Cartoon-style icons
- Filled (solid) icons as primary iconography
- Overly technical or clipart icons

---

# Motion and Animation

## Principles

Animations should feel premium and restrained.

Avoid excessive or playful motion.

Duration: 200–400ms for micro-interactions, 600–800ms for page transitions.

Easing: ease-out for entrances, ease-in for exits.

---

## Standard Patterns

- Fade in on scroll (section entrance)
- Subtle image scale on hover (1.02–1.04 scale)
- Smooth hover state color transitions (150ms)
- Soft page transitions
- Skeleton loading screens before content loads

---

## Reduced Motion

Respect `prefers-reduced-motion` media query.

When reduced motion is preferred: disable all animations and transitions except opacity fades.

---

# Responsive Breakpoints

Mobile: 0–767px

Tablet: 768–1023px

Desktop: 1024–1439px

Large Desktop: 1440px+

---

# Accessibility

## Requirements

- WCAG AA contrast ratios for all text (see Color System section)
- Visible focus states on all interactive elements (gold ring, minimum 3px)
- Keyboard navigation support for all functionality
- Screen reader compatible markup (semantic HTML, ARIA where needed)
- Accessible forms (every input has a visible label, errors announced to screen readers)
- Skip-to-content link: first focusable element on every page; visually hidden until focused

## Skip-to-Content Link

Visually hidden by default. Becomes visible when focused via keyboard.

Style when visible:

- Position: fixed, top-left
- Background: Luxury Gold
- Text: Black
- Padding: 8px 16px
- z-index: 9999

## Form Accessibility

- Every input has an associated `<label>` with `htmlFor` matching the input `id`
- Error messages linked to their input via `aria-describedby`
- Required fields have `aria-required="true"`
- Form submission status (success, error) announced via `aria-live="polite"` region
- Multi-step form progress announced to screen readers on step change

## Interactive Elements

- All icon-only buttons and links have `aria-label` describing their action
- All images have descriptive `alt` text (or `alt=""` for decorative images)
- Navigation landmark uses `<nav>` with `aria-label="Main navigation"`
- Footer uses `<footer>` landmark

---

# Footer

## Contents

- Logo
- Tagline or one-line brand description
- Navigation links (grouped)
- Contact information (phone, email)
- Business hours
- Social media links (if applicable)
- Copyright notice
- Privacy Policy link
- Legal disclaimer (if applicable)

## Privacy Policy Link

Must be present in the footer on every page.

---

# Component Inventory

## Navigation

- Desktop Navbar (transparent + solid variants)
- Mobile Navbar
- Mobile Drawer Menu
- Skip-to-Content Link

## Buttons

- Primary Button (default, hover, active, disabled, loading)
- Secondary Button
- Ghost Button
- Phone Number CTA (navigation variant)

## Cards

- Vehicle Card
- Service Card
- Feature Card
- Testimonial Card

## Forms

- Input Field (all states: default, focus, filled, error, disabled)
- Textarea
- Radio Group (custom styled)
- Checkbox (custom styled)
- Select Dropdown
- Date Picker
- Time Picker
- Booking Form (3-step with progress indicator)
- Contact Form

## Layout Components

- CTA Banner
- Section Header (headline + subheadline)
- Service Area Grid
- Testimonial Grid
- Process Steps
- Footer
- FAQ Accordion

## Feedback Components

- Form Success State
- Form Error Banner
- Loading Spinner
- Progress Indicator (multi-step form)
- Skeleton Loader

## Media

- Gallery Component (desktop editorial / mobile swipeable)
- Hero Image with Overlay
- Vehicle Image Card

---

# Design System Success Criteria

Every page must communicate:

- Executive transportation brand positioning
- Luxury concierge service quality
- Premium quality and attention to detail
- Trustworthiness and professionalism

Users should never confuse Seattle Luxury Drive with a traditional rental car company or a generic limousine service.
