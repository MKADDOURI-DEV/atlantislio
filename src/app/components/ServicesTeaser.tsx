"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

const placeholderServices = [
{
  id: "ps1",
  icon: "HomeModernIcon" as const,
  nameFr: "Hébergement",
  descFr: "Des chambres et suites confortables avec vue sur l'Atlantique, décorées dans un style marocain authentique."
},
{
  id: "ps2",
  icon: "SparklesIcon" as const,
  nameFr: "Restauration",
  descFr: "Savourez une cuisine marocaine traditionnelle préparée avec des produits locaux frais."
},
{
  id: "ps3",
  icon: "SunIcon" as const,
  nameFr: "Espaces Détente",
  descFr: "Profitez de nos espaces de relaxation face à l\'Atlantique pour une expérience apaisante."
},
{
  id: "ps4",
  icon: "UsersIcon" as const,
  nameFr: "Événements Privés",
  descFr: "Organisez vos événements dans un cadre exceptionnel avec un service personnalisé."
}];


export default function ServicesTeaser() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeServices = config.services.filter((s) => s.active).slice(0, 4);
  const displayItems = activeServices.length > 0 ? activeServices : null;

  return (
    <section
      ref={sectionRef}
      className="services-teaser opacity-100"
      dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="section-container">
        <div className="services-layout">
          {/* Left: image */}
          <div className="services-image-col">
            <AppImage
              src="https://images.unsplash.com/photo-1606401257542-8866cc0ac198"
              alt="Chambre élégante d'ATLANTIS LIO avec vue sur l'océan, lit blanc immaculé, lumière naturelle douce et chaleureuse"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 45vw" />
            
            <div className="services-image-overlay" />
            <div className="services-image-badge">
              <span className="text-accent font-display text-2xl font-light">El-Jadida</span>
              <span className="text-white/70 text-sm">Route Côtière Sidi Bouzid</span>
            </div>
          </div>

          {/* Right: services list */}
          <div className="services-list-col">
            <span className="section-eyebrow">{t.services.title}</span>
            <h2 className="section-title">{t.services.subtitle}</h2>

            <div className="services-list">
              {displayItems ?
              displayItems.map((service, idx) =>
              <div
                key={service.id}
                className={`service-item opacity-100 ${visible ? "card-visible" : ""}`}
                style={{ transitionDelay: `${idx * 80}ms` }}>
                
                    <div className="service-item-icon">
                      <Icon name="SparklesIcon" size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="service-item-title">{service.name[isRTL ? "ar" : "fr"]}</h3>
                      <p className="service-item-desc">{service.description[isRTL ? "ar" : "fr"]}</p>
                    </div>
                  </div>
              ) :

              placeholderServices.map((item, idx) =>
              <div
                key={item.id}
                className={`service-item opacity-100 ${visible ? "card-visible" : ""}`}
                style={{ transitionDelay: `${idx * 80}ms` }}>
                
                    <div className="service-item-icon">
                      <Icon name={item.icon} size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="service-item-title">{item.nameFr}</h3>
                      <p className="service-item-desc">{item.descFr}</p>
                    </div>
                  </div>
              )
              }
            </div>

            <div className="flex gap-3 mt-6">
              <Link href="/services" className="btn-primary flex items-center gap-2">
                {t.services.viewAll}
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
              <Link href="/quote-request" className="btn-outline flex items-center gap-2">
                {t.services.quoteRequest}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}