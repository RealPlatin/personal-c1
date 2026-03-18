import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Marc von Gehlen`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `https://marcvongehlen.com/writing/${slug}`,
      type: "article" as const,
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 style={{ marginTop: "2.5rem", marginBottom: "1rem" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ marginTop: "2.5rem", marginBottom: "0.75rem" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.25rem", maxWidth: "65ch" }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: "var(--accent)", textDecoration: "underline" }} {...props} />
  ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="container section">
      <Link
        href="/writing"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          display: "inline-block",
          marginBottom: "3rem",
        }}
      >
        ← Back
      </Link>

      <p className="label" style={{ marginBottom: "0.75rem" }}>{post.meta.date}</p>
      <h1 style={{ marginBottom: "1rem", maxWidth: "20ch" }}>{post.meta.title}</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "3.5rem", maxWidth: "55ch" }}>
        {post.meta.description}
      </p>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "3rem" }} />

      <article>
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </div>
  );
}
