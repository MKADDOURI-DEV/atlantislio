"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import { getSiteConfig, saveSiteConfig, defaultConfig, type SiteConfig } from "@/lib/siteConfig";

const ADMIN_PASSWORD = "admin123";

type AdminSection =
  | "entreprise" |"activites" |"services" |"projets" |"galerie" |"contact" |"seo" |"mentions" |"messages";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("entreprise");
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("atlantislio_admin_auth");
    if (auth === "true") setAuthenticated(true);
    setConfig(getSiteConfig());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("atlantislio_admin_auth", "true");
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Mot de passe incorrect.");
    }
  };

  const handleSave = () => {
    saveSiteConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateCompany = (key: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));
  };

  const updateSocial = (key: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        socialLinks: { ...prev.company.socialLinks, [key]: value },
      },
    }));
  };

  const updateSEO = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
  };

  const updateLegal = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, legal: { ...prev.legal, [key]: value } }));
  };

  const navItems: { key: AdminSection; label: string; icon: string }[] = [
    { key: "entreprise", label: "Entreprise", icon: "BuildingOfficeIcon" },
    { key: "activites", label: "Activités", icon: "SunIcon" },
    { key: "services", label: "Services", icon: "SparklesIcon" },
    { key: "galerie", label: "Galerie", icon: "PhotoIcon" },
    { key: "contact", label: "Contact", icon: "EnvelopeIcon" },
    { key: "seo", label: "SEO", icon: "MagnifyingGlassIcon" },
    { key: "mentions", label: "Mentions Légales", icon: "DocumentTextIcon" },
    { key: "messages", label: "Messages", icon: "InboxIcon" },
  ];

  if (!authenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-semibold text-primary mb-1">ATLANTIS LIO</h1>
            <p className="text-muted-foreground text-sm">Interface d'Administration</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Entrez le mot de passe"
                autoFocus
              />
              {passwordError && <p className="form-error">{passwordError}</p>}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Se connecter
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            Mot de passe par défaut : admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
        <div className="admin-sidebar-header">
          <span className="font-display text-base font-semibold text-primary">ATLANTIS LIO</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveSection(item.key); setSidebarOpen(false); }}
              className={`admin-nav-item ${activeSection === item.key ? "admin-nav-item-active" : ""}`}
            >
              <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button
            onClick={() => {
              sessionStorage.removeItem("atlantislio_admin_auth");
              setAuthenticated(false);
            }}
            className="admin-logout-btn"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Icon name="Bars3Icon" size={22} />
          </button>
          <h2 className="admin-section-title">
            {navItems.find((n) => n.key === activeSection)?.label}
          </h2>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
            <Icon name="CheckIcon" size={16} />
            {saved ? "Sauvegardé !" : "Sauvegarder"}
          </button>
        </div>

        <div className="admin-content">
          {/* ENTREPRISE */}
          {activeSection === "entreprise" && (
            <div className="admin-form-grid">
              <div className="admin-card col-span-2">
                <h3 className="admin-card-title">Informations Générales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Nom de l'entreprise</label>
                    <input type="text" value={config.company.name} onChange={(e) => updateCompany("name", e.target.value)} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Activité</label>
                    <input type="text" value={config.company.activity} onChange={(e) => updateCompany("activity", e.target.value)} className="form-input" />
                  </div>
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Slogan (FR)</label>
                    <input type="text" value={config.company.tagline.fr} onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, tagline: { ...p.company.tagline, fr: e.target.value } } }))} className="form-input" />
                  </div>
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Slogan (EN)</label>
                    <input type="text" value={config.company.tagline.en} onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, tagline: { ...p.company.tagline, en: e.target.value } } }))} className="form-input" />
                  </div>
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Slogan (AR)</label>
                    <input type="text" value={config.company.tagline.ar} dir="rtl" onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, tagline: { ...p.company.tagline, ar: e.target.value } } }))} className="form-input" />
                  </div>
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Description (FR)</label>
                    <textarea rows={4} value={config.company.description.fr} onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, description: { ...p.company.description, fr: e.target.value } } }))} className="form-input resize-none" />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Contact</h3>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Adresse</label>
                    <textarea rows={3} value={config.company.address} onChange={(e) => updateCompany("address", e.target.value)} className="form-input resize-none" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input type="tel" value={config.company.phone} onChange={(e) => updateCompany("phone", e.target.value)} className="form-input" placeholder="+212 6XX XXX XXX" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" value={config.company.email} onChange={(e) => updateCompany("email", e.target.value)} className="form-input" placeholder="contact@atlantislio.ma" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp</label>
                    <input type="text" value={config.company.whatsapp} onChange={(e) => updateCompany("whatsapp", e.target.value)} className="form-input" placeholder="212XXXXXXXXX (sans +)" />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Réseaux Sociaux</h3>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Facebook URL</label>
                    <input type="url" value={config.company.socialLinks.facebook} onChange={(e) => updateSocial("facebook", e.target.value)} className="form-input" placeholder="https://facebook.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instagram URL</label>
                    <input type="url" value={config.company.socialLinks.instagram} onChange={(e) => updateSocial("instagram", e.target.value)} className="form-input" placeholder="https://instagram.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn URL</label>
                    <input type="url" value={config.company.socialLinks.linkedin} onChange={(e) => updateSocial("linkedin", e.target.value)} className="form-input" placeholder="https://linkedin.com/..." />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Couleurs</h3>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Couleur principale</label>
                    <div className="flex gap-3 items-center">
                      <input type="color" value={config.company.primaryColor} onChange={(e) => updateCompany("primaryColor", e.target.value)} className="h-10 w-16 rounded border border-border cursor-pointer" />
                      <input type="text" value={config.company.primaryColor} onChange={(e) => updateCompany("primaryColor", e.target.value)} className="form-input flex-1" placeholder="#0A1628" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Couleur d'accent (or)</label>
                    <div className="flex gap-3 items-center">
                      <input type="color" value={config.company.accentColor} onChange={(e) => updateCompany("accentColor", e.target.value)} className="h-10 w-16 rounded border border-border cursor-pointer" />
                      <input type="text" value={config.company.accentColor} onChange={(e) => updateCompany("accentColor", e.target.value)} className="form-input flex-1" placeholder="#C9A84C" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITÉS */}
          {activeSection === "activites" && (
            <AdminCRUDSection
              title="Activités"
              items={config.activities}
              onAdd={() => {
                const newItem = {
                  id: `act_${Date.now()}`,
                  title: { fr: "Nouvelle activité", en: "New activity", ar: "نشاط جديد" },
                  description: { fr: "", en: "", ar: "" },
                  image: "",
                  advantages: { fr: [], en: [], ar: [] },
                  active: true,
                  order: config.activities.length + 1,
                };
                setConfig((p) => ({ ...p, activities: [...p.activities, newItem] }));
              }}
              onDelete={(id) => setConfig((p) => ({ ...p, activities: p.activities.filter((a) => a.id !== id) }))}
              onToggle={(id) => setConfig((p) => ({ ...p, activities: p.activities.map((a) => a.id === id ? { ...a, active: !a.active } : a) }))}
              onUpdate={(id, key, value) => setConfig((p) => ({
                ...p,
                activities: p.activities.map((a) =>
                  a.id === id ? { ...a, title: { ...a.title, [key]: value } } : a
                ),
              }))}
            />
          )}

          {/* SERVICES */}
          {activeSection === "services" && (
            <AdminCRUDSection
              title="Services"
              items={config.services}
              onAdd={() => {
                const newItem = {
                  id: `svc_${Date.now()}`,
                  name: { fr: "Nouveau service", en: "New service", ar: "خدمة جديدة" },
                  description: { fr: "", en: "", ar: "" },
                  image: "",
                  features: { fr: [], en: [], ar: [] },
                  price: "",
                  active: true,
                  order: config.services.length + 1,
                };
                setConfig((p) => ({ ...p, services: [...p.services, newItem] }));
              }}
              onDelete={(id) => setConfig((p) => ({ ...p, services: p.services.filter((s) => s.id !== id) }))}
              onToggle={(id) => setConfig((p) => ({ ...p, services: p.services.map((s) => s.id === id ? { ...s, active: !s.active } : s) }))}
              onUpdate={(id, key, value) => setConfig((p) => ({
                ...p,
                services: p.services.map((s) =>
                  s.id === id ? { ...s, name: { ...s.name, [key]: value } } : s
                ),
              }))}
              nameField="name"
            />
          )}

          {/* GALERIE */}
          {activeSection === "galerie" && (
            <div className="space-y-6">
              <div className="admin-card">
                <h3 className="admin-card-title">Ajouter une image</h3>
                <AddGalleryImageForm
                  onAdd={(img) => setConfig((p) => ({ ...p, gallery: [...p.gallery, img] }))}
                  nextOrder={config.gallery.length + 1}
                />
              </div>
              <div className="admin-card">
                <h3 className="admin-card-title">Images ({config.gallery.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {config.gallery.map((img) => (
                    <div key={img.id} className="gallery-admin-item">
                      <img src={img.src} alt={img.alt} className="w-full h-24 object-cover rounded-lg" />
                      <p className="text-xs text-muted-foreground mt-1 truncate">{img.category}</p>
                      <button
                        onClick={() => setConfig((p) => ({ ...p, gallery: p.gallery.filter((g) => g.id !== img.id) }))}
                        className="mt-1 text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Icon name="TrashIcon" size={12} /> Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeSection === "contact" && (
            <div className="admin-card">
              <h3 className="admin-card-title">Informations de Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group sm:col-span-2">
                  <label className="form-label">Adresse complète</label>
                  <textarea rows={3} value={config.company.address} onChange={(e) => updateCompany("address", e.target.value)} className="form-input resize-none" />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input type="tel" value={config.company.phone} onChange={(e) => updateCompany("phone", e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" value={config.company.email} onChange={(e) => updateCompany("email", e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp (sans +)</label>
                  <input type="text" value={config.company.whatsapp} onChange={(e) => updateCompany("whatsapp", e.target.value)} className="form-input" placeholder="212XXXXXXXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Latitude GPS</label>
                  <input type="text" value={config.company.mapCoordinates.lat} onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, mapCoordinates: { ...p.company.mapCoordinates, lat: e.target.value } } }))} className="form-input" placeholder="33.2316" />
                </div>
                <div className="form-group">
                  <label className="form-label">Longitude GPS</label>
                  <input type="text" value={config.company.mapCoordinates.lng} onChange={(e) => setConfig((p) => ({ ...p, company: { ...p.company, mapCoordinates: { ...p.company.mapCoordinates, lng: e.target.value } } }))} className="form-input" placeholder="-8.5007" />
                </div>
                <div className="form-group sm:col-span-2">
                  <label className="form-label">URL Google Maps Embed</label>
                  <input type="url" value={config.company.mapEmbedUrl} onChange={(e) => updateCompany("mapEmbedUrl", e.target.value)} className="form-input" placeholder="https://maps.google.com/maps?..." />
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeSection === "seo" && (
            <div className="admin-card">
              <h3 className="admin-card-title">Paramètres SEO</h3>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Titre de la page (max 60 car.)</label>
                  <input type="text" value={config.seo.title} onChange={(e) => updateSEO("title", e.target.value)} className="form-input" maxLength={60} />
                  <p className="text-xs text-muted-foreground mt-1">{config.seo.title.length}/60 caractères</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Meta description (max 160 car.)</label>
                  <textarea rows={3} value={config.seo.description} onChange={(e) => updateSEO("description", e.target.value)} className="form-input resize-none" maxLength={160} />
                  <p className="text-xs text-muted-foreground mt-1">{config.seo.description.length}/160 caractères</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Mots-clés (séparés par des virgules)</label>
                  <input type="text" value={config.seo.keywords} onChange={(e) => updateSEO("keywords", e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Image Open Graph URL</label>
                  <input type="url" value={config.seo.ogImage} onChange={(e) => updateSEO("ogImage", e.target.value)} className="form-input" />
                </div>
              </div>
            </div>
          )}

          {/* MENTIONS LÉGALES */}
          {activeSection === "mentions" && (
            <div className="admin-card">
              <h3 className="admin-card-title">Informations Légales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  ["denomination", "Dénomination sociale"],
                  ["formeJuridique", "Forme juridique"],
                  ["capital", "Capital social"],
                  ["responsable", "Responsable / Dirigeant"],
                  ["partsSociales", "Parts sociales"],
                  ["participation", "Participation"],
                  ["creation", "Date de création"],
                  ["rc", "RC"],
                  ["ice", "ICE"],
                ] as [keyof typeof config.legal, string][]).map(([key, label]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <input
                      type="text"
                      value={config.legal[key]}
                      onChange={(e) => updateLegal(key, e.target.value)}
                      className="form-input"
                    />
                  </div>
                ))}
                <div className="form-group sm:col-span-2">
                  <label className="form-label">Adresse du siège</label>
                  <textarea rows={3} value={config.legal.adresse} onChange={(e) => updateLegal("adresse", e.target.value)} className="form-input resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {activeSection === "messages" && (
            <AdminMessages />
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------- Sub-components ---------- */

interface CRUDItem {
  id: string;
  active: boolean;
  title?: { fr: string; en: string; ar: string };
  name?: { fr: string; en: string; ar: string };
}

function AdminCRUDSection({
  title,
  items,
  onAdd,
  onDelete,
  onToggle,
  onUpdate,
  nameField = "title",
}: {
  title: string;
  items: CRUDItem[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, key: string, value: string) => void;
  nameField?: "title" | "name";
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{items.length} élément(s)</p>
        <button onClick={onAdd} className="btn-primary text-sm flex items-center gap-2">
          <Icon name="PlusIcon" size={16} />
          Ajouter
        </button>
      </div>
      {items.length === 0 ? (
        <div className="admin-card text-center py-12">
          <Icon name="InboxIcon" size={40} className="text-border mx-auto mb-3" />
          <p className="text-muted-foreground">Aucun élément. Cliquez sur Ajouter pour commencer.</p>
        </div>
      ) : (
        items.map((item) => {
          const nameObj = nameField === "name" ? item.name : item.title;
          return (
            <div key={item.id} className="admin-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label text-xs">Nom (FR)</label>
                    <input
                      type="text"
                      value={nameObj?.fr || ""}
                      onChange={(e) => onUpdate(item.id, "fr", e.target.value)}
                      className="form-input text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Nom (EN)</label>
                    <input
                      type="text"
                      value={nameObj?.en || ""}
                      onChange={(e) => onUpdate(item.id, "en", e.target.value)}
                      className="form-input text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Nom (AR)</label>
                    <input
                      type="text"
                      value={nameObj?.ar || ""}
                      onChange={(e) => onUpdate(item.id, "ar", e.target.value)}
                      className="form-input text-sm"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-5">
                  <button
                    onClick={() => onToggle(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${item.active ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}
                  >
                    {item.active ? "Actif" : "Inactif"}
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Icon name="TrashIcon" size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function AddGalleryImageForm({
  onAdd,
  nextOrder,
}: {
  onAdd: (img: { id: string; src: string; alt: string; category: string; order: number }) => void;
  nextOrder: number;
}) {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Extérieur");

  const handleAdd = () => {
    if (!src.trim()) return;
    onAdd({ id: `g_${Date.now()}`, src, alt, category, order: nextOrder });
    setSrc("");
    setAlt("");
    setCategory("Extérieur");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="form-group sm:col-span-2">
        <label className="form-label">URL de l'image</label>
        <input type="url" value={src} onChange={(e) => setSrc(e.target.value)} className="form-input" placeholder="https://..." />
      </div>
      <div className="form-group">
        <label className="form-label">Catégorie</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
          {["Extérieur", "Chambres", "Terrasse", "Intérieur", "Activités"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-group sm:col-span-2">
        <label className="form-label">Description (alt)</label>
        <input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} className="form-input" placeholder="Description de l'image" />
      </div>
      <div className="flex items-end">
        <button onClick={handleAdd} className="btn-primary w-full justify-center flex items-center gap-2">
          <Icon name="PlusIcon" size={16} />
          Ajouter
        </button>
      </div>
    </div>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState<Array<Record<string, string>>>([]);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("atlantislio_messages") || "[]");
    const quotes = JSON.parse(localStorage.getItem("atlantislio_quotes") || "[]");
    setMessages([...contacts, ...quotes].sort((a, b) =>
      new Date(b.date_submission || b.date || 0).getTime() - new Date(a.date_submission || a.date || 0).getTime()
    ));
  }, []);

  if (messages.length === 0) {
    return (
      <div className="admin-card text-center py-16">
        <Icon name="InboxIcon" size={48} className="text-border mx-auto mb-4" />
        <p className="text-muted-foreground">Aucun message reçu pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{messages.length} message(s) reçu(s)</p>
      {messages.map((msg, idx) => (
        <div key={idx} className="admin-card">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${msg.type === "quote" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {msg.type === "quote" ? "Devis" : "Contact"}
              </span>
              <span className="text-xs text-muted-foreground">
                {msg.date_submission || msg.date ? new Date(msg.date_submission || msg.date).toLocaleDateString("fr-FR") : ""}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {msg.name && <p><strong>Nom :</strong> {msg.name}</p>}
            {msg.nameSociety && <p><strong>Nom/Société :</strong> {msg.nameSociety}</p>}
            {msg.email && <p><strong>Email :</strong> {msg.email}</p>}
            {msg.phone && <p><strong>Tél :</strong> {msg.phone}</p>}
            {msg.subject && <p><strong>Sujet :</strong> {msg.subject}</p>}
            {msg.service && <p><strong>Service :</strong> {msg.service}</p>}
            {msg.budget && <p><strong>Budget :</strong> {msg.budget}</p>}
          </div>
          {msg.message && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm text-foreground">{msg.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}