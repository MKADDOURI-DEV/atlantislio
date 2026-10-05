"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/lib/i18n";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "activities", href: "/activities" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "#gallery" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const { t, lang, setLang, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
  ];

  return (
    <>
      <header
        className={`header-sticky ${scrolled ? "header-scrolled" : "header-transparent"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <AppLogo size={36} />
            <span className="font-display text-lg font-semibold tracking-tight text-primary">
              ATLANTIS LIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="nav-link"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 border border-border rounded-full px-2 py-1">
              {languages.map((l, idx) => (
                <React.Fragment key={l.code}>
                  <button
                    onClick={() => setLang(l.code)}
                    className={`lang-btn ${lang === l.code ? "lang-btn-active" : ""}`}
                  >
                    {l.label}
                  </button>
                  {idx < languages.length - 1 && (
                    <span className="text-border text-xs">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Quote CTA */}
            <Link href="/quote-request" className="btn-accent hidden md:flex">
              {t.nav.quote}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-primary"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="Bars3Icon" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="mobile-overlay-inner">
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <AppLogo size={32} />
                <span className="font-display text-lg font-semibold text-primary">ATLANTIS LIO</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-foreground"
                aria-label="Close menu"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Link>
              ))}
            </nav>

            <Link
              href="/quote-request"
              className="btn-accent w-full text-center mb-6"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.quote}
            </Link>

            {/* Language switcher mobile */}
            <div className="flex items-center gap-3 justify-center">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMenuOpen(false); }}
                  className={`lang-btn-mobile ${lang === l.code ? "lang-btn-active" : ""}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}