"use client";
import { Phone, MapPin } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import config from "@/config.json";

type Loc = { name: string; area: string; type: string; address: string; phone?: string };

export default function Locations() {
  const { theme } = config;
  const locations = config.locations as { eyebrow: string; heading: string; items: Loc[] };
  const { accentColor, primaryColor, textColor } = theme;
  const cardBorder = `${textColor}0d`;

  return (
    <section id="lokasjoner" className="py-32 px-6" style={{ backgroundColor: primaryColor }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={locations.eyebrow} heading={locations.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.items.map((l, i) => (
            <div key={i} className="p-8 transition-colors duration-300"
              style={{ backgroundColor: `${textColor}05`, border: `1px solid ${cardBorder}` }}>
              <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accentColor }}>
                {l.type}
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold mb-1" style={{ color: textColor }}>
                {l.area}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm mb-6" style={{ color: `${textColor}66` }}>{l.name}</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 mb-3 font-[family-name:var(--font-inter)] text-sm hover:opacity-80"
                style={{ color: textColor }}>
                <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                {l.address}
              </a>
              {l.phone && (
                <a href={`tel:${l.phone}`}
                  className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm font-medium hover:opacity-80"
                  style={{ color: textColor }}>
                  <Phone size={18} style={{ color: accentColor }} />
                  {l.phone.replace("+47", "")}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
