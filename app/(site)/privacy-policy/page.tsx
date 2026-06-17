import type { Metadata } from "next";
import Link from "next/link";
import { getSettings, phoneHref } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Seattle Luxury Drive. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://seattleluxurydrive.com/privacy-policy" },
  robots: { index: false },
};

export default async function PrivacyPolicyPage() {
  const s = await getSettings();

  return (
    <section className="bg-black pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-lt mb-4">
          Legal
        </p>
        <h1 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-4">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-offwhite/40 mb-16">
          Last updated: June 2025
        </p>

        <div className="space-y-12 font-sans text-sm leading-relaxed text-offwhite/70">

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              1. Introduction
            </h2>
            <p>
              Seattle Luxury Drive (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) operates the website seattleluxurydrive.com (the
              &ldquo;Site&rdquo;). We are committed to protecting your privacy and
              handling your personal information with transparency and care. This
              Privacy Policy explains what information we collect when you use our
              Site, how we use it, and the choices available to you.
            </p>
            <p className="mt-4">
              By using our Site, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              2. Information We Collect
            </h2>
            <p className="font-medium text-offwhite/85 mb-2">
              Information you provide directly:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-offwhite/65">
              <li>
                <span className="font-medium text-offwhite/80">Reservation requests:</span>{" "}
                name, email address, phone number, pickup and dropoff locations,
                service type, rental type, preferred dates, estimated hours, and
                any special requests or occasion details.
              </li>
              <li>
                <span className="font-medium text-offwhite/80">Contact form submissions:</span>{" "}
                name, email address, phone number, and your message.
              </li>
            </ul>
            <p className="font-medium text-offwhite/85 mb-2">
              Information collected automatically:
            </p>
            <ul className="list-disc list-inside space-y-2 text-offwhite/65">
              <li>
                Usage data including pages visited, session duration, referring
                URLs, and general browser and device information, collected through
                Google Analytics and PostHog.
              </li>
              <li>
                Cookies and similar tracking technologies as described in Section 6
                below.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-offwhite/65">
              <li>Respond to your reservation requests and general inquiries</li>
              <li>Coordinate and confirm your transportation service</li>
              <li>
                Send booking confirmation emails and service-related communications
              </li>
              <li>
                Understand how visitors use our Site so we can improve our content
                and user experience
              </li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p className="mt-4">
              We will not use your personal information for unsolicited marketing
              communications without your explicit consent.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              4. Information We Do Not Share
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We may share limited information with third-party service
              providers who help us operate our Site and deliver our services, as
              described in Section 5. These providers are contractually obligated to
              use your information only as directed by us and in accordance with
              applicable law.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              5. Third-Party Service Providers
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-medium text-offwhite/85 mb-1">Google Analytics</p>
                <p className="text-offwhite/65">
                  We use Google Analytics to understand how visitors interact with
                  our Site. Google Analytics collects anonymous usage data using
                  cookies. Your IP address is anonymized before storage. You may
                  opt out of Google Analytics tracking using the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-lt transition-colors"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  . Google&apos;s privacy practices are governed by the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-lt transition-colors"
                  >
                    Google Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div>
                <p className="font-medium text-offwhite/85 mb-1">PostHog</p>
                <p className="text-offwhite/65">
                  We use PostHog for product analytics to understand how users
                  navigate and interact with our Site. PostHog collects page view
                  and interaction data. Data is processed in accordance with
                  PostHog&apos;s privacy practices. You can learn more at{" "}
                  <a
                    href="https://posthog.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-lt transition-colors"
                  >
                    posthog.com/privacy
                  </a>
                  .
                </p>
              </div>
              <div>
                <p className="font-medium text-offwhite/85 mb-1">Resend</p>
                <p className="text-offwhite/65">
                  We use Resend to deliver transactional emails, including booking
                  confirmations and inquiry responses. Your name and email address
                  are transmitted to Resend solely for the purpose of delivering
                  these communications. Resend does not use your information for
                  their own marketing purposes.
                </p>
              </div>
              <div>
                <p className="font-medium text-offwhite/85 mb-1">Supabase</p>
                <p className="text-offwhite/65">
                  Your form submissions are stored securely in Supabase, a managed
                  cloud database platform. Supabase employs industry-standard
                  security practices including encryption at rest and in transit.
                  Your data is not used by Supabase for any purposes beyond secure
                  storage and retrieval on our behalf.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              Our Site uses cookies and similar technologies for the following
              purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-offwhite/65 mb-4">
              <li>
                <span className="font-medium text-offwhite/80">Analytics cookies</span>{" "}
                (Google Analytics, PostHog): Collect anonymous data about how you
                use our Site to help us understand and improve the user experience.
              </li>
            </ul>
            <p>
              You can control or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of our Site.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your contact and reservation information for as long as
              reasonably necessary to deliver our services, maintain business
              records, and comply with applicable legal obligations. If you would
              like your personal information deleted, please contact us using the
              information in Section 10 and we will process your request promptly.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              8. Your Privacy Rights
            </h2>
            <p className="mb-4">
              Depending on your location and applicable law, you may have the right
              to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-offwhite/65">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>
                Object to or restrict certain types of processing of your
                information
              </li>
              <li>
                Withdraw consent where our processing is based on consent
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the
              information below. We will respond within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              9. Data Security
            </h2>
            <p>
              We take reasonable technical and organizational measures to protect
              your personal information from unauthorized access, disclosure,
              alteration, or loss. Your data is stored on secure infrastructure
              with encryption at rest and in transit. However, no method of
              electronic transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our Site is not directed at children under the age of 13. We do not
              knowingly collect personal information from children under 13. If you
              believe we have inadvertently collected such information, please
              contact us and we will delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes
              in our practices or applicable law. When we do, we will update the
              &ldquo;Last updated&rdquo; date at the top of this page. Your
              continued use of our Site after changes are posted constitutes
              your acceptance of the updated policy. We encourage you to review
              this page periodically.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-offwhite mb-4">
              12. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, wish to exercise your
              privacy rights, or have concerns about how your information is handled,
              please contact us:
            </p>
            <div className="space-y-1 text-offwhite/65">
              <p className="font-medium text-offwhite/85">{s.site_name}</p>
              <p>{s.site_address}</p>
              <p>
                <a
                  href={phoneHref(s.contact_phone)}
                  className="text-gold hover:text-gold-lt transition-colors"
                >
                  {s.contact_phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${s.contact_email}`}
                  className="text-gold hover:text-gold-lt transition-colors"
                >
                  {s.contact_email}
                </a>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-offwhite/10">
          <Link
            href="/"
            className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
          >
            ← Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
