"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TagBadge from "./TagBadge";

export type Project = {
  title: string;
  version: string;
  tags: string[];
  desc: string;
  href: string;
  status: string;
  liveHref?: string;
};

export default function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(26,20,16,0.55)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            layoutId={`project-${project.title}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(640px, calc(100vw - 2rem))",
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "2.5rem",
              zIndex: 201,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "var(--fg)",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  {project.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                  }}
                >
                  {project.version}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
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
                  {project.status}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.1rem",
                    lineHeight: 1,
                    padding: "0.25rem",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Description */}
            <p style={{ margin: "0 0 2rem", fontSize: "1rem", lineHeight: 1.7 }}>
              {project.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {project.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>

            {/* Action Links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1.5rem",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    borderRadius: "2rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  View on GitHub ↗
                </a>
              )}
              {project.liveHref && (
                <a
                  href={project.liveHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1.5rem",
                    border: "1px solid var(--border)",
                    borderRadius: "2rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Try it live →
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
