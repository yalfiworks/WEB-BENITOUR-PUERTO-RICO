"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BokunButton } from "./BokunButton";

const paradas = [
  {
    image: "/images/paradas/parada-01.webp",
    title: "Donde Todo Comenzó",
    displayTitle: "DoNdE ToDo CoMeNzÓ",
    hook: "Donde recogía carritos y manejaba caja antes de llenar estadios.",
    description: "Donde recogía carritos y manejaba caja antes de llenar estadios. Una parada clave para entender el origen real de la historia."
  },
  {
    image: "/images/paradas/parada-02.webp",
    title: "La Suan",
    displayTitle: "La SuAn",
    hook: "La high school del barrio y la panadería que terminó metida en unas lyrics.",
    description: "La high school del barrio y la panadería que terminó metida en unas lyrics."
  },
  {
    image: "/images/paradas/parada-03.webp",
    title: "El Primer Mural",
    displayTitle: "El PrImEr MuRaL",
    hook: "El mural donde todo fan se detiene a tirar la foto obligatoria.",
    description: "El mural donde el tour se vuelve foto, barrio y memoria. Una de las paradas más visuales del recorrido."
  },
  {
    image: "/images/paradas/parada-04.webp",
    title: "¿Benito Monaguillo?",
    displayTitle: "¿BeNiTo MoNaGuIllO?",
    hook: "La iglesia del barrio y una historia que conecta con sus primeros años.",
    description: "Una parada tranquila del recorrido, con la historia local que conecta el barrio con los primeros años de Benito."
  },
  {
    image: "/images/paradas/parada-05.webp",
    title: "La Casita",
    displayTitle: "La CaSiTa",
    hook: "La casita rosa, el origen íntimo del recorrido y de la historia.",
    description: "La casita rosa y el paisaje de Vega Baja cierran el recorrido con una mirada más íntima al origen."
  }
];

