import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import RoomsPageContent from "@/app/chambres/components/RoomsPageContent";

export const metadata = {
  title: "Chambres — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description:
    "Chambres Single et Double face à l'océan Atlantique à ATLANTIS LIO, maison d'hôtes à Moulay Abdellah, El-Jadida. Réservez en ligne.",
};

export default function ChambresPage() {
  return (
    <main>
      <Header />
      <RoomsPageContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
