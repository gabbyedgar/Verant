import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Privacy",
  description:
    "What Verant collects, why, and how long it is kept. Short version: the details you send us, and nothing else.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero" data-screen-label="Privacy — Hero">
        <div className="container">
          <div className="inner">
            <span className="kicker muted">Legal</span>
            <h1 data-reveal>Privacy</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              The short version: we collect what you type into the pilot form, we use it to send
              you briefs, and we don’t sell it.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} data-screen-label="Privacy — Body">
        <div className="container">
          <div className="prose" data-reveal>
            <p className="updated">Last updated · June 2026</p>

            <h2>What we collect</h2>
            <p>
              When you request a pilot we collect the name, work email, company, and competitor
              list you enter. That is the whole set. We do not ask for payment details on the site,
              and we do not run advertising or cross-site tracking pixels.
            </p>

            <h2>Why we collect it</h2>
            <p>
              To reply to your request, run the setup call, and deliver the Monday brief. If you
              become a client, the same details identify your account. We do not sell, rent, or
              share your details with third parties for their own marketing.
            </p>

            <h2>What we monitor for clients</h2>
            <p>
              The intelligence in every brief comes from public sources only: published pricing
              pages, posted job listings, patent and regulatory filings, product documentation,
              certification and trust pages, and public company web pages. We do not access private
              systems, use pretexting, or rely on confidential informants. Nothing in a brief comes
              from a source we could not cite openly.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiries that don’t become clients are deleted within twelve months. Client records
              are kept for the life of the engagement and for seven years afterwards where tax and
              accounting rules require it.
            </p>

            <h2>Your choices</h2>
            <ul>
              <li>Reply “stop” to any brief and we stop sending them.</li>
              <li>
                Ask us for a copy of what we hold about you, or ask us to correct or delete it, by
                emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </li>
              <li>
                If you are in the UK or EU, you can complain to your data protection authority.
              </li>
            </ul>

            <h2>Cookies</h2>
            <p>
              This site sets no tracking or advertising cookies. Any cookies present are strictly
              necessary ones set by our hosting provider to serve the pages.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about any of this go to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and reach a person, not a queue.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
