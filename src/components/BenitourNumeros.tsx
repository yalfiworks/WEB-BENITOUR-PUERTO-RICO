"use client";

import { useEffect, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";

const kpis = {
  es: [
    { order: "01", badge: "HRS", value: "3", countTarget: 3, label: "Duración", subtext: "Experiencia completa", background: "3", ariaLabel: "Duración: 3 horas" },
    { order: "02", badge: "PARADAS", value: "5", countTarget: 5, label: "Localizaciones", subtext: "Todas en Vega Baja", background: "5", ariaLabel: "Paradas: 5" },
    { order: "03", badge: "IDIOMAS", value: "ES\nEN", label: "Disponible en", subtext: "Español · English", background: "", ariaLabel: "Idiomas: Español e Inglés", kind: "langs" },
    { order: "04", badge: "USD", value: "$139", label: "Desde · por persona", subtext: "Precio todo incluido", background: "$", ariaLabel: "Precio: desde $139 por persona", kind: "price" },
    { order: "05", badge: "GRUPO", value: "6", countTarget: 6, label: "Personas por grupo", subtext: "Experiencia íntima", background: "6", ariaLabel: "Grupo de 6 personas" }
  ],
  en: [
    { order: "01", badge: "HRS", value: "3", countTarget: 3, label: "Duration", subtext: "Complete experience", background: "3", ariaLabel: "Duration: 3 hours" },
    { order: "02", badge: "STOPS", value: "5", countTarget: 5, label: "Locations", subtext: "All in Vega Baja", background: "5", ariaLabel: "Stops: 5" },
    { order: "03", badge: "LANG", value: "ES\nEN", label: "Available in", subtext: "Spanish · English", background: "", ariaLabel: "Languages: Spanish and English", kind: "langs" },
    { order: "04", badge: "USD", value: "$139", label: "From · per person", subtext: "All-included price", background: "$", ariaLabel: "Price: from $139 per person", kind: "price" },
    { order: "05", badge: "GROUP", value: "6", countTarget: 6, label: "People per group", subtext: "Intimate experience", background: "6", ariaLabel: "Group of 6 people" }
  ]
};

const copy = {
  es: {
    aria: "El Tour en Números - Benitour",
    deco: "Benitour · Vega Baja · Puerto Rico · 2026",
    titleTop: "El Tour",
    titleAccent: "en",
    titleBottom: "Números",
    subtitle: "Todo lo que necesitas saber antes de reservar. Sin letra pequeña.",
    grid: "Datos del tour",
    langAria: "Español e Inglés",
    footerLeft: "Vega Baja, Puerto Rico · La cuna del reggaetón",
    footerRight: "Plazas disponibles esta semana"
  },
  en: {
    aria: "The Tour in Numbers - Benitour",
    deco: "Benitour · Vega Baja · Puerto Rico · 2026",
    titleTop: "The Tour",
    titleAccent: "in",
    titleBottom: "Numbers",
    subtitle: "Everything you need to know before booking. No fine print.",
    grid: "Tour facts",
    langAria: "Spanish and English",
    footerLeft: "Vega Baja, Puerto Rico · The cradle of reggaeton",
    footerRight: "Spots available this week"
  }
};

export function BenitourNumeros({ language }: LanguageProps) {
  const t = copy[language];
  const currentKpis = kpis[language];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => currentKpis.map(() => false));
  const [animatedValues, setAnimatedValues] = useState<string[]>(() => currentKpis.map((kpi) => kpi.value));

  useEffect(() => {
    setVisibleItems(currentKpis.map(() => entered));
    setAnimatedValues(currentKpis.map((kpi) => kpi.value));
  }, [currentKpis, entered]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setEntered(true);
      setVisibleItems(currentKpis.map(() => true));
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEntered(true);
      setVisibleItems(currentKpis.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        currentKpis.forEach((_, index) => {
          window.setTimeout(() => {
            setVisibleItems((current) => current.map((value, idx) => (idx === index ? true : value)));
            animateCounter(index);
          }, index * 110);
        });
        observer.disconnect();
      },
      { threshold: 0.16 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [currentKpis]);

  function animateCounter(index: number) {
    const target = currentKpis[index].countTarget;
    if (!target) return;
    const finalTarget = target;

    const duration = 900;
    const start = performance.now();

    function easeOutExpo(progress: number) {
      return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    }

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const next = Math.round(easeOutExpo(progress) * finalTarget);
      setAnimatedValues((current) => current.map((value, idx) => (idx === index ? String(next) : value)));
      if (progress < 1) requestAnimationFrame(tick);
    }

    setAnimatedValues((current) => current.map((value, idx) => (idx === index ? "0" : value)));
    requestAnimationFrame(tick);
  }

  return (
    <section
      className={`bnt-numeros-section${entered ? " bnt-numeros-section--entered" : ""}`}
      id="benitour-numeros"
      aria-label={t.aria}
      ref={sectionRef}
    >
      <div className="bnt-numeros__stripe-bottom" aria-hidden="true" />
      <span className="bnt-numeros__deco" aria-hidden="true">{t.deco}</span>

      <div className="bnt-numeros__inner">
        <header className="bnt-numeros__header">
          <h2 className="bnt-numeros__title">
            {t.titleTop} <span data-text={t.titleAccent}>{t.titleAccent}</span><br />
            {t.titleBottom}
          </h2>
          <p className="bnt-numeros__subtitle">{t.subtitle}</p>
        </header>

        <div className="bnt-numeros__grid-wrap">
          <div className="bnt-numeros__grid" role="list" aria-label={t.grid}>
            {currentKpis.map((kpi, index) => (
              <article
                className={`bnt-kpi-item${visibleItems[index] ? " is-visible" : ""}`}
                role="listitem"
                aria-label={kpi.ariaLabel}
                key={kpi.order}
              >
                <span className="bnt-kpi-item__order" aria-hidden="true">{kpi.order}</span>
                <span className="bnt-kpi-item__badge">{kpi.badge}</span>

                {kpi.kind === "langs" ? (
                  <span className="bnt-kpi-item__langs" aria-label={t.langAria}>
                    ES<br />EN
                  </span>
                ) : (
                  <span className={`bnt-kpi-item__number${kpi.kind === "price" ? " bnt-kpi-item__number--price" : ""}`}>
                    {animatedValues[index]}
                  </span>
                )}

                <span className="bnt-kpi-item__label">{kpi.label}</span>
                <span className="bnt-kpi-item__sub">{kpi.subtext}</span>
                {kpi.background && <span className="bnt-kpi-item__bg-num" aria-hidden="true">{kpi.background}</span>}
              </article>
            ))}
          </div>
        </div>

        <footer className="bnt-numeros__footer">
          <p><span aria-hidden="true" />{t.footerLeft}</p>
          <div><span aria-hidden="true" />{t.footerRight}</div>
        </footer>
      </div>
    </section>
  );
}
