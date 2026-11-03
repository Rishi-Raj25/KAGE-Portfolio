import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kage — Where stillness reveals the unseen",
  description: "A five-chapter night walk through a Kyoto mountain temple.",
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
