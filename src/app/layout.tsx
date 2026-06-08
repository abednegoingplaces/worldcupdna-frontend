import type { Metadata } from "next";
import { Anton, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-anton" 
});

const hanken = Hanken_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-hanken",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "WorldCupDNA — Discover Your Football Identity",
  description: "Build your fan profile, predict match scores, climb the leaderboard, and find watch parties for FIFA World Cup 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${hanken.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body style={{fontFamily:'Hanken Grotesk, sans-serif'}}>{children}</body>
    </html>
  );
}