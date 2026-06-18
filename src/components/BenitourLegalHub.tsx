"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LanguageProps } from "@/lib/language";

type LegalKey = "privacy" | "terms" | "legal" | "contact";
type LegalTab = { key: LegalKey; label: string; number: string; title: string; accent: string; tags: string[] };
type LegalBlock = { number: string; title: string; body?: string; bullets?: string[] };

const legalEmail = "info@benitourpuertorico.com";
const phone = "+1 (787) 590-6800";
const address = "Sector La Cooperativa, PR-160 KM 8.1, Vega Baja, PR 00693, Puerto Rico";

const legalCopy: Record<
  "es" | "en",
  {
    tabs: LegalTab[];
    content: Record<LegalKey, LegalBlock[]>;
    eye: string;
    nav: string;
    close: string;
    noticeTitle: string;
    noticeBody: ReactNode;
    footer: string;
  }
> = {
  es: {
    tabs: [
      { key: "privacy", label: "Privacidad", number: "01", title: "Política de", accent: "Privacidad", tags: ["RGPD · CCPA · COPPA", "Bokun · GYG · Tripadvisor", "Última actualización: 4 de junio de 2026"] },
      { key: "terms", label: "Términos", number: "02", title: "Términos del", accent: "Servicio", tags: ["Reservas · Cancelaciones · Reembolsos", "Última actualización: 4 de junio de 2026"] },
      { key: "legal", label: "Aviso Legal", number: "03", title: "Aviso", accent: "Legal", tags: ["No afiliación · Propiedad intelectual", "Última actualización: 4 de junio de 2026"] },
      { key: "contact", label: "Contacto", number: "04", title: "Información de", accent: "Contacto", tags: ["Lun - Dom · 8:30 - 16:30 AST", "Respuesta en 48 h hábiles"] }
    ],
    content: {
      privacy: [
        { number: "01", title: "Información del Responsable", body: `La Brega LLC opera Benitour Puerto Rico como operador independiente de tours culturales en Puerto Rico. Email: ${legalEmail}. Teléfono: ${phone}. Dirección: ${address}.` },
        { number: "02", title: "Qué Datos Personales Recopilamos", body: "A través del sitio web y plataformas externas de reservas como Bokun, GetYourGuide y Tripadvisor podemos tratar datos necesarios para gestionar la experiencia.", bullets: ["Datos de identificación y contacto: nombre, email y teléfono.", "Datos de reserva: fecha, participantes y preferencias relevantes para el tour.", "Datos de pago gestionados por plataformas externas. Benitour no almacena tarjetas.", "Datos de navegación y cookies necesarios para operar y mejorar la web."] },
        { number: "03", title: "Finalidad y Base Legal", bullets: ["Gestionar reservas, confirmaciones, recordatorios y comunicaciones operativas.", "Garantizar seguridad durante la actividad.", "Mejorar la experiencia del usuario y cumplir obligaciones legales.", "Enviar promociones únicamente con consentimiento explícito."] },
        { number: "04", title: "Proveedores y Derechos", body: "No vendemos datos personales. Podemos compartir información estrictamente necesaria con Bokun, GetYourGuide, Tripadvisor, proveedores tecnológicos, guías operativos y autoridades cuando la ley lo exija. Puedes solicitar acceso, rectificación, supresión, oposición, limitación, portabilidad o retirada de consentimiento escribiendo a info@benitourpuertorico.com." },
        { number: "05", title: "Seguridad, Cookies y Menores", body: "Aplicamos medidas técnicas y organizativas razonables, incluyendo comunicaciones SSL/TLS y acceso restringido. Usamos cookies esenciales, analíticas y de marketing cuando proceda. El servicio no está dirigido a menores de 13 años sin consentimiento verificable." }
      ],
      terms: [
        { number: "01", title: "Aceptación y Servicio", body: "Al usar el sitio o reservar una experiencia aceptas estos términos. Benitour Puerto Rico, operado por La Brega LLC, ofrece tours culturales independientes con salida desde Vega Baja, Puerto Rico." },
        { number: "02", title: "Reservas y Pagos", body: "Las reservas y pagos se realizan a través de plataformas externas autorizadas como Bokun, GetYourGuide o Tripadvisor. La reserva se considera confirmada cuando recibes confirmación escrita de la plataforma correspondiente." },
        { number: "03", title: "Cancelaciones y Reembolsos", bullets: ["Las políticas específicas dependen de la plataforma donde se realizó la reserva.", "Benitour puede cancelar o modificar tours por fuerza mayor, clima adverso o seguridad.", "En cancelaciones por parte de Benitour se ofrecerá reprogramación o devolución según corresponda."] },
        { number: "04", title: "Responsabilidad del Usuario", body: "El usuario debe facilitar información veraz, llegar al punto de encuentro con la antelación indicada, seguir instrucciones del guía y respetar comunidad, entorno y normas de seguridad." },
        { number: "05", title: "No Afiliación y Ley Aplicable", body: "Benitour es un tour cultural independiente y no está afiliado oficialmente a Bad Bunny, Rimas Entertainment LLC ni entidades asociadas. Estos términos se rigen por la legislación de Puerto Rico y federal de Estados Unidos." }
      ],
      legal: [
        { number: "01", title: "Titular del Sitio Web", body: `La Brega LLC, bajo el nombre comercial Benitour Puerto Rico, opera este sitio web y la actividad de tours culturales. Contacto: ${legalEmail}. Teléfono: ${phone}.` },
        { number: "02", title: "Propiedad Intelectual", body: "Textos, imágenes, vídeos, logotipos, diseño, estructura y código del sitio pertenecen a La Brega LLC o a terceros que han autorizado su uso. No se permite reproducción o explotación sin autorización escrita." },
        { number: "03", title: "Aviso de No Afiliación", body: "Benitour Puerto Rico es un tour cultural independiente. No está afiliado, patrocinado, respaldado ni asociado oficialmente con Bad Bunny, Rimas Entertainment LLC ni ninguna entidad vinculada al artista. Las menciones tienen finalidad descriptiva y cultural." },
        { number: "04", title: "Enlaces y Responsabilidad", body: "La Brega LLC no controla ni se responsabiliza por contenidos, políticas o prácticas de plataformas externas como Bokun, GetYourGuide, Tripadvisor u otros sitios enlazados." }
      ],
      contact: [
        { number: "01", title: "La Brega LLC - Benitour Puerto Rico", body: `Dirección física: ${address}.` },
        { number: "02", title: "Teléfono", body: `${phone}. Disponible de lunes a domingo, 8:30 AM - 4:30 PM (AST).` },
        { number: "03", title: "Email", body: `${legalEmail}. Para reservas, consultas generales, cancelaciones o reclamaciones.` },
        { number: "04", title: "Plataformas de Reservas", bullets: ["Bokun: bokun.io", "GetYourGuide: getyourguide.com", "Tripadvisor: tripadvisor.com"] },
        { number: "05", title: "Tiempo de Respuesta", body: "Respondemos las consultas en un plazo máximo estimado de 48 horas hábiles." }
      ]
    },
    eye: "La Brega LLC · Benitour Puerto Rico",
    nav: "Legal",
    close: "Cerrar y volver a la página principal",
    noticeTitle: "Aviso legal importante",
    noticeBody: <>Benitour es un tour cultural independiente operado por <strong>La Brega LLC</strong>. No está afiliado oficialmente a <strong>Bad Bunny, Rimas Entertainment</strong> ni a ninguna entidad asociada al artista.</>,
    footer: "© 2026 La Brega LLC. Todos los derechos reservados. Benitour Puerto Rico es un tour cultural independiente."
  },
  en: {
    tabs: [
      { key: "privacy", label: "Privacy", number: "01", title: "Privacy", accent: "Policy", tags: ["GDPR · CCPA · COPPA", "Bokun · GYG · Tripadvisor", "Last updated: June 4, 2026"] },
      { key: "terms", label: "Terms", number: "02", title: "Terms of", accent: "Service", tags: ["Bookings · Cancellations · Refunds", "Last updated: June 4, 2026"] },
      { key: "legal", label: "Legal Notice", number: "03", title: "Legal", accent: "Notice", tags: ["No affiliation · Intellectual property", "Last updated: June 4, 2026"] },
      { key: "contact", label: "Contact", number: "04", title: "Contact", accent: "Information", tags: ["Mon - Sun · 8:30 - 16:30 AST", "Reply within 48 business hours"] }
    ],
    content: {
      privacy: [
        { number: "01", title: "Data Controller", body: `La Brega LLC operates Benitour Puerto Rico as an independent cultural tour operator in Puerto Rico. Email: ${legalEmail}. Phone: ${phone}. Address: ${address}.` },
        { number: "02", title: "Personal Data We Collect", body: "Through this website and authorized booking platforms such as Bokun, GetYourGuide and Tripadvisor, we may process data required to manage your experience.", bullets: ["Identity and contact data: name, email and phone number.", "Booking data: date, participants and relevant tour preferences.", "Payment data handled by external platforms. Benitour does not store payment cards.", "Navigation data and cookies needed to operate and improve the website."] },
        { number: "03", title: "Purpose and Legal Basis", bullets: ["Manage bookings, confirmations, reminders and operational communications.", "Support safety during the activity.", "Improve user experience and comply with legal obligations.", "Send promotions only with explicit consent."] },
        { number: "04", title: "Providers and Rights", body: "We do not sell personal data. We may share strictly necessary information with Bokun, GetYourGuide, Tripadvisor, technology providers, operating guides and authorities when required by law. You may request access, correction, deletion, objection, restriction, portability or withdrawal of consent by writing to info@benitourpuertorico.com." },
        { number: "05", title: "Security, Cookies and Minors", body: "We apply reasonable technical and organizational measures, including SSL/TLS communications and restricted access. We use essential, analytics and marketing cookies where applicable. The service is not directed to children under 13 without verifiable consent." }
      ],
      terms: [
        { number: "01", title: "Acceptance and Service", body: "By using this site or booking an experience, you accept these terms. Benitour Puerto Rico, operated by La Brega LLC, offers independent cultural tours departing from Vega Baja, Puerto Rico." },
        { number: "02", title: "Bookings and Payments", body: "Bookings and payments are processed through authorized external platforms such as Bokun, GetYourGuide or Tripadvisor. A booking is confirmed when you receive written confirmation from the relevant platform." },
        { number: "03", title: "Cancellations and Refunds", bullets: ["Specific policies depend on the platform where the booking was made.", "Benitour may cancel or modify tours due to force majeure, adverse weather or safety reasons.", "When Benitour cancels, rescheduling or a refund will be offered as applicable."] },
        { number: "04", title: "User Responsibility", body: "Users must provide truthful information, arrive at the meeting point on time, follow guide instructions and respect the community, surroundings and safety rules." },
        { number: "05", title: "No Affiliation and Applicable Law", body: "Benitour is an independent cultural tour and is not officially affiliated with Bad Bunny, Rimas Entertainment LLC or associated entities. These terms are governed by Puerto Rico and United States federal law." }
      ],
      legal: [
        { number: "01", title: "Website Owner", body: `La Brega LLC, under the trade name Benitour Puerto Rico, operates this website and the cultural tour activity. Contact: ${legalEmail}. Phone: ${phone}.` },
        { number: "02", title: "Intellectual Property", body: "Texts, images, videos, logos, design, structure and site code belong to La Brega LLC or to third parties who have authorized their use. Reproduction or exploitation without written authorization is not permitted." },
        { number: "03", title: "No Affiliation Notice", body: "Benitour Puerto Rico is an independent cultural tour. It is not affiliated, sponsored, endorsed or officially associated with Bad Bunny, Rimas Entertainment LLC or any entity linked to the artist. Mentions are descriptive and cultural." },
        { number: "04", title: "Links and Liability", body: "La Brega LLC does not control and is not responsible for content, policies or practices of external platforms such as Bokun, GetYourGuide, Tripadvisor or other linked websites." }
      ],
      contact: [
        { number: "01", title: "La Brega LLC - Benitour Puerto Rico", body: `Physical address: ${address}.` },
        { number: "02", title: "Phone", body: `${phone}. Available Monday to Sunday, 8:30 AM - 4:30 PM (AST).` },
        { number: "03", title: "Email", body: `${legalEmail}. For bookings, general questions, cancellations or claims.` },
        { number: "04", title: "Booking Platforms", bullets: ["Bokun: bokun.io", "GetYourGuide: getyourguide.com", "Tripadvisor: tripadvisor.com"] },
        { number: "05", title: "Response Time", body: "We reply to inquiries within an estimated maximum of 48 business hours." }
      ]
    },
    eye: "La Brega LLC · Benitour Puerto Rico",
    nav: "Legal",
    close: "Close and return to the main page",
    noticeTitle: "Important legal notice",
    noticeBody: <>Benitour is an independent cultural tour operated by <strong>La Brega LLC</strong>. It is not officially affiliated with <strong>Bad Bunny, Rimas Entertainment</strong> or any entity associated with the artist.</>,
    footer: "© 2026 La Brega LLC. All rights reserved. Benitour Puerto Rico is an independent cultural tour."
  }
};

