import Hero from "@/components/Hero";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Recent Writing */}
      {recentPosts.length > 0 && (
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "2.5rem",
              }}
            >
              <p className="label">Recent Writing</p>
              <Link
                href="/writing"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                All posts →
              </Link>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {recentPosts.map((post) => (
                <li
                  key={post.slug}
                  style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 0" }}
                >
                  <Link href={`/writing/${post.slug}`}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--fg)",
                        }}
                      >
                        {post.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                          flexShrink: 0,
                        }}
                      >
                        {post.date}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
