import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-black text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-6">
        404
      </p>
      <h1 className="font-heading text-4xl lg:text-5xl font-light text-offwhite mb-4">
        Page Not Found
      </h1>
      <p className="font-sans text-sm text-offwhite/75 max-w-sm mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="border border-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/contact"
          className="border border-offwhite/30 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-offwhite/85 hover:border-offwhite/60 hover:text-offwhite transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
