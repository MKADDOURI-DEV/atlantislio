"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getSiteConfig } from "@/lib/siteConfig";

export default function MentionsLegalesContent() {
  const { isRTL } = useLanguage();
  const config = getSiteConfig();
  const legal = config?.legal;

  return (
    <div className="page-hero-sm" dir={isRTL ? "rtl" : "ltr"}>
      <div className="page-hero-sm-content">
        <span className="section-eyebrow text-accent">Informations Légales</span>
        <h1 className="page-hero-title">Mentions Légales</h1>
      </div>
      <section className="py-16 bg-background">
        <div className="section-container max-w-3xl">
          <div className="prose-legal">
            <h2>Identification de l'Entreprise</h2>
            <table className="legal-table">
              <tbody>
                <tr><td className="legal-td-label">Dénomination sociale</td><td>{legal?.denomination}</td></tr>
                <tr><td className="legal-td-label">Forme juridique</td><td>{legal?.formeJuridique}</td></tr>
                <tr><td className="legal-td-label">Capital social</td><td>{legal?.capital}</td></tr>
                <tr><td className="legal-td-label">Responsable / Dirigeant</td><td>{legal?.responsable}</td></tr>
                <tr><td className="legal-td-label">Parts sociales</td><td>{legal?.partsSociales}</td></tr>
                <tr><td className="legal-td-label">Participation</td><td>{legal?.participation}</td></tr>
                <tr><td className="legal-td-label">Adresse du siège</td><td>{legal?.adresse}</td></tr>
                <tr><td className="legal-td-label">Date de création</td><td>{legal?.creation}</td></tr>
                <tr><td className="legal-td-label">Registre du Commerce (RC)</td><td>{legal?.rc}</td></tr>
                <tr><td className="legal-td-label">Identifiant Commun de l'Entreprise (ICE)</td><td>{legal?.ice}</td></tr>
              </tbody>
            </table>

            <h2>Contact</h2>
            <p>
              {config?.company?.phone && <><strong>Téléphone :</strong> {config?.company?.phone}<br /></>}
              {config?.company?.email && <><strong>Email :</strong> {config?.company?.email}<br /></>}
              <strong>Adresse :</strong> {legal?.adresse}
            </p>

            <h2>Hébergement du Site</h2>
            <p>
              Ce site est hébergé par un prestataire technique. Les coordonnées de l'hébergeur
              seront précisées lors de la mise en ligne officielle du site.
            </p>

            <h2>Propriété Intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes)
              est la propriété exclusive d'ATLANTIS LIO (Castella) ou de ses partenaires.
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
              est interdite sans autorisation préalable écrite.
            </p>

            <h2>Responsabilité</h2>
            <p>
              ATLANTIS LIO (Castella) s'efforce de fournir des informations exactes et à jour.
              Cependant, la société ne peut garantir l'exactitude, la complétude ou l'actualité
              des informations diffusées sur ce site. L'utilisation des informations et contenus
              disponibles sur ce site se fait sous l'entière responsabilité de l'utilisateur.
            </p>

            <h2>Données Personnelles</h2>
            <p>
              Conformément à la réglementation applicable en matière de protection des données
              personnelles, vous disposez d'un droit d'accès, de rectification et de suppression
              de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée
              ci-dessus.
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Dernière mise à jour : Octobre 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}