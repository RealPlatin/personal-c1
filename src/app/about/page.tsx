"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024",
    role: "Senior Product Engineer",
    org: "Stealth Startup",
    desc: "Building full-stack product from zero to launch — architecture, design systems, and customer obsession.",
  },
  {
    year: "2022",
    role: "Product Lead",
    org: "Scale-up, Berlin",
    desc: "Led cross-functional team shipping B2B SaaS features used by 50k+ users. Grew ARR 3× in 18 months.",
  },
  {
    year: "2020",
    role: "Software Engineer",
    org: "Agency, Hamburg",
    desc: "Full-stack web development — React, Node, PostgreSQL. Built digital experiences for consumer brands.",
  },
  {
    year: "2018",
    role: "B.Sc. Computer Science",
    org: "University",
    desc: "Graduated with focus on distributed systems and HCI. Thesis on collaborative real-time interfaces.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

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
        style={{ marginBottom: "1.5rem" }}
      >
        Builder at heart,
        <br />
        <em style={{ color: "var(--accent)" }}>curious by nature.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "55ch", marginBottom: "5rem" }}
      >
        I&apos;m a product engineer based in Germany. I care deeply about the
        craft of software — clean code, clear thinking, and products that feel
        inevitable once you use them. Outside of screens: film photography, long
        runs, and cooking elaborate meals.
      </motion.p>

      {/* Timeline */}
      <motion.p
        className="label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ marginBottom: "2.5rem" }}
      >
        Timeline
      </motion.p>

      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "5.5rem",
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--border)",
          }}
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "5rem 1fr",
              gap: "2rem",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Year */}
            <div style={{ textAlign: "right", paddingTop: "0.15rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.05em",
                }}
              >
                {item.year}
              </span>
            </div>

            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: "calc(5.5rem - 4px)",
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
                  fontSize: "1.15rem",
                  color: "var(--fg)",
                  margin: "0 0 0.2rem",
                }}
              >
                {item.role}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  margin: "0 0 0.6rem",
                }}
              >
                {item.org}
              </p>
              <p style={{ margin: 0, maxWidth: "50ch" }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
