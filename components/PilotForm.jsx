"use client";

import { useId, useState } from "react";
import { PLANS } from "@/lib/plans";

const EMPTY = { name: "", email: "", company: "", competitors: "", website: "" };

export default function PilotForm({ initialPlan = "pilot" }) {
  const uid = useId();
  const [values, setValues] = useState({ ...EMPTY, plan: initialPlan });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [formError, setFormError] = useState("");

  function field(name) {
    return {
      id: `${uid}-${name}`,
      name,
      value: values[name],
      onChange: (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
        setErrors((e2) => (e2[name] ? { ...e2, [name]: undefined } : e2));
      },
      "aria-invalid": errors[name] ? "true" : undefined,
      "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
    };
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setFormError("");
    setErrors({});
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setFormError(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("Network error — check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form-done" role="status">
        <span className="kicker"><span className="dot pulse" />Received</span>
        <h2>You’re on the frequency.</h2>
        <p className="lede">
          We’ll reply within one business day to book the 30-minute setup call. Your first brief
          lands the Monday after that, at 7am.
        </p>
        <p className="fine">Nothing to install. Nothing to pay until the set is mapped.</p>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor={`${uid}-name`}>Your name</label>
        <input type="text" autoComplete="name" required disabled={busy} {...field("name")} />
        {errors.name && (
          <span className="form-err" id={`${uid}-name-err`}>{errors.name}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor={`${uid}-email`}>Work email</label>
        <input type="email" autoComplete="email" required disabled={busy} {...field("email")} />
        {errors.email && (
          <span className="form-err" id={`${uid}-email-err`}>{errors.email}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input type="text" autoComplete="organization" required disabled={busy} {...field("company")} />
        {errors.company && (
          <span className="form-err" id={`${uid}-company-err`}>{errors.company}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor={`${uid}-plan`}>Plan</label>
        <select
          id={`${uid}-plan`}
          name="plan"
          value={values.plan}
          disabled={busy}
          onChange={(e) => setValues((v) => ({ ...v, plan: e.target.value }))}
        >
          {PLANS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} — {p.priceLabel}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor={`${uid}-competitors`}>
          Competitors to track <span className="opt">optional</span>
        </label>
        <textarea rows={3} disabled={busy} placeholder="Three companies that actually take your deals." {...field("competitors")} />
        {errors.competitors && (
          <span className="form-err" id={`${uid}-competitors-err`}>{errors.competitors}</span>
        )}
      </div>

      {/* honeypot — hidden from people, catnip for bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        />
      </div>

      {formError && (
        <p className="form-err form-err-block" role="alert">{formError}</p>
      )}

      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Request a pilot"}
      </button>
      <p className="fine">
        No card required. We reply within one business day.
      </p>
    </form>
  );
}
