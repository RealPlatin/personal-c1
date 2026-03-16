import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc von Gehlen | Business Informatics",
  description: "Bridging the gap between systems and capital. M&A innovation, enterprise IT, and applied AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Nav />
        <main style={{ paddingTop: "4.5rem", flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
