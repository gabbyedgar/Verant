import Link from "next/link";
import { notFound } from "next/navigation";
import BriefSample from "@/components/BriefSample";
import { getBrief, getBriefSlugs, getBriefs } from "@/lib/briefs";

export const revalidate = 3600;

/* Pre-render the briefs known at build time; anything published later is
   rendered on first request and then cached. */
export async function generateStaticParams() {
  return getBriefSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) return { title: "Brief not found" };
  return {
    title: `Wk ${brief.week} · ${brief.dateLabel}`,
    description: brief.excerpt,
    openGraph: { title: brief.title, description: brief.excerpt, type: "article" },
  };
}

export default async function BriefPage({ params }) {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) notFound();

  const all = getBriefs();
  const i = all.findIndex((b) => b.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i < all.length - 1 ? all[i + 1] : null;

  return (
    <main>
      <section className="page-hero" data-screen-label="Brief — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker">
              <span className="dot pulse" />Week {brief.week} · {brief.dateLabel}
            </span>
            <h1 data-reveal>{brief.title}</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>{brief.excerpt}</p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} data-screen-label="Brief — Body">
        <div className="container">
          <BriefSample brief={brief} />

          <nav className="brief-nav" aria-label="Brief archive navigation">
            {older ? (
              <Link href={`/briefs/${older.slug}`}>← Wk {older.week}: {older.excerpt.slice(0, 46)}…</Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/briefs/${newer.slug}`}>Wk {newer.week}: {newer.excerpt.slice(0, 46)}… →</Link>
            ) : (
              <Link href="/briefs">All briefs →</Link>
            )}
          </nav>
        </div>
      </section>

      <section className="cta-band" data-screen-label="Brief — CTA">
        <div className="container" data-reveal>
          <h2>This one is fictional. Yours wouldn’t be.</h2>
          <p className="lede">
            Four weeks, $500, three competitors of your choosing. Refunded if week one tells you
            nothing new.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/start?plan=pilot" prefetch={false}>Start a pilot — $500</Link>
            <Link className="btn btn-ghost" href="/briefs">
              Read the archive <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
