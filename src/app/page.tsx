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

export default function Home() {
  return (
    <main>
      <SeoJsonLd />
      <BenitourHero />
      <BenitourUgc />
      <BenitourParadas />
      <BenitourNumeros />
      <BenitourIncluye />
      <BenitourGuias />
      <BenitourFaq />
      <BenitourCierre />
      <BenitourLegalHub />
      <BenitourAssetWarmup />
    </main>
  );
}
