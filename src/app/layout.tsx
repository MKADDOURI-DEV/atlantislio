import React from "react";
import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "../styles/tailwind.css";
import { LanguageProvider } from "@/context/LanguageContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "ATLANTIS LIO — Maison d'Hôtes à El-Jadida, Maroc",
  description: "Maison d'hôtes de charme à El-Jadida sur la Route Côtière de Sidi Bouzid. Hospitalité marocaine authentique face à l'Atlantique depuis 2021.",
  keywords: "maison hotes El-Jadida, riad El-Jadida, guesthouse Maroc, Sidi Bouzid, hébergement côtier Maroc",
  openGraph: {
    title: "ATLANTIS LIO — Maison d'Hôtes à El-Jadida",
    description: "Maison d'hôtes de charme à El-Jadida, Maroc. Hospitalité authentique face à l'Atlantique.",
    images: [{ url: "/assets/images/app_logo.png" }],
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className={dmSans.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fatlantisli4435back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.21" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></body>
    </html>
  );
}