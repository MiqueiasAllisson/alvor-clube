"use client";

import { useEffect, useRef, useState } from "react";
import { MODALIDADES } from "@/lib/data";
import { asset, cn } from "@/lib/utils";

const ESQUEMAS = ["sc-l", "sc-x", "sc-a", "sc-l", "sc-x"];

export function Modalidades() {
  const [ativa, setAtiva] = useState(0);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const linha = window.innerHeight * 0.5;
        let idx = 0;
        itens.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top <= linha) idx = i;
        });
        setAtiva(idx);
      });
    };
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    medir();
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="modalidades" className={cn("tone-l mx-sec", ESQUEMAS[ativa])}>
      <div className="wrap">
        <div className="sec-head">
          <h2>Cinco modalidades num plano só</h2>
          <p>Todas entram na mensalidade. Personal é contratado à parte.</p>
        </div>
        <div className="mx">
          <ul className="mx-list">
            {MODALIDADES.map((m, i) => (
              <li
                key={m.nome}
                ref={(el) => {
                  itens.current[i] = el;
                }}
                className={cn("mx-item", m.card, ativa === i && "is-on")}
              >
                <button
                  type="button"
                  className="mx-btn"
                  aria-pressed={ativa === i}
                  aria-controls="mx-frame"
                  onClick={() => setAtiva(i)}
                  onFocus={() => setAtiva(i)}
                >
                  <span className="mx-mark" aria-hidden="true" />
                  <span className="mx-name">{m.nome}</span>
                </button>
                <p className="mx-text">{m.texto}</p>
                <figure className="mx-thumb">
                  <img src={asset(m.img)} alt={m.alt} loading="lazy" />
                </figure>
              </li>
            ))}
          </ul>
          <div className={cn("mx-side", `pos-${ativa}`)}>
            <div className="mx-mat">
              <div className="mx-frame" id="mx-frame">
                {MODALIDADES.map((m, i) => (
                  <figure key={m.nome} className={cn("mx-shot", ativa === i && "is-on")}>
                    <img src={asset(m.img)} alt={m.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
            <p className="mx-count small" aria-hidden="true">
              <span>{MODALIDADES[ativa].nome}</span>
              <span>{String(ativa + 1).padStart(2, "0")} de 05</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
