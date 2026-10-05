"use client";
import React from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

const defaultActivities = [
{
  id: "da1",
  image: "https://images.unsplash.com/photo-1722604522414-b75886353176",
  alt: "Plage d'El-Jadida, sable doré, vagues douces de l'Atlantique, ciel bleu dégagé, ambiance paisible et lumineuse",
  titleFr: "Plages & Activités Nautiques",
  descFr: "Profitez de la proximité de l'Atlantique pour des activités nautiques, des promenades en bord de mer et des moments de détente sur les plages de la côte d'El-Jadida.",
  advantages: ["Plage à proximité", "Surf et sports nautiques", "Promenades côtières", "Couchers de soleil spectaculaires"]
},
{
  id: "da2",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_46ecb3aad-1791200401981.png",
  alt: "Cité portugaise d'El-Jadida, architecture historique en pierre, rues pavées, lumière dorée de fin d'après-midi",
  titleFr: "Cité Portugaise d\'El-Jadida",
  descFr: "Explorez la cité portugaise classée au patrimoine mondial de l\'UNESCO. Un voyage dans l\'histoire à travers les ruelles et les monuments exceptionnels de la ville.",
  advantages: ["Patrimoine UNESCO", "Visite guidée disponible", "Architecture unique", "Citerne portugaise"]
},
{
  id: "da3",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbee8f48-1782411332379.png",
  alt: "Table marocaine festive bien éclairée, couscous royal, tajines colorés, pâtisseries, ambiance chaleureuse",
  titleFr: "Gastronomie Marocaine",
  descFr: "Découvrez les saveurs authentiques de la cuisine marocaine. Des repas préparés avec des produits locaux frais, dans la tradition culinaire de la région côtière d'El-Jadida.",
  advantages: ["Cuisine locale authentique", "Produits de la mer frais", "Couscous traditionnel", "Pâtisseries marocaines"]
},
{
  id: "da4",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_4bc908c92-1790162452079.png",
  alt: "Salon marocain traditionnel, coussins colorés, fontaine intérieure, lumière tamisée dorée, atmosphère sereine",
  titleFr: "Détente & Bien-être",
  descFr: "Profitez des espaces de relaxation de la maison d\'hôtes. Moments de tranquillité dans un cadre authentique face à l\'Atlantique.",
  advantages: ["Terrasse avec vue mer", "Espaces de relaxation", "Ambiance apaisante", "Sérénité garantie"]
}];


export default function ActivitiesPageContent() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const activeActivities = config?.activities?.filter((a) => a?.active);
  const displayActivities = activeActivities?.length > 0 ? activeActivities : null;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" dir={isRTL ? "rtl" : "ltr"}>
        <div className="page-hero-bg">
          <AppImage
            src="https://images.unsplash.com/photo-1547819756-e5b1ea671fef"
            alt="Vue panoramique de la côte atlantique marocaine au coucher du soleil, tons orangés dramatiques, mer sombre, horizon lointain"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
          
          <div className="page-hero-scrim" />
        </div>
        <div className="page-hero-content">
          <span className="section-eyebrow text-accent">{t?.activities?.title}</span>
          <h1 className="page-hero-title text-white">{t?.activities?.subtitle}</h1>
        </div>
      </div>

      {/* Activities list */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          {displayActivities ?
          <div className="space-y-16">
              {displayActivities?.map((activity, idx) =>
            <div
              key={activity?.id}
              className={`activity-full-row ${idx % 2 === 1 ? "activity-row-reverse" : ""}`}>
              
                  <div className="activity-full-image">
                    <AppImage
                  src={activity?.image}
                  alt={activity?.title?.fr}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
                  </div>
                  <div className="activity-full-content">
                    <h2 className="section-title">{activity?.title?.[isRTL ? "ar" : "fr"]}</h2>
                    <p className="section-body">{activity?.description?.[isRTL ? "ar" : "fr"]}</p>
                    {activity?.advantages?.[isRTL ? "ar" : "fr"]?.length > 0 &&
                <ul className="activity-advantages">
                        {activity?.advantages?.[isRTL ? "ar" : "fr"]?.map((adv, i) =>
                  <li key={i} className="activity-advantage-item">
                            <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                            <span className="text-sm">{adv}</span>
                          </li>
                  )}
                      </ul>
                }
                    <Link href="/contact" className="btn-primary mt-6 inline-flex items-center gap-2">
                      {t?.activities?.contactUs}
                      <Icon name="ArrowRightIcon" size={14} />
                    </Link>
                  </div>
                </div>
            )}
            </div> :

          <div className="space-y-16">
              {defaultActivities?.map((activity, idx) =>
            <div
              key={activity?.id}
              className={`activity-full-row ${idx % 2 === 1 ? "activity-row-reverse" : ""}`}>
              
                  <div className="activity-full-image">
                    <AppImage
                  src={activity?.image}
                  alt={activity?.alt}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
                  </div>
                  <div className="activity-full-content">
                    <h2 className="section-title">{activity?.titleFr}</h2>
                    <p className="section-body">{activity?.descFr}</p>
                    <ul className="activity-advantages">
                      {activity?.advantages?.map((adv, i) =>
                  <li key={i} className="activity-advantage-item">
                          <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                          <span className="text-sm">{adv}</span>
                        </li>
                  )}
                    </ul>
                    <Link href="/contact" className="btn-primary mt-6 inline-flex items-center gap-2">
                      {t?.activities?.contactUs}
                      <Icon name="ArrowRightIcon" size={14} />
                    </Link>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container text-center">
          <h2 className="section-title mb-4">Planifiez Votre Séjour</h2>
          <p className="section-body mb-8 max-w-lg mx-auto">
            Contactez-nous pour organiser votre séjour et découvrir toutes les possibilités.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary flex items-center gap-2">
              <Icon name="EnvelopeIcon" size={16} />
              {t?.contact?.title}
            </Link>
            <Link href="/quote-request" className="btn-outline flex items-center gap-2">
              {t?.nav?.quote}
            </Link>
          </div>
        </div>
      </section>
    </>);

}