"use client";
import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

const defaultServices = [
{
  id: "ds1",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1824f7dc7-1772225490702.png",
  alt: "Chambre élégante avec lit king size blanc, vue sur l'océan, décoration marocaine raffinée, lumière naturelle chaude",
  nameFr: "Hébergement",
  nameEn: "Accommodation",
  nameAr: "الإقامة",
  descFr: "Des chambres et suites décorées avec soin, alliant confort moderne et authenticité marocaine. Chaque espace est pensé pour votre repos et votre bien-être.",
  features: ["Vue sur l\'Atlantique", "Décoration marocaine authentique", "Linge de maison de qualité", "Climatisation"]
},
{
  id: "ds2",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0f882bf-1771504620941.png",
  alt: "Table gastronomique marocaine, tajine fumant, plats colorés, décoration chaleureuse et lumineuse, ambiance conviviale",
  nameFr: "Restauration",
  nameEn: "Dining",
  nameAr: "المطعم",
  descFr: "Une cuisine marocaine traditionnelle préparée avec des produits locaux frais. Savourez les saveurs authentiques de la région côtière d\'El-Jadida.",
  features: ["Cuisine marocaine traditionnelle", "Produits locaux et frais", "Petit-déjeuner inclus", "Repas sur demande"]
},
{
  id: "ds3",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a3c7c18f-1786212757111.png",
  alt: "Plage côtière lumineuse d'El-Jadida, sable doré, vagues douces, ciel bleu clair, atmosphère paisible",
  nameFr: "Activités & Excursions",
  nameEn: "Activities & Excursions",
  nameAr: "الأنشطة والرحلات",
  descFr: "Découvrez la région avec nos excursions guidées : cité portugaise, plages, activités nautiques et découverte culturelle de la région.",
  features: ["Visites guidées", "Activités nautiques", "Excursions culturelles", "Transport sur demande"]
},
{
  id: "ds4",
  image: "https://images.unsplash.com/photo-1652492892167-dc3eccf1eb7e",
  alt: "Salle de réception élégante décorée pour un événement, tables rondes drapées de blanc, lumières chaudes, ambiance festive",
  nameFr: "Événements Privés",
  nameEn: "Private Events",
  nameAr: "الفعاليات الخاصة",
  descFr: "Organisez vos événements dans un cadre exceptionnel face à l'Atlantique. Mariages, célébrations familiales, séminaires d'entreprise.",
  features: ["Cadre exclusif", "Service traiteur", "Décoration personnalisée", "Capacité modulable"]
}];


export default function ServicesPageContent() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const [activeFilter, setActiveFilter] = useState("all");

  const activeServices = config?.services?.filter((s) => s?.active);
  const displayServices = activeServices?.length > 0 ? activeServices : null;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-bg">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_4fbbff23c-1791200400314.png"
            alt="Salle à manger luxueuse d'ATLANTIS LIO, décoration marocaine raffinée, lumière sombre et dorée, ombres dramatiques"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
          
          <div className="page-hero-scrim" />
        </div>
        <div className="page-hero-content">
          <span className="section-eyebrow text-accent">{t?.services?.title}</span>
          <h1 className="page-hero-title text-white">{t?.services?.subtitle}</h1>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          {displayServices ?
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayServices?.map((service) =>
            <div key={service?.id} className="service-full-card group">
                  <div className="service-full-card-image">
                    <AppImage
                  src={service?.image}
                  alt={service?.name?.fr}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
                    <div className="service-full-card-overlay" />
                  </div>
                  <div className="service-full-card-body">
                    <h2 className="service-full-card-title">{service?.name?.[isRTL ? "ar" : "fr"]}</h2>
                    <p className="service-full-card-desc">{service?.description?.[isRTL ? "ar" : "fr"]}</p>
                    {service?.features?.[isRTL ? "ar" : "fr"]?.length > 0 &&
                <ul className="service-features-list">
                        {service?.features?.[isRTL ? "ar" : "fr"]?.map((f, i) =>
                  <li key={i} className="service-feature-item">
                            <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                            <span className="text-sm text-foreground">{f}</span>
                          </li>
                  )}
                      </ul>
                }
                    {service?.price &&
                <p className="service-price">{service?.price}</p>
                }
                    <Link href="/quote-request" className="btn-primary mt-4 inline-flex items-center gap-2">
                      {t?.services?.quoteRequest}
                      <Icon name="ArrowRightIcon" size={14} />
                    </Link>
                  </div>
                </div>
            )}
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {defaultServices?.map((service) =>
            <div key={service?.id} className="service-full-card group">
                  <div className="service-full-card-image">
                    <AppImage
                  src={service?.image}
                  alt={service?.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
                    <div className="service-full-card-overlay" />
                  </div>
                  <div className="service-full-card-body">
                    <h2 className="service-full-card-title">{service?.nameFr}</h2>
                    <p className="service-full-card-desc">{service?.descFr}</p>
                    <ul className="service-features-list">
                      {service?.features?.map((f, i) =>
                  <li key={i} className="service-feature-item">
                          <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                          <span className="text-sm text-foreground">{f}</span>
                        </li>
                  )}
                    </ul>
                    <Link href="/quote-request" className="btn-primary mt-4 inline-flex items-center gap-2">
                      {t?.services?.quoteRequest}
                      <Icon name="ArrowRightIcon" size={14} />
                    </Link>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container text-center">
          <h2 className="section-title text-white mb-4">{t?.services?.quoteRequest}</h2>
          <p className="section-body text-white/70 mb-8 max-w-lg mx-auto">
            Décrivez vos besoins, nous vous proposerons une offre personnalisée.
          </p>
          <Link href="/quote-request" className="btn-accent-lg">
            {t?.nav?.quote}
          </Link>
        </div>
      </section>
    </>);

}