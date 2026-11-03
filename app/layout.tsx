import type { Metadata } from "next";
import "@designcodeio/threeui/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAGE — Rishi's Portfolio",
  description: "A portfolio shaped by stillness, motion, and the unseen.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
