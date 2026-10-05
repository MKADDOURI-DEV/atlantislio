"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactCTA() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="contact-cta-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="section-container">
        <div className="contact-cta-inner">
          <div className="contact-cta-text">
            <h2 className="section-title text-white">{t?.contact?.title}</h2>
            <p className="section-body text-white/70 max-w-lg">{t?.contact?.subtitle}</p>
          </div>
          <div className="contact-cta-actions">
            <Link href="/contact" className="btn-accent-lg flex items-center gap-2">
              <Icon name="EnvelopeIcon" size={18} />
              {t?.contact?.title}
            </Link>
            <Link href="/quote-request" className="btn-outline-white flex items-center gap-2">
              <Icon name="DocumentTextIcon" size={18} />
              {t?.nav?.quote}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}