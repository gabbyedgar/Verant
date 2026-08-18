import PilotForm from "@/components/PilotForm";
import { PLAN_SLUGS, getPlan } from "@/lib/plans";

export const metadata = {
  title: "Start a pilot",
  description:
    "Request a four-week Verant pilot. Three competitors, four Monday briefs, refundable if week one tells you nothing new.",
};

export default async function StartPage({ searchParams }) {
  const params = await searchParams;
  const requested = typeof params?.plan === "string" ? params.plan.toLowerCase() : "";
  const initialPlan = PLAN_SLUGS.includes(requested) ? requested : "pilot";
  const plan = getPlan(initialPlan);

  return (
    <main>
      <section className="page-hero page-hero--start" data-screen-label="Start — Form">
        <div className="container start-grid">
          <div className="start-copy">
            <span className="kicker"><span className="dot pulse" />Start</span>
            <h1 data-reveal>Map your set.</h1>
            <p className="lede" data-reveal style={{ "--d": "0.08s" }}>
              One 30-minute call to identify the three competitors that actually take your deals.
              Your first brief lands the Monday after.
            </p>
            <ul className="start-list" data-reveal style={{ "--d": "0.14s" }}>
              <li>No contract — cancel by replying to any brief.</li>
              <li>All eight signal sources, on every plan.</li>
              <li>Refunded if week one tells you nothing new.</li>
            </ul>
          </div>
          <div className="start-form-wrap" data-reveal style={{ "--d": "0.1s" }}>
            <div className="start-plan">
              <span className="sp-label">Selected plan</span>
              <span className="sp-name">{plan.name}</span>
              <span className="sp-price">{plan.priceLabel}</span>
            </div>
            <PilotForm initialPlan={initialPlan} />
          </div>
        </div>
      </section>
    </main>
  );
}
