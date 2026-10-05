import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import AboutPageContent from "@/app/about/components/AboutPageContent";

export const metadata = {
  title: "À propos — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description: "Découvrez l'histoire d'ATLANTIS LIO (Castella), maison d'hôtes fondée en 2021 à El-Jadida par M. SOUBARI Abdelmajid. Notre vision, nos valeurs, notre engagement.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutPageContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}