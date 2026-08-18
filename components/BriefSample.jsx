"use client";

import { useId, useRef, useState } from "react";

function Signal({ signal, open, onToggle }) {
  const id = useId();
  return (
    <div className={`sig${open ? " open" : ""}`}>
      <button
        className="sig-head"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="tag">{signal.tag}</span>
        <span className="what">{signal.what}</span>
        <span className="chev" aria-hidden="true">+</span>
      </button>
      <div className="sig-body" id={id} role="region" aria-hidden={!open}>
        <div className="sig-body-inner">
          <div className="sig-body-content">
            <span className="lbl">What we saw</span>
            <p>{signal.saw}</p>
            <span className="lbl">Why it matters</span>
            <p className="implication">{signal.implication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders one weekly brief: competitor tabs, expandable signals, bottom line.
 * Tabs follow the WAI-ARIA tabs pattern — arrow keys move between them,
 * Home/End jump to the ends, and only the active tab is in the tab order.
 */
export default function BriefSample({ brief, barLabel }) {
  const uid = useId();
  const competitors = brief.competitors;
  const [tab, setTab] = useState(competitors[0].id);
  const [openSig, setOpenSig] = useState(`${competitors[0].id}-0`);
  const tabRefs = useRef({});

  function onTabKeyDown(e) {
    const i = competitors.findIndex((c) => c.id === tab);
    let nextIndex = null;
    if (e.key === "ArrowRight") nextIndex = (i + 1) % competitors.length;
    else if (e.key === "ArrowLeft") nextIndex = (i - 1 + competitors.length) % competitors.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = competitors.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    const nextId = competitors[nextIndex].id;
    setTab(nextId);
    tabRefs.current[nextId]?.focus();
  }

  return (
    <div className="brief" data-reveal style={{ "--d": "0.1s" }}>
      <div className="brief-bar">
        <span className="l"><span className="dot pulse" />Verant weekly brief</span>
        <span className="r">{barLabel ?? `Wk ${brief.week} · ${brief.dateLabel}`}</span>
      </div>
      <div className="brief-inner">
        <h3 className="brief-title">{brief.title}</h3>
        <p className="brief-meta">{brief.meta}</p>

        <div className="brief-tabs" role="tablist" aria-label="Competitors in this brief">
          {competitors.map((c) => (
            <button
              key={c.id}
              id={`${uid}-tab-${c.id}`}
              className="brief-tab"
              role="tab"
              type="button"
              aria-selected={tab === c.id}
              aria-controls={`${uid}-panel-${c.id}`}
              tabIndex={tab === c.id ? 0 : -1}
              ref={(el) => { tabRefs.current[c.id] = el; }}
              onClick={() => setTab(c.id)}
              onKeyDown={onTabKeyDown}
            >
              {c.name}
            </button>
          ))}
        </div>

        {competitors.map((c) => (
          <div
            key={c.id}
            id={`${uid}-panel-${c.id}`}
            className={`brief-panel${tab === c.id ? " active" : ""}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${c.id}`}
            tabIndex={0}
            hidden={tab !== c.id}
          >
            {c.signals.map((signal, i) => {
              const key = `${c.id}-${i}`;
              return (
                <Signal
                  key={key}
                  signal={signal}
                  open={openSig === key}
                  onToggle={() => setOpenSig(openSig === key ? null : key)}
                />
              );
            })}
          </div>
        ))}

        <div className="brief-bottomline">
          <div className="lbl">Bottom line — your week</div>
          <p>{brief.bottomLine}</p>
        </div>
      </div>
    </div>
  );
}
