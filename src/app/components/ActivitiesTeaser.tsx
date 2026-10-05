"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

const placeholderActivities = [
{
  id: "ph1",
  image: "https://images.unsplash.com/photo-1712885741883-76efef266f8d",
  alt: "Plage côtière lumineuse, sable blanc, eau turquoise claire, ciel ensoleillé",
  titleFr: "Activités Côtières",
  descFr: "Profitez de la proximité de l\'Atlantique pour des activités nautiques et des promenades en bord de mer."
},
{
  id: "ph2",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18e9bb775-1764683740608.png",
  alt: "Médina historique marocaine, ruelle lumineuse, architecture traditionnelle colorée, jour ensoleillé",
  titleFr: "Découverte Culturelle",
  descFr: "Explorez la cité portugaise classée au patrimoine UNESCO et les richesses culturelles d\'El-Jadida."
},
{
  id: "ph3",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_162176b70-1783772490172.png",
  alt: "Table gastronomique marocaine bien éclairée, plats colorés, décoration raffinée, ambiance chaleureuse",
  titleFr: "Gastronomie Locale",
  descFr: "Savourez la cuisine marocaine authentique et les spécialités locales de la région côtière."
}];


export default function ActivitiesTeaser() {
  const { t, isRTL } = useLanguage();
  const config = getSiteConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const activeActivities = config?.activities?.filter((a) => a?.active)?.slice(0, 3);
  const displayItems = activeActivities?.length > 0 ? activeActivities : null;

  return (
    <section
      ref={sectionRef}
      className="activities-teaser opacity-100"
      dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="section-container">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">{t?.activities?.title}</span>
            <h2 className="section-title">{t?.activities?.subtitle}</h2>
          </div>
          <Link href="/activities" className="btn-outline-sm hidden md:flex items-center gap-2">
            {t?.activities?.viewAll}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {displayItems ?
        <div className="activities-grid">
            {displayItems?.map((activity, idx) =>
          <div
            key={activity?.id}
            className={`activity-card opacity-100 ${visible ? "card-visible" : ""}`}
            style={{ transitionDelay: `${idx * 100}ms` }}>
            
                <div className="activity-card-image">
                  <AppImage
                src={activity?.image}
                alt={activity?.title?.fr}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                </div>
                <div className="activity-card-body">
                  <h3 className="activity-card-title">{activity?.title?.[isRTL ? "ar" : "fr"]}</h3>
                  <p className="activity-card-desc">{activity?.description?.[isRTL ? "ar" : "fr"]}</p>
                  <Link href="/contact" className="btn-text-link">
                    {t?.activities?.contactUs}
                    <Icon name="ArrowRightIcon" size={14} />
                  </Link>
                </div>
              </div>
          )}
          </div> :

        <div className="activities-grid">
            {placeholderActivities?.map((item, idx) =>
          <div
            key={item?.id}
            className={`activity-card group opacity-100 ${visible ? "card-visible" : ""}`}
            style={{ transitionDelay: `${idx * 100}ms` }}>
            
                <div className="activity-card-image">
                  <AppImage
                src={item?.image}
                alt={item?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                </div>
                <div className="activity-card-body">
                  <h3 className="activity-card-title">{item?.titleFr}</h3>
                  <p className="activity-card-desc">{item?.descFr}</p>
                  <Link href="/contact" className="btn-text-link">
                    {t?.activities?.contactUs}
                    <Icon name="ArrowRightIcon" size={14} />
                  </Link>
                </div>
              </div>
          )}
          </div>
        }

        <div className="flex justify-center mt-8 md:hidden">
          <Link href="/activities" className="btn-outline-sm flex items-center gap-2">
            {t?.activities?.viewAll}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>
    </section>);

}