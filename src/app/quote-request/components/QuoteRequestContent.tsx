"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/context/LanguageContext";

interface QuoteForm {
  nameSociety: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  date: string;
  message: string;
}

const serviceOptions = [
"Hébergement",
"Restauration",
"Activités & Excursions",
"Événement Privé",
"Séjour Complet",
"Autre"];


export default function QuoteRequestContent() {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState<QuoteForm>({
    nameSociety: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    date: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<QuoteForm>>({});

  const validate = (): boolean => {
    const newErrors: Partial<QuoteForm> = {};
    if (!form.nameSociety.trim()) newErrors.nameSociety = "Ce champ est requis";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email invalide";
    if (!form.message.trim()) newErrors.message = "Ce champ est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const quotes = JSON.parse(localStorage.getItem("atlantislio_quotes") || "[]");
    quotes.push({ ...form, date_submission: new Date().toISOString(), type: "quote" });
    localStorage.setItem("atlantislio_quotes", JSON.stringify(quotes));
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero-sm" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-sm-content">
          <span className="section-eyebrow text-accent">{t.quote.title}</span>
          <h1 className="page-hero-title">{t.quote.subtitle}</h1>
        </div>
      </div>

      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="quote-layout">
            {/* Left: image + info */}
            <div className="quote-image-col">
              <div className="relative h-72 rounded-2xl overflow-hidden mb-6">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_4c3a7ad50-1791200401330.png"
                  alt="Terrasse panoramique d'ATLANTIS LIO avec vue sur l'Atlantique, coucher de soleil dramatique, tons orangés profonds"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-xl font-light">ATLANTIS LIO</p>
                  <p className="text-white/70 text-sm">El-Jadida, Maroc</p>
                </div>
              </div>

              <div className="quote-info-box">
                <div className="flex items-start gap-3">
                  <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Information</p>
                    <p className="text-sm text-muted-foreground">{t.quote.note}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-foreground">Besoin d'une réponse rapide ?</p>
                <Link href="/contact" className="btn-outline w-full justify-center flex items-center gap-2">
                  <Icon name="EnvelopeIcon" size={16} />
                  Nous contacter directement
                </Link>
              </div>
            </div>

            {/* Right: form */}
            <div className="quote-form-col">
              {submitted ?
              <div className="form-success">
                  <Icon name="CheckCircleIcon" size={56} className="text-accent mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground text-center mb-2">Demande envoyée !</h2>
                  <p className="text-muted-foreground text-center mb-6">{t.quote.success}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => setSubmitted(false)} className="btn-outline">
                      Nouvelle demande
                    </button>
                    <Link href="/" className="btn-primary">
                      Retour à l'accueil
                    </Link>
                  </div>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.nameSociety} *</label>
                      <input
                      type="text"
                      name="nameSociety"
                      value={form.nameSociety}
                      onChange={handleChange}
                      className={`form-input ${errors.nameSociety ? "form-input-error" : ""}`}
                      placeholder="Votre nom ou société" />
                    
                      {errors.nameSociety && <p className="form-error">{errors.nameSociety}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.email} *</label>
                      <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "form-input-error" : ""}`}
                      placeholder="votre@email.com" />
                    
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.phone}</label>
                      <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+212 6XX XXX XXX" />
                    
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.service}</label>
                      <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="form-input">
                      
                        <option value="">Sélectionner un service</option>
                        {serviceOptions.map((opt) =>
                      <option key={opt} value={opt}>{opt}</option>
                      )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.budget}</label>
                      <input
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 500-1000 MAD" />
                    
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.quote.fields.date}</label>
                      <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="form-input" />
                    
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.quote.fields.message} *</label>
                    <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`form-input resize-none ${errors.message ? "form-input-error" : ""}`}
                    placeholder="Décrivez votre projet ou vos besoins en détail..." />
                  
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-base py-3 flex items-center gap-2">
                    {t.quote.send}
                    <Icon name="PaperAirplaneIcon" size={16} />
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </section>
    </>);

}