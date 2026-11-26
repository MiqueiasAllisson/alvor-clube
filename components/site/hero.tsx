"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/utils";
import { Dot } from "@/components/ui/button";

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
  }, []);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section className="hero tone-a">
      <div className="hero-bg" aria-hidden="true">
        <video
          ref={video}
          className="hero-video"
          src={asset("/video/hero-salao.mp4")}
          poster={asset("/video/hero-poster.jpg")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
        />
        <div className="duo-lo" />
        <div className="hero-scrim" />
      </div>
      <button type="button" className="pause" onClick={alternar} aria-label={pausado ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo"}>
        {pausado ? (
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        )}
      </button>
      <div className="wrap">
        <div className="hero-copy">
          <h1>Clube de treino em Moinhos de Vento</h1>
          <p>Musculação com personal, lutas, funcional, pilates e recovery. Segunda a sexta, das 5h30 às 23h.</p>
          <p className="hero-fact">
            Planos a partir de <b>R$ 119,90</b> por mês
          </p>
          <a className="btn" href="#agendar">
            Agendar aula experimental <Dot />
          </a>
        </div>
      </div>
    </section>
  );
}
