import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { getSettings, phoneHref } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.site_name,
    url: "https://seattleluxurydrive.com",
    telephone: phoneHref(s.contact_phone).replace("tel:", ""),
    email: s.contact_email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.site_address,
      addressCountry: "US",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.site_name,
    url: "https://seattleluxurydrive.com",
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-gold focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-sans"
      >
        Skip to main content
      </a>
      <SiteNav phone={s.contact_phone} />
      <main id="main-content">{children}</main>
      <SiteFooter
        phone={s.contact_phone}
        email={s.contact_email}
        address={s.site_address}
      />
    </>
  );
}
