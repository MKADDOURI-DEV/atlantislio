import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "Politique de Confidentialité — ATLANTIS LIO",
  description: "Politique de confidentialité d'ATLANTIS LIO. Découvrez comment nous protégeons vos données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main>
      <Header />
      <div className="page-hero-sm">
        <div className="page-hero-sm-content">
          <span className="section-eyebrow text-accent">Données & Confidentialité</span>
          <h1 className="page-hero-title">Politique de Confidentialité</h1>
        </div>
      </div>
      <section className="py-16 bg-background">
        <div className="section-container max-w-3xl">
          <div className="prose-legal">
            <h2>1. Collecte des Données</h2>
            <p>
              ATLANTIS LIO (Castella) collecte uniquement les données personnelles que vous nous
              fournissez volontairement via les formulaires de contact et de demande de devis
              présents sur ce site (nom, email, téléphone, message).
            </p>

            <h2>2. Utilisation des Données</h2>
            <p>Les données collectées sont utilisées exclusivement pour :</p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Établir des devis personnalisés</li>
              <li>Améliorer nos services</li>
            </ul>

            <h2>3. Conservation des Données</h2>
            <p>
              Les données soumises via les formulaires sont sauvegardées localement dans votre
              navigateur (localStorage) et transmises à notre équipe. Elles sont conservées
              uniquement le temps nécessaire au traitement de votre demande.
            </p>

            <h2>4. Partage des Données</h2>
            <p>
              ATLANTIS LIO (Castella) ne vend, ne loue et ne partage pas vos données personnelles
              avec des tiers à des fins commerciales.
            </p>

            <h2>5. Vos Droits</h2>
            <p>
              Conformément à la réglementation applicable, vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p>Pour exercer ces droits, contactez-nous via notre formulaire de contact.</p>

            <h2>6. Cookies</h2>
            <p>
              Ce site utilise uniquement le stockage local du navigateur (localStorage) pour
              sauvegarder vos préférences de langue. Aucun cookie de tracking ou publicitaire
              n'est utilisé.
            </p>

            <h2>7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques appropriées pour protéger vos données
              personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>

            <h2>8. Contact</h2>
            <p>
              Pour toute question relative à cette politique de confidentialité ou à l'exercice
              de vos droits, veuillez nous contacter via la page Contact de ce site.
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Dernière mise à jour : Octobre 2026
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </main>
  );
}