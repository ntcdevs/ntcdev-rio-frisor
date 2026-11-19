"use client";
import { useEffect, useState } from "react";
import { X, MapPin, ChevronRight, Phone, ArrowLeft, Clock } from "lucide-react";
import config from "@/config.json";

type Loc = { name: string; area: string; type: string; address: string; phone?: string; bookingUrl?: string };

/* Opens when any link with href="#bestill" is clicked (hero, navbar, offer, services).
   Picking a location goes to its bookingUrl; without one it shows "Kommer snart". */
export default function BookingModal() {
  const { theme } = config;
  const locations = config.locations.items as Loc[];
  const { accentColor, primaryColor, textColor } = theme;
  const [open, setOpen] = useState(false);
  const [soon, setSoon] = useState<Loc | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href="#bestill"]');
      if (!a) return;
      e.preventDefault();
      setSoon(null);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const choose = (l: Loc) => {
    if (l.bookingUrl) {
      window.open(l.bookingUrl, "_blank", "noopener,noreferrer");
      setOpen(false);
    } else {
      setSoon(l);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Bestill time">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-8"
        style={{ backgroundColor: primaryColor, border: `1px solid ${accentColor}55` }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label="Lukk" className="absolute top-4 right-4 p-2 hover:opacity-70"
          style={{ color: textColor }}>
          <X size={20} />
        </button>

        {!soon ? (
          <>
            <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accentColor }}>
              Bestill time
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold mb-2" style={{ color: textColor }}>
              Velg lokasjon
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-sm mb-6" style={{ color: `${textColor}66` }}>
              Hvilken salong vil du bestille time hos?
            </p>
            <div className="space-y-3">
              {locations.map((l) => (
                <button key={l.area} onClick={() => choose(l)}
                  className="w-full flex items-center gap-4 p-5 text-left transition-colors duration-300"
                  style={{ border: `1px solid ${textColor}14`, backgroundColor: `${textColor}05` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accentColor}88`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${textColor}14`)}>
                  <MapPin size={20} className="flex-shrink-0" style={{ color: accentColor }} />
                  <span className="flex-1">
                    <span className="block font-[family-name:var(--font-playfair)] text-xl font-semibold" style={{ color: textColor }}>{l.area}</span>
                    <span className="block font-[family-name:var(--font-inter)] text-xs mt-0.5" style={{ color: `${textColor}66` }}>
                      {l.type} · {l.address}
                    </span>
                  </span>
                  <ChevronRight size={18} style={{ color: accentColor }} />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Clock size={40} className="mx-auto mb-5" style={{ color: accentColor }} />
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold mb-2" style={{ color: textColor }}>
              Kommer snart
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-sm mb-1" style={{ color: accentColor }}>
              {soon.name} · {soon.area}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-8" style={{ color: `${textColor}80` }}>
              Online bestilling er ikke åpen ennå.{soon.phone ? " Ring oss så hjelper vi deg med å bestille time." : ""}
            </p>
            {soon.phone && (
              <a href={`tel:${soon.phone}`} className="inline-flex items-center gap-3 px-8 py-3 mb-4 text-sm tracking-widest uppercase font-semibold font-[family-name:var(--font-inter)] hover:opacity-90"
                style={{ backgroundColor: accentColor, color: primaryColor }}>
                <Phone size={16} /> {soon.phone.replace("+47", "")}
              </a>
            )}
            <button onClick={() => setSoon(null)}
              className="flex items-center gap-2 mx-auto text-xs tracking-widest uppercase font-[family-name:var(--font-inter)] hover:opacity-70"
              style={{ color: `${textColor}80` }}>
              <ArrowLeft size={14} /> Velg annen lokasjon
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
