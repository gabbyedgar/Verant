/* Signal feed data. In production this module is where a real
   collector would land — the API route and the feed component both
   read through getSignals() so swapping the source touches one file. */

const SIGNALS = [
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
  { src: "FILINGS", co: "Northcage", desc: "Lobbying registration filed for AI procurement rulemaking." },
  { src: "WEB", co: "Cipherline", desc: "Homepage headline swapped from “fastest” to “most audited.”" },
  { src: "PEOPLE", co: "Aegix Labs", desc: "Two staff engineers hired from a federal systems integrator." },
  { src: "PATENTS", co: "Praxa", desc: "EPO application: continuous model-drift attestation." },
];

/** All signals, newest first. */
export function getSignals() {
  return SIGNALS;
}

/** A window of signals starting at `offset`, wrapping around the list. */
export function getSignalWindow(offset = 0, count = 6) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(SIGNALS[(offset + i) % SIGNALS.length]);
  }
  return out;
}

export const SIGNAL_SOURCES = [
  { n: "01", h: "Pricing pages", p: "Tier changes, removed prices, seat minimums, packaging shifts — diffed daily." },
  { n: "02", h: "Hiring & careers", p: "New roles reveal roadmap. A FedRAMP lead posting is a federal strategy, announced early.", d: "0.05s" },
  { n: "03", h: "Patents & IP filings", p: "USPTO and EPO filings show where R&D money actually went — not where the blog says.", d: "0.1s" },
  { n: "04", h: "Governance & certifications", p: "SOC 2, ISO 42001, NIST AI RMF, EU AI Act mappings — the compliance arms race, tracked.", d: "0.15s" },
  { n: "05", h: "Product changelogs & docs", p: "Shipped features, renamed modules, deprecations. The roadmap, in past tense.", d: "0.05s" },
  { n: "06", h: "Funding & regulatory filings", p: "Form Ds, annual reports, lobbying registrations. Money movements on the public record.", d: "0.1s" },
  { n: "07", h: "Leadership & people moves", p: "Exec arrivals and departures, advisory boards, key engineers changing flags.", d: "0.15s" },
  { n: "08", h: "Web & positioning shifts", p: "Messaging rewrites, new comparison pages, keyword targeting against your brand.", d: "0.2s" },
];

/** Short labels for the scrolling source strip. */
export const STRIP_ITEMS = [
  "Pricing pages",
  "Hiring & careers",
  "Patents & IP",
  "Governance frameworks",
  "Product changelogs",
  "Funding & filings",
  "People moves",
  "Web & positioning",
];
