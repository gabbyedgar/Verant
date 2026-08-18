import Link from "next/link";
import SignalFeed from "@/components/SignalFeed";
import { PLANS } from "@/lib/plans";
import { STRIP_ITEMS, getSignalWindow } from "@/lib/signals";
import { getLatestBrief } from "@/lib/briefs";

export default function HomePage() {
  const seed = getSignalWindow(2, 6);
  const latest = getLatestBrief();
  return (
    <main>
      {/* HERO */}
      <section className="hero" data-screen-label="Home — Hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="kicker"><span className="dot pulse" />Live · monitoring 8 signal sources</span>
            <h1 data-reveal>
              Know first, not last<span className="dot-end">.</span>
            </h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              Verant monitors your top three competitors across eight public signal sources and
              delivers one synthesized brief every Monday at 7am. One page. Strategic implications
              only.
            </p>
            <div className="hero-actions" data-reveal style={{ "--d": "0.16s" }}>
              <Link className="btn btn-primary" href="/start?plan=pilot" prefetch={false}>Start a pilot — $500</Link>
              <Link className="btn btn-ghost" href="/product">
                See a sample brief <span className="arr">→</span>
              </Link>
            </div>
            <p className="hero-fine" data-reveal style={{ "--d": "0.22s" }}>
              Four weeks. No commitment. Cancel by reply.
            </p>
          </div>
          <SignalFeed seed={seed} startOffset={8} />
        </div>
      </section>

      {/* SOURCE STRIP */}
      <div className="strip" aria-hidden="true">
        <div className="strip-inner">
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <span className="strip-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* THE MATH */}
      <section data-screen-label="Home — The math">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">The shape of it</span>
            <h2>The entire field, reduced to what matters.</h2>
          </div>
          <div className="stats">
            <div className="stat" data-reveal>
              <div className="num"><em>8</em></div>
              <div className="lbl">Signal sources</div>
              <p>Every public surface where a competitor’s strategy leaks before it’s announced.</p>
            </div>
            <div className="stat" data-reveal style={{ "--d": "0.1s" }}>
              <div className="num"><em>3</em></div>
              <div className="lbl">Competitors tracked</div>
              <p>Your top three. Depth over breadth — the ones that actually take your deals.</p>
            </div>
            <div className="stat" data-reveal style={{ "--d": "0.2s" }}>
              <div className="num"><em>1</em></div>
              <div className="lbl">Page, every Monday</div>
              <p>Synthesized implications, not raw alerts. Read it before your first meeting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-screen-label="Home — How it works">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">How it works</span>
            <h2>Tune in once. Stay tuned.</h2>
          </div>
          <div className="steps">
            <div className="step" data-reveal>
              <span className="n">01 — Tune</span>
              <h3>We map your set</h3>
              <p>
                A 30-minute setup call. We identify your three most dangerous competitors and
                calibrate which signals matter for your position.
              </p>
            </div>
            <div className="step" data-reveal style={{ "--d": "0.1s" }}>
              <span className="n">02 — Listen</span>
              <h3>We hold the frequency</h3>
              <p>
                Continuous monitoring across all eight sources. Pricing diffs, filings, postings,
                framework updates — captured the day they change.
              </p>
            </div>
            <div className="step" data-reveal style={{ "--d": "0.2s" }}>
              <span className="n">03 — Brief</span>
              <h3>You know first</h3>
              <p>
                Every Monday, 7am: one page in your inbox. What moved, why it matters, and what it
                implies for your next ninety days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRIEF TEASER */}
      <section data-screen-label="Home — Brief teaser">
        <div className="container teaser-grid">
          <div className="teaser-copy" data-reveal>
            <span className="kicker muted">The artifact</span>
            <h2>One page. Signed, dated, defensible.</h2>
            <p className="lede">
              No dashboards to check. No feeds to triage. The Monday brief reads in four minutes
              and every claim links to its public source.
            </p>
            <Link className="tlink" href={`/briefs/${latest.slug}`}>
              Read this week’s brief in full <span className="arr">→</span>
            </Link>
          </div>
          <div data-reveal style={{ "--d": "0.12s" }}>
            <div className="brief" aria-label="Sample brief preview">
              <div className="brief-bar">
                <span className="l"><span className="dot" />Verant weekly brief</span>
                <span className="r">Wk {latest.week} · {latest.year}</span>
              </div>
              <div className="brief-inner">
                <h3 className="brief-title">{latest.title}</h3>
                <p className="brief-meta">{latest.meta}</p>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column" }}>
                  {latest.competitors[0].signals.slice(0, 3).map((sig, i, arr) => (
                    <div className="sig" key={sig.tag} style={i === arr.length - 1 ? { borderBottom: 0 } : undefined}>
                      <div className="sig-head" style={{ cursor: "default" }}>
                        <span className="tag">{sig.tag}</span>
                        <span className="what">{sig.what}</span>
                        <span className="chev" aria-hidden="true">&nbsp;</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="brief-bottomline">
                  <div className="lbl">Bottom line</div>
                  <p>{latest.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto" data-screen-label="Home — Manifesto">
        <div className="container" data-reveal>
          <blockquote>
            “By the time it’s in TechCrunch, it’s not intelligence — <span className="hl">it’s news.</span>”
          </blockquote>
          <cite>
            Why Verant exists ·{" "}
            <Link
              href="/about"
              style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Read the position
            </Link>
          </cite>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section data-screen-label="Home — Pricing teaser">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">Plans</span>
            <h2>Priced like software. Because it works like software.</h2>
          </div>
          <div className="mini-plans" data-reveal style={{ "--d": "0.08s" }}>
            {PLANS.map((p) => (
              <Link className="mini-plan" href={`/start?plan=${p.slug}`} key={p.slug} prefetch={false}>
                <span className="mp-name">{p.name}</span>
                <span className="mp-price">{p.price}</span>
                <span className="mp-per">{p.per}</span>
                <span className="mp-desc">{p.teaser}</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }} data-reveal>
            <Link className="tlink" href="/pricing">
              Compare plans in detail <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-band" data-screen-label="Home — Final CTA">
        <div className="container" data-reveal>
          <span className="kicker" style={{ justifyContent: "center" }}>
            <span className="dot pulse" />Next brief ships Monday, 7:00am
          </span>
          <h2 style={{ marginTop: 24 }}>Your competitors moved this week. Did you see it?</h2>
          <p className="lede">
            Start with a four-week pilot. If the first brief doesn’t tell you something you didn’t
            know, reply and we’ll refund it.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/start?plan=pilot" prefetch={false}>Start a pilot — $500</Link>
            <Link className="btn btn-ghost" href="/product">
              See how it works <span className="arr">→</span>
            </Link>
          </div>
          <p className="fine">No contract · No dashboard · No meetings</p>
        </div>
      </section>
    </main>
  );
}
