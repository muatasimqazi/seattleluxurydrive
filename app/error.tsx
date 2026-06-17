"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-black text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-lt mb-6">
        Something went wrong
      </p>
      <h1 className="font-heading text-4xl lg:text-5xl font-light text-offwhite mb-4">
        An Error Occurred
      </h1>
      <p className="font-sans text-sm text-offwhite/75 max-w-sm mb-10">
        We apologize for the inconvenience. Please try again or contact us
        directly at{" "}
        <a
          href="tel:+12066691109"
          className="text-gold hover:text-gold-lt transition-colors"
        >
          (206) 669-1109
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="border border-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-offwhite/30 px-8 py-3 font-sans text-[11px] uppercase tracking-[0.18em] text-offwhite/85 hover:border-offwhite/60 hover:text-offwhite transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
