import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Can Robots Replace Humans? — KAGE / Futures",
  description: "A cinematic 10-minute exploration of robotics, human potential and the AI advantage.",
};

export default function RobotsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
