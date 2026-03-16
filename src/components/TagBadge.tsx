const TAG_COLORS: Record<string, { bg: string; fg: string }> = {
  Python:     { bg: "rgba(55,118,171,0.12)",  fg: "#3776AB" },
  LLM:        { bg: "rgba(16,163,127,0.12)",  fg: "#10a37f" },
  Perplexity: { bg: "rgba(107,72,255,0.12)",  fg: "#6B48FF" },
  OpenAI:     { bg: "rgba(16,163,127,0.12)",  fg: "#10a37f" },
  SQL:        { bg: "rgba(201,125,0,0.12)",   fg: "#C97D00" },
  Bootstrap:  { bg: "rgba(121,82,179,0.12)",  fg: "#7952B3" },
  HTML:       { bg: "rgba(227,79,38,0.12)",   fg: "#E34F26" },
  CSS:        { bg: "rgba(38,77,228,0.12)",   fg: "#264DE4" },
  JavaScript: { bg: "rgba(204,153,0,0.12)",   fg: "#CC9900" },
  React:      { bg: "rgba(20,158,202,0.12)",  fg: "#149ECA" },
  "Next.js":  { bg: "rgba(26,20,16,0.08)",    fg: "var(--fg)" },
  TypeScript: { bg: "rgba(49,120,198,0.12)",  fg: "#3178C6" },
  Tailwind:   { bg: "rgba(6,148,162,0.12)",   fg: "#0694A2" },
  "three.js": { bg: "rgba(4,158,244,0.12)",   fg: "#049EF4" },
};

const DEFAULT_COLORS = { bg: "rgba(26,20,16,0.06)", fg: "var(--muted)" };

export default function TagBadge({ tag }: { tag: string }) {
  const { bg, fg } = TAG_COLORS[tag] ?? DEFAULT_COLORS;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.06em",
        color: fg,
        background: bg,
        padding: "0.2rem 0.6rem",
        borderRadius: "1rem",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {tag}
    </span>
  );
}
