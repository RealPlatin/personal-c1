"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem clamp(1.25rem, 5vw, 3rem)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(245,240,232,0.75)",
          borderBottom: "1px solid rgba(26,20,16,0.06)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            textDecoration: "none",
          }}
        >
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "var(--fg)",
          }}>
            Marc von Gehlen
          </span>
          <svg
            width="18" height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
            style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
          >
            <line x1="3" y1="11" x2="7" y2="1" stroke="#c8602a" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="9" y1="11" x2="13" y2="1" stroke="#c8602a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.06em",
            color: "var(--muted)",
          }}>
            Business Informatics
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: pathname === href ? "var(--accent)" : "var(--muted)",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            aria-label="Contact"
            onClick={() => {
              document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => window.dispatchEvent(new CustomEvent("highlight-contact")), 600);
            }}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "2rem",
              padding: "0.3rem 0.9rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            Contact
          </button>
        </div>

        {/* Burger button — CSS controls display */}
        <button
          className="burger-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
            color: "var(--fg)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown — CSS controls display */}
      <div
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        style={{
          position: "fixed",
          top: "3.75rem",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(245,240,232,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "1.5rem clamp(1.25rem, 5vw, 3rem)",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: pathname === href ? "var(--accent)" : "var(--fg)",
            }}
          >
            {label}
          </Link>
        ))}
        <button
          aria-label="Contact"
          onClick={() => {
            setMenuOpen(false);
            document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => window.dispatchEvent(new CustomEvent("highlight-contact")), 600);
          }}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "2rem",
            padding: "0.5rem 1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          Contact
        </button>
      </div>
    </>
  );
}
