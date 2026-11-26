"use client";

import { useEffect, useRef, useState } from "react";

const LETRAS = ["A", "l", "v", "o", "r"];
const MINIMO = 1100;
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
      const alvo = pronto || t > MAXIMO ? 100 : 90 * (1 - Math.exp(-t / 1400));
      atual += (alvo - atual) * (alvo === 100 ? 0.16 : 0.08);
      const pct = Math.min(100, Math.round(atual));
      el.style.setProperty("--pct", String(pct));
      if (alvo === 100 && pct >= 100 && t >= MINIMO && !saiu) {
        saiu = true;
        raiz.style.overflow = "";
        setFase("saindo");
        window.setTimeout(() => setFase("fim"), 850);
        return;
      }
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);

    return () => {
      cancelAnimationFrame(raf);
      raiz.style.overflow = "";
    };
  }, []);

  if (fase === "fim") return null;

  return (
    <div ref={ref} className={fase === "saindo" ? "loader is-out" : "loader"} role="status" aria-live="polite" aria-busy={fase === "carregando"}>
      <span className="sr-only">Carregando o site do Alvor Clube</span>
      <div className="ld-center" aria-hidden="true">
        <p className="ld-logo">
          <span className="ld-dot" />
          <span className="ld-word">
            {LETRAS.map((l, i) => (
              <span key={i} style={{ animationDelay: `${120 + i * 60}ms` }}>
                {l}
              </span>
            ))}
          </span>
        </p>
        <p className="ld-sub">Clube · Moinhos de Vento</p>
      </div>
      <div className="ld-foot" aria-hidden="true">
        <span className="ld-bar">
          <span />
        </span>
        <span className="ld-num" />
      </div>
    </div>
  );
}
