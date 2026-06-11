/* VERANT — shared behaviors: page transitions, reveals, signal feed,
   brief tabs + expanders, pricing selector, FAQ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- page enter/exit fade ---------- */
  document.documentElement.style.background = "#0E1116";
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("page-enter");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.remove("page-enter");
      });
    });
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.indexOf("#") === 0 || a.target === "_blank") return;
    if (/^https?:\/\//.test(href) || href.indexOf("mailto:") === 0) return;
    if (reduceMotion) return;
    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(function () { window.location.href = href; }, 200);
  });

  /* ---------- scroll reveals ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      els.forEach(function (el) { io.observe(el); });
    }
  });

  /* ---------- live signal feed ---------- */
  var FEED_EVENTS = [
    { src: "PRICING", co: "Cipherline", desc: "Enterprise tier removed from public pricing page — \u201cContact sales\u201d only." },
    { src: "HIRING", co: "Aegix Labs", desc: "4 new openings posted: federal sales, FedRAMP compliance lead." },
    { src: "PATENTS", co: "Veilstack", desc: "USPTO filing: \u201cAdversarial prompt detection via layered inference.\u201d" },
    { src: "GOVERNANCE", co: "Cipherline", desc: "SOC 2 Type II report refreshed; ISO 42001 added to trust page." },
    { src: "PRODUCT", co: "Northcage", desc: "Changelog: EU AI Act mapping module shipped to all plans." },
    { src: "FILINGS", co: "Aegix Labs", desc: "SEC Form D filed — $14M raise, undisclosed lead." },
    { src: "PEOPLE", co: "Veilstack", desc: "VP of Compliance departed; LinkedIn shows move to Praxa." },
    { src: "WEB", co: "Praxa", desc: "New comparison page published targeting your brand keywords." },
    { src: "PRICING", co: "Northcage", desc: "Starter plan cut 20%; seat minimums dropped." },
    { src: "HIRING", co: "Cipherline", desc: "First EU hire: policy counsel, Brussels." },
    { src: "PRODUCT", co: "Praxa", desc: "Docs update: model-risk scorecards renamed \u201caudit packs.\u201d" },
    { src: "GOVERNANCE", co: "Aegix Labs", desc: "NIST AI RMF crosswalk published as gated whitepaper." }
  ];

  function feedTime(offsetMin) {
    if (offsetMin < 1) return "now";
    if (offsetMin < 60) return offsetMin + "m";
    return Math.round(offsetMin / 60) + "h";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.getElementById("feed-body");
    if (!body) return;

    var MAX_ROWS = 7;
    var idx = 0;
    var offsets = [2, 9, 23, 41, 67, 118, 190]; // initial minutes-ago

    function rowEl(ev, t, entering) {
      var row = document.createElement("div");
      row.className = "feed-row" + (entering ? " entering" : "");
      row.innerHTML =
        '<span class="t">' + t + "</span>" +
        '<span class="ev"><span class="ev-top"><span class="src">' + ev.src +
        '</span><span class="co">' + ev.co + "</span></span>" +
        '<span class="desc">' + ev.desc + "</span></span>";
      return row;
    }

    // seed
    for (var i = 0; i < 6; i++) {
      body.appendChild(rowEl(FEED_EVENTS[(i + 2) % FEED_EVENTS.length], feedTime(offsets[i]), false));
    }
    idx = 8;

    if (reduceMotion) return;
    setInterval(function () {
      var ev = FEED_EVENTS[idx % FEED_EVENTS.length];
      idx++;
      body.insertBefore(rowEl(ev, "now", true), body.firstChild);
      while (body.children.length > MAX_ROWS) body.removeChild(body.lastChild);
      // age the visible timestamps
      var ts = body.querySelectorAll(".feed-row .t");
      for (var j = 1; j < ts.length; j++) {
        ts[j].textContent = feedTime(offsets[Math.min(j - 1, offsets.length - 1)]);
      }
    }, 3400);
  });

  /* ---------- brief tabs ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".brief-tab");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        document.querySelectorAll(".brief-panel").forEach(function (p) {
          p.classList.toggle("active", p.id === tab.getAttribute("data-panel"));
        });
      });
    });
  });

  /* ---------- signal expanders ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".sig-head").forEach(function (head) {
      head.addEventListener("click", function () {
        head.closest(".sig").classList.toggle("open");
      });
    });
  });

  /* ---------- pricing selector ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var plans = document.querySelectorAll(".plan[data-plan]");
    var bar = document.getElementById("select-bar");
    if (!plans.length || !bar) return;
    var text = bar.querySelector(".sb-text");
    var price = bar.querySelector(".sb-price");
    var cta = bar.querySelector(".btn");

    plans.forEach(function (plan) {
      plan.addEventListener("click", function () {
        var wasSelected = plan.getAttribute("aria-pressed") === "true";
        plans.forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        if (wasSelected) {
          bar.classList.remove("visible");
          return;
        }
        plan.setAttribute("aria-pressed", "true");
        text.innerHTML = "Selected: <strong>" + plan.getAttribute("data-plan") + "</strong> — " + plan.getAttribute("data-summary");
        price.textContent = plan.getAttribute("data-price");
        cta.textContent = "Start with " + plan.getAttribute("data-plan");
        bar.classList.add("visible");
      });
    });
  });
})();
