const baseUrl = "https://benitourpuertorico.com";

const images = [
  {
    loc: "/images/grupo-visita-guiada-benitour-barrio.jpg",
    title: "Bad Bunny Tour en Vega Baja con Benitour Puerto Rico"
  },
  {
    loc: "/images/paradas/parada-01.webp",
    title: "Donde Todo Comenzo, primera parada del tour de Bad Bunny"
  },
  {
    loc: "/images/paradas/parada-02.webp",
    title: "La Suan en Vega Baja, parada del tour de Bad Bunny"
  },
  {
    loc: "/images/paradas/parada-03.webp",
    title: "Mural de Bad Bunny en Vega Baja, Puerto Rico"
  },
  {
    loc: "/images/paradas/parada-04.webp",
    title: "Recorrido guiado de Benitour por el barrio de Bad Bunny"
  },
  {
    loc: "/images/paradas/parada-05.webp",
    title: "Casa de Benito en Vega Baja, parada cultural del tour"
  },
  {
    loc: "/images/guias/guias-hero.webp",
    title: "Guias locales de Benitour Puerto Rico"
  },
  {
    loc: "/images/guias/guia-edwin.webp",
    title: "Edwin Marrero, guia oficial de Benitour"
  },
  {
    loc: "/images/guias/guia-karla.webp",
    title: "Karla Martinez, guia oficial de Benitour"
  },
  {
    loc: "/images/cierre/cierre-desktop.jpg",
    title: "Grupo de Benitour frente al mural de Bad Bunny"
  },
  {
    loc: "/images/cierre/cierre-mobile.jpg",
    title: "Foto vertical de Benitour en el mural de Bad Bunny"
  },
  {
    loc: "/images/benitour-logo.png",
    title: "Logo oficial de Benitour Puerto Rico"
  }
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
${images
  .map(
    (image) => `    <image:image>
      <image:loc>${baseUrl}${image.loc}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`
  )
  .join("\n")}
  </url>
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
