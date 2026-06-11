"use client";

import { useState } from "react";

const PLANS = [
  {
    name: "Pilot",
    price: "$500",
    per: "one-time · 4 weeks",
    priceLabel: "$500 one-time",
    summary: "4 weeks · 3 competitors · refundable",
    desc: "Prove the signal before you subscribe.",
    features: [
      "3 competitors tracked",
      "4 Monday briefs",
      "All 8 signal sources",
      "Refunded if week one tells you nothing new",
    ],
  },
  {
    name: "Starter",
    price: "$800",
    per: "/ month",
    priceLabel: "$800 / month",
    summary: "3 competitors · weekly brief · archive",
    desc: "The core promise, on repeat.",
    features: [
      "3 competitors tracked",
      "The Monday brief, every week",
      "All 8 signal sources",
      "Searchable signal archive",
    ],
    delay: "0.06s",
  },
  {
    name: "Growth",
    price: "$1,500",
    per: "/ month",
    priceLabel: "$1,500 / month",
    summary: "5 competitors · mid-week alerts · quarterly trendline",
    desc: "For teams where the field moves fast.",
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
    name: "Pro",
    price: "$3,000",
    per: "/ month",
    priceLabel: "$3,000 / month",
    summary: "8 competitors · same-day flashes · analyst on reply",
    desc: "A competitive intelligence desk, minus the desk.",
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

export default function PricingPlans() {
  const [selected, setSelected] = useState(null);
  const plan = PLANS.find((p) => p.name === selected);

  return (
    <>
      <div className="plans">
        {PLANS.map((p) => (
          <button
            key={p.name}
            className={`plan${p.featured ? " featured" : ""}`}
            type="button"
            aria-pressed={selected === p.name}
            onClick={() => setSelected(selected === p.name ? null : p.name)}
            data-reveal
            style={p.delay ? { "--d": p.delay } : undefined}
          >
            {p.featured && <span className="badge">Most chosen</span>}
            <span className="pname">{p.name}</span>
            <span className="price">{p.price}</span>
            <span className="per">{p.per}</span>
            <span className="pdesc">{p.desc}</span>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className={`select-bar${plan ? " visible" : ""}`} role="status">
        <span className="sb-text">
          Selected: <strong>{plan ? plan.name : "Growth"}</strong>
          {plan ? ` — ${plan.summary}` : ""}
        </span>
        <span className="sb-price">{plan ? plan.priceLabel : "$1,500 / month"}</span>
        <a
          className="btn btn-primary btn-sm"
          href={`mailto:brief@verant.co?subject=Start${plan ? ` ${plan.name}` : ""}`}
        >
          Start with {plan ? plan.name : "Growth"}
        </a>
      </div>
    </>
  );
}
