# Verant

Marketing site for Verant — competitive intelligence, on frequency. Built with
[Next.js](https://nextjs.org) (App Router) and React.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Environment variables

Both are optional; the site builds and runs without them.

| Variable | Purpose |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Where pilot signups are POSTed as JSON. **Without it, submissions are validated and logged to the server console but not stored anywhere** — Vercel's filesystem is ephemeral, so there is no local fallback that would look like storage and silently lose leads. Point it at a Zapier/Make hook, a Slack incoming webhook, or your own endpoint. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `sitemap.xml`, `robots.txt` and Open Graph URLs. Defaults to the Vercel deployment URL, then `http://localhost:3000`. Set this once a custom domain is live. |

## Structure

```
app/
  layout.jsx          root layout: self-hosted fonts, nav, footer, skip link
  template.jsx        per-route fade-in + scroll-reveal observer
  page.jsx            home
  product/            product tour, sample brief, comparison table
  pricing/            plans, what's included, FAQ
  briefs/             brief archive index
  briefs/[slug]/      one brief per week (SSG + hourly revalidation)
  start/              pilot signup form (reads ?plan=)
  about/              position, tenets, principles
  privacy/            privacy notice
  not-found.jsx       404
  sitemap.js          generated sitemap, includes every brief
  robots.js           generated robots.txt
  api/pilot/          lead capture: validation, honeypot, webhook delivery
  api/signals/        signal feed data for the live hero feed
  icon.png,           favicon set, served and linked automatically
  apple-icon.png,
  favicon.ico
components/
  Nav, Footer, Logo
  SignalFeed          server-seeded, then polls /api/signals
  BriefSample         tabbed brief; WAI-ARIA tabs with arrow-key support
  PricingPlans        plan selector, deep-links to /start?plan=…
  PilotForm           signup form: validation, loading/success/error states
lib/
  plans.js            plan catalogue — one source of truth for pricing
  briefs.js           brief archive data and accessors
  signals.js          signal feed data and the eight sources
  site.js             canonical origin resolution
```

### Swapping in real data

`lib/` is the seam. The pages, API routes, `generateStaticParams` and the
sitemap all read through the accessor functions there, so pointing
`getBriefs()` / `getSignals()` at a CMS or database updates every consumer
without touching components. The brief pages revalidate hourly, so new
content appears without a redeploy.

## Accessibility notes

- All text meets WCAG AA contrast (4.5:1) on both the ink and cream surfaces.
- Keyboard: skip link, visible focus rings everywhere, roving-tabindex tabs
  with arrow/Home/End support, and 44px touch targets on mobile.
- `prefers-reduced-motion` disables the reveal, feed, marquee and route
  transitions.
- Fonts are self-hosted at build time — no render-blocking third-party
  request and no layout shift.
