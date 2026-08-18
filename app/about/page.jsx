import Link from "next/link";

export const metadata = {
  title: "About",
};

const TENETS = [
  {
    n: "I",
    h: "Truth",
    p: "Every claim cites a public source. Uncertainty is labeled as uncertainty. A quiet week is reported as a quiet week. The brief is only useful if you never have to wonder whether it’s flattering you.",
  },
  {
    n: "II",
    h: "Intelligence",
    p: "Information you can act on before your competitors act on you. The standard isn’t “interesting” — it’s “earlier than the press release, with the implication attached.”",
    d: "0.1s",
  },
  {
    n: "III",
    h: "Strategy",
    p: "Signals are the means; your next ninety days are the point. Every brief ends with what the week implies for your position — pricing, roadmap, narrative — not a pile of observations.",
    d: "0.2s",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    h: "Public sources only",
    p: "If it can’t be cited openly, it doesn’t exist to us. No pretexting, no private channels, no “a source tells us.” The edge is attention, not access.",
  },
  {
    n: "02",
    h: "A quiet week is a finding",
    p: "We never pad. Silence from a competitor — slowed hiring, a stalled changelog — is reported as exactly that, with what it implies.",
  },
  {
    n: "03",
    h: "Implications, not observations",
    p: "“They posted four jobs” is an observation. “They’re building a federal motion that lands in 2027, which frees your mid-market flank” is the product.",
  },
  {
    n: "04",
    h: "One page, always",
    p: "The constraint is the discipline. If it doesn’t fit on a page, we haven’t finished deciding what matters.",
  },
  {
    n: "05",
    h: "We say when we’re unsure",
    p: "Confidence levels are stated, not implied. A hypothesis is labeled a hypothesis. Trust compounds faster than certainty theater.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* HERO / POSITION */}
      <section className="page-hero page-hero--about" data-screen-label="About — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker"><span className="dot pulse" />The position</span>
            <h1 data-reveal>Truth, on a schedule.</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s", maxWidth: "62ch" }}>
              Verant exists because the most consequential market intelligence is public, free, and
              almost entirely unread — until it’s too late to act on.
            </p>
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="why" style={{ paddingTop: 88 }} data-screen-label="About — Why now">
        <div className="container why-grid">
          <div className="section-head" style={{ marginBottom: 0 }} data-reveal>
            <span className="kicker muted">Why now</span>
            <h2>The field moves weekly. Your intelligence is quarterly.</h2>
          </div>
          <div className="why-copy" data-reveal style={{ "--d": "0.1s" }}>
            <p>
              In AI security and governance, the ground shifts faster than anywhere in B2B.
              Frameworks harden mid-quarter — the EU AI Act, NIST AI RMF, ISO 42001. A
              competitor’s certification page changes on a Tuesday and reshapes every security
              review you walk into that month.
            </p>
            <p>
              Enterprises hired analysts to watch for this. Mid-market companies got Google Alerts
              — volume without judgment, noise without implication. The signal was always public:{" "}
              <strong>pricing diffs, patent filings, job postings, trust pages.</strong> What was
              missing was someone whose entire job is reading it, every week, for you.
            </p>
            <p>
              That’s the whole company. Not advice, not workshops, not an 80-slide readout twice a
              year. A frequency you’re tuned to, and one page every Monday that tells the truth
              about your field — including the weeks when the truth is “nothing happened.”
            </p>
          </div>
        </div>
      </section>

      {/* MANIFESTO QUOTE */}
      <section className="manifesto" data-screen-label="About — Manifesto">
        <div className="container" data-reveal>
          <blockquote>
            “Intelligence is a deadline business.{" "}
            <span className="hl">Being right late is the same as being wrong.</span>”
          </blockquote>
          <cite>The Verant position</cite>
        </div>
      </section>

      {/* TENETS */}
      <section data-screen-label="About — Tenets">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">Three words on the door</span>
            <h2>Truth · Intelligence · Strategy</h2>
          </div>
          <div className="tenets">
            {TENETS.map((t) => (
              <div className="tenet" data-reveal key={t.n} style={t.d ? { "--d": t.d } : undefined}>
                <span className="t-n">{t.n}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section style={{ paddingTop: 0 }} data-screen-label="About — The name">
        <div className="container why-grid">
          <div className="section-head" style={{ marginBottom: 0 }} data-reveal>
            <span className="kicker muted">The name</span>
            <h2>
              From <em style={{ fontStyle: "italic" }}>verus</em>. True.
            </h2>
          </div>
          <div data-reveal style={{ "--d": "0.1s" }}>
            <div className="name-card">
              <div className="entry">
                verant<span className="wm-dot">.</span>
              </div>
              <div className="pron">/ˈvɛr·ənt/ · noun</div>
              <dl>
                <div>
                  <dt>Root</dt>
                  <dd>
                    Latin <em>verus</em> — true, real, actual. The same root as <em>verify</em> and{" "}
                    <em>veritas</em>.
                  </dd>
                </div>
                <div>
                  <dt>Working definition</dt>
                  <dd>One who tells you what is actually happening, on time.</dd>
                </div>
                <div>
                  <dt>The dot</dt>
                  <dd>
                    The live indicator. It means the frequency is open and someone is listening on
                    your behalf.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" style={{ paddingTop: 0 }} data-screen-label="About — Principles">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">Operating principles</span>
            <h2>How the briefs stay honest.</h2>
          </div>
          <div className="principles" data-reveal style={{ "--d": "0.06s" }}>
            {PRINCIPLES.map((p) => (
              <div className="principle" key={p.n}>
                <span className="p-n">{p.n}</span>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-screen-label="About — CTA">
        <div className="container" data-reveal>
          <h2>Tune in.</h2>
          <p className="lede">A 30-minute setup call this week. Your first brief next Monday, 7am.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/start?plan=pilot" prefetch={false}>Start a pilot — $500</Link>
            <Link className="btn btn-ghost" href="/product#brief">
              Read a sample brief <span className="arr">→</span>
            </Link>
          </div>
          <p className="fine">Truth · Intelligence · Strategy</p>
        </div>
      </section>
    </main>
  );
}
