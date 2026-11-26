"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AULAS, DIAS, FAIXAS, MOD_AULA, MODS_FORM } from "@/lib/data";
import { asset, cn, horaCurta } from "@/lib/utils";

type Form = { nome: string; email: string; cel: string; mod: string; dia: string; hora: string; obs: string; aceite: boolean };
type Campo = Exclude<keyof Form, "obs">;
type Erros = Partial<Record<Campo, string>>;

const VAZIO: Form = { nome: "", email: "", cel: "", mod: "", dia: "", hora: "", obs: "", aceite: false };
const ORDEM: Campo[] = ["nome", "email", "cel", "mod", "dia", "hora", "aceite"];

function validar(f: Form): Erros {
  const e: Erros = {};
  if (f.nome.trim().split(/\s+/).filter(Boolean).length < 2) e.nome = "Escreva nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Confira o e-mail: falta o @ ou o domínio (ex.: nome@gmail.com).";
  const d = f.cel.replace(/\D/g, "");
  if (d.length < 10 || d.length > 11) e.cel = "Digite o celular com DDD, 10 ou 11 números.";
  if (!f.mod) e.mod = "Escolha a modalidade da aula.";
  if (!f.dia) e.dia = "Escolha o dia.";
  if (!f.hora) e.hora = "Escolha o horário.";
  if (!f.aceite) e.aceite = "Marque a autorização para a recepção responder você.";
  return e;
}

function horarios(f: Form) {
  if (!f.mod || !f.dia) return [];
  if (f.mod === "musculacao") return f.dia === "dom" ? [{ v: "08:00", l: "Manhã, entre 8h e 14h" }] : FAIXAS;
  const nome = MOD_AULA[f.mod];
  return AULAS.filter((a) => a.dia === f.dia && a.nome === nome).map((a) => ({ v: a.hora, l: horaCurta(a.hora) }));
}

