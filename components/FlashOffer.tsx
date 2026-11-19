"use client";
import { Zap } from "lucide-react";
import config from "@/config.json";

export default function FlashOffer() {
  const { theme, offer } = config;
  const { accentColor, primaryColor } = theme;

  return (
    <section id="tilbud" className="px-6 py-10" style={{ backgroundColor: primaryColor }}>
      <div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7"
        style={{ backgroundColor: accentColor, color: primaryColor }}
      >
        <div className="flex items-center gap-5 text-center md:text-left">
          <Zap size={34} className="hidden sm:block flex-shrink-0" />
          <div>
            <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.3em] uppercase font-semibold opacity-70">
              {offer.badge}
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold leading-tight">
              {offer.text}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-sm mt-1 opacity-75">{offer.note}</p>
          </div>
        </div>
        <a
          href="#bestill"
          className="px-8 py-3 text-sm tracking-widest uppercase font-semibold font-[family-name:var(--font-inter)] whitespace-nowrap transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor, color: accentColor }}
        >
          {offer.cta}
        </a>
      </div>
    </section>
  );
}
