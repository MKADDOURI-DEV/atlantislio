import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ContactPageContent from "@/app/contact/components/ContactPageContent";

export const metadata = {
  title: "Contact — ATLANTIS LIO, Maison d'Hôtes El-Jadida",
  description: "Contactez ATLANTIS LIO, maison d'hôtes à El-Jadida. Adresse: Route Côtière Sidi Bouzid, Moulay Abdellah, El-Jadida, Maroc.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactPageContent />
      <Footer />
      <FloatingButtons />
    </main>
  );
}