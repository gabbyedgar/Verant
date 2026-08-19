/* Canonical origin, used for sitemap.xml, robots.txt and Open Graph URLs.

   Host-agnostic: set NEXT_PUBLIC_SITE_URL and it wins everywhere. The Vercel
   variables are only a convenience for preview deploys. The production domain
   is the fallback rather than localhost, so a build on a host that sets
   neither (Hostinger, a plain VPS, CI) still emits real URLs instead of
   publishing http://localhost:3000 into the sitemap. */

const PRODUCTION_ORIGIN = "https://verantintel.com";

function resolve() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return PRODUCTION_ORIGIN;
}

export const SITE_URL = resolve();

/* The one place the public contact address is written down. Everything that
   shows or mails it — footer, privacy page, error copy, lead notifications —
   reads from here. */
export const CONTACT_EMAIL = "brief@verantintel.com";
