import type { Metadata } from "next";
import ArchiveToggle from "./ArchiveToggle";

export const metadata: Metadata = {
  title: "Writing | Marc von Gehlen",
  description: "Essays, analysis, and research on geopolitics, economics, technology, and society.",
  openGraph: {
    title: "Writing | Marc von Gehlen",
    description: "Essays, analysis, and research on geopolitics, economics, technology, and society.",
    url: "https://marcvongehlen.com/writing",
  },
};

const substackPosts = [
  {
    title: "The German Findings: An Analysis of the Creeping Decline",
    description: "From industrial hegemony to industrial museum — the collapse of Germany's economic triad.",
    href: "https://open.substack.com/pub/marcvg1/p/der-deutsche-befund-eine-analyse",
  },
  {
    title: "Oil, Drones, and Geopolitical Risk",
    description: "How energy security and the Middle East shape the next decade.",
    href: "https://marcvg1.substack.com/p/ol-drohnen-und-geopolitische-risiken",
  },
  {
    title: "Grünheide: Environmental Protection or Ideological Scapegoat?",
    description: "Fact-based analysis of the Tesla Gigafactory expansion debate.",
    href: "https://marcvg1.substack.com/p/grunheide-naturschutz-oder-ideologisches",
  },
  {
    title: "The Bureaucratic Monster",
    description: "Why bureaucracy costs Germany €140B annually.",
    href: "https://marcvg1.substack.com/p/das-burokratische-monstrum-wie-sich",
  },
  {
    title: "The Missed Revolution",
    description: "The tech deficit in AI and Industry 4.0.",
    href: "https://marcvg1.substack.com/p/die-verpasste-revolution-das-tech",
  },
  {
    title: "Deindustrialization in Real Time",
    description: "Energy prices and the relocation of European industry.",
    href: "https://open.substack.com/pub/marcvg1/p/teil-2-deindustrialisierung-in-echtzeit",
  },
];

const featuredPapers = [
  {
    title: "The Geopolitics of Microchips",
    year: "2025", year2: null, grade: null, level: "High School",
    file: null, file2: "/papers/microchip-geopolitics.pptx",
  },
  {
    title: "Life Cycle Analysis: Electric Vehicles as a Sustainable Alternative?",
    year: "2025", year2: null, grade: null, level: "High School",
    file: "/papers/ev-analysis.pdf", file2: "/papers/ev-presentation.pptx",
  },
  {
    title: "Secure Your Future: Strategies for Private Retirement Planning",
    year: "2025", year2: null, grade: null, level: "High School",
    file: "/papers/retirement-strategies.pptx", file2: null,
  },
  {
    title: "Bitcoin: Technical Foundation & Economic Implications",
    year: "2018", year2: "2025", grade: null, level: "High School",
    file: "/papers/bitcoin.docx", file2: "/papers/bitcoin-2025.pptx",
  },
];

const archivedPapers = [
  {
    title: "CRISPR & Genetic Engineering: Opportunities and Ethics",
    year: "2020", year2: null, grade: "Grade 10", level: "Middle School",
    file: "/papers/crispr.pdf", file2: "/papers/crispr.pptx",
  },
  {
    title: "Hong Kong Protests: Democracy, Resistance & Geopolitics",
    year: "2020", year2: null, grade: "Grade 10", level: "Middle School",
    file: "/papers/hongkong-protests.pptx", file2: null,
  },
  {
    title: "Tesla: Innovation, Vision & the Future of Mobility",
    year: "2020", year2: null, grade: "Grade 10", level: "Middle School",
    file: "/papers/tesla.pptx", file2: null,
  },
  {
    title: "SDG 7: Affordable and Clean Energy",
    year: "2020", year2: null, grade: "Grade 10", level: "Middle School",
    file: "/papers/ewg-energy.docx", file2: null,
  },
  {
    title: "Elon Musk: Innovative Entrepreneurship & Strategic Vision",
    year: "2019", year2: null, grade: "Grade 9", level: "Middle School",
    file: "/papers/elon-musk.pdf", file2: "/papers/elon-musk.pptx",
  },
];

function primaryLabel(filePath: string, hasPair: boolean): string {
  if (hasPair) return "Text ↓";
  if (filePath.endsWith(".pptx")) return "Presentation ↓";
  if (filePath.endsWith(".docx")) return "Text ↓";
  return "Download ↓";
}

