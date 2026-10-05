"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

export default function AboutTeaser() {
  const { t, lang, isRTL } = useLanguage();
  const config = getSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const description = config.company.description[lang as "fr" | "en" | "ar"];

  return (
    <section
      ref={sectionRef}
      className={`about-teaser opacity-100 ${visible ? "about-visible" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="section-container">
        <div className="about-grid">
          {/* Image side */}
          <div className="about-image-col">
            <div className="about-image-wrap">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_171f81f90-1783587013511.png"
                alt="Salon marocain traditionnel d'ATLANTIS LIO, décoration authentique, lumière tamisée dorée"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw" />
              
              {/* Floating card */}
              <div className="about-float-card">
                <Icon name="StarIcon" size={20} className="text-accent" variant="solid" />
                <div>
                  <p className="text-sm font-semibold text-primary">SARL AU</p>
                  <p className="text-xs text-muted-foreground">Capital: 100 000 MAD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-text-col">
            <span className="section-eyebrow">{t.about.title}</span>
            <h2 className="section-title">{t.about.subtitle}</h2>
            <p className="section-body">{description}</p>

            <div className="about-facts">
              <div className="about-fact">
                <Icon name="CalendarDaysIcon" size={18} className="text-accent" />
                <span className="text-sm text-foreground">{t.about.founded} <strong>2021</strong></span>
              </div>
              <div className="about-fact">
                <Icon name="MapPinIcon" size={18} className="text-accent" />
                <span className="text-sm text-foreground">El-Jadida, Maroc</span>
              </div>
              <div className="about-fact">
                <Icon name="UserIcon" size={18} className="text-accent" />
                <span className="text-sm text-foreground">Mr SOUBARI Abdelmajid</span>
              </div>
            </div>

            <Link href="/about" className="btn-primary mt-6 inline-flex items-center gap-2">
              {t.common.learnMore}
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>);

}