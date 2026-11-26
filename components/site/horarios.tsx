"use client";

import { useState } from "react";
import { AULAS, DIAS, FILTROS, type DiaId, type FiltroId } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Horarios() {
  const [dia, setDia] = useState<DiaId>("seg");
  const [filtro, setFiltro] = useState<FiltroId>("todas");

  const aulas = AULAS.filter((a) => a.dia === dia && (filtro === "todas" || a.tipo === filtro));
  const diaNome = DIAS.find((d) => d.id === dia)!.nome;
  const filtroNome = FILTROS.find((f) => f.id === filtro)!.label;

  return (
    <section id="horarios" className="tone-a sched">
      <div className="wrap">
        <div className="sec-head">
          <h2>Grade de aulas da semana</h2>
          <p className="small">Horários supostos, a confirmar com a recepção.</p>
        </div>
        <div className="sched-ctrl">
          <div className="chips" role="group" aria-label="Dia da semana">
            {DIAS.map((d) => (
              <button key={d.id} type="button" className={cn("chip", d.id === dia && "is-on")} aria-pressed={d.id === dia} onClick={() => setDia(d.id)}>
                {d.curto}
              </button>
            ))}
          </div>
          <div className="chips" role="group" aria-label="Tipo de aula">
            {FILTROS.map((f) => (
              <button key={f.id} type="button" className={cn("chip", f.id === filtro && "is-on")} aria-pressed={f.id === filtro} onClick={() => setFiltro(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {aulas.length > 0 && (
          <div className="tbl-box">
            <table key={dia + filtro}>
              <caption className="sr-only">Aulas coletivas de {diaNome}</caption>
              <thead>
                <tr>
                  <th scope="col">Horário</th>
                  <th scope="col">Aula</th>
                  <th scope="col">Professor</th>
                  <th scope="col">Sala</th>
                </tr>
              </thead>
              <tbody>
                {aulas.map((a) => (
                  <tr key={a.hora + a.nome}>
                    <td className="hora">{a.hora}</td>
                    <td>{a.nome}</td>
                    <td>{a.prof}</td>
                    <td>{a.sala}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {aulas.length === 0 && dia === "dom" && (
          <div className="empty" role="status">
            <h3>Domingo não tem aula coletiva</h3>
            <p>Musculação e recovery abrem das 8h às 14h. Escolha outro dia para ver as turmas.</p>
          </div>
        )}

        {aulas.length === 0 && dia !== "dom" && (
          <div className="empty" role="status">
            <p>
              Nenhuma aula de {filtroNome.toLowerCase()} na {diaNome}. Escolha outro dia ou veja todas as aulas.
            </p>
            <button type="button" className="btn btn-ghost" onClick={() => setFiltro("todas")}>
              Ver todas as aulas do dia
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
