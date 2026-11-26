"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";

export function Nav() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="#topo" aria-label="Alvor Clube, início">
          Alvor<small>Clube</small>
        </a>
        <nav aria-label="Seções do site">
          <ul className="navlinks">
            {NAV.map((n) => (
              <li key={n.href} className={n.opt ? "opt" : ""}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn" href="#agendar">
          Agendar aula experimental
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={aberto}
          aria-controls="menu-cel"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>
      <div id="menu-cel" className={aberto ? "menu-panel is-open" : "menu-panel"}>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={fechar}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn" href="#agendar" onClick={fechar}>
          Agendar aula experimental
        </a>
      </div>
    </header>
  );
}
