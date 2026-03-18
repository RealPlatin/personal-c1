const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.65rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const stageTitleStyle: React.CSSProperties = {
  ...labelStyle,
  fontWeight: 700,
  fontSize: "0.72rem",
  color: "var(--accent)",
  marginBottom: "0.6rem",
};

const stageCardStyle: React.CSSProperties = {
  background: "rgba(26,20,16,0.06)",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
};

const itemsRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "0.4rem",
};

const chipBase: React.CSSProperties = {
  ...labelStyle,
  padding: "0.18rem 0.55rem",
  borderRadius: "0.3rem",
  color: "var(--muted)",
  border: "1px solid var(--border)",
  background: "transparent",
};

const chipAmber: React.CSSProperties = {
  ...chipBase,
  background: "rgba(245,158,11,0.12)",
  border: "1px solid rgba(245,158,11,0.3)",
  color: "#f59e0b",
};

const chipEmerald: React.CSSProperties = {
  ...chipBase,
  background: "rgba(16,185,129,0.12)",
  border: "1px solid rgba(16,185,129,0.3)",
  color: "#10b981",
};

const arrowStyle: React.CSSProperties = {
  textAlign: "center" as const,
  fontFamily: "var(--font-mono)",
  fontSize: "1rem",
  color: "var(--border)",
  margin: "0.25rem 0",
  userSelect: "none",
};

type Chip = { label: string; variant?: "amber" | "emerald" | "muted" };

type Stage = {
  id: string;
  title: string;
  chips: Chip[];
  outputRow?: boolean;
};

const stages: Stage[] = [
  {
    id: "setup",
    title: "01 · Setup",
    chips: [
      { label: "CLI" },
      { label: "Region Select" },
      { label: "Niche Select" },
      { label: "Translation Bridge" },
    ],
  },
  {
    id: "discovery",
    title: "02 · Discovery",
    chips: [
      { label: "Perplexity Batch" },
      { label: "Smart-Retry", variant: "amber" },
      { label: "Dedup" },
      { label: "Niche Pivot" },
    ],
  },
  {
    id: "enrichment",
    title: "03 · Enrichment",
    chips: [
      { label: "Verify Financials" },
      { label: "Ownership" },
      { label: "Contact" },
      { label: "Contact-Strike Fallback", variant: "amber" },
    ],
  },
  {
    id: "validation",
    title: "04 · Validation",
    chips: [
      { label: "Pre-Flight Ratio Gate" },
      { label: "Hard Gate — Subsidiary" },
      { label: "Size / Fit" },
    ],
  },
  {
    id: "output",
    title: "05 · Output",
    outputRow: true,
    chips: [
      { label: "Ready to Call", variant: "emerald" },
      { label: "Needs Research", variant: "amber" },
      { label: "Denied", variant: "muted" },
    ],
  },
];

function chip(c: Chip, i: number) {
  const style =
    c.variant === "amber"
      ? chipAmber
      : c.variant === "emerald"
      ? chipEmerald
      : chipBase;
  return (
    <span key={i} style={style}>
      {c.label}
    </span>
  );
}

export default function SourcingWorkflow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, minWidth: "260px" }}>
      {stages.map((stage, idx) => (
        <div key={stage.id}>
          <div style={stageCardStyle}>
            <div style={stageTitleStyle}>{stage.title}</div>
            <div style={itemsRowStyle}>
              {stage.chips.map((c, i) => chip(c, i))}
            </div>
          </div>
          {idx < stages.length - 1 && <div style={arrowStyle}>↓</div>}
        </div>
      ))}
    </div>
  );
}
