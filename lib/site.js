/* Canonical origin. Vercel exposes the deployment host at build and run
   time; NEXT_PUBLIC_SITE_URL overrides it when a custom domain is in use. */

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
  return "http://localhost:3000";
}

export const SITE_URL = resolve();

/* The one place the public contact address is written down. Everything that
   shows or mails it — footer, privacy page, error copy, lead notifications —
   reads from here. */
export const CONTACT_EMAIL = "brief@verantintel.com";
