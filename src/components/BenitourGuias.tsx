"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";

const copy = {
  es: {
    titleTop: "Nuestros",
    titleAccent: "Guías",
    titleBottom: "Locales",
    subtitle: "Vecinos de Vega Baja que conocen cada esquina, cada historia y cada cara del barrio.",
    imageAlt: "Edwin y Karla, guías locales de Benitour",
    heroTag: "BENITOUR · VEGA BAJA, PR",
    heroTitle: "Conoce a tu",
    heroAccent: "Equipo",
    cta: "Grupo de 6 personas · 3 horas · Vega Baja, PR",
    guides: [
      {
        number: "01",
        name: "Edwin Marrero",
        role: "GUÍA LOCAL DE VEGA BAJA",
        bio: "Creció en el barrio y conoce cada esquina, cada historia y cada cara detrás de Vega Baja.",
        image: "/images/guias/guia-edwin.webp"
      },
      {
        number: "02",
        name: "Karla Martínez",
        role: "GUÍA LOCAL DE VEGA BAJA",
        bio: "Lleva años documentando la cultura del barrio y sabe cómo hacerte sentir parte de ella.",
        image: "/images/guias/guia-karla.webp"
      }
    ]
  },
  en: {
    titleTop: "Our",
    titleAccent: "Local",
    titleBottom: "Guides",
    subtitle: "Vega Baja locals who know every corner, every story and every face in the neighborhood.",
    imageAlt: "Edwin and Karla, local Benitour guides",
    heroTag: "BENITOUR · VEGA BAJA, PR",
    heroTitle: "Meet your",
    heroAccent: "Team",
    cta: "Groups of 6 people · 3 hours · Vega Baja, PR",
    guides: [
      {
        number: "01",
        name: "Edwin Marrero",
        role: "LOCAL GUIDE FROM VEGA BAJA",
        bio: "He grew up in the neighborhood and knows every corner, every story and every face behind Vega Baja.",
        image: "/images/guias/guia-edwin.webp"
      },
      {
        number: "02",
        name: "Karla Martínez",
        role: "LOCAL GUIDE FROM VEGA BAJA",
        bio: "She has spent years documenting the neighborhood culture and knows how to make you feel part of it.",
        image: "/images/guias/guia-karla.webp"
      }
    ]
  }
};

export function BenitourGuias({ language }: LanguageProps) {
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
      { rootMargin: "720px 0px", threshold: 0.01 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`bnt-guias${entered ? " bnt-guias--entered" : ""}`}
      id="benitour-guias"
      aria-labelledby="benitour-guias-title"
      ref={sectionRef}
    >
      <div className="bnt-guias__noise" aria-hidden="true" />
      <div className="bnt-guias__inner">
        <header className="bnt-guias__header">
          <h2 className="bnt-guias__h2" id="benitour-guias-title">
            {t.titleTop} <em>{t.titleAccent}</em><br />
            <span>{t.titleBottom}</span>
          </h2>
          <p>{t.subtitle}</p>
          <div className="bnt-guias__rule" aria-hidden="true">
            <span /><span /><span />
          </div>
        </header>

        <div className="bnt-guias__hero">
          <Image
            src="/images/guias/guias-hero.webp"
            alt={t.imageAlt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1040px) 1040px, 100vw"
          />
          <div className="bnt-guias__hero-overlay" aria-hidden="true" />
          <div className="bnt-guias__hero-content">
            <span>{t.heroTag}</span>
            <h3>
              {t.heroTitle}<br />
              <strong>{t.heroAccent}</strong>
            </h3>
          </div>
          <div className="bnt-guias__hero-deco" aria-hidden="true">
            <span /><span /><span />
          </div>
        </div>

        <div className="bnt-guias__grid">
          {t.guides.map((guide, index) => (
            <article className="bnt-guia-card" style={{ transitionDelay: `${index * 180}ms` }} key={guide.name}>
              <div className="bnt-guia-card__photo">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1100px) 420px, (min-width: 600px) 340px, 90vw"
                />
                <span aria-hidden="true">{guide.number}</span>
              </div>
              <div className="bnt-guia-card__body">
                <span className="bnt-guia-card__tag">{guide.role}</span>
                <h3>{guide.name}</h3>
                <p>{guide.bio}</p>
                <span className="bnt-guia-card__accent" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="bnt-guias__cta">
          <span>{t.cta}</span>
        </div>
      </div>
    </section>
  );
}
