"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 4.5rem)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        alignItems: "center",
        gap: "2rem",
        padding: "clamp(2rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)",
        maxWidth: 1100,
        marginInline: "auto",
      }}
    >
      {/* Text */}
      <div>
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "1rem" }}
        >
          Business Informatics · Finance · Economics
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ margin: "0 0 1.5rem" }}
        >
          Marc von
          <br />
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Gehlen</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}
        >
          Technology is the new leverage. From enterprise infrastructure to M&amp;A intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              background: "var(--fg)",
              color: "var(--bg)",
              borderRadius: "2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            View Work
          </a>
          <a
            href="/writing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              border: "1px solid var(--border)",
              borderRadius: "2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Read Writing
          </a>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          width: "100%",
          height: "min(520px, 60vw)",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(26,20,16,0.04)",
                borderRadius: "1rem",
              }}
            />
          }
        >
          <HeroScene />
        </Suspense>
      </motion.div>
    </section>
  );
}
