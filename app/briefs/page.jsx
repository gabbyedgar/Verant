import Link from "next/link";
import { getBriefs } from "@/lib/briefs";

export const metadata = {
  title: "Brief archive",
  description:
    "Every Monday brief Verant has published. One page each: what moved across eight signal sources, and what it implies.",
};

// Re-check the source hourly so newly published briefs appear without a redeploy.
export const revalidate = 3600;

export default function BriefsPage() {
  const briefs = getBriefs();

  return (
    <main>
      <section className="page-hero" data-screen-label="Briefs — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker"><span className="dot pulse" />The archive</span>
            <h1 data-reveal>Every Monday, on the record.</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              Sample briefs for a fictional client in AI model security. Same format every week:
              what moved, why it matters, and what it implies for the next ninety days.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} data-screen-label="Briefs — List">
        <div className="container">
          <div className="brief-list" data-reveal>
            {briefs.map((b) => (
              <Link className="brief-card" href={`/briefs/${b.slug}`} key={b.slug}>
                <span className="bc-when">
                  <span className="wk">Wk {b.week}</span>
                  <span>{b.dateLabel}</span>
                </span>
                <span>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                  <span className="bc-meta">{b.meta}</span>
                </span>
                <span className="bc-go">
                  Read <span className="arr">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" data-screen-label="Briefs — CTA">
        <div className="container" data-reveal>
          <h2>Yours would be about your field.</h2>
          <p className="lede">
            Three competitors you choose, eight sources, one page every Monday at 7am.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/start?plan=pilot" prefetch={false}>Start a pilot — $500</Link>
            <Link className="btn btn-ghost" href="/pricing">
              See all plans <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
