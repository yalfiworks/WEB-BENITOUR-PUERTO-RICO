const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://benitourpuertorico.com/#organization",
      name: "Benitour Puerto Rico",
      url: "https://benitourpuertorico.com/",
      logo: "https://benitourpuertorico.com/favicon-192.png",
      image: "https://benitourpuertorico.com/images/grupo-visita-guiada-benitour-barrio.jpg",
      email: "info@benitourpuertorico.com"
    },
    {
      "@type": "TouristTrip",
      "@id": "https://benitourpuertorico.com/#bad-bunny-tour",
      name: "Bad Bunny Tour en Vega Baja, Puerto Rico",
      description:
        "Tour cultural por el barrio donde creció Bad Bunny en Vega Baja, Puerto Rico, con 5 paradas auténticas, guías locales y grupos reducidos.",
      url: "https://benitourpuertorico.com/",
      image: [
        "https://benitourpuertorico.com/images/grupo-visita-guiada-benitour-barrio.jpg",
        "https://benitourpuertorico.com/images/paradas/parada-03.webp",
        "https://benitourpuertorico.com/images/guias/guias-hero.webp"
      ],
      touristType: ["Fans de Bad Bunny", "Visitantes de Puerto Rico", "Turismo cultural"],
      itinerary: {
        "@type": "ItemList",
        itemListElement: [
          "Donde Todo Comenzó",
          "La Suan",
          "El Primer Mural",
          "Iglesia del barrio",
          "La Casita"
        ]
      },
      offers: {
        "@type": "Offer",
        price: "139",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://benitourpuertorico.com/#reservar"
      },
      provider: {
        "@id": "https://benitourpuertorico.com/#organization"
      },
      areaServed: {
        "@type": "Place",
        name: "Vega Baja, Puerto Rico"
      }
    }
  ]
};

export function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
