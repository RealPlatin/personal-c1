export default function LabPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 57px)" }}>
      <div
        style={{
          padding: "1rem clamp(1.25rem, 5vw, 3rem)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "baseline",
          gap: "1.5rem",
        }}
      >
        <p
          className="label"
          style={{ margin: 0 }}
        >
          Lab
        </p>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--muted)",
            letterSpacing: "0.04em",
          }}
        >
          ASCII Banner Generator
        </span>
      </div>
      <iframe
        src="/banner/index.html"
        style={{
          flex: 1,
          border: "none",
          width: "100%",
        }}
        title="ASCII Banner Generator"
      />
    </div>
  );
}
