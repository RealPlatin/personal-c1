import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Marc von Gehlen",
  description: "Deep dives into AI, security research, and technology.",
  openGraph: {
    title: "Insights | Marc von Gehlen",
    description: "Deep dives into AI, security research, and technology.",
    url: "https://marcvongehlen.com/insights",
  },
};

const articles = [
  {
    title: "Prompt Injection: Hidden Instructions in Images",
    status: "Drafting",
    description:
      "How malicious instructions embedded in images can hijack AI assistants — and what it means for security.",
  },
  {
    title: "Bypassing AI Restrictions: The Ethics of Prompt Engineering",
    status: "Drafting",
    description:
      "Exploring the thin line between creative prompting and manipulation of large language models.",
  },
];

export default function InsightsPage() {
  return (
    <div className="container section">
      <p className="label" style={{ marginBottom: "0.75rem" }}>Insights</p>
      <h1 style={{ marginBottom: "4rem" }}>
        Deep Dives &amp;{" "}
        <em style={{ color: "var(--accent)" }}>Analysis</em>
      </h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {articles.map((article) => (
          <li
            key={article.title}
            style={{ borderTop: "1px solid var(--border)", padding: "2rem 0" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "0.6rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{article.title}</h2>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "1rem",
                  flexShrink: 0,
                }}
              >
                {article.status}
              </span>
            </div>
            <p style={{ margin: 0, maxWidth: "60ch", fontSize: "0.9rem", color: "var(--muted)" }}>
              {article.description}
            </p>
          </li>
        ))}
        <li style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 0" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            More coming soon →
          </span>
        </li>
      </ul>
    </div>
  );
}
