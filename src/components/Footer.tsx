"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const [highlighted, setHighlighted] = useState(false);
  const [btnAnimate, setBtnAnimate] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [planeState, setPlaneState] = useState<"idle" | "hovered" | "flying">("idle");
  const flyingRef = useRef(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (flyingRef.current) return;
    e.preventDefault();
    flyingRef.current = true;
    setPlaneState("flying");
    setTimeout(() => { window.location.href = "mailto:marc.von.gehlen@outlook.de"; }, 400);
    setTimeout(() => { flyingRef.current = false; setPlaneState("idle"); }, 1800);
  };

  const handlePlaneHoverStart = () => { if (!flyingRef.current) setPlaneState("hovered"); };
  const handlePlaneHoverEnd   = () => { if (!flyingRef.current) setPlaneState("idle"); };

  // Animate ↑ Top button when footer enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBtnAnimate(true);
      },
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Highlight contact elements on custom event from Nav
  useEffect(() => {
    const handler = () => {
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1400);
    };
    window.addEventListener("highlight-contact", handler);
    return () => window.removeEventListener("highlight-contact", handler);
  }, []);

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marc-von-gehlen-93ba22215" },
    { label: "X", href: "https://x.com/RealPlatin_" },
    { label: "Substack", href: "https://marcvg1.substack.com" },
    { label: "GitHub", href: "https://github.com/RealPlatin" },
  ];

  const highlightStyle = highlighted
    ? {
        transition: "box-shadow 0.3s ease",
        boxShadow: "0 0 0 2px rgba(200,96,42,0.18), 0 0 16px rgba(200,96,42,0.12)",
        borderRadius: "0.4rem",
        padding: "0.2rem 0.4rem",
        margin: "-0.2rem -0.4rem",
      }
    : {
        transition: "box-shadow 0.6s ease",
        boxShadow: "none",
        borderRadius: "0.4rem",
        padding: "0.2rem 0.4rem",
        margin: "-0.2rem -0.4rem",
      };

  return (
    <>
      <style>{`
        @keyframes topBtnIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .top-btn-enter {
          animation: topBtnIn 0.4s ease forwards;
        }
      `}</style>
      <footer
        ref={footerRef}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem clamp(1.25rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            © {year} Marc von Gehlen
          </span>
          <div
            id="footer-social"
            style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", ...highlightStyle }}
          >
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </a>
            ))}
            <Link
              href="/impressum"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                transition: "color 0.2s",
              }}
            >
              Impressum
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <a
            id="footer-email"
            href="mailto:marc.von.gehlen@outlook.de"
            onClick={handleEmailClick}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--muted)",
              letterSpacing: "0.03em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              ...highlightStyle,
            }}
          >
            marc.von.gehlen [at] outlook (dot) de
            <motion.span
              animate={planeState}
              variants={{
                idle: {
                  rotate: 0, x: 0, y: 0, opacity: 0.55, scale: 1,
                  transition: { duration: 0.3 },
                },
                hovered: {
                  rotate: 15,
                  y: [0, -3, 0],
                  opacity: 1,
                  transition: {
                    rotate: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                    y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                  },
                },
                flying: {
                  rotate: 45, x: 180, y: -180, opacity: 0, scale: 0.3,
                  transition: { duration: 0.65, ease: "easeIn" },
                },
              }}
              onHoverStart={handlePlaneHoverStart}
              onHoverEnd={handlePlaneHoverEnd}
              style={{ display: "inline-flex", color: "#10b981", lineHeight: 1, flexShrink: 0 }}
            >
              {/* Send / paper-plane icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </motion.span>
          </a>
          <button
            className={btnAnimate ? "top-btn-enter" : ""}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "2rem",
              padding: "0.3rem 0.9rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              cursor: "pointer",
              opacity: btnAnimate ? undefined : 0,
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            ↑ Top
          </button>
        </div>
      </footer>
    </>
  );
}
