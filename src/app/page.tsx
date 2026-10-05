import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import HeroSection from "@/app/components/HeroSection";
import AboutTeaser from "@/app/components/AboutTeaser";
import HighlightsSection from "@/app/components/HighlightsSection";
import ActivitiesTeaser from "@/app/components/ActivitiesTeaser";
import ServicesTeaser from "@/app/components/ServicesTeaser";
import GalleryTeaser from "@/app/components/GalleryTeaser";
import ContactCTA from "@/app/components/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutTeaser />
      <HighlightsSection />
      <ActivitiesTeaser />
      <ServicesTeaser />
      <GalleryTeaser />
      <ContactCTA />
      <Footer />
      <FloatingButtons />
    </main>
  );
}