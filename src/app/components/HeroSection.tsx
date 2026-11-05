"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";
import { BOOKING_URL } from "@/lib/config";

const heroImages = [
{
  src: "/assets/images/rooms/single-4.jpg",
  alt: "Balcon avec vue sur l'océan Atlantique à ATLANTIS LIO"
},
{
  src: "/assets/images/rooms/double-3.jpg",
  alt: "Petit-déjeuner sur le balcon face à l'océan"
},
{
  src: "/assets/images/rooms/single-1.jpg",
  alt: "Chambre avec baie vitrée donnant sur la mer"
}];


export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tagline = config?.company?.tagline?.[isRTL ? "ar" : "fr"];

  return (
    <section className="hero-section" dir={isRTL ? "rtl" : "ltr"}>
      {/* Carousel background */}
      <div className="hero-carousel">
        {heroImages?.map((img, idx) =>
        <div
          key={idx}
          className={`hero-slide ${idx === currentSlide ? "hero-slide-active" : ""}`}>
          
            <AppImage
            src={img?.src}
            alt={img?.alt}
            fill
            priority={idx === 0}
            className="hero-slide-img"
            sizes="100vw" />
          
          </div>
        )}
        {/* Dark overlay scrim */}
        <div className="hero-scrim" />
        {/* Bottom gradient */}
        <div className="hero-gradient-bottom" />
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <div className={`hero-text-block ${revealed ? "hero-revealed" : ""}`}>
          {/* Status badge */}
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            El-Jadida, Maroc
          </span>

          {/* Main title */}
          <h1 className="hero-title">
            <span className="hero-title-main">ATLANTIS</span>
            <span className="hero-title-accent">LIO</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">{tagline}</p>

          {/* CTA buttons */}
          <div className="hero-ctas">
            <Link href="/about" className="btn-primary-hero">
              {t?.hero?.discover}
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
            <Link href="/contact" className="btn-outline-hero">
              {t?.hero?.contact}
            </Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-accent-hero">
              {t?.hero?.reserve}
            </a>
          </div>
        </div>

        {/* Side stats panel */}
        <div className="hero-stats">
          <div className="hero-stat-card">
            <Icon name="CalendarDaysIcon" size={20} className="text-accent mb-2" />
            <span className="hero-stat-label">Fondée en</span>
            <span className="hero-stat-value">2021</span>
          </div>
          <div className="hero-stat-card">
            <Icon name="MapPinIcon" size={20} className="text-accent mb-2" />
            <span className="hero-stat-label">Localisation</span>
            <span className="hero-stat-value">El-Jadida</span>
          </div>
          <div className="hero-stat-card">
            <Icon name="HomeModernIcon" size={20} className="text-accent mb-2" />
            <span className="hero-stat-label">Type</span>
            <span className="hero-stat-value">Riad</span>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero-indicators">
        {heroImages?.map((_, idx) =>
        <button
          key={idx}
          onClick={() => setCurrentSlide(idx)}
          className={`hero-indicator ${idx === currentSlide ? "hero-indicator-active" : ""}`}
          aria-label={`Slide ${idx + 1}`} />

        )}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue">
        <Icon name="ChevronDownIcon" size={20} className="text-white/60 animate-bounce" />
      </div>
    </section>);

}