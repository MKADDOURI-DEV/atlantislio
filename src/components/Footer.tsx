"use client";
import React from "react";
import Link from "next/link";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const year = new Date().getFullYear();

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "activities", href: "/activities" },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
    { key: "quote", href: "/quote-request" },
  ];

  const whatsappMsg = encodeURIComponent(
    "Bonjour, je souhaite obtenir plus d'informations concernant ATLANTIS LIO."
  );

  return (
    <footer className="footer-root" dir={isRTL ? "rtl" : "ltr"}>
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="flex items-center gap-2 mb-3">
            <AppLogo size={36} />
            <span className="font-display text-lg font-semibold text-primary">ATLANTIS LIO</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {config.company.tagline[isRTL ? "ar" : "fr"]}
          </p>
          {/* Social */}
          <div className="flex gap-3">
            {config.company.socialLinks.facebook && (
              <a href={config.company.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <Icon name="GlobeAltIcon" size={18} />
              </a>
            )}
            {config.company.socialLinks.instagram && (
              <a href={config.company.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <Icon name="CameraIcon" size={18} />
              </a>
            )}
            {config.company.whatsapp && (
              <a href={`https://wa.me/${config.company.whatsapp}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <Icon name="ChatBubbleLeftRightIcon" size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="footer-heading">{t.footer.quickLinks}</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="footer-link">
                  {t.nav[link.key as keyof typeof t.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer-heading">{t.contact.title}</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex gap-2 items-start">
              <Icon name="MapPinIcon" size={16} className="flex-shrink-0 mt-0.5 text-accent" />
              {config.company.address}
            </p>
            {config.company.phone && (
              <p className="flex gap-2 items-center">
                <Icon name="PhoneIcon" size={16} className="flex-shrink-0 text-accent" />
                <a href={`tel:${config.company.phone}`} className="footer-link">{config.company.phone}</a>
              </p>
            )}
            {config.company.email && (
              <p className="flex gap-2 items-center">
                <Icon name="EnvelopeIcon" size={16} className="flex-shrink-0 text-accent" />
                <a href={`mailto:${config.company.email}`} className="footer-link">{config.company.email}</a>
              </p>
            )}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="footer-heading">{t.footer.legalLinks}</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/mentions-legales" className="footer-link">{t.footer.mentions}</Link>
            </li>
            <li>
              <Link href="/politique-confidentialite" className="footer-link">{t.footer.privacy}</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="text-xs text-muted-foreground">
          © {year} ATLANTIS LIO (Castella). {t.footer.copyright}
        </p>
        <p className="text-xs text-muted-foreground">
          SARL AU — Capital: 100 000 MAD
        </p>
      </div>
    </footer>
  );
}