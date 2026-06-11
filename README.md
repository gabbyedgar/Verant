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

## Structure

- `app/` — routes: `/` (home), `/product`, `/pricing`, `/about`, plus the root
  layout and global styles
- `components/` — `Nav` (with mobile menu), `Footer`, `SignalFeed` (live-ticking
  feed), `BriefSample` (tabbed sample brief), `PricingPlans` (plan selector)
- `public/uploads/` — static assets
