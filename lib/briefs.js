/* Brief archive. Each brief is one Monday edition: a headline, a set
   of competitors, and the signals captured for each. The product page
   renders the latest one as the sample; /briefs renders the archive.

   Swap this module for a CMS or database read and every consumer —
   the archive index, the dynamic [slug] pages, generateStaticParams
   and the sitemap — picks the change up without further edits. */

const BRIEFS = [
  {
    slug: "wk-24-2026",
    week: 24,
    year: 2026,
    date: "2026-06-08",
    dateLabel: "Jun 8, 2026",
    title:
      "The field is converging on compliance. Two of your three competitors moved this week.",
    excerpt:
      "Cipherline goes federal, Aegix buys the compliance narrative, Veilstack stalls. The mid-market governance buyer is briefly underserved.",
    meta: "3 competitors · 11 signals captured · 7 material · 4 min read",
    bottomLine:
      "The field is splitting: Cipherline goes federal, Aegix buys the compliance narrative, Veilstack stalls. The mid-market governance buyer is briefly underserved. You have roughly one quarter of clear air — use it on documentation and comparison content, not features.",
    competitors: [
      {
        id: "cipherline",
        name: "Cipherline",
        signals: [
          {
            tag: "Pricing",
            what: "Enterprise tier removed from public pricing page",
            saw: "Tuesday, 14:20 UTC: the Enterprise column on cipherline.com/pricing changed from “$4,200/mo” to “Contact sales.” Mid-tier pricing unchanged. No announcement.",
            implication:
              "Hiding enterprise pricing is the first move of a sales-led, upmarket push. Expect longer cycles at the top of their funnel — and less pricing pressure on you in mid-market deals for the next two quarters.",
          },
          {
            tag: "Hiring",
            what: "Federal sales and FedRAMP compliance roles posted within 48 hours",
            saw: "Four openings on their careers page Wednesday: two federal AEs (DC metro), one FedRAMP compliance lead, one solutions engineer with “public sector” in title. First federal roles in company history.",
            implication:
              "FedRAMP authorization takes 12–18 months. They’re paying now for a market they enter in 2027 — confirming the upmarket read, and telling you where their attention won’t be.",
          },
          {
            tag: "Patents",
            what: "USPTO filing: adversarial prompt detection at the inference layer",
            saw: "Application published Thursday: “Adversarial prompt detection via layered inference monitoring.” Two named inventors joined from an academic red-teaming lab in January.",
            implication:
              "This overlaps your runtime-protection roadmap. If granted, it’s a positioning weapon in enterprise security reviews. Worth a prior-art conversation with counsel this month, not next year.",
          },
        ],
      },
      {
        id: "aegix",
        name: "Aegix Labs",
        signals: [
          {
            tag: "Filings",
            what: "SEC Form D: $14M raise, lead investor undisclosed",
            saw: "Form D filed Monday for $14.2M. Sale date three weeks ago — they’ve been operating on this capital for nearly a month without announcing.",
            implication:
              "A quiet raise usually precedes a loud launch. Combined with their changelog velocity, expect a major announcement within six weeks. Pre-empt it: ship your comparison content now, while search is uncontested.",
          },
          {
            tag: "Governance",
            what: "NIST AI RMF crosswalk published as gated whitepaper",
            saw: "New gated asset: a 22-page mapping of their controls to NIST AI RMF. Promoted via two sponsored LinkedIn posts targeting compliance titles.",
            implication:
              "They’re buying the compliance-buyer relationship before the product fully supports it. Your actual RMF coverage is stronger — but undocumented. A two-page public crosswalk neutralizes their whitepaper at near-zero cost.",
          },
        ],
      },
      {
        id: "veilstack",
        name: "Veilstack",
        signals: [
          {
            tag: "People",
            what: "VP of Compliance departed; surfaced at Praxa within the week",
            saw: "Their VP Compliance — owner of the SOC 2 and ISO programs — updated LinkedIn Friday: now “Chief Trust Officer” at Praxa, an adjacent player outside your tracked set.",
            implication:
              "Veilstack’s certification renewals land in Q4 with no named successor. Their trust posture is temporarily weakened — the strongest week in two quarters to compete on governance depth in shared deals.",
          },
          {
            tag: "Quiet",
            what: "No material movement across the other seven sources",
            saw: "No pricing, product, filing, or web changes this week. Posting volume down 40% month-over-month.",
            implication:
              "A quiet week is a finding. Slowing hiring plus a senior departure reads as consolidation, not stealth. We’d treat Veilstack as a fading threat — and consider promoting Praxa into your tracked set.",
          },
        ],
      },
    ],
  },
  {
    slug: "wk-23-2026",
    week: 23,
    year: 2026,
    date: "2026-06-01",
    dateLabel: "Jun 1, 2026",
    title: "Northcage cut Starter 20%. The floor is moving, not the ceiling.",
    excerpt:
      "A discount at the bottom of the market and a quiet docs rewrite up top. Two competitors are repositioning around the same buyer.",
    meta: "3 competitors · 9 signals captured · 5 material · 3 min read",
    bottomLine:
      "Northcage is buying share at the entry tier while Praxa renames its way upmarket. Neither touched the mid-market directly — but the squeeze is forming on both sides. Hold your pricing; the discount war at the floor is not yours to win.",
    competitors: [
      {
        id: "northcage",
        name: "Northcage",
        signals: [
          {
            tag: "Pricing",
            what: "Starter plan cut 20%; seat minimums dropped entirely",
            saw: "Monday: Starter moved from $250 to $200/mo and the three-seat minimum disappeared from the pricing table. No blog post, no changelog entry.",
            implication:
              "Silent discounting at the entry tier is a volume play, usually after a soft quarter. It pressures your self-serve funnel but not your mid-market deals — matching it would cost margin for buyers who were never going to grow.",
          },
          {
            tag: "Product",
            what: "EU AI Act mapping module shipped to all plans",
            saw: "Changelog Thursday: an EU AI Act obligations mapper, previously enterprise-only, is now on every tier including the discounted Starter.",
            implication:
              "Compliance features are becoming table stakes rather than upsells. Budget for parity within two quarters, and stop treating your own mapping work as a premium differentiator in deals.",
          },
        ],
      },
      {
        id: "praxa",
        name: "Praxa",
        signals: [
          {
            tag: "Product",
            what: "Docs update: model-risk scorecards renamed “audit packs”",
            saw: "Documentation rewrite Wednesday touching 40+ pages. “Scorecard” language replaced with “audit pack” throughout; the underlying feature is unchanged.",
            implication:
              "A vocabulary migration this broad precedes a positioning launch aimed at auditors and risk committees rather than engineers. Expect their next campaign to target the buyer you share with Veilstack.",
          },
          {
            tag: "Web",
            what: "New comparison page published targeting your brand keywords",
            saw: "A /compare page went live Friday naming you directly, with a feature table that omits your governance coverage. Already ranking on page two for two of your branded terms.",
            implication:
              "Comparison pages compound in search. A factual correction request rarely works; publishing your own comparison does. This is worth a week of content time now, not next quarter.",
          },
        ],
      },
      {
        id: "cipherline",
        name: "Cipherline",
        signals: [
          {
            tag: "Quiet",
            what: "No material movement across all eight sources",
            saw: "Pricing, careers, filings, docs and trust pages all unchanged for the full week. First fully quiet week we have recorded for them.",
            implication:
              "Silence immediately before a repositioning is common — teams stop shipping publicly while they prepare. Read this alongside next week’s brief rather than on its own.",
          },
        ],
      },
    ],
  },
  {
    slug: "wk-22-2026",
    week: 22,
    year: 2026,
    date: "2026-05-25",
    dateLabel: "May 25, 2026",
    title: "Two competitors started hiring policy people. Nobody announced a strategy.",
    excerpt:
      "Regulatory affairs hires at Cipherline and Aegix, six days apart. The compliance arms race now has a headcount line.",
    meta: "3 competitors · 7 signals captured · 4 material · 3 min read",
    bottomLine:
      "Policy hiring is the earliest visible commitment to a regulated-market strategy — it shows up 12 to 18 months before the product does. Two of your three competitors made that commitment this month. The window to own the governance narrative is roughly a year, and it is now open.",
    competitors: [
      {
        id: "cipherline",
        name: "Cipherline",
        signals: [
          {
            tag: "Hiring",
            what: "First EU hire: policy counsel, Brussels",
            saw: "A single posting Tuesday for policy counsel based in Brussels, reporting to the General Counsel. No other EU roles listed, no EU entity in their filings.",
            implication:
              "Brussels policy counsel before an EU sales team means they intend to shape rules rather than sell into them. That is a two-year horizon and a signal they expect regulation to become a moat.",
          },
        ],
      },
      {
        id: "aegix",
        name: "Aegix Labs",
        signals: [
          {
            tag: "Hiring",
            what: "Regulatory affairs lead posted six days after Cipherline’s",
            saw: "Wednesday posting for a regulatory affairs lead, US-based, with EU AI Act experience listed as required rather than preferred.",
            implication:
              "Two independent competitors adding policy headcount inside a week is a market signal, not a coincidence. Compliance is moving from a feature to an organizational function — plan for a named owner on your side this year.",
          },
          {
            tag: "Governance",
            what: "SOC 2 Type II report refreshed ahead of schedule",
            saw: "Trust page updated Friday with a new Type II report dated three months earlier than their usual annual cadence.",
            implication:
              "An early refresh usually means a large prospect asked for current evidence. Someone is in a late-stage enterprise deal — likely one you are also in.",
          },
        ],
      },
      {
        id: "veilstack",
        name: "Veilstack",
        signals: [
          {
            tag: "Patents",
            what: "USPTO filing on layered inference monitoring",
            saw: "Application published Thursday covering adversarial prompt detection across model layers. Filed fourteen months ago; published now on the standard schedule.",
            implication:
              "The filing date matters more than the publication date: this work started well before the current wave of interest. Treat their runtime detection claims as substantiated rather than marketing.",
          },
        ],
      },
    ],
  },
];

/** All briefs, newest first. */
export function getBriefs() {
  return [...BRIEFS].sort((a, b) => b.date.localeCompare(a.date));
}

/** The most recent brief — rendered as the sample on the product page. */
export function getLatestBrief() {
  return getBriefs()[0];
}

export function getBrief(slug) {
  return BRIEFS.find((b) => b.slug === slug) || null;
}

export function getBriefSlugs() {
  return BRIEFS.map((b) => b.slug);
}