function padded(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function BenitourParadas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".bnt-parada-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = cards.indexOf(entry.target as HTMLElement);
          if (index > -1) setActive(index);
        });
      },
      { root: track, threshold: 0.58 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    function onMouseDown(event: MouseEvent) {
      if (!track) return;
      isDown = true;
      startX = event.pageX - track.offsetLeft;
      startLeft = track.scrollLeft;
      track.classList.add("is-dragging");
    }

    function onMouseMove(event: MouseEvent) {
      if (!isDown || !track) return;
      event.preventDefault();
      track.scrollLeft = startLeft - (event.pageX - track.offsetLeft - startX) * 1.2;
    }

    function endDrag() {
      isDown = false;
      track?.classList.remove("is-dragging");
    }

    track.addEventListener("mousedown", onMouseDown);
    track.addEventListener("mousemove", onMouseMove);
    track.addEventListener("mouseup", endDrag);
    track.addEventListener("mouseleave", endDrag);

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("mousemove", onMouseMove);
      track.removeEventListener("mouseup", endDrag);
      track.removeEventListener("mouseleave", endDrag);
    };
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>(".bnt-parada-card");
    const card = cards?.[Math.max(0, Math.min(paradas.length - 1, index))];
    if (!track || !card) return;

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    track.scrollTo({ left: track.scrollLeft + cardRect.left - trackRect.left, behavior: "smooth" });
  }

  const modal = modalIndex === null ? null : paradas[modalIndex];

  return (
    <section
      className={`bnt-paradas-section${entered ? " bnt-section-entered" : ""}`}
      id="benitour-paradas"
      aria-label="Las Paradas del Tour Benitour"
      ref={sectionRef}
    >
      <span className="bnt-paradas__deco" aria-hidden="true">Vega Baja · Puerto Rico · 2026</span>

      <header className="bnt-paradas__header">
        <div className="bnt-paradas__header-row">
          <h2 className="bnt-paradas__title" aria-label="El Recorrido">
            <span><span>El&nbsp;ReCoRriDo</span></span>
          </h2>

          <nav className="bnt-paradas__arrows" aria-label="Navegación del carousel">
            <button className="bnt-paradas__nav-btn" type="button" aria-label="Parada anterior" onClick={() => goTo(active - 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4L6 10L12 16" /></svg>
            </button>
            <button className="bnt-paradas__nav-btn" type="button" aria-label="Siguiente parada" onClick={() => goTo(active + 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4L14 10L8 16" /></svg>
            </button>
          </nav>
        </div>
      </header>

      <div className="bnt-paradas__carousel-wrapper">
        <div className="bnt-paradas__track" ref={trackRef} role="list" aria-label="Paradas del recorrido">
          {paradas.map((parada, index) => (
            <article
              className="bnt-parada-card"
              role="listitem"
              key={parada.title}
              tabIndex={0}
              aria-label={`Parada ${index + 1}: ${parada.title}`}
              style={{ transitionDelay: `${index * 90}ms` }}
              onClick={() => setModalIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setModalIndex(index);
                }
              }}
            >
              <div className="bnt-parada-card__image-wrap">
                <Image
                  className="bnt-parada-card__image"
                  src={parada.image}
                  alt={parada.title}
                  fill
                  sizes="(min-width: 1200px) 340px, (min-width: 768px) 36vw, 74vw"
                />
                <div className="bnt-parada-card__overlay" aria-hidden="true" />
              </div>

              <span className="bnt-parada-card__number" aria-hidden="true">PARADA {padded(index)}</span>
              <span className="bnt-parada-card__open" aria-hidden="true">
                <svg viewBox="0 0 14 14"><path d="M3 11L11 3M11 3H6M11 3V8" /></svg>
              </span>

              <div className="bnt-parada-card__content">
                <h3>{parada.displayTitle}</h3>
                <p>{parada.hook}</p>
              </div>
              <span className="bnt-parada-card__bar" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>

      <div className="bnt-paradas__scroll-hint" aria-hidden="true">
        <svg viewBox="0 0 28 14"><path d="M2 7H24M24 7L18 2M24 7L18 12" /></svg>
        Swipe para explorar
      </div>

      <nav className="bnt-paradas__dots" aria-label="Indicadores de posición">
        {paradas.map((parada, index) => (
          <button
            className={`bnt-paradas__dot${index === active ? " is-active" : ""}`}
            type="button"
            aria-label={`Ir a parada ${index + 1}`}
            aria-current={index === active}
            key={parada.title}
            onClick={() => goTo(index)}
          />
        ))}
      </nav>

      <div className="bnt-paradas__cta-strip">
        <p>5 PARADAS · 3 HORAS · VEGA BAJA, PR</p>
        <BokunButton id="bokun_paradas_cta" className="bnt-paradas__cta" ariaLabel="Reservar tu Tour">
          <span>Reservar tu Tour</span>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10H16M16 10L11 5M16 10L11 15" /></svg>
        </BokunButton>
      </div>

      <div
        className={`bnt-paradas-modal${modal ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={modal?.title ?? "Detalle de parada"}
        onClick={(event) => {
          if (event.target === event.currentTarget) setModalIndex(null);
        }}
      >
        {modal && (
          <div className="bnt-paradas-modal__panel">
            <button className="bnt-paradas-modal__close" type="button" aria-label="Cerrar" onClick={() => setModalIndex(null)}>
              <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 3L11 11M11 3L3 11" /></svg>
            </button>
            <div className="bnt-paradas-modal__image-wrap">
              <Image
                className="bnt-paradas-modal__image"
                src={modal.image}
                alt={modal.title}
                fill
                sizes="(min-width: 768px) 600px, 92vw"
              />
              <div className="bnt-paradas-modal__image-overlay" aria-hidden="true" />
              <span className="bnt-paradas-modal__big-number" aria-hidden="true">{padded(modalIndex ?? 0)}</span>
            </div>
            <div className="bnt-paradas-modal__body">
              <p className="bnt-paradas-modal__kicker">PARADA {padded(modalIndex ?? 0)}</p>
              <h3>{modal.title}</h3>
              <div className="bnt-paradas-modal__divider" aria-hidden="true" />
              <p>{modal.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
