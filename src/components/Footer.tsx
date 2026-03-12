export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem clamp(1.25rem, 5vw, 3rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        © {year} Marc von Gehlen
      </span>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[
          { label: "GitHub", href: "https://github.com" },
          { label: "Twitter", href: "https://twitter.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              transition: "color 0.2s",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
