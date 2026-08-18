/* Plan catalogue — the single source of truth for pricing across the
   pricing page, the home teaser, and the pilot signup form. */

export const PLANS = [
  {
    slug: "pilot",
    name: "Pilot",
    price: "$500",
    per: "one-time · 4 weeks",
    priceLabel: "$500 one-time",
    summary: "4 weeks · 3 competitors · refundable",
    desc: "Prove the signal before you subscribe.",
    teaser: "Four Monday briefs. See the signal before you commit.",
    features: [
      "3 competitors tracked",
      "4 Monday briefs",
      "All 8 signal sources",
      "Refunded if week one tells you nothing new",
    ],
  },
  {
    slug: "starter",
    name: "Starter",
    price: "$800",
    per: "/ month",
    priceLabel: "$800 / month",
    summary: "3 competitors · weekly brief · archive",
    desc: "The core promise, on repeat.",
    teaser: "The Monday brief on three competitors, every week.",
    features: [
      "3 competitors tracked",
      "The Monday brief, every week",
      "All 8 signal sources",
      "Searchable signal archive",
    ],
    delay: "0.06s",
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$1,500",
    per: "/ month",
    priceLabel: "$1,500 / month",
    summary: "5 competitors · mid-week alerts · quarterly trendline",
    desc: "For teams where the field moves fast.",
    teaser: "Five competitors, mid-week alerts on critical moves.",
    featured: true,
    features: [
      "5 competitors tracked",
      "The Monday brief, every week",
      "Mid-week alerts on critical moves",
      "Quarterly trendline review",
      "Searchable signal archive",
    ],
    delay: "0.12s",
  },
  {
    slug: "pro",
    name: "Pro",
    price: "$3,000",
    per: "/ month",
    priceLabel: "$3,000 / month",
    summary: "8 competitors · same-day flashes · analyst on reply",
    desc: "A competitive intelligence desk, minus the desk.",
    teaser: "Eight competitors, same-day flashes, analyst on reply.",
    features: [
      "8 competitors tracked",
      "The Monday brief, every week",
      "Same-day flash alerts",
      "Analyst Q&A — reply to any brief",
      "Board-ready quarterly report",
    ],
    delay: "0.18s",
  },
];

export const PLAN_SLUGS = PLANS.map((p) => p.slug);

export function getPlan(slug) {
  return PLANS.find((p) => p.slug === slug) || null;
}
