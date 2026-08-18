"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_ROWS = 7;
const OFFSETS = [2, 9, 23, 41, 67, 118, 190]; // minutes-ago ladder
const POLL_MS = 3400;

function feedTime(offsetMin) {
  if (offsetMin < 1) return "now";
  if (offsetMin < 60) return `${offsetMin}m`;
  return `${Math.round(offsetMin / 60)}h`;
}

/**
 * Live competitor signal feed.
 *
 * The server renders `seed` so the first paint has real content and hydration
 * matches. After mount the component pulls fresh signals from /api/signals,
 * which is where a real collector would surface new events.
 */
export default function SignalFeed({ seed = [], startOffset = 8 }) {
  const [rows, setRows] = useState(() =>
    seed.map((ev, i) => ({ id: i, ev, entering: false }))
  );
  const [ticked, setTicked] = useState(false);
  const next = useRef({ id: seed.length, offset: startOffset });
  const inFlight = useRef(false);

  const pull = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      const res = await fetch(`/api/signals?offset=${next.current.offset}&count=1`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      const ev = data.signals?.[0];
      if (!ev) return;
      setRows((prev) => [
        { id: next.current.id, ev, entering: true },
        ...prev,
      ].slice(0, MAX_ROWS));
      setTicked(true);
      next.current = { id: next.current.id + 1, offset: next.current.offset + 1 };
    } catch {
      // A dropped poll is not worth surfacing — the next tick retries.
    } finally {
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(pull, POLL_MS);
    return () => clearInterval(timer);
  }, [pull]);

  return (
    <div
      className="feed"
      data-reveal
      style={{ "--d": "0.15s" }}
      aria-label="Live competitor signal feed"
    >
      <div className="feed-head">
        <span className="live"><span className="dot pulse" />Signal feed</span>
        <span>Your competitive set</span>
      </div>
      <div className="feed-body" aria-live="polite" aria-atomic="false">
        {rows.map((row, i) => (
          <div key={row.id} className={`feed-row${row.entering ? " entering" : ""}`}>
            <span className="t">
              {ticked
                ? i === 0
                  ? "now"
                  : feedTime(OFFSETS[Math.min(i - 1, OFFSETS.length - 1)])
                : feedTime(OFFSETS[Math.min(i, OFFSETS.length - 1)])}
            </span>
            <span className="ev">
              <span className="ev-top">
                <span className="src">{row.ev.src}</span>
                <span className="co">{row.ev.co}</span>
              </span>
              <span className="desc">{row.ev.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
