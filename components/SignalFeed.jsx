"use client";

import { useEffect, useRef, useState } from "react";

const FEED_EVENTS = [
  { src: "PRICING", co: "Cipherline", desc: "Enterprise tier removed from public pricing page — “Contact sales” only." },
  { src: "HIRING", co: "Aegix Labs", desc: "4 new openings posted: federal sales, FedRAMP compliance lead." },
  { src: "PATENTS", co: "Veilstack", desc: "USPTO filing: “Adversarial prompt detection via layered inference.”" },
  { src: "GOVERNANCE", co: "Cipherline", desc: "SOC 2 Type II report refreshed; ISO 42001 added to trust page." },
  { src: "PRODUCT", co: "Northcage", desc: "Changelog: EU AI Act mapping module shipped to all plans." },
  { src: "FILINGS", co: "Aegix Labs", desc: "SEC Form D filed — $14M raise, undisclosed lead." },
  { src: "PEOPLE", co: "Veilstack", desc: "VP of Compliance departed; LinkedIn shows move to Praxa." },
  { src: "WEB", co: "Praxa", desc: "New comparison page published targeting your brand keywords." },
  { src: "PRICING", co: "Northcage", desc: "Starter plan cut 20%; seat minimums dropped." },
  { src: "HIRING", co: "Cipherline", desc: "First EU hire: policy counsel, Brussels." },
  { src: "PRODUCT", co: "Praxa", desc: "Docs update: model-risk scorecards renamed “audit packs.”" },
  { src: "GOVERNANCE", co: "Aegix Labs", desc: "NIST AI RMF crosswalk published as gated whitepaper." },
];

const MAX_ROWS = 7;
const OFFSETS = [2, 9, 23, 41, 67, 118, 190]; // minutes-ago ladder

function feedTime(offsetMin) {
  if (offsetMin < 1) return "now";
  if (offsetMin < 60) return `${offsetMin}m`;
  return `${Math.round(offsetMin / 60)}h`;
}

// deterministic seed so the server render matches hydration
const SEED = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  ev: FEED_EVENTS[(i + 2) % FEED_EVENTS.length],
  entering: false,
}));

export default function SignalFeed() {
  const [rows, setRows] = useState(SEED);
  const nextRef = useRef({ id: SEED.length, idx: 8 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setRows((prev) => {
        const n = nextRef.current;
        const row = { id: n.id, ev: FEED_EVENTS[n.idx % FEED_EVENTS.length], entering: true };
        nextRef.current = { id: n.id + 1, idx: n.idx + 1 };
        return [row, ...prev].slice(0, MAX_ROWS);
      });
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  // the newest row reads "now"; older rows age down the fixed offset ladder
  const ticked = nextRef.current.idx > 8;
  return (
    <div className="feed" data-reveal style={{ "--d": "0.15s" }} aria-label="Live competitor signal feed">
      <div className="feed-head">
        <span className="live"><span className="dot pulse" />Signal feed</span>
        <span>Your competitive set</span>
      </div>
      <div className="feed-body">
        {rows.map((row, i) => (
          <div key={row.id} className={`feed-row${row.entering ? " entering" : ""}`}>
            <span className="t">
              {ticked
                ? i === 0
                  ? "now"
                  : feedTime(OFFSETS[Math.min(i - 1, OFFSETS.length - 1)])
                : feedTime(OFFSETS[i])}
            </span>
            <span className="ev">
              <span className="ev-top">
                <span className="src">{row.ev.src}</span>
                <span className="co">{row.ev.co}</span>
              </span>
              <span className="desc">{row.ev.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
