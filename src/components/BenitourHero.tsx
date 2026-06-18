"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/language";
import { BokunButton } from "./BokunButton";

const copy = {
  es: {
    kicker: "Vega Baja, Puerto Rico",
    title: ["BAD BUNNY", "TOUR", "SU BARRIO"],
    subtitle: "El barrio de Benito. La cuna del reggaetón.",
    marker: "TiRaRáS FoToS De SoBrA.",
    primary: "RESERVA TU TOUR",
    secondary: "VER EL RECORRIDO",
    statsStops: "PARADAS",
    statsPeople: "TuRiStAs",
    statsGroup: "POR GRUPO"
  },
  en: {
    kicker: "Vega Baja, Puerto Rico",
    title: ["BAD BUNNY", "HOMETOWN", "TOUR"],
    subtitle: "Benito's neighborhood. The cradle of reggaeton.",
    marker: "YoU WiLL TaKe ToNs Of PhOtOs.",
    primary: "BOOK YOUR TOUR",
    secondary: "SEE THE ROUTE",
    statsStops: "STOPS",
    statsPeople: "GuEsTs",
    statsGroup: "PER GROUP"
  }
};

export function BenitourHero({
  language,
  onLanguageChange
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState({ hours: 3, stops: 5, people: 6 });
  const heroRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeaderScrolled(!entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsBar = statsRef.current;
    if (!statsBar || !("IntersectionObserver" in window)) {
      setStatsVisible(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStatsVisible(true);
      return;
    }

    let triggered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        setStatsVisible(true);
        animateStats(setStats);
      },
      { threshold: 0.25 }
    );

    observer.observe(statsBar);
    return () => observer.disconnect();
  }, []);

  const current = copy[language];

  function handleSmoothScroll(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById("benitour-paradas");
    const headerHeight = document.getElementById("bntHeader")?.offsetHeight ?? 0;

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
  }

  return (
    <>
      <header className={`bnt-header${headerScrolled ? " is-scrolled" : ""}`} id="bntHeader" role="banner">
        <a href="/" className="bnt-header__logo" aria-label="Benitour Home">
          <Image
            className="bnt-header__logo-img"
            src="/images/benitour-logo.png"
            alt="Benitour"
            width={400}
            height={240}
            priority
          />
        </a>

        <nav className="bnt-header__nav" aria-label="Main navigation">
          <div className="bnt-lang-toggle" id="bntLangToggle" role="group" aria-label="Seleccionar idioma" data-active={language}>
            <div className="bnt-lang-toggle__slider" aria-hidden="true" />
            <button
              type="button"
              className={`bnt-lang-opt${language === "es" ? " is-active" : ""}`}
              lang="es"
              aria-pressed={language === "es"}
              aria-label="Espanol"
              onClick={() => onLanguageChange("es")}
            >
              <span>ES</span>
            </button>
            <div className="bnt-lang-toggle__divider" aria-hidden="true" />
            <button
              type="button"
              className={`bnt-lang-opt${language === "en" ? " is-active" : ""}`}
              lang="en"
              aria-pressed={language === "en"}
              aria-label="English"
              onClick={() => onLanguageChange("en")}
            >
              <span>EN</span>
            </button>
          </div>

          <BokunButton id="bokun_header_cta" className="bnt-cta-header" ariaLabel={current.primary}>
            {current.primary}
            <span className="bnt-cta-header__arr" aria-hidden="true">
              →
            </span>
          </BokunButton>
        </nav>
      </header>

      <section className="bnt-hero" id="benitour-hero" aria-labelledby="bntHeroTitle" ref={heroRef}>
        <Image
          className="bnt-hero__img"
          src="/images/grupo-visita-guiada-benitour-barrio.jpg"
          alt="Grupo de Benitour en el barrio de Bad Bunny en Vega Baja, Puerto Rico"
          fill
          sizes="100vw"
          priority
        />

        <div className="bnt-hero__overlay" aria-hidden="true" />
        <div className="bnt-hero__accent-bar" aria-hidden="true" />

        <div className="bnt-hero__body">
          <p className="bnt-hero__kicker" aria-hidden="true">
            <span className="bnt-hero__kicker-dot" />
            {current.kicker}
          </p>

          <h1 className="bnt-hero__title" id="bntHeroTitle">
            <span className="bnt-title-line">
              <span className="bnt-title-line__inner">{current.title[0]}</span>
            </span>
            <span className="bnt-title-line">
              <span className="bnt-title-line__inner">
                {language === "es" ? (
                  <>
                    {current.title[1]} <span className="bnt-title-white">EN</span>
                  </>
                ) : (
                  current.title[1]
                )}
              </span>
            </span>
            <span className="bnt-title-line">
              <span className="bnt-title-line__inner">{current.title[2]}</span>
            </span>
          </h1>

          <div className="bnt-hero__title-rule" aria-hidden="true" />

          <p className="bnt-hero__sub">
            {current.subtitle}
            {" "}
            <em className="bnt-sub__styled">{current.marker}</em>
          </p>

          <div className="bnt-hero__ctas">
            <BokunButton id="bokun_hero_primary" className="bnt-btn-primary" ariaLabel={current.primary}>
              {current.primary}
              <span className="bnt-btn-primary__icon" aria-hidden="true">
                →
              </span>
            </BokunButton>
            <a href="#benitour-paradas" className="bnt-btn-secondary" data-smooth-scroll onClick={handleSmoothScroll}>
              {current.secondary}
              <span className="bnt-btn-secondary__icon" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

          <div
            className="bnt-hero__stats"
            aria-label="3 H, 5 paradas, 6 turistas por grupo"
            ref={statsRef}
          >
            <div className={`bnt-stat${statsVisible ? " is-visible" : ""}`} style={{ transitionDelay: "0ms" }}>
              <span className="bnt-stat__num">{stats.hours} H</span>
              <span className="bnt-stat__label">TOUR</span>
            </div>
            <div className={`bnt-stat-divider${statsVisible ? " is-visible" : ""}`} />
            <div className={`bnt-stat${statsVisible ? " is-visible" : ""}`} style={{ transitionDelay: "80ms" }}>
              <span className="bnt-stat__num">{stats.stops}</span>
              <span className="bnt-stat__label">{current.statsStops}</span>
            </div>
            <div className={`bnt-stat-divider${statsVisible ? " is-visible" : ""}`} />
            <div className={`bnt-stat${statsVisible ? " is-visible" : ""}`} style={{ transitionDelay: "160ms" }}>
              <span className="bnt-stat__num">{stats.people}</span>
              <span className="bnt-stat__label">
                <span className="bnt-stat__mixed">{current.statsPeople}</span> {current.statsGroup}
              </span>
            </div>
          </div>
        </div>

        <div className="bnt-hero__scroll" aria-hidden="true">
          <span>scroll</span>
          <div className="bnt-hero__scroll-line" />
        </div>
      </section>
    </>
  );
}

function animateStats(setStats: React.Dispatch<React.SetStateAction<{ hours: number; stops: number; people: number }>>) {
  const start = performance.now();
  const duration = 650;

  function easeOutExpo(t: number) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function step(timestamp: number) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = easeOutExpo(progress);

    setStats({
      hours: Math.round(eased * 3),
      stops: Math.round(eased * 5),
      people: Math.round(eased * 6)
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setStats({ hours: 3, stops: 5, people: 6 });
    }
  }

  setStats({ hours: 0, stops: 0, people: 0 });
  requestAnimationFrame(step);
}
