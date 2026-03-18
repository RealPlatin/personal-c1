import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Marc von Gehlen",
  description: "Business Informatics student, former IT consultant at SICK AG, and M&A intern at De Bruyn Capital. Bridging systems and capital.",
  openGraph: {
    title: "About | Marc von Gehlen",
    description: "Business Informatics student, former IT consultant at SICK AG, and M&A intern at De Bruyn Capital. Bridging systems and capital.",
    url: "https://marcvongehlen.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
