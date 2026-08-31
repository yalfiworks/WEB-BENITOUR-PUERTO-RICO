import type { NextConfig } from "next";

const refreshedImagePaths = [
  "/images/grupo-visita-guiada-benitour-barrio.jpg",
  "/images/paradas/parada-01.webp",
  "/images/paradas/parada-02.webp",
  "/images/paradas/parada-03.webp",
  "/images/paradas/parada-04.webp"
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 95],
    localPatterns: [
      {
        pathname: "/images/**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      ...refreshedImagePaths.map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate"
          }
        ]
      })),
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:asset(favicon.ico|favicon-192.png|apple-touch-icon.png|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
