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
import BookingBar from "@/components/BookingBar";
import ContactCTA from "@/app/components/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <section className="relative z-10 -mt-8 pb-8 bg-background">
        <div className="section-container">
          <BookingBar />
        </div>
      </section>
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