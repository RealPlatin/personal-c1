export default function ImpressumPage() {
  return (
    <div className="container section" style={{ maxWidth: "55ch" }}>
      <p className="label" style={{ marginBottom: "0.75rem" }}>Legal</p>
      <h1 style={{ marginBottom: "3rem" }}>Impressum</h1>

      <section style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}
        >
          Angaben gemäß § 5 TMG
        </p>
        <p style={{ margin: "0 0 0.4rem", fontSize: "0.95rem" }}>
          <strong>Name:</strong> Marc von Gehlen
        </p>
        <p style={{ margin: "0 0 0.4rem", fontSize: "0.95rem" }}>
          <strong>Adresse:</strong> Luisenstraße 26, 77654 Offenburg, Germany
        </p>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          <strong>E-Mail:</strong>{" "}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              userSelect: "none",
            }}
          >
            marc [dot] von [dot] gehlen [at] outlook [dot] de
          </span>
        </p>
      </section>

      <section>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}
        >
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </p>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>Marc von Gehlen</p>
      </section>
    </div>
  );
}
