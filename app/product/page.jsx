import Link from "next/link";
import BriefSample from "@/components/BriefSample";

export const metadata = {
  title: "Product",
};

const SOURCES = [
  { n: "01", h: "Pricing pages", p: "Tier changes, removed prices, seat minimums, packaging shifts — diffed daily." },
  { n: "02", h: "Hiring & careers", p: "New roles reveal roadmap. A FedRAMP lead posting is a federal strategy, announced early.", d: "0.05s" },
  { n: "03", h: "Patents & IP filings", p: "USPTO and EPO filings show where R&D money actually went — not where the blog says.", d: "0.1s" },
  { n: "04", h: "Governance & certifications", p: "SOC 2, ISO 42001, NIST AI RMF, EU AI Act mappings — the compliance arms race, tracked.", d: "0.15s" },
  { n: "05", h: "Product changelogs & docs", p: "Shipped features, renamed modules, deprecations. The roadmap, in past tense.", d: "0.05s" },
  { n: "06", h: "Funding & regulatory filings", p: "Form Ds, annual reports, lobbying registrations. Money movements on the public record.", d: "0.1s" },
  { n: "07", h: "Leadership & people moves", p: "Exec arrivals and departures, advisory boards, key engineers changing flags.", d: "0.15s" },
  { n: "08", h: "Web & positioning shifts", p: "Messaging rewrites, new comparison pages, keyword targeting against your brand.", d: "0.2s" },
];

const WEEK = [
  { d: "Mon 7:00", hot: true, p: <><strong>The brief lands.</strong> One page, in your inbox, before your first meeting.</> },
  { d: "Tue", p: "Monitoring continues. Pricing pages diffed, postings indexed." },
  { d: "Wed", p: "New filings cross-checked against the patent and funding record." },
  { d: "Thu", p: "Critical signals flagged. Growth and Pro clients get a mid-week alert." },
  { d: "Fri", p: "Week’s signals clustered and ranked by strategic weight." },
  { d: "Sat", p: "Quiet. The field rarely moves on Saturdays. Neither do we." },
  { d: "Sun", p: "Synthesis. An analyst writes the implications — machine-gathered, human-judged." },
];

const COMPARE_ROWS = [
  ["Cost", "$500–$3,000 / mo", "$25k+ per engagement", "$200/mo + ~6 hrs of your week"],
  ["Cadence", "Every Monday, 7am", "Quarterly, if scheduled", "Constant — and constantly noisy"],
  ["Time to signal", "Days from the source event", "Weeks; findings age in slide decks", "Minutes, buried in 200 alerts"],
  ["Synthesis", "One page of implications", "80 slides, two readouts", "None — you are the analyst"],
  ["Your time required", "4 minutes a week", "Meetings, prep, follow-ups", "Triage, every single day"],
];

export default function ProductPage() {
  return (
    <main>
      {/* HERO */}
      <section className="page-hero" data-screen-label="Product — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker"><span className="dot pulse" />Product</span>
            <h1 data-reveal>One page that reads the whole field.</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              Verant isn’t a dashboard you check or a consultant you schedule. It’s a frequency
              you’re tuned to — eight public signal sources, continuously monitored, synthesized
              into a single Monday brief.
            </p>
          </div>
        </div>
      </section>

      {/* 8 SOURCES */}
      <section style={{ paddingTop: 0 }} data-screen-label="Product — Signal sources">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">The eight sources</span>
            <h2>Where strategy leaks before it’s announced.</h2>
            <p className="lede">
              Every move a company makes leaves a public trace — usually weeks before the press
              release. We watch all eight surfaces, for every competitor in your set.
            </p>
          </div>
          <div className="sources">
            {SOURCES.map((s) => (
              <div className="source" data-reveal key={s.n} style={s.d ? { "--d": s.d } : undefined}>
                <span className="n">{s.n}</span>
                <div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEK CYCLE */}
      <section data-screen-label="Product — The week">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">The cadence</span>
            <h2>A week on the Verant frequency.</h2>
          </div>
          <div className="week" data-reveal>
            {WEEK.map((day, i) => (
              <div className={`day${day.hot ? " hot" : ""}`} key={i}>
                <span className="d">
                  {day.hot && <span className="dot" />}
                  {day.d}
                </span>
                <p>{day.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE BRIEF */}
      <section id="brief" data-screen-label="Product — Sample brief">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">The artifact</span>
            <h2>Read a real one.</h2>
            <p className="lede">
              A sample Monday brief for a fictional client in AI model security. Three competitors,
              one week of signal. Click any row to see what we saw — and what it implies.
            </p>
          </div>
          <BriefSample />
        </div>
      </section>

      {/* COMPARISON */}
      <section id="compare" data-screen-label="Product — Comparison">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">The alternative is worse</span>
            <h2>Software-native. Not a firm, not a feed.</h2>
            <p className="lede">
              Consultants synthesize but can’t watch continuously. Monitoring tools watch
              continuously but can’t synthesize. Verant is built to do both — at a price that
              doesn’t need a procurement cycle.
            </p>
          </div>
          <div data-reveal style={{ "--d": "0.08s" }}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="vcol">Verant</th>
                  <th scope="col">Strategy consultancy</th>
                  <th scope="col">DIY monitoring tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([label, verant, firm, diy]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="vcol">{verant}</td>
                    <td>{firm}</td>
                    <td>{diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-screen-label="Product — CTA">
        <div className="container" data-reveal>
          <h2>The first brief usually pays for the pilot.</h2>
          <p className="lede">
            Four weeks, $500, three competitors. If week one tells you nothing new, we refund it.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/pricing">Start a pilot — $500</Link>
            <Link className="btn btn-ghost" href="/pricing">
              See all plans <span className="arr">→</span>
            </Link>
          </div>
          <p className="fine">Setup call this week · First brief next Monday</p>
        </div>
      </section>
    </main>
  );
}
