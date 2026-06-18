"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LanguageProps } from "@/lib/language";
import { BokunButton } from "./BokunButton";

const copy = {
  es: {
    navLinks: [
      { label: "Las 5 paradas", href: "#benitour-paradas" },
      { label: "Qué incluye", href: "#benitour-incluye" },
      { label: "Preguntas frecuentes", href: "#benitour-faq" },
      { label: "Reserva tu Tour", href: "#reservar", booking: true }
    ],
    legalLinks: [
      { label: "Política de Privacidad", key: "privacy" },
      { label: "Aviso Legal", key: "legal" },
      { label: "Términos del Servicio", key: "terms" },
      { label: "Contacto", key: "contact" }
    ],
    aria: "Cierre y reserva de Benitour",
    slogan: <>DoNdE ToDo<br />CoMeNzÓ</>,
    subtitle: "El barrio de Benito. La cuna del reggaetón. Una sola reserva.",
    cta: "Reserva tu Tour",
    price: <>Desde <strong>139</strong>&nbsp;·&nbsp;por persona · grupos 6</>,
    tour: "El tour",
    follow: "Síguenos",
    contact: "Contacto",
    footerNav: "Menú pie de página",
    legalNav: "Enlaces legales",
    disclaimer: "Benitour es un tour cultural independiente operado por La Brega LLC. No está afiliado oficialmente a Bad Bunny, Rimas Entertainment ni a ninguna entidad asociada al artista."
  },
  en: {
    navLinks: [
      { label: "The 5 stops", href: "#benitour-paradas" },
      { label: "What's included", href: "#benitour-incluye" },
      { label: "FAQ", href: "#benitour-faq" },
      { label: "Book Your Tour", href: "#reservar", booking: true }
    ],
    legalLinks: [
      { label: "Privacy Policy", key: "privacy" },
      { label: "Legal Notice", key: "legal" },
      { label: "Terms of Service", key: "terms" },
      { label: "Contact", key: "contact" }
    ],
    aria: "Benitour closing and booking",
    slogan: <>WhErE It All<br />BeGaN</>,
    subtitle: "Benito's neighborhood. The cradle of reggaeton. One simple booking.",
    cta: "Book Your Tour",
    price: <>From <strong>139</strong>&nbsp;·&nbsp;per person · groups of 6</>,
    tour: "The tour",
    follow: "Follow us",
    contact: "Contact",
    footerNav: "Footer menu",
    legalNav: "Legal links",
    disclaimer: "Benitour is an independent cultural tour operated by La Brega LLC. It is not officially affiliated with Bad Bunny, Rimas Entertainment or any entity associated with the artist."
  }
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 10H17M17 10L11 4M17 10L11 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallArrow() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6h8M8 4l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BenitourCierre({ language }: LanguageProps) {
  const t = copy[language];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function openLegal(key: string) {
    window.dispatchEvent(new CustomEvent("benitour:open-legal", { detail: { key } }));
  }

  return (
    <section
      className={`bnt-cierre-root${visible ? " is-visible" : ""}`}
      id="benitour-cierre"
      aria-label={t.aria}
      ref={sectionRef}
    >
      <div className="bnt-cierre-section">
        <div className="bnt-cierre-circle" aria-hidden="true" />
        <div className="bnt-cierre-circle-2" aria-hidden="true" />
        <span className="bnt-cierre-deco-bg" aria-hidden="true">Brega</span>

        <div className="bnt-cierre-group-photo" aria-hidden="true">
          <Image className="bnt-cierre-photo bnt-cierre-photo--desktop" src="/images/cierre/cierre-desktop.jpg" alt="" width={1600} height={900} sizes="100vw" />
          <Image className="bnt-cierre-photo bnt-cierre-photo--mobile" src="/images/cierre/cierre-mobile.jpg" alt="" width={900} height={1200} sizes="100vw" />
        </div>

        <div className="bnt-cierre-hero">
          <h2 className="bnt-cierre-lema bnt-cierre-reveal" style={{ transitionDelay: "0.06s" }}>
            {t.slogan}
          </h2>
          <p className="bnt-cierre-sublema bnt-cierre-reveal" style={{ transitionDelay: "0.12s" }}>
            {t.subtitle}
          </p>
          <div className="bnt-cierre-cta-wrap bnt-cierre-reveal" style={{ transitionDelay: "0.18s" }}>
            <BokunButton id="bokun_cierre_cta" className="bnt-cierre-btn" ariaLabel={t.cta}>
              {t.cta}
              <ArrowIcon />
            </BokunButton>
            <p className="bnt-cierre-precio">{t.price}</p>
          </div>
        </div>

        <div className="bnt-cierre-divider" aria-hidden="true" />

        <nav className="bnt-cierre-grid" aria-label={t.footerNav}>
          <div className="bnt-slide-left" data-delay="0">
            <span className="bnt-cierre-col-title bnt-stagger-left">{t.tour}</span>
            <div className="bnt-cierre-nav">
              {t.navLinks.map((link, index) => (
                link.booking ? (
                  <BokunButton id="bokun_cierre_nav" className="bnt-cierre-nav-link bnt-stagger-left" ariaLabel={link.label} key={link.label}>
                    {link.label}
                    <SmallArrow />
                  </BokunButton>
                ) : (
                  <a className="bnt-cierre-nav-link bnt-stagger-left" href={link.href} style={{ transitionDelay: `${0.12 + index * 0.06}s` }} key={link.label}>
                    {link.label}
                    <SmallArrow />
                  </a>
                )
              ))}
            </div>
          </div>

          <div className="bnt-slide-center" style={{ transitionDelay: "0.08s" }}>
            <span className="bnt-cierre-col-title bnt-stagger-center">{t.follow}</span>
            <div className="bnt-cierre-social-col">
              <a href="https://instagram.com/BENITOURPUERTORICO" className="bnt-cierre-social-pill bnt-stagger-center" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Benitour">
                <InstagramIcon />
                @BENITOURPUERTORICO
              </a>
              <a href="https://tiktok.com/@BENITOURPUERTORICO" className="bnt-cierre-social-pill bnt-stagger-center" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Benitour">
                <TikTokIcon />
                @BENITOURPUERTORICO
              </a>
            </div>
          </div>

          <div className="bnt-slide-right" style={{ transitionDelay: "0.04s" }}>
            <span className="bnt-cierre-col-title bnt-stagger-right">{t.contact}</span>
            <a href="mailto:info@benitourpuertorico.com" className="bnt-cierre-contact-item bnt-stagger-right">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              info@benitourpuertorico.com
            </a>
            <a href="tel:+17875906800" className="bnt-cierre-contact-item bnt-stagger-right">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 2h2.5L7 5.5l-1.5 1C6.5 8.5 7.5 9.5 9.5 10.5l1-1.5L14 10.5V13C10 14.5 1.5 6 3 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              +1 (787) 590-6800
            </a>
            <span className="bnt-cierre-contact-item bnt-stagger-right">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2C5.8 2 4 3.8 4 6c0 3.3 4 8 4 8s4-4.7 4-8c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Vega Baja, Puerto Rico
            </span>
          </div>
        </nav>

        <div className="bnt-cierre-divider-2" aria-hidden="true" />

        <div className="bnt-cierre-bottom">
          <nav className="bnt-cierre-legal-links bnt-slide-bottom-left" aria-label={t.legalNav}>
            {t.legalLinks.map((link, index) => (
              <span className="bnt-cierre-legal-wrap" key={link.label}>
                {index > 0 && <span aria-hidden="true">·</span>}
                <button className="bnt-cierre-legal-link" type="button" onClick={() => openLegal(link.key)}>
                  {link.label}
                </button>
              </span>
            ))}
          </nav>

          <p className="bnt-cierre-legal bnt-slide-bottom-left">
            {t.disclaimer}
          </p>
          <span className="bnt-cierre-copy bnt-slide-bottom-right">
            © {new Date().getFullYear()} La Brega LLC
          </span>
        </div>

        <div className="bnt-cierre-stripe" aria-hidden="true" />
      </div>
    </section>
  );
}
