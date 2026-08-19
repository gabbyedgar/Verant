import { NextResponse } from "next/server";
import { PLAN_SLUGS } from "@/lib/plans";
import { CONTACT_EMAIL } from "@/lib/site";
import { mailConfigured, sendLeadEmail } from "@/lib/mail";

/* Pilot signup endpoint.

   A validated lead is emailed straight to the notification inbox (see
   lib/mail.js — set RESEND_API_KEY to switch that on) and, if
   LEAD_WEBHOOK_URL is also set, posted to that webhook as well.

   With no sink configured the lead is only logged to the server console —
   Vercel's filesystem is ephemeral, so there is no local fallback that would
   look like storage but quietly lose data. */

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

async function postWebhook(lead) {
  const res = await fetch(process.env.LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
}

/* Fan the lead out to every configured sink. One surviving sink means the
   lead landed somewhere, so the visitor sees success; only a total failure
   is reported back to them. */
async function deliver(lead) {
  const sinks = [];
  if (mailConfigured()) sinks.push(["email", sendLeadEmail(lead)]);
  if (process.env.LEAD_WEBHOOK_URL) sinks.push(["webhook", postWebhook(lead)]);

  if (!sinks.length) {
    console.info("[pilot] lead received (no RESEND_API_KEY or LEAD_WEBHOOK_URL configured)", lead);
    return { delivered: false };
  }

  const results = await Promise.allSettled(sinks.map(([, p]) => p));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[pilot] ${sinks[i][0]} delivery failed`, r.reason);
    }
  });

  if (!results.some((r) => r.status === "fulfilled")) {
    throw new Error("every configured sink failed");
  }
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
      { ok: false, error: `We couldn’t record that. Email ${CONTACT_EMAIL} and we’ll sort it.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
