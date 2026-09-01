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
  "Recorre el barrio donde creció Bad Bunny. 5 paradas auténticas, 2 horas, guías locales de Vega Baja. Grupos de 6 personas. Desde $139. Reserva tu plaza hoy.";

const heroMobilePreloadSrcSet = [
  "/images/grupo-visita-guiada-benitour-barrio-mobile-vertical-360.avif?v=20260901-mobile-vertical-v1 360w",
  "/images/grupo-visita-guiada-benitour-barrio-mobile-vertical-540.avif?v=20260901-mobile-vertical-v1 540w",
  "/images/grupo-visita-guiada-benitour-barrio-mobile-vertical.avif?v=20260901-mobile-vertical-v1 737w"
].join(", ");

const heroTabletPreloadSrcSet = [
  "/images/grupo-visita-guiada-benitour-barrio-tablet-real-1024.webp?v=20260901-tablet-real 1024w",
  "/images/grupo-visita-guiada-benitour-barrio-tablet-real-1536.webp?v=20260901-tablet-real 1536w",
  "/images/grupo-visita-guiada-benitour-barrio-tablet-real.webp?v=20260901-tablet-real 2048w"
].join(", ");

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
      { url: "/google-favicon-48.png", type: "image/png", sizes: "48x48" },
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
        width: 6192,
        height: 4128,
        alt: "Grupo de Benitour frente al mural de Bad Bunny en Vega Baja, Puerto Rico"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Benitour Puerto Rico | Bad Bunny Tour en Vega Baja, PR",
    description: metaDescription,
    images: [
      {
        url: "/images/grupo-visita-guiada-benitour-barrio.jpg",
        alt: "Grupo de Benitour frente al mural de Bad Bunny en Vega Baja, Puerto Rico"
      }
    ]
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
        <link rel="icon" href="https://benitourpuertorico.com/google-favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="https://benitourpuertorico.com/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="shortcut icon" href="https://benitourpuertorico.com/favicon.ico" />
        <link rel="apple-touch-icon" href="https://benitourpuertorico.com/apple-touch-icon.png" />
        <link
          rel="preload"
          as="image"
          imageSrcSet={heroMobilePreloadSrcSet}
          imageSizes="100vw"
          media="(max-width: 639px) and (orientation: portrait)"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          imageSrcSet={heroTabletPreloadSrcSet}
          imageSizes="100vw"
          media="(min-width: 640px) and (max-width: 1279px) and (orientation: portrait)"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://widgets.bokun.io" />
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
