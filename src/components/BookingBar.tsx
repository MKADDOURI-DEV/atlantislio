"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { BOOKING_URL } from "@/lib/config";

const labels = {
  fr: { checkin: "Arrivée", checkout: "Départ", adults: "Adultes", children: "Enfants", ages: "Âge des enfants", child: "Enfant", under1: "Moins d'1 an", year: "an", years: "ans", submit: "Vérifier la disponibilité" },
  en: { checkin: "Check-in", checkout: "Check-out", adults: "Adults", children: "Children", ages: "Children's ages", child: "Child", under1: "Under 1", year: "year", years: "years", submit: "Check availability" },
  ar: { checkin: "الوصول", checkout: "المغادرة", adults: "البالغون", children: "الأطفال", ages: "أعمار الأطفال", child: "الطفل", under1: "أقل من سنة", year: "سنة", years: "سنوات", submit: "تحقق من التوفر" },
} as const;

const field =
  "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const label = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";

export default function BookingBar() {
  const { lang, isRTL } = useLanguage();
  const l = labels[lang];
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [ages, setAges] = useState<string[]>([]);
  const today = new Date().toISOString().split("T")[0];

  const onChildren = (v: string) => {
    setChildren(v);
    setAges((prev) => Array.from({ length: Number(v) }, (_, i) => prev[i] ?? ""));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ checkin, checkout, adults, children });
    ages.forEach((a, i) => params.set(`child${i + 1}_age`, a));
    // Paramètres placés avant le hash (#) du moteur Nozoul
    const [base, hash] = BOOKING_URL.split("#");
    window.open(`${base}?${params.toString()}#${hash}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={submit}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-card rounded-xl shadow-lg border border-border p-4 lg:p-5"
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div>
          <label className={label}>{l.checkin}</label>
          <input type="date" required min={today} value={checkin} className={field}
            onChange={(e) => { setCheckin(e.target.value); if (checkout && checkout <= e.target.value) setCheckout(""); }} />
        </div>
        <div>
          <label className={label}>{l.checkout}</label>
          <input type="date" required min={checkin || today} value={checkout} className={field}
            onChange={(e) => setCheckout(e.target.value)} />
        </div>
        <div>
          <label className={label}>{l.adults}</label>
          <select value={adults} onChange={(e) => setAdults(e.target.value)} className={field}>
            {["1", "2", "3", "4", "5", "6"].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>{l.children}</label>
          <select value={children} onChange={(e) => onChildren(e.target.value)} className={field}>
            {["0", "1", "2", "3", "4"].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <button type="submit" className="btn-accent w-full justify-center flex items-center gap-2 py-2.5">
            <Icon name="MagnifyingGlassIcon" size={16} />
            {l.submit}
          </button>
        </div>

        {ages.length > 0 && (
          <div className="col-span-2 lg:col-span-5">
            <p className={label}>{l.ages}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ages.map((age, i) => (
                <select key={`age-${i}`} required value={age} className={field}
                  onChange={(e) => setAges((p) => p.map((a, idx) => (idx === i ? e.target.value : a)))}>
                  <option value="" disabled>{l.child} {i + 1}</option>
                  <option value="0">{l.under1}</option>
                  {Array.from({ length: 17 }, (_, a) => a + 1).map((a) => (
                    <option key={a} value={String(a)}>{a} {a === 1 ? l.year : l.years}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
