"use client";
import React from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

export default function AboutPageContent() {
  const { t, lang, isRTL } = useLanguage();
  const config = getSiteConfig();
  const description = config.company.description[lang as "fr" | "en" | "ar"];

  const facts = [
  { icon: "CalendarDaysIcon" as const, label: "Création", value: "20 avril 2021" },
  { icon: "MapPinIcon" as const, label: "Adresse", value: "Route Côtière Sidi Bouzid, El-Jadida" },
  { icon: "UserIcon" as const, label: "Dirigeant", value: "Mr SOUBARI Abdelmajid" },
  { icon: "BuildingOfficeIcon" as const, label: "Forme juridique", value: "SARL AU" },
  { icon: "BanknotesIcon" as const, label: "Capital social", value: "100 000 MAD" },
  { icon: "HomeModernIcon" as const, label: "Activité", value: "Maison d\'hôtes / Riad" }];


  const values = [
  { icon: "HeartIcon" as const, title: "Authenticité", desc: "Une expérience marocaine authentique, préservant les traditions et le patrimoine culturel de la région." },
  { icon: "StarIcon" as const, title: "Excellence", desc: "Un service de qualité supérieure, attentif à chaque détail pour garantir votre satisfaction totale." },
  { icon: "HomeModernIcon" as const, title: "Hospitalité", desc: "L'hospitalité marocaine dans toute sa splendeur, chaleureuse et sincère." },
  { icon: "GlobeAltIcon" as const, title: "Durabilité", desc: "Un engagement pour un tourisme responsable et respectueux de l\'environnement côtier." }];


  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-bg">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_448a4244a-1791200400920.png"
            alt="Intérieur luxueux d'ATLANTIS LIO, salon marocain traditionnel, lumière tamisée sombre et dorée, ombres profondes"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
          
          <div className="page-hero-scrim" />
        </div>
        <div className="page-hero-content">
          <span className="section-eyebrow text-accent">{t.about.title}</span>
          <h1 className="page-hero-title text-white">{t.about.subtitle}</h1>
        </div>
      </div>

      {/* Story section */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="about-grid">
            <div className="about-image-col">
              <div className="about-image-wrap">
                <AppImage
                  src="https://images.unsplash.com/photo-1662640164822-53b28aa216d1"
                  alt="Piscine extérieure d'ATLANTIS LIO au bord de l'Atlantique, lumière naturelle douce, eau scintillante bleue"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
              </div>
            </div>
            <div className="about-text-col">
              <h2 className="section-title">Notre Histoire</h2>
              <p className="section-body">{description}</p>
              <div className="about-facts mt-6">
                {facts.slice(0, 3).map((fact) =>
                <div key={fact.label} className="about-fact">
                    <Icon name={fact.icon} size={18} className="text-accent" />
                    <span className="text-sm text-foreground">
                      <strong>{fact.label} : </strong>{fact.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="py-16 bg-muted" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <h2 className="section-title text-center mb-12">Informations Clés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.map((fact) =>
            <div key={fact.label} className="fact-card">
                <div className="fact-card-icon">
                  <Icon name={fact.icon} size={22} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{fact.label}</p>
                  <p className="text-base font-semibold text-foreground">{fact.value}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) =>
            <div key={val.title} className="value-card">
                <div className="value-icon">
                  <Icon name={val.icon} size={24} className="text-accent" />
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container text-center">
          <h2 className="section-title text-white mb-4">Venez Nous Rendre Visite</h2>
          <p className="section-body text-white/70 mb-8 max-w-lg mx-auto">
            Découvrez ATLANTIS LIO en personne. Contactez-nous pour planifier votre séjour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-accent-lg">
              {t.contact.title}
            </Link>
            <Link href="/quote-request" className="btn-outline-white">
              {t.nav.quote}
            </Link>
          </div>
        </div>
      </section>
    </>);

}