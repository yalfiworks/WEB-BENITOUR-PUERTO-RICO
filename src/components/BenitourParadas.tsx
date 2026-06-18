"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";
import { BokunButton } from "./BokunButton";

const paradas = {
  es: [
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
  ],
  en: [
    {
      image: "/images/paradas/parada-01.webp",
      title: "Where It All Began",
      displayTitle: "WhErE It BeGaN",
      hook: "Where he collected carts and worked registers before filling stadiums.",
      description: "Where he collected carts and worked registers before filling stadiums. A key stop to understand the real origin of the story."
    },
    {
      image: "/images/paradas/parada-02.webp",
      title: "La Suan",
      displayTitle: "La SuAn",
      hook: "The neighborhood high school and bakery that made their way into the lyrics.",
      description: "The neighborhood high school and bakery that made their way into the lyrics."
    },
    {
      image: "/images/paradas/parada-03.webp",
      title: "The First Mural",
      displayTitle: "FiRsT MuRaL",
      hook: "The mural where every fan stops for the must-have photo.",
      description: "The mural where the tour becomes photo, neighborhood and memory. One of the most visual stops on the route."
    },
    {
      image: "/images/paradas/parada-04.webp",
      title: "Benito as an Altar Boy?",
      displayTitle: "BeNiTo AlTaR BoY?",
      hook: "The neighborhood church and a story connected to his early years.",
      description: "A quieter stop on the route, with local history that connects the neighborhood to Benito's early years."
    },
    {
      image: "/images/paradas/parada-05.webp",
      title: "The Little House",
      displayTitle: "LiTtLe HoUsE",
      hook: "The pink little house, the intimate origin of the route and the story.",
      description: "The pink little house and the Vega Baja landscape close the route with a more intimate look at the origin."
    }
  ]
};

const copy = {
  es: {
    aria: "Las Paradas del Tour Benitour",
    deco: "Vega Baja · Puerto Rico · 2026",
    title: "El ReCoRriDo",
    nav: "Navegación del carousel",
    prev: "Parada anterior",
    next: "Siguiente parada",
    track: "Paradas del recorrido",
    stop: "PARADA",
    swipe: "Swipe para explorar",
    dots: "Indicadores de posición",
    go: "Ir a parada",
    strip: "5 PARADAS · 3 HORAS · VEGA BAJA, PR",
    cta: "Reservar tu Tour",
    dialog: "Detalle de parada",
    close: "Cerrar"
  },
  en: {
    aria: "Benitour route stops",
    deco: "Vega Baja · Puerto Rico · 2026",
    title: "ThE RoUtE",
    nav: "Carousel navigation",
    prev: "Previous stop",
    next: "Next stop",
    track: "Tour route stops",
    stop: "STOP",
    swipe: "Swipe to explore",
    dots: "Position indicators",
    go: "Go to stop",
    strip: "5 STOPS · 3 HOURS · VEGA BAJA, PR",
    cta: "Book Your Tour",
    dialog: "Stop details",
    close: "Close"
  }
};

function padded(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function BenitourParadas({ language }: LanguageProps) {
  const t = copy[language];
  const currentParadas = paradas[language];
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
    const card = cards?.[Math.max(0, Math.min(currentParadas.length - 1, index))];
    if (!track || !card) return;

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    track.scrollTo({ left: track.scrollLeft + cardRect.left - trackRect.left, behavior: "smooth" });
  }

  const modal = modalIndex === null ? null : currentParadas[modalIndex];

  return (
    <section
      className={`bnt-paradas-section${entered ? " bnt-section-entered" : ""}`}
      id="benitour-paradas"
      aria-label={t.aria}
      ref={sectionRef}
    >
      <span className="bnt-paradas__deco" aria-hidden="true">{t.deco}</span>

      <header className="bnt-paradas__header">
        <div className="bnt-paradas__header-row">
          <h2 className="bnt-paradas__title" aria-label={language === "es" ? "El Recorrido" : "The Route"}>
            <span><span>{t.title}</span></span>
          </h2>

          <nav className="bnt-paradas__arrows" aria-label={t.nav}>
            <button className="bnt-paradas__nav-btn" type="button" aria-label={t.prev} onClick={() => goTo(active - 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4L6 10L12 16" /></svg>
            </button>
            <button className="bnt-paradas__nav-btn" type="button" aria-label={t.next} onClick={() => goTo(active + 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4L14 10L8 16" /></svg>
            </button>
          </nav>
        </div>
      </header>

      <div className="bnt-paradas__carousel-wrapper">
        <div className="bnt-paradas__track" ref={trackRef} role="list" aria-label={t.track}>
          {currentParadas.map((parada, index) => (
            <article
              className="bnt-parada-card"
              role="listitem"
              key={parada.title}
              tabIndex={0}
              aria-label={`${t.stop} ${index + 1}: ${parada.title}`}
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

              <span className="bnt-parada-card__number" aria-hidden="true">{t.stop} {padded(index)}</span>
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
        {t.swipe}
      </div>

      <nav className="bnt-paradas__dots" aria-label={t.dots}>
        {currentParadas.map((parada, index) => (
          <button
            className={`bnt-paradas__dot${index === active ? " is-active" : ""}`}
            type="button"
            aria-label={`${t.go} ${index + 1}`}
            aria-current={index === active}
            key={parada.title}
            onClick={() => goTo(index)}
          />
        ))}
      </nav>

      <div className="bnt-paradas__cta-strip">
        <p>{t.strip}</p>
        <BokunButton id="bokun_paradas_cta" className="bnt-paradas__cta" ariaLabel={t.cta}>
          <span>{t.cta}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10H16M16 10L11 5M16 10L11 15" /></svg>
        </BokunButton>
      </div>

      <div
        className={`bnt-paradas-modal${modal ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={modal?.title ?? t.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) setModalIndex(null);
        }}
      >
        {modal && (
          <div className="bnt-paradas-modal__panel">
            <button className="bnt-paradas-modal__close" type="button" aria-label={t.close} onClick={() => setModalIndex(null)}>
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
              <p className="bnt-paradas-modal__kicker">{t.stop} {padded(modalIndex ?? 0)}</p>
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
