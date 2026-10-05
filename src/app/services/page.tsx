import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ServicesPageContent from "@/app/services/components/ServicesPageContent";

export const metadata = {
  title: "Services — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description: "Découvrez les services d'ATLANTIS LIO : hébergement, restauration, activités et événements privés dans notre maison d'hôtes à El-Jadida, Maroc.",
};

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServicesPageContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}