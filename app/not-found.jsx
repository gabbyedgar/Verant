import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main>
      <section className="nf" data-screen-label="404">
        <div className="container">
          <span className="code">404 · no signal</span>
          <h1 style={{ marginTop: 18 }}>This page isn’t on the frequency.</h1>
          <p className="lede" style={{ margin: "20px auto 0" }}>
            The link may be stale, or the brief you’re after has moved. The archive and the
            product tour are both one click away.
          </p>
          <div className="cta-actions" style={{ marginTop: 34 }}>
            <Link className="btn btn-primary" href="/">Back to home</Link>
            <Link className="btn btn-ghost" href="/briefs">
              Read the archive <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
