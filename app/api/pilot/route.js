import { NextResponse } from "next/server";
import { PLAN_SLUGS } from "@/lib/plans";

/* Pilot signup endpoint.

   Leads are validated here and then handed to a sink. Set LEAD_WEBHOOK_URL
   to forward them somewhere durable (Zapier, Make, a Slack incoming webhook,
   your own service). Without it the lead is logged to the server console and
   nothing is persisted — Vercel's filesystem is ephemeral, so there is no
   silent local fallback that would look like storage but lose data. */

const MAX = { name: 120, email: 200, company: 160, competitors: 2000 };

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

// Deliberately permissive: something@something.tld, no exotic rejections.
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= MAX.email;
}

function validate(body) {
  const errors = {};
  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const competitors = str(body.competitors);
  const plan = str(body.plan).toLowerCase();

  if (!name) errors.name = "Tell us who you are.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";

  if (!email) errors.email = "We need an email to send the brief to.";
  else if (!validEmail(email)) errors.email = "That doesn’t look like an email address.";

  if (!company) errors.company = "Which company are we briefing?";
  else if (company.length > MAX.company) errors.company = "That company name is too long.";

  if (competitors.length > MAX.competitors) {
    errors.competitors = "Please keep this under 2000 characters.";
  }

  return {
    errors,
    lead: {
      name,
      email,
      company,
      competitors,
      plan: PLAN_SLUGS.includes(plan) ? plan : "pilot",
    },
  };
}

async function deliver(lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.info("[pilot] lead received (no LEAD_WEBHOOK_URL configured)", lead);
    return { delivered: false };
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  return { delivered: true };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a field hidden from humans. Bots fill it, so accept and drop.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const { errors, lead } = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await deliver({ ...lead, receivedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[pilot] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn’t record that. Email brief@verant.co and we’ll sort it." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
