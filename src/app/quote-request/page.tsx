import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import QuoteRequestContent from "@/app/quote-request/components/QuoteRequestContent";

export const metadata = {
  title: "Demande de Devis — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description: "Demandez un devis personnalisé pour votre séjour à ATLANTIS LIO, maison d'hôtes à El-Jadida, Maroc. Réponse rapide garantie.",
};

export default function QuoteRequestPage() {
  return (
    <main>
      <Header />
      <QuoteRequestContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}