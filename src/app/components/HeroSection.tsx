"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";
import { BOOKING_URL } from "@/lib/config";


export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const tagline = config?.company?.tagline?.[isRTL ? "ar" : "fr"];

  return (
    <section className="hero-section" dir={isRTL ? "rtl" : "ltr"}>
      {/* Carousel background */}
      <div className="hero-carousel">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/hero.mp4"
          poster="/assets/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true" />
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

      {/* Scroll cue */}
      <div className="hero-scroll-cue">
        <Icon name="ChevronDownIcon" size={20} className="text-white/60 animate-bounce" />
      </div>
    </section>);

}