export default function WritingPage() {
  return (
    <div className="container section">
      <p className="label" style={{ marginBottom: "0.75rem" }}>Writing</p>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "3.5rem",
      }}>
        <h1 style={{ margin: 0 }}>
          Essays &amp; <em style={{ color: "var(--accent)" }}>Analysis</em>
        </h1>
        <a
          href="https://marcvg1.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Substack →
        </a>
      </div>

      {/* Substack Posts */}
      <div id="substack" style={{ scrollMarginTop: "6rem" }}>
      <p className="label" style={{ marginBottom: "0.75rem" }}>Essays</p>
      <h2 style={{ margin: "0 0 1.5rem", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}>
        Substack — Essays &amp;{" "}
        <em style={{ color: "var(--accent)" }}>Geopolitics</em>
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem" }}>
        {substackPosts.map((post) => (
          <li
            key={post.title}
            style={{
              borderTop: "1px solid var(--border)",
              padding: "2rem 0",
            }}
          >
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "0.5rem",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.2rem",
                    transition: "color 0.2s",
                  }}
                >
                  {post.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  Substack ↗
                </span>
              </div>
              <p style={{ margin: 0, maxWidth: "60ch", fontSize: "0.9rem" }}>{post.description}</p>
            </a>
          </li>
        ))}
        <li style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 0" }}>
          <a
            href="https://marcvg1.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Read all on Substack →
          </a>
        </li>
      </ul>
      </div>

      {/* SICO Section */}
      <div id="sico" style={{ marginBottom: "4rem", scrollMarginTop: "6rem" }}>
        <p className="label" style={{ marginBottom: "0.75rem" }}>Investment Club</p>
        <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}>
          SICO — Investment Research &amp;{" "}
          <em style={{ color: "var(--accent)" }}>Leadership</em>
        </h2>
        <p style={{ margin: "0 0 2rem", maxWidth: "58ch", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Founder &amp; Lead of the first cross-faculty investment initiative at Hochschule Offenburg.
          Focusing on macroeconomic frameworks and equity research.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            {
              title: "SICO: Oil Equity Research & Macro Strategy",
              desc: "Foundational framework for the Student Investment-Club Offenburg. Bridging the gap between academic theory and real-world capital markets.",
              year: "2026",
              slides: "/docs/Einstieg_Tag_1_SICO.pdf",
              pdf: null as string | null,
            },
          ].map((paper) => (
            <div
              key={paper.title}
              style={{
                padding: "1.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                background: "rgba(26,20,16,0.015)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                {["SICO", "Equity Research"].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "rgba(200,96,42,0.08)",
                    border: "1px solid rgba(200,96,42,0.2)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--fg)", lineHeight: 1.4 }}>
                  {paper.title}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--muted)", border: "1px solid var(--border)", padding: "0.15rem 0.5rem", borderRadius: "1rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {paper.year}
                </span>
              </div>
              {paper.desc && (
                <p style={{ margin: "0.75rem 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6, maxWidth: "52ch" }}>
                  {paper.desc}
                </p>
              )}
              <div style={{ display: "flex", gap: "1rem", marginTop: "auto", paddingTop: "1.25rem", flexWrap: "wrap" }}>
                {paper.slides && (
                  <a
                    href={paper.slides}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--bg)",
                      background: "var(--accent)",
                      padding: "0.4rem 1rem",
                      borderRadius: "2rem",
                    }}
                  >
                    View Presentation (PDF) ↓
                  </a>
                )}
                {paper.pdf && (
                  <a
                    href={paper.pdf}
                    download
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      border: "1px solid var(--border)",
                      padding: "0.4rem 1rem",
                      borderRadius: "2rem",
                    }}
                  >
                    Download PDF ↓
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Papers */}
      <div id="ev-research" style={{ scrollMarginTop: "6rem" }}>
      <p className="label" style={{ marginBottom: "0.75rem" }}>Research &amp; Papers</p>
      <h2 style={{ margin: "0 0 1.5rem", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}>
        Featured Research — Papers &amp;{" "}
        <em style={{ color: "var(--accent)" }}>Analysis</em>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {featuredPapers.map((paper) => (
          <div
            key={paper.title}
            style={{
              padding: "1.75rem",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              background: "rgba(26,20,16,0.015)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* School badge + level + grade */}
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {[
                "School Project",
                paper.level,
                paper.grade,
              ].filter(Boolean).map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  background: "rgba(26,20,16,0.05)",
                  border: "1px solid var(--border)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "var(--fg)",
                  lineHeight: 1.4,
                }}
              >
                {paper.title}
              </span>
              <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                {[paper.year, paper.year2].filter(Boolean).map((y) => (
                  <span
                    key={y}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "1rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {y}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "auto", paddingTop: "1rem", flexWrap: "wrap" }}>
              {paper.file && (
                <a
                  href={paper.file}
                  download
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  {primaryLabel(paper.file, !!paper.file2)}
                </a>
              )}
              {paper.file2 && (
                <a
                  href={paper.file2}
                  download
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Presentation ↓
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <ArchiveToggle papers={archivedPapers} />
      </div>
    </div>
  );
}
