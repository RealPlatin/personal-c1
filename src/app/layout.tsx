import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc von Gehlen | Business Informatics",
  description: "Bridging the gap between systems and capital. M&A innovation, enterprise IT, and applied AI.",
  keywords: ["Marc von Gehlen", "Business Informatics Offenburg", "SICO Offenburg Founder", "M&A AI Sourcing", "SICK AG IT Consultant", "Oil Drones Geopolitical Risk", "Grünheide Tesla Gigafactory", "The Bureaucratic Monster Germany", "The Missed Revolution AI", "Deindustrialization Germany", "The German Findings Analysis", "Industrial Decline Germany", "Economic Triad", "Marc von Gehlen Analysis"],
  metadataBase: new URL("https://marcvongehlen.com"),
  openGraph: {
    title: "Marc von Gehlen | Business Informatics",
    description: "Bridging the gap between systems and capital. M&A innovation, enterprise IT, and applied AI.",
    url: "https://marcvongehlen.com",
    siteName: "Marc von Gehlen",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Marc von Gehlen | Business Informatics",
    description: "Bridging the gap between systems and capital. M&A innovation, enterprise IT, and applied AI.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marc von Gehlen",
  "url": "https://marcvongehlen.com",
  "jobTitle": "Student of Business Informatics & M&A Analyst",
  "knowsAbout": ["Business Informatics", "M&A Automation", "AI-driven Finance", "IT Infrastructure", "Investment Research"],
  "description": "Bridging the gap between systems and capital. M&A innovation, enterprise IT, and applied AI.",
  "sameAs": [
    "https://github.com/RealPlatin",
    "https://marcvg1.substack.com"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Nav />
        <main style={{ paddingTop: "4.5rem", flex: 1, width: "100%", overflowX: "hidden" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
