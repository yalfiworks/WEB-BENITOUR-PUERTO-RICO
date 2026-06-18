"use client";

import { useEffect, useRef, useState } from "react";

const includedItems = [
  { title: "Transporte privado entre paradas", note: "Sin autobús, sin grupos de 50" },
  { title: "Guía local de Vega Baja", note: "Gente que lo vio crecer, no actores" },
  { title: "Snack pack" },
  { title: "Acceso a las 5 paradas" },
  { title: "Fotos compartidas del grupo" }
];

const excludedItems = [
  { title: "Comida principal", note: "Sí paramos en sitios típicos" },
  { title: "Propinas al guía", note: "Siempre bienvenidas, nunca obligatorias" },
  { title: "Transporte hasta el punto de encuentro", note: "No cubierto por el tour" }
];

export function BenitourIncluye() {
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
      aria-label="Qué incluye el tour"
      ref={sectionRef}
    >
      <div className="bnt-incluye__stripe-bottom" aria-hidden="true" />
      <span className="bnt-incluye__deco-bg" aria-hidden="true">Incluye</span>

      <div className="bnt-incluye__inner">
        <header className="bnt-incluye__header">
          <h2 className="bnt-incluye__title">
            Qué <span data-text="incluye">incluye</span>
          </h2>
          <p className="bnt-incluye__subtitle">
            Sin letra pequeña. Lo que viene con el tour y lo que no, para que decidas sin sorpresas.
          </p>
        </header>

        <div className="bnt-incluye__grid" role="region" aria-label="Lista de incluidos y no incluidos">
          <FeatureColumn
            type="si"
            title="Sí incluye"
            count={includedItems.length}
            footer="Todo listo desde que llegas al punto de encuentro"
            items={includedItems}
          />
          <FeatureColumn
            type="no"
            title="No incluye"
            count={excludedItems.length}
            footer="Avisamos con tiempo si algo cambia"
            items={excludedItems}
          />
        </div>

        <div className="bnt-incluye__honesty" role="note" aria-label="Nota de atención">
          <div className="bnt-incluye__honesty-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5v4M8 11v.5" />
            </svg>
          </div>
          <div className="bnt-incluye__honesty-body">
            <span className="bnt-incluye__honesty-label">
              Atención: trae el móvil cargado, así <em>TiRaRáS FoToS De SoBrA</em>
            </span>
            <p>
              Sí paramos en sitios típicos durante el recorrido, pero la comida principal no está incluida. Queremos que comas donde tú quieras, no donde nos convenga a nosotros.
            </p>
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
  items
}: {
  type: "si" | "no";
  title: string;
  count: number;
  footer: string;
  items: Array<{ title: string; note?: string }>;
}) {
  const isIncluded = type === "si";

  return (
    <article className={`bnt-incluye-col bnt-incluye-col--${type}`} aria-label={isIncluded ? "Qué sí incluye el tour" : "Qué no incluye el tour"}>
      <div className="bnt-incluye-col__header">
        <div className="bnt-incluye-col__icon" aria-hidden="true">
          {isIncluded ? (
            <svg viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" /></svg>
          ) : (
            <svg viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" /></svg>
          )}
        </div>
        <h3>{title}</h3>
        <span aria-label={`${count} elementos`}>{count}</span>
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
