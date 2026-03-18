"use client";

import { useState, useEffect } from "react";
import { useAnimation } from "framer-motion";
import Link from "next/link";
import { motion } from "framer-motion";
import TagBadge from "@/components/TagBadge";
import ProjectOverlay, { type Project } from "@/components/ProjectOverlay";

const projects: Project[] = [
  {
    title: "Autonomous M&A Sourcing Engine",
    version: "v5.9.3",
    tags: ["Python", "LLM", "Perplexity", "OpenAI"],
    desc: "Agentic pipeline for European SME discovery. Features automated financial screening, duplicate detection, and contact extraction. Reduced research time from 20 min to <30s per lead.",
    href: "https://github.com/RealPlatin/sourcingAgent",
    status: "Active",
    showWorkflow: true,
    caseStudy: {
      problem: "High manual effort in SME target discovery — 15–30 minutes per target, at scale.",
      solution: "Agentic AI pipeline with automated financial screening, duplicate detection, and contact extraction across the European SME market.",
      impact: "95% cost reduction; research time cut from 20 min to under 30 seconds per lead.",
    },
  },
  {
    title: "nokk-it",
    version: "Private Project / MVP",
    tags: ["SQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
    desc: "A custom B2B ticketing system prototype with dashboard analytics and role-based access management.",
    href: "#",
    status: "MVP",
  },
  {
    title: "Banner-Tool",
    version: "In Progress",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "three.js"],
    desc: "A specialized design automation tool for professional personal branding. Generates consistent visual assets at scale.",
    href: "https://github.com/RealPlatin/banner",
    status: "In Progress",
    liveHref: "/lab",
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

export default function ProjectsClient() {
  const [selected, setSelected] = useState<Project | null>(null);
  const mnaControls = useAnimation();

  useEffect(() => {
    mnaControls.start("visible");

    if (window.location.hash === "#project-sourcing") {
      const project = projects.find(p => p.title === "Autonomous M&A Sourcing Engine");
      if (project) setSelected(project);

      setTimeout(() => {
        mnaControls.start({
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 0 0px rgba(200,96,42,0)",
            "0 0 0 2px rgba(200,96,42,0.55), 0 8px 32px rgba(200,96,42,0.14)",
            "0 0 0 0px rgba(200,96,42,0)",
          ],
          transition: { duration: 1.8, ease: "easeOut", times: [0, 0.18, 1] },
        });
      }, 600);
    }
  }, []);

  return (
    <>
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
            <motion.div
              key={p.title}
              id={p.title === "Autonomous M&A Sourcing Engine" ? "project-sourcing" : undefined}
              layoutId={`project-${p.title}`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={p.title === "Autonomous M&A Sourcing Engine" ? mnaControls : "visible"}
              onClick={() => setSelected(p)}
              style={{
                display: "block",
                padding: "2rem",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                background: "rgba(26,20,16,0.02)",
                transition: "border-color 0.2s, background 0.2s",
                cursor: "pointer",
                ...(p.title === "Autonomous M&A Sourcing Engine" ? { scrollMarginTop: "6rem" } : {}),
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                  gap: "1rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "var(--fg)",
                      display: "block",
                    }}
                  >
                    {p.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                  }}>
                    {p.version}
                  </span>
                </div>
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
                    flexShrink: 0,
                  }}
                >
                  {p.status}
                </span>
              </div>

              <p style={{ margin: "0 0 1.25rem", fontSize: "0.95rem" }}>{p.desc}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexShrink: 0 }}>
                  {p.href !== "#" && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.liveHref && (
                    <Link
                      href={p.liveHref}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}
                    >
                      Try it live →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectOverlay project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