function mascaraCel(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function Agendar() {
  const [f, setF] = useState<Form>(VAZIO);
  const [tentou, setTentou] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [shake, setShake] = useState(0);
  const resumo = useRef<HTMLParagraphElement>(null);
  const okRef = useRef<HTMLDivElement>(null);

  const e = tentou ? validar(f) : {};
  const nErros = Object.keys(e).length;
  const opHoras = horarios(f);
  const semHorario = !!(f.mod && f.dia && opHoras.length === 0);

  useEffect(() => {
    if (status === "sent") okRef.current?.focus();
  }, [status]);

  const onField = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    const v = name === "cel" ? mascaraCel(value) : value;
    setF((old) => ({ ...old, [name]: v, ...(name === "mod" || name === "dia" ? { hora: "" } : {}) }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const errs = validar(f);
    setTentou(true);
    if (Object.keys(errs).length) {
      setShake((s) => s + 1);
      const primeiro = ORDEM.find((k) => errs[k]);
      if (primeiro) document.getElementById(`f-${primeiro}`)?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1400);
  };

  const novo = () => {
    setF(VAZIO);
    setTentou(false);
    setStatus("idle");
  };

  const campo = (k: Campo) => cn("field", e[k] && "is-invalid");
  const erro = (k: Campo) =>
    e[k] ? (
      <p className="err" id={`err-${k}`}>
        {e[k]}
      </p>
    ) : null;
  const aria = (k: Campo) => ({ "aria-invalid": !!e[k], "aria-describedby": e[k] ? `err-${k}` : undefined });

  const modNome = MODS_FORM.find((m) => m.v === f.mod)?.l ?? "";
  const diaNome = DIAS.find((d) => d.id === f.dia)?.nome ?? "";

  return (
    <section id="agendar" className="tone-l">
      <div className="wrap">
        <div className="book">
          <figure className="photo">
            <img className="ph-img" src={asset("/img/chamada-aaron-brogden.jpg")} alt="Aluno de regata cinza gritando no meio de uma série pesada" loading="lazy" />
          </figure>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2>Agendar aula experimental</h2>
              <p>Gratuita, com professor do lado. A recepção confirma por WhatsApp ou e-mail em até 1 dia útil.</p>
            </div>

            {status === "sent" ? (
              <div className="ok" role="status" aria-live="polite" tabIndex={-1} ref={okRef}>
                <svg aria-hidden="true" width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="3" />
                  <path d="M17 29l7 7 15-16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>Pedido enviado</h3>
                <p>
                  {modNome}, {diaNome} às {horaCurta(f.hora)}. Você recebe a confirmação no celular e no e-mail que informou.
                </p>
                <button type="button" className="btn" onClick={novo}>
                  Agendar outra aula
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-describedby="form-hint">
                {nErros > 0 && (
                  <p key={shake} ref={resumo} className={cn("summary", shake % 2 ? "shake-a" : "shake-b")} role="alert">
                    {nErros === 1 ? "Falta corrigir 1 campo, marcado abaixo." : `Falta corrigir ${nErros} campos, marcados abaixo.`}
                  </p>
                )}

                <div className={campo("nome")}>
                  <label htmlFor="f-nome">Nome completo</label>
                  <input id="f-nome" type="text" name="nome" autoComplete="name" value={f.nome} onChange={onField} {...aria("nome")} />
                  {erro("nome")}
                </div>

                <div className="row2">
                  <div className={campo("email")}>
                    <label htmlFor="f-email">E-mail</label>
                    <input id="f-email" type="email" name="email" autoComplete="email" value={f.email} onChange={onField} {...aria("email")} />
                    {erro("email")}
                  </div>
                  <div className={campo("cel")}>
                    <label htmlFor="f-cel">Celular com DDD</label>
                    <input id="f-cel" type="tel" name="cel" inputMode="tel" autoComplete="tel" value={f.cel} onChange={onField} {...aria("cel")} />
                    {erro("cel")}
                  </div>
                </div>

                <div className={campo("mod")}>
                  <label htmlFor="f-mod">Modalidade</label>
                  <select id="f-mod" name="mod" value={f.mod} onChange={onField} {...aria("mod")}>
                    <option value="">Escolha a modalidade</option>
                    {MODS_FORM.map((m) => (
                      <option key={m.v} value={m.v}>
                        {m.l}
                      </option>
                    ))}
                  </select>
                  {erro("mod")}
                </div>

                <div className="row2">
                  <div className={campo("dia")}>
                    <label htmlFor="f-dia">Dia</label>
                    <select id="f-dia" name="dia" value={f.dia} onChange={onField} {...aria("dia")}>
                      <option value="">Escolha o dia</option>
                      {DIAS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nome.charAt(0).toUpperCase() + d.nome.slice(1)}
                        </option>
                      ))}
                    </select>
                    {erro("dia")}
                  </div>
                  <div className={campo("hora")}>
                    <label htmlFor="f-hora">Horário</label>
                    <select id="f-hora" name="hora" value={f.hora} onChange={onField} {...aria("hora")}>
                      <option value="">{opHoras.length ? "Escolha o horário" : "Escolha aula e dia antes"}</option>
                      {opHoras.map((h) => (
                        <option key={h.v} value={h.v}>
                          {h.l}
                        </option>
                      ))}
                    </select>
                    {erro("hora")}
                    {semHorario && (
                      <p className="hint" role="status">
                        Não tem aula de {(MOD_AULA[f.mod] ?? "").toLowerCase()} nesse dia. Troque o dia ou a modalidade.
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="f-obs">
                    Algo que o professor deva saber? <span className="hint">(opcional)</span>
                  </label>
                  <textarea id="f-obs" name="obs" value={f.obs} onChange={onField} />
                </div>

                <div className={campo("aceite")}>
                  <label className="check">
                    <input
                      id="f-aceite"
                      type="checkbox"
                      name="aceite"
                      checked={f.aceite}
                      onChange={(ev) => setF((old) => ({ ...old, aceite: ev.target.checked }))}
                      {...aria("aceite")}
                    />
                    Autorizo a recepção do Alvor a responder por WhatsApp ou e-mail.
                  </label>
                  {erro("aceite")}
                </div>

                <p className="hint" id="form-hint">
                  Seus dados servem só para confirmar a aula.
                </p>
                <div>
                  <button className="btn" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
                    {status === "sending" && <span className="spin" aria-hidden="true" />}
                    {status === "sending" ? "Enviando pedido…" : "Agendar aula experimental"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
