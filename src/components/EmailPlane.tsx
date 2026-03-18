"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MAILTO = "mailto:marc.von.gehlen@outlook.de";

const planeVariants = {
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
      y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const },
    },
  },
  flying: {
    rotate: 45, x: 180, y: -180, opacity: 0, scale: 0.3,
    transition: { duration: 0.65, ease: "easeIn" as const },
  },
};

export default function EmailPlane({
  display = "marc.von.gehlen [at] outlook.de",
  style,
  id,
}: {
  display?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const [planeState, setPlaneState] = useState<"idle" | "hovered" | "flying">("idle");
  const flyingRef = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (flyingRef.current) return;
    e.preventDefault();
    flyingRef.current = true;
    setPlaneState("flying");
    setTimeout(() => { window.location.href = MAILTO; }, 400);
    setTimeout(() => { flyingRef.current = false; setPlaneState("idle"); }, 1800);
  };

  const handleHoverStart = () => { if (!flyingRef.current) setPlaneState("hovered"); };
  const handleHoverEnd   = () => { if (!flyingRef.current) setPlaneState("idle"); };

  return (
    <a
      id={id}
      href={MAILTO}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontFamily: "var(--font-mono)",
        color: "var(--muted)",
        userSelect: "none",
        ...style,
      }}
    >
      {display}
      <motion.span
        animate={planeState}
        variants={planeVariants}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ display: "inline-flex", color: "#10b981", lineHeight: 1, flexShrink: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </motion.span>
    </a>
  );
}
