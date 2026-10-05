"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import { getSiteConfig } from "@/lib/siteConfig";

export default function FloatingButtons() {
  const [config, setConfig] = useState(getSiteConfig());
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig());
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappMsg = encodeURIComponent(
    "Bonjour, je souhaite obtenir plus d'informations concernant ATLANTIS LIO."
  );

  return (
    <div className="floating-buttons">
      {config?.company?.whatsapp && (
        <a
          href={`https://wa.me/${config?.company?.whatsapp}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
          aria-label="WhatsApp"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={24} />
        </a>
      )}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="floating-top"
          aria-label="Back to top"
        >
          <Icon name="ChevronUpIcon" size={20} />
        </button>
      )}
    </div>
  );
}