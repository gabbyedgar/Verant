"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

export default function PricingPlans() {
  const [selected, setSelected] = useState(null);
  const plan = PLANS.find((p) => p.slug === selected);
  const shown = plan || PLANS.find((p) => p.featured);

  return (
    <>
      <div className="plans">
        {PLANS.map((p) => (
          <button
            key={p.slug}
            className={`plan${p.featured ? " featured" : ""}`}
            type="button"
            aria-pressed={selected === p.slug}
            onClick={() => setSelected(selected === p.slug ? null : p.slug)}
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
          Selected: <strong>{shown.name}</strong>
          {plan ? ` — ${plan.summary}` : ""}
        </span>
        <span className="sb-price">{shown.priceLabel}</span>
        <Link
          className="btn btn-primary btn-sm"
          href={`/start?plan=${shown.slug}`}
          tabIndex={plan ? undefined : -1}
          aria-hidden={plan ? undefined : "true"}
          prefetch={false}
        >
          Start with {shown.name}
        </Link>
      </div>
    </>
  );
}
