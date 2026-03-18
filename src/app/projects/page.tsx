import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Marc von Gehlen",
  description: "Autonomous M&A sourcing engines, B2B tools, and design automation — projects I've built at the intersection of AI and business.",
  openGraph: {
    title: "Projects | Marc von Gehlen",
    description: "Autonomous M&A sourcing engines, B2B tools, and design automation — projects I've built at the intersection of AI and business.",
    url: "https://marcvongehlen.com/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
