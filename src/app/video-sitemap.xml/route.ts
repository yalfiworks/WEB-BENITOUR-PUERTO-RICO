const baseUrl = "https://benitourpuertorico.com";

const videos = [
  {
    content: "/videos/1.MP4",
    thumbnail: "/videos/posters/poster-01.jpg",
    title: "Opinion de turistas en el Bad Bunny Tour de Benitour",
    description: "Testimonio de turistas durante el recorrido cultural de Benitour en Vega Baja, Puerto Rico."
  },
  {
    content: "/videos/2.MP4",
    thumbnail: "/videos/posters/poster-02.jpg",
    title: "Experiencia de turistas con Benitour Puerto Rico",
    description: "Video vertical de visitantes viviendo el tour por el barrio donde crecio Bad Bunny."
  },
  {
    content: "/videos/3.MP4",
    thumbnail: "/videos/posters/poster-03.jpg",
    title: "Recorrido guiado por el barrio de Bad Bunny",
    description: "Contenido de Benitour mostrando el recorrido guiado por Vega Baja con guias locales."
  },
  {
    content: "/videos/4.MP4",
    thumbnail: "/videos/posters/poster-04.jpg",
    title: "Turistas en Benitour Vega Baja",
    description: "Video de turistas durante una parada del Bad Bunny Tour en Vega Baja, Puerto Rico."
  },
  {
    content: "/videos/5.MP4",
    thumbnail: "/videos/posters/poster-05.jpg",
    title: "Momento del tour cultural de Bad Bunny",
    description: "Clip corto de la experiencia Benitour Puerto Rico para descubrir el barrio de Benito."
  }
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/</loc>
${videos
  .map(
    (video) => `    <video:video>
      <video:thumbnail_loc>${baseUrl}${video.thumbnail}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${baseUrl}${video.content}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
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
