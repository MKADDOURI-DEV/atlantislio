"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPageContent() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem("atlantislio_messages") || "[]");
    messages.push({ ...form, date: new Date().toISOString(), type: "contact" });
    localStorage.setItem("atlantislio_messages", JSON.stringify(messages));
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const whatsappMsg = encodeURIComponent("Bonjour, je souhaite obtenir plus d'informations concernant ATLANTIS LIO.");
  const mapsUrl = config.company.mapCoordinates.lat
    ? `https://www.google.com/maps?q=${config.company.mapCoordinates.lat},${config.company.mapCoordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=Sidi+Bouzid+El-Jadida+Maroc`;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero-sm" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-sm-content">
          <span className="section-eyebrow text-accent">{t.contact.title}</span>
          <h1 className="page-hero-title">{t.contact.subtitle}</h1>
        </div>
      </div>

      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="contact-layout">
            {/* Left: info */}
            <div className="contact-info-col">
              <h2 className="section-title mb-8">Informations de Contact</h2>

              <div className="space-y-6">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="MapPinIcon" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="contact-info-label">{t.contact.address}</p>
                    <p className="contact-info-value">{config.company.address}</p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-text-link mt-2 inline-flex items-center gap-1"
                    >
                      {t.contact.directions}
                      <Icon name="ArrowTopRightOnSquareIcon" size={14} />
                    </a>
                  </div>
                </div>

                {config.company.phone ? (
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon name="PhoneIcon" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="contact-info-label">{t.contact.phone}</p>
                      <a href={`tel:${config.company.phone}`} className="contact-info-value hover:text-accent transition-colors">
                        {config.company.phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="contact-info-item opacity-50">
                    <div className="contact-info-icon">
                      <Icon name="PhoneIcon" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="contact-info-label">{t.contact.phone}</p>
                      <p className="contact-info-value text-muted-foreground">{t.common.notConfigured}</p>
                    </div>
                  </div>
                )}

                {config.company.email ? (
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon name="EnvelopeIcon" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="contact-info-label">{t.contact.email}</p>
                      <a href={`mailto:${config.company.email}`} className="contact-info-value hover:text-accent transition-colors">
                        {config.company.email}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="contact-info-item opacity-50">
                    <div className="contact-info-icon">
                      <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="contact-info-label">{t.contact.email}</p>
                      <p className="contact-info-value text-muted-foreground">{t.common.notConfigured}</p>
                    </div>
                  </div>
                )}

                {config.company.whatsapp && (
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="contact-info-label">{t.contact.whatsapp}</p>
                      <a
                        href={`https://wa.me/${config.company.whatsapp}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-info-value hover:text-accent transition-colors"
                      >
                        {config.company.whatsapp}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Map placeholder */}
              <div className="contact-map-placeholder mt-8">
                <div className="flex items-center justify-center h-full flex-col gap-3 text-muted-foreground">
                  <Icon name="MapIcon" size={40} className="text-border" />
                  <p className="text-sm text-center">
                    Route Côtière Sidi Bouzid<br />
                    Moulay Abdellah, El-Jadida
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {t.contact.directions}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="contact-form-col">
              <h2 className="section-title mb-8">Envoyez-nous un Message</h2>

              {submitted ? (
                <div className="form-success">
                  <Icon name="CheckCircleIcon" size={48} className="text-accent mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground text-center mb-2">{t.contact.form.success}</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline mx-auto mt-4">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="form-group">
                    <label className="form-label">{t.contact.form.name} *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">{t.contact.form.email} *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.contact.form.phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.contact.form.subject} *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Objet de votre message"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.contact.form.message} *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    {t.contact.form.send}
                    <Icon name="PaperAirplaneIcon" size={16} className="ml-2" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}