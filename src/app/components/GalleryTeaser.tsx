"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

export default function GalleryTeaser() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const images = config.gallery.slice(0, 6);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % images.length);
    if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    if (e.key === "Escape") setLightboxIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="gallery-teaser opacity-100"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">{t.gallery.title}</span>
            <h2 className="section-title">{t.gallery.subtitle}</h2>
          </div>
          <Link href="/galerie" className="btn-outline-sm hidden md:flex items-center gap-2">
            {t.gallery.viewAll}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Gallery grid */}
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`gallery-item opacity-100 ${visible ? "card-visible" : ""} ${idx === 0 ? "gallery-item-large" : ""}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setLightboxIndex(idx); }}
              aria-label={`View ${img.alt}`}
            >
              <AppImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="gallery-item-overlay">
                <Icon name="MagnifyingGlassPlusIcon" size={24} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Link href="/galerie" className="btn-outline-sm flex items-center gap-2">
            {t.gallery.viewAll}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label={t.common.close}
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
            <button
              className="lightbox-prev"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
              aria-label={t.common.prev}
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <div className="lightbox-image-wrap">
              <AppImage
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <button
              className="lightbox-next"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
              aria-label={t.common.next}
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}