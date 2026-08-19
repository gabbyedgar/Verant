import { CONTACT_EMAIL } from "@/lib/site";
import { getPlan } from "@/lib/plans";

/* Outbound mail for pilot signups.

   Delivery goes through Resend's REST API — no SDK, so nothing to install and
   it runs fine on Vercel's serverless runtime. Configure:

     RESEND_API_KEY    required to actually send
     LEAD_TO_EMAIL     inbox that receives signups (defaults to CONTACT_EMAIL)
     LEAD_FROM_EMAIL   sender; its domain must be verified in Resend

   Without RESEND_API_KEY nothing is sent and the caller falls back to its
   other sinks. */

// Overridable so tests can point at a local stub instead of the live API.
const RESEND_ENDPOINT = process.env.RESEND_ENDPOINT || "https://api.resend.com/emails";

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function toAddress() {
  return process.env.LEAD_TO_EMAIL || CONTACT_EMAIL;
}

function fromAddress() {
  return process.env.LEAD_FROM_EMAIL || `Verant <${CONTACT_EMAIL}>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Subjects must stay on one line; a pasted newline would split the header.
function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

function planLabel(slug) {
  const plan = getPlan(slug);
  return plan ? `${plan.name} — ${plan.priceLabel}` : slug;
}

export function renderLead(lead) {
  const plan = planLabel(lead.plan);
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Plan", plan],
    ["Competitors", lead.competitors || "— not specified —"],
    ["Received", lead.receivedAt],
  ];

  const subject = oneLine(`Pilot request — ${lead.company} (${plan})`);

  const text = [
    "New pilot request from the Verant site.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Reply to this email to reach ${lead.name} directly.`,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#0E1116;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#F4F1EA;">
    <div style="max-width:560px;margin:0 auto;background:#161A21;border:1px solid rgba(244,241,234,0.12);border-radius:12px;overflow:hidden;">
      <div style="padding:16px 24px;background:#0E1116;border-bottom:1px solid rgba(244,241,234,0.12);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#C8FF3D;">
        New pilot request
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([k, v]) => `<tr>
          <td style="padding:14px 24px;border-bottom:1px solid rgba(244,241,234,0.08);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(244,241,234,0.55);white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:14px 24px;border-bottom:1px solid rgba(244,241,234,0.08);font-size:15px;line-height:1.5;color:#F4F1EA;">${escapeHtml(v)}</td>
        </tr>`
          )
          .join("\n        ")}
      </table>
      <div style="padding:18px 24px;font-size:13px;color:rgba(244,241,234,0.55);">
        Reply to this email to reach ${escapeHtml(lead.name)} directly.
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}

/** Send one lead to the notification inbox. Throws if Resend rejects it. */
export async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const { subject, text, html } = renderLead(lead);

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [toAddress()],
      // Hitting reply in the inbox answers the prospect, not us.
      reply_to: lead.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }

  return res.json().catch(() => ({}));
}
