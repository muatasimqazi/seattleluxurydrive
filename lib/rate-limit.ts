import { headers } from "next/headers";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

// Module-level map persists across requests within a single server instance.
// Resets on cold start — acceptable for MVP volume.
const store = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(): Promise<{ allowed: boolean; ip: string }> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, ip };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, ip };
  }

  entry.count++;
  return { allowed: true, ip };
}
