"use client";

import { useEffect, useRef, useState } from "react";

const MINIMO = 1900;
const RAMPA = 1700;
const MAXIMO = 6000;

export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState<"carregando" | "saindo" | "fim">("carregando");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raiz = document.documentElement;
    raiz.style.overflow = "hidden";

    const inicio = performance.now();
    let pronto = false;
    let atual = 0;
    let raf = 0;
    let saiu = false;
    const timers: number[] = [];

    const video = document.querySelector<HTMLVideoElement>(".hero-video");
    const esperaVideo = new Promise<void>((ok) => {
      if (!video || video.readyState >= 3) return ok();
      const fim = () => ok();
      video.addEventListener("canplaythrough", fim, { once: true });
      video.addEventListener("canplay", fim, { once: true });
      video.addEventListener("error", fim, { once: true });
    });
    const esperaPagina = new Promise<void>((ok) => {
      if (document.readyState === "complete") return ok();
      window.addEventListener("load", () => ok(), { once: true });
    });
    const esperaFontes = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

    Promise.all([esperaVideo, esperaPagina, esperaFontes]).then(() => {
      pronto = true;
    });

    const passo = (agora: number) => {
      const t = agora - inicio;
      const alvo = Math.min(pronto || t > MAXIMO ? 100 : 90 * (1 - Math.exp(-t / 1400)), (t / RAMPA) * 100);
      atual += (alvo - atual) * (alvo === 100 ? 0.14 : 0.08);
      const pct = Math.min(100, Math.round(atual));
      el.style.setProperty("--pct", String(pct));
      for (let k = 1; k <= 4; k++) el.classList.toggle(`p${k}`, pct >= k * 25 - 1);
      if (pct >= 100 && t >= MINIMO && !saiu) {
        saiu = true;
        el.classList.add("is-lift");
        timers.push(
          window.setTimeout(() => {
            raiz.style.overflow = "";
            setFase("saindo");
          }, 520),
          window.setTimeout(() => setFase("fim"), 1400),
        );
        return;
      }
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      raiz.style.overflow = "";
    };
  }, []);

  if (fase === "fim") return null;

  return (
    <div
      ref={ref}
      className={fase === "saindo" ? "loader p1 p2 p3 p4 is-lift is-out" : "loader"}
      role="status"
      aria-live="polite"
      aria-busy={fase === "carregando"}
    >
      <span className="sr-only">Carregando o site do Alvor Clube</span>
      <span className="ld-brand" aria-hidden="true">
        Alvor<small>Clube</small>
      </span>
      <div className="ld-center" aria-hidden="true">
        <svg className="ld-svg" viewBox="0 0 560 230" aria-hidden="true">
          <ellipse className="ld-shadow" cx="280" cy="214" rx="210" ry="7" />
          <g className="ld-bb">
            <rect className="bb-bar" x="40" y="104" width="480" height="12" rx="6" />
            <rect className="bb-sl" x="36" y="101" width="118" height="18" rx="5" />
            <rect className="bb-sl" x="406" y="101" width="118" height="18" rx="5" />
            <rect className="pl pl-1 pl-l c-x" x="124" y="25" width="18" height="170" rx="5" />
            <rect className="pl pl-1 pl-r c-x" x="418" y="25" width="18" height="170" rx="5" />
            <rect className="pl pl-2 pl-l c-l" x="102" y="35" width="18" height="150" rx="5" />
            <rect className="pl pl-2 pl-r c-l" x="440" y="35" width="18" height="150" rx="5" />
            <rect className="pl pl-3 pl-l c-x" x="82" y="48" width="16" height="124" rx="5" />
            <rect className="pl pl-3 pl-r c-x" x="462" y="48" width="16" height="124" rx="5" />
            <rect className="pl pl-4 pl-l c-l" x="64" y="60" width="14" height="100" rx="5" />
            <rect className="pl pl-4 pl-r c-l" x="482" y="60" width="14" height="100" rx="5" />
            <rect className="bb-col" x="146" y="90" width="10" height="40" rx="3" />
            <rect className="bb-col" x="404" y="90" width="10" height="40" rx="3" />
            <rect className="bb-knurl" x="234" y="104" width="26" height="12" rx="0" />
            <rect className="bb-knurl" x="300" y="104" width="26" height="12" rx="0" />
          </g>
        </svg>
      </div>
      <div className="ld-foot" aria-hidden="true">
        <span className="ld-label">Colocando as anilhas</span>
        <span className="ld-bar">
          <span />
        </span>
        <span className="ld-num" />
      </div>
    </div>
  );
}
