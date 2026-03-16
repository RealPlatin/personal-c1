"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  period: string;
  role: string;
  org: string;
  desc: string;
  bullets?: string[];
  sections?: { title: string; items: string[] }[];
};

const timeline: TimelineItem[] = [
  {
    period: "2026 – Present",
    role: "Founded and Led",
    org: "SICO — Student Investment-Club Offenburg",
    desc: "Establishing and expanding the first cross-faculty investment initiative at Hochschule Offenburg.",
  },
  {
    period: "01/2026 – 03/2026",
    role: "M&A Analyst (Intern)",
    org: "De Bruyn Capital",
    desc: "Built an AI-assisted sourcing pipeline that achieved a 95% cost reduction and reduced research time from 15–30 minutes to under 30 seconds per target. Automated deal flow from discovery to financial screening across the European SME market.",
  },
  {
    period: "2025 – Present",
    role: "B.Sc. Business Informatics",
    org: "HS Offenburg",
    desc: "Dual-track degree bridging computer science and business. Focus on AI/ML applications, data management, and digital transformation.",
  },
  {
    period: "2023",
    role: "IT Consultant",
    org: "SICK AG",
    desc: "",
    bullets: [
      "Designed and implemented a centralized Windows Audit Policy for ~12,000 clients.",
      "Acted as a technical sparring partner for enterprise IT governance and Windows 11 standardization.",
      "Worked independently on architecture, compliance, and audit-readiness topics.",
      "Collaborated cross-functionally with infrastructure, security, and operations.",
    ],
  },
  {
    period: "2020 – 2023",
    role: "IT Specialist Apprenticeship",
    org: "SICK AG",
    desc: "Grade 1.7 (89/100) — 3-year Dual Vocational Training (German Dual System), combining practical work at SICK AG with state-regulated theoretical education.",
    sections: [
      {
        title: "Rotations",
        items: [
          "IT Infrastructure Services – Workplace (Windows, GPO, Audit Policies)",
          "Network Services & Unified Communication (Cisco, WAN, UC)",
          "IT Security Management (Firewall, SOC exposure, Zero Trust concepts)",
          "Digital Manufacturing – Infrastructure (Monitoring, Docker, Prometheus)",
          "Product Management – Service (technical documentation & web guides)",
          "Electronics Production & Test Engineering (VBA-based inventory automation)",
        ],
      },
      {
        title: "Project: Java Development Environment Evaluation & Migration",
        items: [
          "Evaluated modern Java/JavaFX environments (IntelliJ, VS Code, Eclipse) and build tools (Maven/Gradle)",
          "Migrated legacy JavaFX templates to OpenJDK 17 — ensured compatibility and maintainability",
          "Delivered within a fixed 40h scope with cost analysis and LaTeX documentation",
        ],
      },
      {
        title: "Final Apprenticeship Project",
        items: [
          "Built the foundation for the Windows Audit Policy implemented in the subsequent consultant role.",
          "Demonstrated strong initiative and the ability to work independently beyond the formal training curriculum.",
        ],
      },
    ],
  },
];

const entryVariants = {
  hidden: { opacity: 0, y: 20, x: -12 },
  visible: { opacity: 1, y: 0, x: 0 },
};

const interests = ["Macroeconomics", "Geopolitics", "Chess", "Right Fashion", "Endurance Sports"];

export default function AboutPage() {
  return (
    <div className="container section">
      {/* Header */}
      <motion.p
        className="label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "0.75rem" }}
      >
        About
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{ marginBottom: "2.5rem" }}
      >
        Bridging the Gap
        <br />
        <em style={{ color: "var(--accent)" }}>between Systems and Capital.</em>
      </motion.h1>

      {/* 3 Bullet Points */}
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "55ch",
        }}
      >
        {[
          { label: "Deep IT Roots", text: "3 years at SICK AG — Enterprise Infrastructure & Governance." },
          { label: "M&A Experience", text: "Intern at De Bruyn Capital, building AI-native sourcing pipelines." },
          { label: "Academic Focus", text: "Business Informatics at HS Offenburg (B.Sc.)." },
        ].map(({ label, text }) => (
          <li key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: "var(--accent)",
              textTransform: "uppercase",
              flexShrink: 0,
              paddingTop: "0.2rem",
            }}>
              →
            </span>
            <span style={{ fontSize: "1rem", lineHeight: 1.65, color: "var(--muted)" }}>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>{label}:</strong>{" "}
              {text}
            </span>
          </li>
        ))}
      </motion.ul>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ marginBottom: "5rem" }}
      >
        <p className="label" style={{ marginBottom: "1rem" }}>Interests</p>
        <div style={{ display: "flex", gap: "0.35rem 0", flexWrap: "wrap", alignItems: "center" }}>
          {interests.map((item, i) => (
            <span key={item} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              color: "var(--muted)",
            }}>
              {item}{i < interests.length - 1 && (
                <span style={{ color: "var(--accent)", margin: "0 0.5rem" }}>|</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.p
        className="label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        style={{ marginBottom: "2.5rem" }}
      >
        Timeline
      </motion.p>

      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "8rem",
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--border)",
          }}
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            variants={entryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.15 }}
            style={{
              display: "grid",
              gridTemplateColumns: "8rem 1fr",
              gap: "2rem",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Period */}
            <div style={{ textAlign: "right", paddingTop: "0.15rem", paddingRight: "1.25rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.5,
                  display: "block",
                }}
              >
                {item.period}
              </span>
            </div>

            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: "calc(8rem - 4px)",
                top: "0.4rem",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--fg)",
                border: "2px solid var(--bg)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div style={{ paddingLeft: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--fg)",
                  margin: "0 0 0.2rem",
                }}
              >
                {item.role}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  margin: "0 0 0.6rem",
                }}
              >
                {item.org}
              </p>
              {item.desc && <p style={{ margin: 0, maxWidth: "50ch", fontSize: "0.9rem" }}>{item.desc}</p>}
              {item.sections && (
                <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <p style={{
                        margin: "0 0 0.3rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}>
                        {section.title}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        {section.items.map((it) => (
                          <p key={it} style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)", maxWidth: "52ch" }}>{it}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.bullets && (
                <div style={{ margin: `${item.desc || item.sections ? "0.75rem" : "0"} 0 0`, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {item.bullets.map((bullet) => (
                    <p key={bullet} style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)", maxWidth: "50ch" }}>{bullet}</p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
