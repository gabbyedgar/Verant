import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer data-screen-label="Footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="nav-logo" aria-label="Verant home">
              <Logo />
            </Link>
            <p className="tagline">competitive intelligence, on frequency</p>
          </div>
          <div className="foot-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="/product">How it works</Link></li>
              <li><Link href="/briefs">Brief archive</Link></li>
              <li><Link href="/product#compare">Why not consultants</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about#principles">Principles</Link></li>
              <li><Link href="/pricing#faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Start</h4>
            <ul>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/start?plan=pilot" prefetch={false}>Start a pilot</Link></li>
              <li><a href="mailto:brief@verant.co">brief@verant.co</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>
            © 2026 Verant <span className="sep" aria-hidden="true">·</span>{" "}
            <Link href="/privacy">Privacy</Link>
          </span>
          <span className="motto">
            Truth <span className="sep">·</span> Intelligence <span className="sep">·</span> Strategy
          </span>
        </div>
      </div>
    </footer>
  );
}
