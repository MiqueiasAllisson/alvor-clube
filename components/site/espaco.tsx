"use client";

import { useState } from "react";
import { ESPACOS, FATOS } from "@/lib/data";
import { asset, cn } from "@/lib/utils";

export function Espaco() {
  const [ativo, setAtivo] = useState(0);
  const atual = ESPACOS[ativo];

  return (
    <section id="espaco" className="tone-l">
      <div className="wrap">
        <div className="sec-head">
          <h2>O espaço</h2>
        </div>
        <div className="esp" role="group" aria-label="Ambientes do clube">
          {ESPACOS.map((e, i) => (
            <button
              key={e.nome}
              type="button"
              className={cn("esp-panel", ativo === i && "is-on")}
              aria-pressed={ativo === i}
              aria-label={e.nome}
              onClick={() => setAtivo(i)}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
            >
              <span className="esp-img">
                <img src={asset(e.img)} alt={e.alt} loading="lazy" />
              </span>
              <span className="esp-bar" aria-hidden="true" />
              <span className="esp-cap">
                <b>{e.nome}</b>
                <span>{e.texto}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="esp-info" aria-live="polite">
          <div>
            <h3>{atual.nome}</h3>
            <div className="esp-dots" aria-hidden="true">
              {ESPACOS.map((e, i) => (
                <span key={e.nome} className={ativo === i ? "is-on" : ""} />
              ))}
            </div>
          </div>
          <p key={ativo}>{atual.texto}</p>
        </div>
        <dl className="facts">
          {FATOS.map((f) => (
            <div key={f.t}>
              <dt>{f.t}</dt>
              <dd>{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