export function BenitourLegalHub({ language }: LanguageProps) {
  const t = legalCopy[language];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LegalKey>("privacy");
  const current = t.tabs.find((tab) => tab.key === active) ?? t.tabs[0];

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<{ key?: LegalKey }>).detail;
      if (detail?.key) setActive(detail.key);
      setOpen(true);
    }

    window.addEventListener("benitour:open-legal", onOpen);
    return () => window.removeEventListener("benitour:open-legal", onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="bnt-legal" role="dialog" aria-modal="true" aria-label={current.label}>
      <div className="bnt-legal__panel">
        <nav className="bnt-legal__nav" aria-label={t.nav}>
          {t.tabs.map((tab) => (
            <button className={active === tab.key ? "on" : ""} type="button" onClick={() => setActive(tab.key)} key={tab.key}>
              {tab.label}
            </button>
          ))}
          <button className="bnt-legal__close" type="button" onClick={() => setOpen(false)} aria-label={t.close}>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 3L11 11M11 3L3 11" />
            </svg>
          </button>
        </nav>

        <section className="bnt-legal__section">
          <header className="bnt-legal__header" data-n={current.number}>
            <div className="bnt-legal__eye">{t.eye}</div>
            <h2>{current.title}<br /><em>{current.accent}</em></h2>
            <div className="bnt-legal__meta">
              {current.tags.map((tag, index) => (
                <span className={`bnt-legal__tag bnt-legal__tag--${index === 0 ? "yellow" : index === 1 ? "blue" : "white"}`} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="bnt-legal__body">
            {active === "privacy" && (
              <div className="bnt-legal__notice">
                <div>{t.noticeTitle}</div>
                <p>{t.noticeBody}</p>
              </div>
            )}

            {t.content[active].map((item) => (
              <article className="bnt-legal__block" key={item.title}>
                <div className="bnt-legal__num">{item.number}</div>
                <h3>{item.title}</h3>
                {item.body && <p>{item.body}</p>}
                {item.bullets && (
                  <ul>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <footer className="bnt-legal__footer">
            <strong>BENITOUR</strong>
            <span>{t.footer}</span>
          </footer>
        </section>
      </div>
    </div>
  );
}
