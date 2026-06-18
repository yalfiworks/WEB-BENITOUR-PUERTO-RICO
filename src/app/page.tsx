"use client";

import { BenitourCierre } from "@/components/BenitourCierre";
import { BenitourAssetWarmup } from "@/components/BenitourAssetWarmup";
import { BenitourHero } from "@/components/BenitourHero";
import { BenitourFaq } from "@/components/BenitourFaq";
import { BenitourGuias } from "@/components/BenitourGuias";
import { BenitourIncluye } from "@/components/BenitourIncluye";
import { BenitourLegalHub } from "@/components/BenitourLegalHub";
import { BenitourNumeros } from "@/components/BenitourNumeros";
import { BenitourParadas } from "@/components/BenitourParadas";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { BenitourUgc } from "@/components/BenitourUgc";
import { useState } from "react";
import type { Language } from "@/lib/language";

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <main lang={language}>
      <SeoJsonLd />
      <BenitourHero language={language} onLanguageChange={setLanguage} />
      <BenitourUgc language={language} />
      <BenitourParadas language={language} />
      <BenitourNumeros language={language} />
      <BenitourIncluye language={language} />
      <BenitourGuias language={language} />
      <BenitourFaq language={language} />
      <BenitourCierre language={language} />
      <BenitourLegalHub language={language} />
      <BenitourAssetWarmup />
    </main>
  );
}
