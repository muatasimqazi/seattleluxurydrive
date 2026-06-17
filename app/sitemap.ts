import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE = "https://seattleluxurydrive.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/fleet`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let vehicleRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("vehicles")
      .select("slug, updated_at")
      .eq("is_active", true);

    vehicleRoutes = (data ?? []).map((v: { slug: string; updated_at: string }) => ({
      url: `${BASE}/fleet/${v.slug}`,
      lastModified: new Date(v.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Supabase not connected — vehicle routes omitted
  }

  return [...STATIC_ROUTES, ...vehicleRoutes];
}
