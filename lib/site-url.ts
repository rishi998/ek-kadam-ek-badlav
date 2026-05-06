import { SITE_CANONICAL_ORIGIN } from "@/lib/site-config";

/**
 * Absolute origin for metadata, JSON-LD, and canonical URLs.
 *
 * - Production: set `NEXT_PUBLIC_SITE_URL` in the Vercel project (e.g. https://ekkademekbadlav.org)
 *   so Open Graph and canonicals use your custom domain, not *.vercel.app.
 * - Preview: leave unset; `VERCEL_URL` is used automatically.
 * - Local: defaults to http://localhost:3000
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  if (process.env.NODE_ENV === "production") {
    return SITE_CANONICAL_ORIGIN;
  }

  return "http://localhost:3000";
}
