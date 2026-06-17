import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Seattle Luxury Drive.",
};

// Privacy Policy copy is pending legal review.
// Replace this placeholder with the final approved policy before launch.
// See specs/content/design-gaps.md — "Blocking Production Launch" section.

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-black pt-40 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-4">
            Legal
          </p>
          <h1 className="font-heading text-4xl font-light text-offwhite lg:text-5xl mb-6">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs text-offwhite/40 mb-12">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="prose prose-sm max-w-none space-y-8 font-sans text-sm leading-relaxed text-offwhite/70">
            <section>
              <h2 className="font-heading text-xl font-light text-offwhite mb-3">
                Information We Collect
              </h2>
              <p>
                When you submit a booking request or contact form on our website,
                we collect the information you provide, including your name, email
                address, phone number, and details about your transportation needs.
                We also collect standard web analytics data (page views, session
                duration) through Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-light text-offwhite mb-3">
                How We Use Your Information
              </h2>
              <p>
                We use the information you provide solely to respond to your
                inquiry, coordinate your reservation, and communicate with you
                about our services. We do not sell, rent, or share your personal
                information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-light text-offwhite mb-3">
                Data Retention
              </h2>
              <p>
                We retain your contact and reservation information for as long as
                necessary to provide our services and comply with applicable legal
                obligations. You may contact us at any time to request deletion of
                your data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-light text-offwhite mb-3">
                Cookies and Analytics
              </h2>
              <p>
                Our website uses Google Analytics to understand how visitors
                interact with our site. Google Analytics uses cookies to collect
                anonymous usage data. You can opt out of Google Analytics tracking
                by using the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-lt transition-colors"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-light text-offwhite mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or how your
                information is handled, please contact us:
              </p>
              <div className="mt-4 space-y-1">
                <p>Seattle Luxury Drive</p>
                <p>14723 Aurora Ave N, Shoreline, WA 98133</p>
                <p>
                  <a href="tel:+12066691109" className="text-gold hover:text-gold-lt transition-colors">
                    (206) 669-1109
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@seattleluxurydrive.com"
                    className="text-gold hover:text-gold-lt transition-colors"
                  >
                    info@seattleluxurydrive.com
                  </a>
                </p>
              </div>
            </section>

            <p className="text-offwhite/35 text-xs border-t border-offwhite/10 pt-8">
              This privacy policy is a general placeholder pending final legal
              review. It will be updated before the site goes live.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:text-gold-lt transition-colors"
            >
              ← Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
