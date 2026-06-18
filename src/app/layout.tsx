import type { Metadata } from "next";
import Script from "next/script";
import { Barlow_Condensed, JetBrains_Mono, Manrope, Permanent_Marker } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap"
});

const metaDescription =
  "Recorre el barrio donde creció Bad Bunny. 5 paradas auténticas, 3 horas, guías locales de Vega Baja. Grupos de 6 personas. Desde $139. Reserva tu plaza hoy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://benitourpuertorico.com"),
  applicationName: "Benitour Puerto Rico",
  title: {
    default: "Benitour Puerto Rico | Bad Bunny Tour en Vega Baja, PR",
    template: "%s | Benitour Puerto Rico"
  },
  description: metaDescription,
  keywords: [
    "Benitour",
    "Benitour Puerto Rico",
    "Bad Bunny tour",
    "Bad Bunny barrio",
    "tour Bad Bunny Vega Baja",
    "Vega Baja Puerto Rico tour",
    "Bad Bunny Puerto Rico",
    "tour cultural Puerto Rico"
  ],
  authors: [{ name: "Benitour Puerto Rico" }],
  creator: "Benitour Puerto Rico",
  publisher: "Benitour Puerto Rico",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Benitour Puerto Rico | Bad Bunny Tour en Vega Baja, PR",
    description: metaDescription,
    url: "/",
    siteName: "Benitour Puerto Rico",
    locale: "es_PR",
    type: "website",
    images: [
      {
        url: "/images/grupo-visita-guiada-benitour-barrio.jpg",
        width: 1920,
        height: 1080,
        alt: "Grupo de Benitour frente al mural de Bad Bunny en Vega Baja, Puerto Rico"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Benitour Puerto Rico | Bad Bunny Tour en Vega Baja, PR",
    description: metaDescription,
    images: ["/images/grupo-visita-guiada-benitour-barrio.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${manrope.variable} ${jetBrainsMono.variable} ${permanentMarker.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="preload" as="image" href="/images/grupo-visita-guiada-benitour-barrio.jpg" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/benitour-logo.png" />
        <link rel="preload" as="image" href="/videos/posters/poster-01.jpg" />
      </head>
      <body>
        {children}
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=d9a0c12d-26e4-4dac-bb99-92aa2b0d5a8e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
