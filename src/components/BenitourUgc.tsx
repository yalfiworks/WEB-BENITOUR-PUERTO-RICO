"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";

const ugcItems = [
  { src: "/videos/1.MP4", poster: "/videos/posters/poster-01.jpg" },
  { src: "/videos/2.MP4", poster: "/videos/posters/poster-02.jpg" },
  { src: "/videos/3.MP4", poster: "/videos/posters/poster-03.jpg" },
  { src: "/videos/4.MP4", poster: "/videos/posters/poster-04.jpg" },
  { src: "/videos/5.MP4", poster: "/videos/posters/poster-05.jpg" }
];

const copy = {
  es: {
    soundOn: "Activa el sonido",
    unmute: "Activar sonido",
    mute: "Silenciar",
    nav: "Navegación vídeos",
    video: "Vídeo"
  },
  en: {
    soundOn: "Turn sound on",
    unmute: "Turn sound on",
    mute: "Mute",
    nav: "Video navigation",
    video: "Video"
  }
};

export function BenitourUgc({ language }: LanguageProps) {
  const t = copy[language];
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(() => ugcItems.map(() => true));
  const [playing, setPlaying] = useState(() => ugcItems.map(() => false));
  const [progress, setProgress] = useState(() => ugcItems.map(() => 0));
  const [toastHidden, setToastHidden] = useState(() => ugcItems.map(() => false));

  const counters = useMemo(
    () => ugcItems.map((_, index) => `${String(index + 1).padStart(2, "0")} / ${String(ugcItems.length).padStart(2, "0")}`),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const firstVideo = videoRefs.current[0];
    if (!section || !firstVideo || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          firstVideo.muted = true;
          firstVideo.play().catch(() => undefined);
        } else {
          pauseAll();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".bnt-ugc__card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index > -1) setActive(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let down = false;
    let startX = 0;
    let startLeft = 0;

    function onMouseDown(event: MouseEvent) {
      if (!track) return;
      down = true;
      track.classList.add("is-dragging");
      startX = event.pageX - track.offsetLeft;
      startLeft = track.scrollLeft;
    }

    function endDrag() {
      down = false;
      track?.classList.remove("is-dragging");
    }

    function onMouseMove(event: MouseEvent) {
      if (!down || !track) return;
      event.preventDefault();
      track.scrollLeft = startLeft - (event.pageX - track.offsetLeft - startX) * 1.4;
    }

    track.addEventListener("mousedown", onMouseDown);
    track.addEventListener("mouseleave", endDrag);
    track.addEventListener("mouseup", endDrag);
    track.addEventListener("mousemove", onMouseMove);

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("mouseleave", endDrag);
      track.removeEventListener("mouseup", endDrag);
      track.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  function pauseAll(exceptIndex?: number) {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === exceptIndex) return;
      video.pause();
    });
  }

  function syncPlaying(index: number, isPlaying: boolean) {
    setPlaying((current) => current.map((value, idx) => (idx === index ? isPlaying : value)));
  }

  function togglePlay(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused || video.ended) {
      pauseAll(index);
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function toggleSound(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;
    setMuted((current) => current.map((value, idx) => (idx === index ? video.muted : value)));
    setToastHidden((current) => current.map((value, idx) => (idx === index ? !video.muted : value)));

    if (!video.paused) return;
    pauseAll(index);
    video.play().catch(() => undefined);
  }

  function updateProgress(index: number) {
    const video = videoRefs.current[index];
    if (!video || !video.duration) return;
    setProgress((current) => current.map((value, idx) => (idx === index ? (video.currentTime / video.duration) * 100 : value)));
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(".bnt-ugc__card")[index];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    track.scrollTo({ left: track.scrollLeft + cardRect.left - trackRect.left, behavior: "smooth" });
  }

  return (
    <section className="bnt-ugc" id="benitour-ugc" ref={sectionRef}>
      <div className="bnt-ugc__wrapper">
        <div className="bnt-ugc__arrows bnt-ugc__arrows--floating" aria-hidden="true">
          <button className="bnt-ugc__arr" type="button" onClick={() => goTo(active - 1)}>
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="bnt-ugc__arr" type="button" onClick={() => goTo(active + 1)}>
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        <div className="bnt-ugc__track" ref={trackRef} role="list">
          {ugcItems.map((item, index) => (
            <article className="bnt-ugc__card" role="listitem" data-card-index={index} key={item.src}>
              <div className={`bnt-ugc__video-wrap${playing[index] ? "" : " is-paused"}`} onClick={() => togglePlay(index)}>
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  className="bnt-ugc__video"
                  preload="metadata"
                  poster={item.poster}
                  muted={muted[index]}
                  playsInline
                  onPlay={() => syncPlaying(index, true)}
                  onPause={() => syncPlaying(index, false)}
                  onEnded={() => syncPlaying(index, false)}
                  onTimeUpdate={() => updateProgress(index)}
                >
                  <source src={item.src} type="video/mp4" />
                </video>

                <div className="bnt-ugc__play-overlay" aria-hidden="true">
                  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.42)" />
                    <polygon points="32,22 62,40 32,58" fill="rgba(245,200,0,0.95)" />
                  </svg>
                </div>

                <div className={`bnt-ugc__sound-toast${toastHidden[index] ? " is-hidden" : ""}`} aria-hidden="true">
                  <div className="bnt-ugc__toast-mic">
                    <svg viewBox="0 0 24 24">
                      <rect x="9" y="2" width="6" height="11" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <span className="bnt-ugc__toast-label">{t.soundOn}</span>
                  <span className="bnt-ugc__toast-dot" />
                </div>

                <button
                  className={`bnt-ugc__sound-btn${muted[index] ? "" : " unmuted"}`}
                  type="button"
                  aria-label={muted[index] ? t.unmute : t.mute}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSound(index);
                  }}
                >
                  <svg className="icon-off" viewBox="0 0 24 24">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  <svg className="icon-on" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                </button>

                <span className="bnt-ugc__counter" aria-hidden="true">{counters[index]}</span>
                <div className="bnt-ugc__progress" aria-hidden="true">
                  <div className="bnt-ugc__progress-fill" style={{ width: `${progress[index]}%` }} />
                </div>
              </div>

            </article>
          ))}
        </div>

        <nav className="bnt-ugc__dots" aria-label={t.nav}>
          {ugcItems.map((item, index) => (
            <button
              className={`bnt-ugc__dot${index === active ? " is-active" : ""}`}
              type="button"
              aria-label={`${t.video} ${index + 1}`}
              onClick={() => goTo(index)}
              key={item.src}
            />
          ))}
        </nav>

        <div className="bnt-ugc__rule" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
