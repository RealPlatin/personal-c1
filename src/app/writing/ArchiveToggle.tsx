"use client";

import { useState } from "react";

function primaryLabel(filePath: string, hasPair: boolean): string {
  if (hasPair) return "Text ↓";
  if (filePath.endsWith(".pptx")) return "Presentation ↓";
  if (filePath.endsWith(".docx")) return "Text ↓";
  return "Download ↓";
}
import { motion, AnimatePresence } from "framer-motion";

type Paper = {
  title: string;
  year: string;
  year2: string | null;
  grade: string | null;
  level: string;
  file: string | null;
  file2: string | null;
};

export default function ArchiveToggle({ papers }: { papers: Paper[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          padding: "0.5rem 0",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↓
        </span>
        Early Research &amp; Academic Archives
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="archive"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                gap: "1.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              {papers.map((paper) => (
                <div
                  key={paper.title}
                  style={{
                    padding: "1.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    background: "rgba(26,20,16,0.015)",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    {["School Project", paper.level, paper.grade].filter(Boolean).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          background: "rgba(26,20,16,0.05)",
                          border: "1px solid var(--border)",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "1rem",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "var(--fg)",
                        lineHeight: 1.4,
                      }}
                    >
                      {paper.title}
                    </span>
                    <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                      {[paper.year, paper.year2].filter(Boolean).map((y) => (
                        <span
                          key={y}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            border: "1px solid var(--border)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "1rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "auto", paddingTop: "1rem", flexWrap: "wrap" }}>
                    {paper.file && (
                      <a
                        href={paper.file}
                        download
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                        }}
                      >
                        {primaryLabel(paper.file, !!paper.file2)}
                      </a>
                    )}
                    {paper.file2 && (
                      <a
                        href={paper.file2}
                        download
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                        }}
                      >
                        Presentation ↓
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
