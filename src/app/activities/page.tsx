import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ActivitiesPageContent from "@/app/activities/components/ActivitiesPageContent";

export const metadata = {
  title: "Activités — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description: "Découvrez les activités proposées par ATLANTIS LIO : activités côtières, découverte culturelle, excursions autour d'El-Jadida, Maroc.",
};

export default function ActivitiesPage() {
  return (
    <main>
      <Header />
      <ActivitiesPageContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}