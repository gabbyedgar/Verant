"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    const mq = window.matchMedia("(min-width: 821px)");
    function onResize() {
      if (mq.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <nav className={`nav${open ? " menu-open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Verant home">
          <Logo />
        </Link>
        <div className="nav-links" id="nav-menu">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              className="nav-link"
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-cta-wrap">
          <Link className="btn btn-primary btn-sm" href="/pricing#plans">
            Start a pilot
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>
    </nav>
  );
}
