"use client";

import { useEffect, useRef, useState } from "react";

const kpis = [
  {
    order: "01",
    badge: "HRS",
    value: "3",
    countTarget: 3,
    label: "Duración",
    subtext: "Experiencia completa",
    background: "3",
    ariaLabel: "Duración: 3 horas"
  },
  {
    order: "02",
    badge: "PARADAS",
    value: "5",
    countTarget: 5,
    label: "Localizaciones",
    subtext: "Todas en Vega Baja",
    background: "5",
    ariaLabel: "Paradas: 5"
  },
  {
    order: "03",
    badge: "IDIOMAS",
    value: "ES\nEN",
    label: "Disponible en",
    subtext: "Español · English",
    background: "",
    ariaLabel: "Idiomas: Español e Inglés",
    kind: "langs"
  },
  {
    order: "04",
    badge: "USD",
    value: "$139",
    label: "Desde · por persona",
    subtext: "Precio todo incluido",
    background: "$",
    ariaLabel: "Precio: desde $139 por persona",
    kind: "price"
  },
  {
    order: "05",
    badge: "GRUPO",
    value: "6",
    countTarget: 6,
    label: "Personas por grupo",
    subtext: "Experiencia íntima",
    background: "6",
    ariaLabel: "Grupo de 6 personas"
  }
];

export function BenitourNumeros() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => kpis.map(() => false));
  const [animatedValues, setAnimatedValues] = useState<string[]>(() => kpis.map((kpi) => kpi.value));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setEntered(true);
      setVisibleItems(kpis.map(() => true));
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEntered(true);
      setVisibleItems(kpis.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        kpis.forEach((_, index) => {
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
  }, []);

  function animateCounter(index: number) {
    const target = kpis[index].countTarget;
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
      aria-label="El Tour en Números - Benitour"
      ref={sectionRef}
    >
      <div className="bnt-numeros__stripe-bottom" aria-hidden="true" />
      <span className="bnt-numeros__deco" aria-hidden="true">Benitour · Vega Baja · Puerto Rico · 2026</span>

      <div className="bnt-numeros__inner">
        <header className="bnt-numeros__header">
          <h2 className="bnt-numeros__title">
            El Tour <span data-text="en">en</span><br />
            Números
          </h2>
          <p className="bnt-numeros__subtitle">Todo lo que necesitas saber antes de reservar. Sin letra pequeña.</p>
        </header>

        <div className="bnt-numeros__grid-wrap">
          <div className="bnt-numeros__grid" role="list" aria-label="Datos del tour">
            {kpis.map((kpi, index) => (
              <article
                className={`bnt-kpi-item${visibleItems[index] ? " is-visible" : ""}`}
                role="listitem"
                aria-label={kpi.ariaLabel}
                key={kpi.order}
              >
                <span className="bnt-kpi-item__order" aria-hidden="true">{kpi.order}</span>
                <span className="bnt-kpi-item__badge">{kpi.badge}</span>

                {kpi.kind === "langs" ? (
                  <span className="bnt-kpi-item__langs" aria-label="Español e Inglés">
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
          <p><span aria-hidden="true" />Vega Baja, Puerto Rico · La cuna del reggaetón</p>
          <div><span aria-hidden="true" />Plazas disponibles esta semana</div>
        </footer>
      </div>
    </section>
  );
}
