"use client";
import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import BookingBar from "@/components/BookingBar";
import { useLanguage } from "@/context/LanguageContext";
import { BOOKING_URL } from "@/lib/config";

type L3 = { fr: string; en: string; ar: string };
const R = "/assets/images/rooms/";

const rooms: { id: string; title: L3; occupancy: L3; desc: L3; images: { src: string; alt: L3 }[] }[] = [
  {
    id: "single",
    title: { fr: "Chambre Single", en: "Single Room", ar: "غرفة فردية" },
    occupancy: { fr: "1 personne", en: "1 guest", ar: "شخص واحد" },
    desc: {
      fr: "Une chambre confortable pour une personne, avec accès à un balcon face à l'océan.",
      en: "A comfortable room for one guest, with access to a balcony facing the ocean.",
      ar: "غرفة مريحة لشخص واحد مع إمكانية الوصول إلى شرفة تطل على المحيط.",
    },
    images: [
      { src: R + "single-1.jpg", alt: { fr: "Chambre single avec vue sur la mer", en: "Single room with sea view", ar: "غرفة فردية بإطلالة على البحر" } },
      { src: R + "single-2.jpg", alt: { fr: "Chambre single et baie vitrée", en: "Single room and glass door", ar: "غرفة فردية وباب زجاجي" } },
      { src: R + "single-3.jpg", alt: { fr: "Coin vasque et dressing", en: "Vanity and wardrobe", ar: "حوض وخزانة" } },
      { src: R + "single-4.jpg", alt: { fr: "Balcon face à l'océan", en: "Balcony facing the ocean", ar: "شرفة تطل على المحيط" } },
    ],
  },
  {
    id: "double",
    title: { fr: "Chambre Double", en: "Double Room", ar: "غرفة مزدوجة" },
    occupancy: { fr: "2 personnes", en: "2 guests", ar: "شخصان" },
    desc: {
      fr: "Une chambre pour deux personnes, avec lits jumeaux et vue sur l'océan.",
      en: "A room for two guests, with twin beds and an ocean view.",
      ar: "غرفة لشخصين بسريرين منفصلين وإطلالة على المحيط.",
    },
    images: [
      { src: R + "double-1.jpg", alt: { fr: "Chambre double avec lits jumeaux", en: "Double room with twin beds", ar: "غرفة مزدوجة بسريرين" } },
      { src: R + "double-2.jpg", alt: { fr: "Chambre double, bureau et télévision", en: "Double room, desk and TV", ar: "غرفة مزدوجة مع مكتب وتلفاز" } },
      { src: R + "double-3.jpg", alt: { fr: "Petit-déjeuner sur le balcon", en: "Breakfast on the balcony", ar: "فطور على الشرفة" } },
    ],
  },
];

const t = {
  fr: { eyebrow: "Hébergement", title: "Nos chambres", sub: "Chambres Single et Double face à l'océan Atlantique.", book: "Réserver", bath: "Salles de bain", bathSub: "Salle de bain privative avec douche et baignoire, décor en zellige." },
  en: { eyebrow: "Accommodation", title: "Our rooms", sub: "Single and Double rooms facing the Atlantic Ocean.", book: "Book now", bath: "Bathrooms", bathSub: "Private bathroom with shower and bathtub, zellige decor." },
  ar: { eyebrow: "الإقامة", title: "غرفنا", sub: "غرف فردية ومزدوجة تطل على المحيط الأطلسي.", book: "احجز الآن", bath: "الحمامات", bathSub: "حمام خاص بدش وحوض استحمام وزليج." },
} as const;

function Gallery({ images, lang }: { images: { src: string; alt: L3 }[]; lang: "fr" | "en" | "ar" }) {
  const [i, setI] = useState(0);
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <AppImage src={images[i].src} alt={images[i].alt[lang]} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      {images.length > 1 && (
        <>
          <button type="button" aria-label="Previous" onClick={() => setI((i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70">‹</button>
          <button type="button" aria-label="Next" onClick={() => setI((i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70">›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, k) => (
              <button key={k} type="button" aria-label={`Image ${k + 1}`} onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function RoomsPageContent() {
  const { lang, isRTL } = useLanguage();
  const l = t[lang];
  return (
    <>
      <div className="page-hero" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-bg">
          <AppImage src={R + "single-4.jpg"} alt="Balcon face à l'océan" fill priority className="object-cover" sizes="100vw" />
          <div className="page-hero-scrim" />
        </div>
        <div className="page-hero-content">
          <span className="section-eyebrow text-accent">{l.eyebrow}</span>
          <h1 className="page-hero-title text-white">{l.title}</h1>
        </div>
      </div>

      <section className="py-12 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{l.sub}</p>
          <BookingBar />
        </div>
      </section>

      <section className="pb-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container space-y-10">
          {rooms.map((room) => (
            <article key={room.id} className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
              <Gallery images={room.images} lang={lang} />
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-block self-start bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {room.occupancy[lang]}
                </span>
                <h2 className="section-title mb-3">{room.title[lang]}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{room.desc[lang]}</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-accent self-start">
                  {l.book}
                </a>
              </div>
            </article>
          ))}

          <div>
            <h2 className="section-title mb-2">{l.bath}</h2>
            <p className="text-muted-foreground mb-6">{l.bathSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["bain-1", "bain-2"].map((n) => (
                <div key={n} className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border">
                  <AppImage src={`${R}${n}.jpg`} alt={l.bath} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
