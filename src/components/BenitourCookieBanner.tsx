"use client";

import { useEffect, useState } from "react";
import type { LanguageProps } from "@/lib/language";

const STORAGE_KEY = "benitour-cookie-choice";

const copy = {
  es: {
    eyebrow: "Cookies",
    title: "El tour empieza mejor cuando el camino está claro.",
    body: "Usamos cookies esenciales y medición básica para mejorar la experiencia, entender qué funciona y mantener Benitour rápido.",
    accept: "Aceptar cookies",
    essential: "Solo esenciales",
    privacy: "Privacidad"
  },
  en: {
    eyebrow: "Cookies",
    title: "The tour starts better when the route is clear.",
    body: "We use essential cookies and basic measurement to improve the experience, understand what works and keep Benitour fast.",
    accept: "Accept cookies",
    essential: "Essentials only",
    privacy: "Privacy"
  }
};

export function BenitourCookieBanner({ language }: LanguageProps) {
  const [visible, setVisible] = useState(false);
  const t = copy[language];

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
  }, []);

  function saveChoice(choice: "accepted" | "essential") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  function openPrivacy() {
    window.dispatchEvent(new CustomEvent("benitour:open-legal", { detail: { key: "privacy" } }));
  }

  if (!visible) return null;

  return (
    <aside className="bnt-cookie" aria-label="Cookie notice">
      <div className="bnt-cookie__mark" aria-hidden="true">
        <span />
      </div>

      <div className="bnt-cookie__copy">
        <span className="bnt-cookie__eyebrow">{t.eyebrow}</span>
        <p className="bnt-cookie__title">{t.title}</p>
        <p className="bnt-cookie__body">{t.body}</p>
      </div>

      <div className="bnt-cookie__actions">
        <button className="bnt-cookie__accept" type="button" onClick={() => saveChoice("accepted")}>
          {t.accept}
        </button>
        <button className="bnt-cookie__ghost" type="button" onClick={() => saveChoice("essential")}>
          {t.essential}
        </button>
        <button className="bnt-cookie__link" type="button" onClick={openPrivacy}>
          {t.privacy}
        </button>
      </div>
    </aside>
  );
}
