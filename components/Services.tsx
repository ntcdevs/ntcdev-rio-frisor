"use client";
import { useState } from "react";
import {
  Scissors, Sparkles, Star, Droplets, Wind, Crown,
  Dumbbell, Zap, UtensilsCrossed, Heart, Shield, Flame,
  Wrench, Home, Leaf, Footprints, Syringe, Hand, Gem, Eye, type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import config from "@/config.json";

const ICON_MAP: Record<string, LucideIcon> = {
  Scissors, Sparkles, Star, Droplets, Wind, Crown,
  Dumbbell, Zap, UtensilsCrossed, Heart, Shield, Flame,
  Wrench, Home, Leaf, Footprints, Syringe, Hand, Gem, Eye,
};

type Item = { name: string; desc: string; icon: string; price?: string };
// Flat list used by the non-grouped variants; grouped sites use services.groups.
const legacyItems: Item[] = (config.services as unknown as { items?: Item[] }).items ?? [];

function imgUrl(p: string) {
  if (p.startsWith("http") || p.startsWith("/")) return p;
  const base = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";
  return base ? `${base}/${p}` : "";
}

/* ─── Grid Icons ─────────────────────────────────────────────────────────────
   3-column grid with icon, name, desc, price. Dark luxury or light.
────────────────────────────────────────────────────────────────────────────── */
function GridIconsServices() {
  const { theme, services } = config;
  const { accentColor, primaryColor, textColor, mode } = theme;
  const isLight = mode === "light";
  const bg = isLight ? "#f8fafc" : primaryColor;
  const cardBg = isLight ? "#ffffff" : `${textColor}05`;
  const cardBorder = isLight ? "#e2e8f0" : `${textColor}0d`;
  const headingColor = isLight ? "#0f172a" : textColor;
  const bodyColor = isLight ? "#64748b" : `${textColor}66`;

  return (
    <section id="tjenester" className="py-32 px-6 relative" style={{ backgroundColor: bg }}>
      {!isLight && (
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      )}
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader eyebrow={services.eyebrow} heading={services.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legacyItems.map((s, i) => {
            const Icon: LucideIcon = ICON_MAP[s.icon] ?? Star;
            return (
              <div key={i} className="group relative p-8 transition-all duration-500 cursor-default"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? "0 1px 3px rgba(0,0,0,0.05)" : "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}55`; (e.currentTarget as HTMLElement).style.boxShadow = isLight ? `0 4px 20px rgba(0,0,0,0.08)` : "none"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = cardBorder; (e.currentTarget as HTMLElement).style.boxShadow = isLight ? "0 1px 3px rgba(0,0,0,0.05)" : "none"; }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 transition-colors duration-300" style={{ border: `1px solid ${accentColor}33` }}>
                    <Icon size={20} style={{ color: accentColor }} />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold" style={{ color: headingColor }}>{s.name}</h3>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-6 font-light" style={{ color: bodyColor }}>{s.desc}</p>
                {"price" in s && s.price && (
                  <p className="font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide" style={{ color: accentColor }}>{s.price}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-16">
          <a href="#kontakt" className="inline-block px-10 py-4 font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase transition-all duration-300"
            style={{ border: `1px solid ${accentColor}`, color: accentColor }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = accentColor; (e.currentTarget as HTMLElement).style.color = isLight ? "#ffffff" : primaryColor; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = accentColor; }}>
            {services.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Alternating ────────────────────────────────────────────────────────────
   Each service = full row, alternating left-right. Corporate/trade feel.
────────────────────────────────────────────────────────────────────────────── */
function AlternatingServices() {
  const { theme, services } = config;
  const { accentColor, primaryColor, textColor, mode } = theme;
  const isLight = mode === "light";
  const bg = isLight ? "#ffffff" : primaryColor;
  const headingColor = isLight ? "#0f172a" : textColor;
  const bodyColor = isLight ? "#64748b" : `${textColor}66`;

  return (
    <section id="tjenester" className="py-32 px-6" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={services.eyebrow} heading={services.heading} />
        <div className="space-y-0">
          {legacyItems.map((s, i) => {
            const Icon: LucideIcon = ICON_MAP[s.icon] ?? Star;
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-0 ${!isEven ? "md:flex-row-reverse" : ""}`}
                style={{ borderTop: `1px solid ${isLight ? "#f1f5f9" : `${textColor}08`}` }}>
                {/* Number / Icon side */}
                <div className="w-full md:w-1/3 py-16 px-8 md:px-16 flex items-center justify-center"
                  style={{ backgroundColor: i === 0 ? accentColor : isLight ? "#f8fafc" : `${textColor}04` }}>
                  <div className="text-center">
                    <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-4 ${i === 0 ? "" : ""}`}
                      style={{ border: `2px solid ${i === 0 ? (isLight ? "#ffffff44" : `${primaryColor}44`) : `${accentColor}33`}` }}>
                      <Icon size={28} style={{ color: i === 0 ? (isLight ? "#ffffff" : primaryColor) : accentColor }} />
                    </div>
                    <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold opacity-20"
                      style={{ color: i === 0 ? (isLight ? "#ffffff" : primaryColor) : accentColor }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>
                {/* Text side */}
                <div className="w-full md:w-2/3 py-16 px-8 md:px-16">
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold mb-4" style={{ color: headingColor }}>{s.name}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed font-light mb-6" style={{ color: bodyColor }}>{s.desc}</p>
                  {"price" in s && s.price && (
                    <span className="font-[family-name:var(--font-inter)] text-sm font-semibold px-4 py-2 inline-block"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                      {s.price}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-16">
          <a href="#kontakt" className="inline-block px-10 py-4 font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase font-semibold transition-all duration-300"
            style={{ backgroundColor: accentColor, color: isLight ? "#ffffff" : primaryColor }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
            {services.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Price Cards ────────────────────────────────────────────────────────────
   Cards with pricing front and center. Works for: cleaning, gym, clinic.
────────────────────────────────────────────────────────────────────────────── */
function PriceCardsServices() {
  const { theme, services } = config;
  const { accentColor, primaryColor, textColor, mode } = theme;
  const isLight = mode === "light";
  const bg = isLight ? "#f8fafc" : primaryColor;
  const headingColor = isLight ? "#0f172a" : textColor;
  const bodyColor = isLight ? "#64748b" : `${textColor}66`;

  return (
    <section id="tjenester" className="py-32 px-6" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={services.eyebrow} heading={services.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legacyItems.map((s, i) => {
            const Icon: LucideIcon = ICON_MAP[s.icon] ?? Star;
            const featured = i === Math.floor(legacyItems.length / 2);
            return (
              <div key={i} className="relative flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: featured ? accentColor : (isLight ? "#ffffff" : `${textColor}05`),
                  border: `1px solid ${featured ? "transparent" : (isLight ? "#e2e8f0" : `${textColor}0d`)}`,
                  boxShadow: featured ? `0 20px 60px ${accentColor}33` : (isLight ? "0 1px 3px rgba(0,0,0,0.06)" : "none"),
                }}>
                {featured && (
                  <div className="text-center py-2 text-xs font-[family-name:var(--font-inter)] tracking-widest uppercase font-semibold"
                    style={{ backgroundColor: isLight ? primaryColor : "#ffffff", color: isLight ? "#ffffff" : primaryColor }}>
                    Mest Populær
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon size={22} style={{ color: featured ? (isLight ? primaryColor : "#0c0c0c") : accentColor }} />
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold"
                      style={{ color: featured ? (isLight ? primaryColor : "#0c0c0c") : headingColor }}>
                      {s.name}
                    </h3>
                  </div>
                  {"price" in s && s.price && (
                    <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-2"
                      style={{ color: featured ? (isLight ? primaryColor : "#0c0c0c") : accentColor }}>
                      {s.price}
                    </p>
                  )}
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed font-light mb-8 flex-1"
                    style={{ color: featured ? (isLight ? `${primaryColor}cc` : "rgba(0,0,0,0.6)") : bodyColor }}>
                    {s.desc}
                  </p>
                  <a href="#kontakt" className="block text-center py-3 text-sm tracking-widest uppercase font-semibold font-[family-name:var(--font-inter)] transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: featured ? (isLight ? primaryColor : "#0c0c0c") : accentColor,
                      color: featured ? "#ffffff" : (isLight ? "#ffffff" : primaryColor),
                    }}>
                    {services.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Split Tabs ─────────────────────────────────────────────────────────────
   Multi-salon: tabs switch between groups (e.g. Frisør / Klinikk).
────────────────────────────────────────────────────────────────────────────── */
type Group = {
  id: string; name: string; tagline: string; image?: string;
  items: { name: string; desc: string; icon: string; price?: string }[];
};

function SplitTabsServices() {
  const { theme, services } = config as unknown as {
    theme: typeof config.theme;
    services: { eyebrow: string; heading: string; cta: string; groups: Group[] };
  };
  const { accentColor, primaryColor, textColor, mode } = theme;
  const isLight = mode === "light";
  const bg = isLight ? "#f8fafc" : primaryColor;
  const headingColor = isLight ? "#0f172a" : textColor;
  const bodyColor = isLight ? "#64748b" : `${textColor}66`;
  const cardBorder = isLight ? "#e2e8f0" : `${textColor}0d`;
  const [active, setActive] = useState(0);
  const group = services.groups[active];
  const img = group.image ? imgUrl(group.image) : "";

  return (
    <section id="tjenester" className="py-32 px-6" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={services.eyebrow} heading={services.heading} />

        <div className="flex justify-center gap-3 mb-14" role="tablist">
          {services.groups.map((g, i) => {
            const on = i === active;
            return (
              <button key={g.id} role="tab" aria-selected={on} onClick={() => setActive(i)}
                className="px-8 sm:px-12 py-4 text-sm tracking-widest uppercase font-semibold font-[family-name:var(--font-inter)] transition-all duration-300"
                style={{
                  backgroundColor: on ? accentColor : "transparent",
                  color: on ? (isLight ? "#ffffff" : primaryColor) : accentColor,
                  border: `1px solid ${accentColor}`,
                }}>
                {g.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 relative overflow-hidden min-h-[320px]" style={{ border: `1px solid ${cardBorder}` }}>
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={group.name} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))" }} />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold" style={{ color: accentColor }}>{group.name}</h3>
              <p className="font-[family-name:var(--font-inter)] text-sm mt-2 text-white/80">{group.tagline}</p>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {group.items.map((s, i) => {
              const Icon: LucideIcon = ICON_MAP[s.icon] ?? Star;
              return (
                <div key={i} className="p-6 transition-colors duration-300"
                  style={{ backgroundColor: isLight ? "#ffffff" : `${textColor}05`, border: `1px solid ${cardBorder}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} style={{ color: accentColor }} />
                    <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold" style={{ color: headingColor }}>{s.name}</h4>
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed font-light" style={{ color: bodyColor }}>{s.desc}</p>
                  {s.price && (
                    <p className="font-[family-name:var(--font-inter)] text-sm font-semibold mt-4" style={{ color: accentColor }}>{s.price}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <a href="#kontakt" className="inline-block px-10 py-4 font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: accentColor, color: isLight ? "#ffffff" : primaryColor }}>
            {services.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const { variant } = config.services;
  if (variant === "split-tabs") return <SplitTabsServices />;
  if (variant === "alternating")  return <AlternatingServices />;
  if (variant === "price-cards")  return <PriceCardsServices />;
  return <GridIconsServices />;
}
