import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import PostHogProvider from "@/components/providers/PostHogProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Seattle Luxury Drive | Premier Luxury Transportation",
    template: "%s | Seattle Luxury Drive",
  },
  description:
    "Seattle's premier luxury transportation and concierge service. Chauffeur-driven Rolls-Royce for executive transfers, airport pickups, corporate events, weddings, and special occasions. Serving Greater Seattle.",
  metadataBase: new URL("https://seattleluxurydrive.com"),
  keywords: [
    "luxury car rental Seattle",
    "chauffeur service Seattle",
    "Rolls Royce rental Seattle",
    "executive transportation Seattle",
    "airport transfer Seattle",
    "luxury limo Seattle",
    "wedding car Seattle",
    "corporate transportation Seattle",
  ],
  authors: [{ name: "Seattle Luxury Drive" }],
  creator: "Seattle Luxury Drive",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Seattle Luxury Drive",
    title: "Seattle Luxury Drive | Premier Luxury Transportation",
    description:
      "Chauffeur-driven Rolls-Royce and luxury vehicles for executive transfers, airport pickups, corporate events, weddings, and special occasions throughout the Greater Seattle Area.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seattle Luxury Drive | Premier Luxury Transportation",
    description:
      "Chauffeur-driven Rolls-Royce and luxury vehicles throughout the Greater Seattle Area.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-sans subpixel-antialiased`}>
        <PostHogProvider>
          <GoogleAnalytics />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
