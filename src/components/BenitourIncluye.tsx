"use client";

import { useEffect, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";

const copy = {
  es: {
    includedItems: [
      { title: "Transporte privado entre paradas", note: "Sin autobús, sin grupos de 50" },
      { title: "Guía local de Vega Baja", note: "Gente que lo vio crecer, no actores" },
      { title: "Snack pack" },
      { title: "Acceso a las 5 paradas" },
      { title: "Fotos compartidas del grupo" }
    ],
    excludedItems: [
      { title: "Comida principal", note: "Sí paramos en sitios típicos" },
      { title: "Propinas al guía", note: "Siempre bienvenidas, nunca obligatorias" },
      { title: "Transporte hasta el punto de encuentro", note: "No cubierto por el tour" }
    ],
    aria: "Qué incluye el tour",
    deco: "Incluye",
    titleFirst: "Qué",
    titleAccent: "incluye",
    subtitle: "Sin letra pequeña. Lo que viene con el tour y lo que no, para que decidas sin sorpresas.",
    grid: "Lista de incluidos y no incluidos",
    yesTitle: "Sí incluye",
    noTitle: "No incluye",
    yesFooter: "Todo listo desde que llegas al punto de encuentro",
    noFooter: "Avisamos con tiempo si algo cambia",
    noteAria: "Nota de atención",
    noteLabel: <>Atención: trae el móvil cargado, así <em>TiRaRáS FoToS De SoBrA</em></>,
    noteBody: "Sí paramos en sitios típicos durante el recorrido, pero la comida principal no está incluida. Queremos que comas donde tú quieras, no donde nos convenga a nosotros.",
    yesAria: "Qué sí incluye el tour",
    noAria: "Qué no incluye el tour",
    countLabel: "elementos"
  },
  en: {
    includedItems: [
      { title: "Private transport between stops", note: "No bus, no groups of 50" },
      { title: "Local guide from Vega Baja", note: "People from the neighborhood, not actors" },
      { title: "Snack pack" },
      { title: "Access to all 5 stops" },
      { title: "Shared group photos" }
    ],
    excludedItems: [
      { title: "Main meal", note: "We do stop at local spots" },
      { title: "Guide tips", note: "Always welcome, never required" },
      { title: "Transport to the meeting point", note: "Not covered by the tour" }
    ],
    aria: "What the tour includes",
    deco: "Included",
    titleFirst: "What's",
    titleAccent: "included",
    subtitle: "No fine print. What comes with the tour and what does not, so you can book without surprises.",
    grid: "Included and not included list",
    yesTitle: "Included",
    noTitle: "Not included",
    yesFooter: "Everything ready from the moment you arrive at the meeting point",
    noFooter: "We will let you know in advance if anything changes",
    noteAria: "Important note",
    noteLabel: <>Heads up: bring your phone charged, because <em>YoU WiLL TaKe ToNs Of PhOtOs</em></>,
    noteBody: "We do stop at local food spots during the route, but the main meal is not included. We want you to eat where you want, not where it suits us.",
    yesAria: "What the tour includes",
    noAria: "What the tour does not include",
    countLabel: "items"
  }
};

export function BenitourIncluye({ language }: LanguageProps) {
  const t = copy[language];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`bnt-incluye-section${entered ? " bnt-incluye-section--entered" : ""}`}
      id="benitour-incluye"
      aria-label={t.aria}
      ref={sectionRef}
    >
      <div className="bnt-incluye__stripe-bottom" aria-hidden="true" />
      <span className="bnt-incluye__deco-bg" aria-hidden="true">{t.deco}</span>

      <div className="bnt-incluye__inner">
        <header className="bnt-incluye__header">
          <h2 className="bnt-incluye__title">
            {t.titleFirst} <span data-text={t.titleAccent}>{t.titleAccent}</span>
          </h2>
          <p className="bnt-incluye__subtitle">{t.subtitle}</p>
        </header>

        <div className="bnt-incluye__grid" role="region" aria-label={t.grid}>
          <FeatureColumn
            type="si"
            title={t.yesTitle}
            count={t.includedItems.length}
            footer={t.yesFooter}
            items={t.includedItems}
            ariaLabel={t.yesAria}
            countLabel={t.countLabel}
          />
          <FeatureColumn
            type="no"
            title={t.noTitle}
            count={t.excludedItems.length}
            footer={t.noFooter}
            items={t.excludedItems}
            ariaLabel={t.noAria}
            countLabel={t.countLabel}
          />
        </div>

        <div className="bnt-incluye__honesty" role="note" aria-label={t.noteAria}>
          <div className="bnt-incluye__honesty-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5v4M8 11v.5" />
            </svg>
          </div>
          <div className="bnt-incluye__honesty-body">
            <span className="bnt-incluye__honesty-label">
              {t.noteLabel}
            </span>
            <p>{t.noteBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureColumn({
  type,
  title,
  count,
  footer,
  items,
  ariaLabel,
  countLabel
}: {
  type: "si" | "no";
  title: string;
  count: number;
  footer: string;
  items: Array<{ title: string; note?: string }>;
  ariaLabel: string;
  countLabel: string;
}) {
  const isIncluded = type === "si";

  return (
    <article className={`bnt-incluye-col bnt-incluye-col--${type}`} aria-label={ariaLabel}>
      <div className="bnt-incluye-col__header">
        <div className="bnt-incluye-col__icon" aria-hidden="true">
          {isIncluded ? (
            <svg viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" /></svg>
          ) : (
            <svg viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" /></svg>
          )}
        </div>
        <h3>{title}</h3>
        <span aria-label={`${count} ${countLabel}`}>{count}</span>
      </div>

      <ul className="bnt-incluye-list" role="list">
        {items.map((item, index) => (
          <li className="bnt-incluye-list__item" style={{ transitionDelay: `${index * 55}ms` }} key={item.title}>
            <div className="bnt-incluye-list__bullet" aria-hidden="true">
              {isIncluded ? (
                <svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" /></svg>
              ) : (
                <svg viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3L3 9" /></svg>
              )}
            </div>
            <div className="bnt-incluye-list__body">
              <span>{item.title}</span>
              {item.note && <p>{item.note}</p>}
            </div>
          </li>
        ))}
      </ul>

      <footer className="bnt-incluye-col__footer">
        <p>{footer}</p>
      </footer>
    </article>
  );
}
