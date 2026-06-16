# Seattle Luxury Drive Specifications

## Reading Order

### Core Specs (specs/docs/)
1. 00-project-overview.md — Business model, fleet, service area, goals
2. 01-mvp-requirements.md — Full requirements with validation rules, acceptance criteria, email specs
3. 02-ux-specification.md — Page layouts, navigation, booking form (3 steps), mobile UX
4. 03-design-system.md — Colors, typography, components, form states, accessibility
5. 04-figma-prompt.md — Figma AI generation prompt (updated for 3-step form)
6. 05-technical-specification.md — Stack, DB schema, RLS, middleware, email, SEO, security
7. AI_CONTEXT.md — Condensed quick-reference for Claude Code

### Content (specs/content/)
- homepage-copy.md — Approved homepage copy
- services-copy.md — Copy for all 8 service sections
- about-copy.md — Company story, mission, values
- faq-copy.md — 15+ Q&A across categories
- contact-copy.md — Contact page + booking form copy
- brand-voice.md — Tone, terminology, CTA guidelines
- testimonials.md — Strategy and placeholder content
- vehicles/rolls-royce-2021.md — STATUS: PENDING (vehicle details needed)
- page-map.md — Every page: route, goal, data source, components
- implementation-plan.md — 8-phase development plan with launch checklist
- claude-bootstrap.md — Context file for Claude Code at development start
- design-gaps.md — Open questions blocking design or development

### Design (specs/design/)
- design-decision-log.md — Approved decisions (source of truth when conflicts arise)
- figma-generation-plan.md — Phase-by-phase Figma generation prompts and checkpoints
- figma-review-checklist.md — Checklist for approving each Figma deliverable

## Current Status

Phase: Design

Current Objective:
Generate and approve Figma designs before implementation.

## Recent Updates

All specification documents were reviewed and updated in a pre-development architecture review. Key changes across documents:

- Booking form restructured from 6 steps to 3 steps (Your Trip / Your Details / Review & Submit)
- Testimonials section added to homepage
- Phone number added to global navigation (desktop and mobile)
- Privacy Policy page added to scope
- Booking Confirmation page added to scope (/book/confirmation)
- Customer confirmation email added to both booking and contact workflows
- Spam prevention specified (honeypot + rate limiting)
- Database schema expanded (start_time, ip_address, utm tracking, responded_at, admin_notes)
- Database indexes defined
- Explicit Supabase RLS policies written out
- Admin middleware specification added (middleware.ts)
- sitemap.ts and robots.ts specifications added
- next.config.ts specification added (image domains, security headers)
- Error pages specified (404, 500)
- Additional structured data added (BreadcrumbList, FAQPage)
- Content deliverables checklist added to requirements
- Full acceptance criteria added to requirements
- Design system expanded with form states, testimonial card, accessibility improvements

## Content Deliverables (Required Before Development)

The following content must be provided before development begins:

- [ ] Business phone number
- [ ] Business email address
- [ ] Business hours
- [ ] Admin notification email address
- [ ] Vehicle photography (minimum 8 images of the 2021 Rolls-Royce)
- [ ] Services page copy for all 6 services
- [ ] About page copy (company story, mission, values)
- [ ] FAQ content (minimum 15 questions across 5 categories)
- [ ] Testimonials (minimum 3 client quotes)
- [ ] Homepage hero copy (approved)

## Design Inputs

Primary Inspiration:
- Existing SJD promotional artwork
- Blacklane
- NetJets
- Rolls-Royce
- Four Seasons

Brand Positioning:
- 50% Executive Transportation
- 30% Luxury Concierge
- 20% Rolls-Royce Elegance

## Development Rule

No implementation work should begin until:
1. Design approval is complete (Figma designs approved)
2. All content deliverables above are received
