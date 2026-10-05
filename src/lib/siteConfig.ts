export interface Activity {
  id: string;
  title: {fr: string;en: string;ar: string;};
  description: {fr: string;en: string;ar: string;};
  image: string;
  advantages: {fr: string[];en: string[];ar: string[];};
  active: boolean;
  order: number;
}

export interface Service {
  id: string;
  name: {fr: string;en: string;ar: string;};
  description: {fr: string;en: string;ar: string;};
  image: string;
  features: {fr: string[];en: string[];ar: string[];};
  price?: string;
  active: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: {fr: string;en: string;ar: string;};
  description: {fr: string;en: string;ar: string;};
  category: string;
  images: string[];
  date: string;
  location: string;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  order: number;
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: {fr: string;en: string;ar: string;};
    description: {fr: string;en: string;ar: string;};
    activity: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    logoUrl: string;
    primaryColor: string;
    accentColor: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      linkedin: string;
    };
    mapCoordinates: {lat: string;lng: string;};
    mapEmbedUrl: string;
  };
  legal: {
    denomination: string;
    formeJuridique: string;
    capital: string;
    responsable: string;
    partsSociales: string;
    participation: string;
    adresse: string;
    creation: string;
    rc: string;
    ice: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  activities: Activity[];
  services: Service[];
  projects: Project[];
  gallery: GalleryImage[];
}

export const defaultConfig: SiteConfig = {
  company: {
    name: "ATLANTIS LIO",
    tagline: {
      fr: "Votre Maison d'Hôtes à El-Jadida",
      en: "Your Guesthouse in El-Jadida",
      ar: "بيت ضيافتكم في الجديدة"
    },
    description: {
      fr: "ATLANTIS LIO (Castella) est une maison d'hôtes de charme située sur la Route Côtière de Sidi Bouzid, à Moulay Abdellah, El-Jadida. Fondée en avril 2021 par M. SOUBARI Abdelmajid, elle offre une expérience authentique alliant confort moderne et hospitalité marocaine traditionnelle face à l'Atlantique.",
      en: "ATLANTIS LIO (Castella) is a charming guesthouse located on the Coastal Route of Sidi Bouzid, in Moulay Abdellah, El-Jadida. Founded in April 2021 by Mr. SOUBARI Abdelmajid, it offers an authentic experience combining modern comfort and traditional Moroccan hospitality facing the Atlantic.",
      ar: "أتلانتيس ليو (كاستيلا) هو بيت ضيافة ساحر يقع على الطريق الساحلية لسيدي بوزيد، في مولاي عبد الله، الجديدة. تأسس في أبريل 2021 على يد السيد صبري عبد المجيد، ويقدم تجربة أصيلة تجمع بين الراحة الحديثة والضيافة المغربية التقليدية أمام المحيط الأطلسي."
    },
    activity: "Maison d'hôtes / Riad",
    address: "Propriété Soubari, Route Côtière Sidi Bouzid, Moulay Abdellah, El-Jadida, Maroc",
    phone: "",
    email: "",
    whatsapp: "",
    logoUrl: "/assets/images/app_logo.png",
    primaryColor: "#0A1628",
    accentColor: "#C9A84C",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: ""
    },
    mapCoordinates: { lat: "33.2316", lng: "-8.5007" },
    mapEmbedUrl: ""
  },
  legal: {
    denomination: "ATLANTIS LIO (Castella)",
    formeJuridique: "Société à Responsabilité Limitée à Associé Unique (SARL AU)",
    capital: "100 000 MAD",
    responsable: "Mr SOUBARI Abdelmajid",
    partsSociales: "1 000 parts",
    participation: "100%",
    adresse: "Propriété Soubari 5 (TF 221.048/08), Dr Lbahara, Route Côtière Sidi Bouzid FD 5, Moulay Abdellah, El-Jadida, Maroc",
    creation: "20 avril 2021",
    rc: "[À configurer]",
    ice: "[À configurer]"
  },
  seo: {
    title: "ATLANTIS LIO — Maison d'Hôtes à El-Jadida, Maroc",
    description: "Maison d'hôtes de charme à El-Jadida, sur la Route Côtière de Sidi Bouzid. Découvrez une hospitalité marocaine authentique face à l'Atlantique.",
    keywords: "maison hotes El-Jadida, riad El-Jadida, guesthouse Maroc, Sidi Bouzid, hébergement côtier Maroc",
    ogImage: "/assets/images/app_logo.png"
  },
  activities: [],
  services: [],
  projects: [],
  gallery: [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1538416812542-cc3c6cbe8319",
    alt: "Vue côtière de la maison d'hôtes",
    category: "Extérieur",
    order: 1
  },
  {
    id: "g2",
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_16c4a8361-1782230380124.png",
    alt: "Chambre élégante avec vue sur l'océan",
    category: "Chambres",
    order: 2
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1670882108396-bc8caf7bfec1",
    alt: "Terrasse avec vue panoramique",
    category: "Terrasse",
    order: 3
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1656935450733-1dcd4c8d0828",
    alt: "Piscine extérieure vue mer",
    category: "Extérieur",
    order: 4
  },
  {
    id: "g5",
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1872142eb-1782311118809.png",
    alt: "Salon marocain traditionnel",
    category: "Intérieur",
    order: 5
  },
  {
    id: "g6",
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_13414bc2a-1765348050211.png",
    alt: "Salle à manger avec décoration marocaine",
    category: "Intérieur",
    order: 6
  }]

};

const CONFIG_KEY = "atlantislio_config";

export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultConfig, ...parsed };
    }
  } catch {

    // ignore
  }return defaultConfig;
}

export function saveSiteConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch {

    // ignore
  }}

export function resetSiteConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONFIG_KEY);
}