import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";

export const metadata = {
  title: "Pricing",
};

const INCLUDED = [
  { h: "Every plan, every source", p: "All eight signal sources on every plan. We don’t ration visibility by tier." },
  { h: "Cancel by reply", p: "No contracts, no procurement cycle. Reply “stop” to any brief and you’re done." },
  { h: "Setup in one call", p: "Thirty minutes to map your competitive set. Your first brief lands the following Monday." },
  { h: "Sources cited, always", p: "Every claim in every brief links to the public record it came from." },
];

const FAQ = [
  {
    q: "Where does the intelligence come from?",
    a: "Eight public signal sources: pricing pages, careers pages, patent and IP filings, governance frameworks and certifications, product changelogs and documentation, funding and regulatory filings, leadership moves, and web positioning shifts. Nothing private, nothing scraped from behind a login, nothing that requires a source to be burned. If we can’t cite it publicly, it doesn’t go in the brief.",
  },
  {
    q: "How is this different from Google Alerts or a monitoring tool?",
    a: "Alerts give you volume; Verant gives you judgment. A monitoring tool will tell you a competitor posted four jobs. The brief tells you those four jobs are a federal go-to-market strategy that takes effect in 2027, and what that means for your next two quarters. The synthesis is the product — the raw signals are just inputs.",
  },
  {
    q: "Who actually writes the brief?",
    a: "Machines gather; analysts judge. Collection, diffing, and clustering across the eight sources is automated and continuous. The Sunday synthesis — deciding which signals are material and what they imply for your position — is written by an analyst who covers your sector all year. You can tell the difference, and so can we.",
  },
  {
    q: "What happens on a week when nothing happened?",
    a: "We say so, in one paragraph. A quiet week is a finding — slowing hiring, stalled changelogs, and silent pricing pages tell you as much about a competitor’s trajectory as a funding announcement does. What we will never do is pad a brief to justify the invoice.",
  },
  {
    q: "Can I change which competitors are tracked?",
    a: "Yes, by replying to any brief. Swaps take effect the following Monday. Most clients revisit their set quarterly — and sometimes the brief itself recommends a change, as when a tracked competitor fades and an adjacent player starts taking your deals.",
  },
  {
    q: "Is competitive intelligence like this legal?",
    a: "Yes. Everything Verant monitors is public information: published prices, public filings, posted jobs, shipped documentation. We don’t pretext, don’t access private systems, and don’t use confidential sources. The edge isn’t secret information — it’s attention and synthesis applied to public information faster than anyone else.",
  },
  {
    q: "Why is the pilot refundable?",
    a: "Because the product is a claim about value, and claims should be testable. If your first brief doesn’t tell you something material you didn’t already know, reply and we refund the $500. Almost nobody asks.",
  },
];

export default function PricingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="page-hero page-hero--pricing" data-screen-label="Pricing — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker"><span className="dot pulse" />Pricing</span>
            <h1 data-reveal>Pay for signal, not meetings.</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              Flat monthly plans, no contracts, no per-seat math. Every plan includes the Monday
              brief. Select a plan to see what starting looks like.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" style={{ paddingTop: 0 }} data-screen-label="Pricing — Plans">
        <div className="container">
          <PricingPlans />
          <div style={{ marginTop: 72 }} data-reveal>
            <div className="included">
              {INCLUDED.map((inc) => (
                <div className="inc" key={inc.h}>
                  <h3>{inc.h}</h3>
                  <p>{inc.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-screen-label="Pricing — FAQ">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker muted">Questions</span>
            <h2>Asked, answered.</h2>
          </div>
          <div className="faq" data-reveal style={{ "--d": "0.06s" }}>
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="chev">+</span>
                </summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-screen-label="Pricing — CTA">
        <div className="container" data-reveal>
          <span className="kicker" style={{ justifyContent: "center" }}>
            <span className="dot pulse" />Next brief ships Monday, 7:00am
          </span>
          <h2 style={{ marginTop: 24 }}>Start this week, know next Monday.</h2>
          <p className="lede">
            One setup call. Three competitors. The first brief lands in days, not quarters.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="mailto:brief@verant.co?subject=Pilot">
              Start a pilot — $500
            </a>
            <Link className="btn btn-ghost" href="/product#brief">
              Read the sample brief first <span className="arr">→</span>
            </Link>
          </div>
          <p className="fine">No contract · No dashboard · No meetings</p>
        </div>
      </section>
    </main>
  );
}
