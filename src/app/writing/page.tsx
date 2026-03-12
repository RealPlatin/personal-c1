import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="container section">
      <p className="label" style={{ marginBottom: "0.75rem" }}>Writing</p>
      <h1 style={{ marginBottom: "3.5rem" }}>
        Notes &amp; <em style={{ color: "var(--accent)" }}>essays</em>
      </h1>

      {posts.length === 0 ? (
        <p>No posts yet — come back soon.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li
              key={post.slug}
              style={{
                borderTop: "1px solid var(--border)",
                padding: "2rem 0",
              }}
            >
              <Link href={`/writing/${post.slug}`} style={{ display: "block" }}>
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
                      fontSize: "1.25rem",
                      transition: "color 0.2s",
                    }}
                  >
                    {post.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <p style={{ margin: 0, maxWidth: "60ch" }}>{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
