"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
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
        {/* SVG // mark */}
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
        {/* Subtitle text */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.06em",
          color: "var(--muted)",
        }}>
          Business Informatics
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
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
    </nav>
  );
}
