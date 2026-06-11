"use client";

import { useState } from "react";

const COMPETITORS = [
  {
    id: "cipherline",
    name: "Cipherline",
    signals: [
      {
        tag: "Pricing",
        what: "Enterprise tier removed from public pricing page",
        saw: "Tuesday, 14:20 UTC: the Enterprise column on cipherline.com/pricing changed from “$4,200/mo” to “Contact sales.” Mid-tier pricing unchanged. No announcement.",
        implication:
          "Hiding enterprise pricing is the first move of a sales-led, upmarket push. Expect longer cycles at the top of their funnel — and less pricing pressure on you in mid-market deals for the next two quarters.",
      },
      {
        tag: "Hiring",
        what: "Federal sales and FedRAMP compliance roles posted within 48 hours",
        saw: "Four openings on their careers page Wednesday: two federal AEs (DC metro), one FedRAMP compliance lead, one solutions engineer with “public sector” in title. First federal roles in company history.",
        implication:
          "FedRAMP authorization takes 12–18 months. They’re paying now for a market they enter in 2027 — confirming the upmarket read, and telling you where their attention won’t be.",
      },
      {
        tag: "Patents",
        what: "USPTO filing: adversarial prompt detection at the inference layer",
        saw: "Application published Thursday: “Adversarial prompt detection via layered inference monitoring.” Two named inventors joined from an academic red-teaming lab in January.",
        implication:
          "This overlaps your runtime-protection roadmap. If granted, it’s a positioning weapon in enterprise security reviews. Worth a prior-art conversation with counsel this month, not next year.",
      },
    ],
  },
  {
    id: "aegix",
    name: "Aegix Labs",
    signals: [
      {
        tag: "Filings",
        what: "SEC Form D: $14M raise, lead investor undisclosed",
        saw: "Form D filed Monday for $14.2M. Sale date three weeks ago — they’ve been operating on this capital for nearly a month without announcing.",
        implication:
          "A quiet raise usually precedes a loud launch. Combined with their changelog velocity (below), expect a major announcement within six weeks. Pre-empt it: ship your comparison content now, while search is uncontested.",
      },
      {
        tag: "Governance",
        what: "NIST AI RMF crosswalk published as gated whitepaper",
        saw: "New gated asset: a 22-page mapping of their controls to NIST AI RMF. Promoted via two sponsored LinkedIn posts targeting compliance titles.",
        implication:
          "They’re buying the compliance-buyer relationship before the product fully supports it. Your actual RMF coverage is stronger — but undocumented. A two-page public crosswalk neutralizes their whitepaper at near-zero cost.",
      },
    ],
  },
  {
    id: "veilstack",
    name: "Veilstack",
    signals: [
      {
        tag: "People",
        what: "VP of Compliance departed; surfaced at Praxa within the week",
        saw: "Their VP Compliance — owner of the SOC 2 and ISO programs — updated LinkedIn Friday: now “Chief Trust Officer” at Praxa, an adjacent player outside your tracked set.",
        implication:
          "Veilstack’s certification renewals land in Q4 with no named successor. Their trust posture is temporarily weakened — the strongest week in two quarters to compete on governance depth in shared deals.",
      },
      {
        tag: "Quiet",
        what: "No material movement across the other seven sources",
        saw: "No pricing, product, filing, or web changes this week. Posting volume down 40% month-over-month.",
        implication:
          "A quiet week is a finding. Slowing hiring plus a senior departure reads as consolidation, not stealth. We’d treat Veilstack as a fading threat — and consider promoting Praxa into your tracked set.",
      },
    ],
  },
];

function Signal({ signal, open, onToggle }) {
  return (
    <div className={`sig${open ? " open" : ""}`}>
      <button className="sig-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="tag">{signal.tag}</span>
        <span className="what">{signal.what}</span>
        <span className="chev" aria-hidden="true">+</span>
      </button>
      <div className="sig-body">
        <div className="sig-body-inner">
          <div className="sig-body-content">
            <span className="lbl">What we saw</span>
            <p>{signal.saw}</p>
            <span className="lbl">Why it matters</span>
            <p className="implication">{signal.implication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BriefSample() {
  const [tab, setTab] = useState(COMPETITORS[0].id);
  const [openSig, setOpenSig] = useState(`${COMPETITORS[0].id}-0`);

  return (
    <div className="brief" data-reveal style={{ "--d": "0.1s" }}>
      <div className="brief-bar">
        <span className="l"><span className="dot pulse" />Verant weekly brief</span>
        <span className="r">Client: redacted · Wk 24 · Jun 8, 2026</span>
      </div>
      <div className="brief-inner">
        <h3 className="brief-title">
          The field is converging on compliance. Two of your three competitors moved this week.
        </h3>
        <p className="brief-meta">3 competitors · 11 signals captured · 7 material · 4 min read</p>

        <div className="brief-tabs" role="tablist">
          {COMPETITORS.map((c) => (
            <button
              key={c.id}
              className="brief-tab"
              role="tab"
              aria-selected={tab === c.id}
              onClick={() => setTab(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {COMPETITORS.map((c) => (
          <div
            key={c.id}
            className={`brief-panel${tab === c.id ? " active" : ""}`}
            role="tabpanel"
          >
            {c.signals.map((signal, i) => {
              const key = `${c.id}-${i}`;
              return (
                <Signal
                  key={key}
                  signal={signal}
                  open={openSig === key}
                  onToggle={() => setOpenSig(openSig === key ? null : key)}
                />
              );
            })}
          </div>
        ))}

        <div className="brief-bottomline">
          <div className="lbl">Bottom line — your week</div>
          <p>
            The field is splitting: Cipherline goes federal, Aegix buys the compliance narrative,
            Veilstack stalls. The mid-market governance buyer is briefly underserved. You have
            roughly one quarter of clear air — use it on documentation and comparison content, not
            features.
          </p>
        </div>
      </div>
    </div>
  );
}
