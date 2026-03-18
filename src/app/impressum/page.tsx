import type { Metadata } from "next";
import EmailPlane from "@/components/EmailPlane";

export const metadata: Metadata = {
  title: "Impressum | Marc von Gehlen",
  description: "Legal notice and contact information for marcvongehlen.com.",
  openGraph: {
    title: "Impressum | Marc von Gehlen",
    description: "Legal notice and contact information for marcvongehlen.com.",
    url: "https://marcvongehlen.com/impressum",
  },
};

const sectionLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.68rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "0.9rem",
};

const line: React.CSSProperties = {
  margin: "0 0 0.3rem",
  fontSize: "0.95rem",
  lineHeight: 1.6,
};

export default function ImpressumPage() {
  return (
    <div className="container section" style={{ maxWidth: "55ch" }}>
      <p className="label" style={{ marginBottom: "0.75rem" }}>Legal</p>
      <h1 style={{ marginBottom: "3rem" }}>Impressum</h1>

      {/* Angaben gemäß § 5 TMG */}
      <section style={{ marginBottom: "2.5rem" }}>
        <p style={sectionLabel}>Angaben gemäß § 5 TMG</p>
        <p style={line}>Marc von Gehlen</p>
        <p style={line}>Luisenstraße 26</p>
        <p style={line}>77654 Offenburg</p>
        <p style={{ ...line, margin: 0 }}>Germany</p>
      </section>

      {/* Kontakt */}
      <section style={{ marginBottom: "2.5rem" }}>
        <p style={sectionLabel}>Kontakt</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}>
          <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.04em" }}>E-Mail</span>
          <EmailPlane style={{ fontSize: "0.88rem", letterSpacing: "0.02em" }} />
        </div>
      </section>

      {/* Verantwortlich */}
      <section>
        <p style={sectionLabel}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</p>
        <p style={line}>Marc von Gehlen</p>
        <p style={line}>Luisenstraße 26</p>
        <p style={{ ...line, margin: 0 }}>77654 Offenburg</p>
      </section>
    </div>
  );
}
