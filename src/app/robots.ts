import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://benitourpuertorico.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`,
      `${baseUrl}/video-sitemap.xml`
    ],
    host: baseUrl
  };
}
