"use client";

import { useEffect } from "react";

const imageAssets = [
  "/images/paradas/parada-01.webp",
  "/images/paradas/parada-02.webp",
  "/images/paradas/parada-03.webp",
  "/images/paradas/parada-04.webp",
  "/images/paradas/parada-05.webp",
  "/images/guias/guias-hero.webp",
  "/images/guias/guia-edwin.webp",
  "/images/guias/guia-karla.webp",
  "/images/cierre/cierre-desktop.jpg",
  "/images/cierre/cierre-mobile.jpg",
  "/videos/posters/poster-02.jpg",
  "/videos/posters/poster-03.jpg",
  "/videos/posters/poster-04.jpg",
  "/videos/posters/poster-05.jpg"
];

const videoAssets = [
  "/videos/1.MP4",
  "/videos/2.MP4",
  "/videos/3.MP4",
  "/videos/4.MP4",
  "/videos/5.MP4"
];

export function BenitourAssetWarmup() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const warmImages = () => {
      imageAssets.forEach((href) => {
        const image = new Image();
        image.decoding = "async";
        image.src = href;
      });
    };

    const warmVideos = () => {
      videoAssets.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "video";
        link.href = href;
        document.head.appendChild(link);
      });
    };

    const runIdle: (callback: IdleRequestCallback) => number =
      window.requestIdleCallback ?? ((callback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 900));
    const cancelIdle: (id: number) => void = window.cancelIdleCallback ?? window.clearTimeout;
    const firstIdle = runIdle(() => {
      warmImages();
      window.setTimeout(warmVideos, 1200);
    });

    return () => {
      cancelIdle(firstIdle);
    };
  }, []);

  return null;
}
