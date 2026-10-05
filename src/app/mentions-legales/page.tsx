import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import MentionsLegalesContent from "@/app/mentions-legales/components/MentionsLegalesContent";

export const metadata = {
  title: "Mentions Légales — ATLANTIS LIO",
  description: "Mentions légales d'ATLANTIS LIO (Castella), SARL AU, capital 100 000 MAD, dirigée par Mr SOUBARI Abdelmajid, El-Jadida, Maroc.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <Header />
      <MentionsLegalesContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}