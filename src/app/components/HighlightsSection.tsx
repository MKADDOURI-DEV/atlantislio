"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";

const highlights = [
  {
    key: "location",
    icon: "MapPinIcon" as const,
    titleKey: "location" as const,
    descKey: "locationDesc" as const,
    colSpan: "col-span-2 md:col-span-1",
  },
  {
    key: "comfort",
    icon: "HomeModernIcon" as const,
    titleKey: "comfort" as const,
    descKey: "comfortDesc" as const,
    colSpan: "col-span-2 md:col-span-1",
  },
  {
    key: "authenticity",
    icon: "SparklesIcon" as const,
    titleKey: "authenticity" as const,
    descKey: "authenticityDesc" as const,
    colSpan: "col-span-2 md:col-span-1",
  },
  {
    key: "service",
    icon: "HeartIcon" as const,
    titleKey: "service" as const,
    descKey: "serviceDesc" as const,
    colSpan: "col-span-2 md:col-span-1",
  },
];

export default function HighlightsSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="highlights-section opacity-100"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title text-white">{t.highlights.title}</h2>
        </div>

        {/* BENTO GRID AUDIT:
            Array has 4 cards: [Location, Comfort, Authenticity, Service]
            Row 1: [col-1: Location cs-1] [col-2: Comfort cs-1] [col-3: Authenticity cs-1] [col-4: Service cs-1]
            Placed 4/4 cards ✓ */}
        <div className="highlights-grid">
          {highlights.map((item, idx) => (
            <div
              key={item.key}
              className={`highlight-card ${visible ? "highlight-visible" : ""}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="highlight-icon-wrap">
                <Icon name={item.icon} size={24} className="text-accent" />
              </div>
              <h3 className="highlight-title">
                {t.highlights[item.titleKey]}
              </h3>
              <p className="highlight-desc">
                {t.highlights[item.descKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}