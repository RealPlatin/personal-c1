import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc von Gehlen",
  description: "Personal website — writing, projects, and thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main style={{ paddingTop: "4.5rem" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
