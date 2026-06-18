"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const faqs = [
  {
    question: "¿Cuánto dura el tour?",
    answer: <>Aproximadamente <strong>3 horas</strong>, incluyendo las 5 paradas y los desplazamientos entre ellas.</>
  },
  {
    question: "¿Dónde es el punto de encuentro?",
    answer: <>En el <strong>centro de Vega Baja</strong>. Recibirás las instrucciones exactas al confirmar tu reserva.</>
  },
  {
    question: "¿Cómo llego sin coche?",
    answer: <>Hay <strong>parking gratuito</strong> en el punto de encuentro. De momento <strong>no ofrecemos servicio de transporte</strong> hasta el punto de salida. Si vienes desde San Juan también coordinamos opciones de transporte compartido.</>
  },
  {
    question: "¿Y si llueve?",
    answer: <>El tour se realiza en casi cualquier condición. Solo suspendemos por <strong>alerta de tormenta severa</strong>. En ese caso ofrecemos reprogramación o reembolso completo.</>
  },
  {
    question: "¿Es accesible para movilidad reducida?",
    answer: <>El recorrido incluye <strong>zonas con superficies irregulares</strong>. Escríbenos antes de reservar y te orientamos según tu situación.</>
  },
  {
    question: "¿Política de cancelación?",
    answer: <><strong>Cancelación gratuita hasta 24 horas antes.</strong> Con menos de 24 h: crédito para una fecha futura. Sin reembolso por no presentarse sin aviso.</>
  },
  {
    question: "¿Es apto para niños?",
    answer: <>Sí. A partir de <strong>8 años</strong> disfrutan bien del tour. Para menores de 8 considera que el recorrido es largo.</>
  },
  {
    question: "¿Está afiliado oficialmente a Bad Bunny?",
    answer: <><strong>No.</strong> Benitour es un tour cultural independiente. No tenemos afiliación oficial con Bad Bunny ni con Rimas Entertainment. Somos vecinos del barrio que lo vio crecer.</>
  }
];

export function BenitourFaq() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".bnt-faq__btn"));
    if (event.key === "ArrowDown") {
      event.preventDefault();
      buttons[index + 1]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      buttons[index - 1]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      buttons[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      buttons[buttons.length - 1]?.focus();
    }
  }

  return (
    <section
      className={`bnt-faq${entered ? " bnt-faq--entered" : ""}`}
      id="benitour-faq"
      aria-label="Preguntas frecuentes"
      ref={sectionRef}
    >
      <div className="bnt-faq__stripe bnt-faq__stripe--top" aria-hidden="true" />
      <div className="bnt-faq__stripe bnt-faq__stripe--bottom" aria-hidden="true" />
      <span className="bnt-faq__deco" aria-hidden="true">FAQ</span>

      <div className="bnt-faq__inner">
        <div className="bnt-faq__grid">
          <header className="bnt-faq__head">
            <h2>
              Lo que<br />
              <span data-t="preguntan">preguntan</span>
            </h2>
            <p>Todo lo que necesitas saber antes de reservar. Sin rodeos.</p>
            <div className="bnt-faq__counter" aria-hidden="true">
              <span>{String(faqs.length).padStart(2, "0")}</span>
              <span>Preguntas<br />respondidas</span>
            </div>
            <div className="bnt-faq__line" aria-hidden="true" />
          </header>

          <div>
            <ul className="bnt-faq__list" role="list">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const panelId = `benitour-faq-answer-${index + 1}`;
                const buttonId = `benitour-faq-question-${index + 1}`;

                return (
                  <li
                    className={`bnt-faq__item${isOpen ? " is-open" : ""}`}
                    style={{ transitionDelay: `${index * 60}ms` }}
                    key={faq.question}
                  >
                    <button
                      className="bnt-faq__btn"
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                    >
                      <span className="bnt-faq__num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span className="bnt-faq__question">{faq.question}</span>
                      <span className="bnt-faq__icon" aria-hidden="true">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" /></svg>
                      </span>
                    </button>
                    <div className="bnt-faq__panel" id={panelId} role="region" aria-labelledby={buttonId}>
                      <div className="bnt-faq__answer"><p>{faq.answer}</p></div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="bnt-faq__footer">
              <div className="bnt-faq__foot-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C4.41 1.5 1.5 4.19 1.5 7.5c0 1.08.3 2.1.82 2.97L1.5 13.5l3.2-.78A6.4 6.4 0 0 0 8 13.5c3.59 0 6.5-2.69 6.5-6S11.59 1.5 8 1.5z" />
                </svg>
              </div>
              <div>
                <span>¿Otra duda?</span>
                <p>
                  ¿No encuentras lo que buscas? Escríbenos a{" "}
                  <a href="mailto:info@benitourpuertorico.com">info@benitourpuertorico.com</a>{" "}
                  y te respondemos en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
