import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WorldCupDNA — Discover Your Football Identity",
  description: "Build your fan profile, predict match scores, climb the leaderboard, and find watch parties for FIFA World Cup 2026.",
  openGraph: {
    title: "WorldCupDNA",
    description: "Your Football DNA for FIFA World Cup 2026",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}