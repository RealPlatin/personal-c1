"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Obsidian Dashboard",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Supabase"],
    desc: "Personal knowledge management dashboard with graph views, search, and bi-directional links. Built for speed and zero friction.",
    href: "#",
    status: "Live",
  },
  {
    title: "Film Log",
    year: "2024",
    tags: ["React", "SQLite", "Tauri"],
    desc: "Desktop app for tracking film rolls — camera, lens, stock, and notes per frame. Offline-first, exports to CSV.",
    href: "#",
    status: "Open Source",
  },
  {
    title: "Type Specimen Generator",
    year: "2024",
    tags: ["Canvas API", "Vanilla JS"],
    desc: "Browser tool that generates printable type specimens from Google Fonts or local font files. Used by dozens of designers.",
    href: "#",
    status: "Live",
  },
  {
    title: "Run Tracker CLI",
    year: "2023",
    tags: ["Go", "SQLite"],
    desc: "Minimal command-line tool for logging runs with splits, pace calculations, and weekly summaries. No cloud required.",
    href: "#",
    status: "Open Source",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

export default function ProjectsPage() {
  return (
    <div className="container section">
      <motion.p
        className="label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "0.75rem" }}
      >
        Projects
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{ marginBottom: "4rem" }}
      >
        Things I&apos;ve{" "}
        <em style={{ color: "var(--accent)" }}>built</em>
      </motion.h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: "block",
              padding: "2rem",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              background: "rgba(26,20,16,0.02)",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--fg)",
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  background: "rgba(200,96,42,0.1)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "1rem",
                }}
              >
                {p.status}
              </span>
            </div>

            <p style={{ margin: "0 0 1.25rem", fontSize: "0.95rem" }}>{p.desc}</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "1rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
