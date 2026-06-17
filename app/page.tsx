export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 bg-black">
      <p className="font-sans text-sm uppercase tracking-[0.2em] text-gold-lt">
        Seattle Luxury Drive
      </p>
      <h1 className="font-heading text-5xl font-light text-offwhite text-center">
        Seattle&apos;s Premier Luxury<br />Transportation Experience.
      </h1>
      <a
        href="/book"
        className="mt-4 border border-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-black transition-colors"
      >
        Request Reservation
      </a>
    </main>
  );
}
