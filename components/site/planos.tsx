import { INCLUI, PLANOS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Planos() {
  return (
    <section id="planos" className="tone-l">
      <div className="wrap">
        <div className="sec-head">
          <h2>Planos e preços</h2>
          <p className="small">Valores supostos, a confirmar. Personal à parte, a partir de R$ 90 a sessão.</p>
        </div>
        <div className="plans">
          {PLANOS.map((p) => (
            <article key={p.nome} className={cn("card", p.destaque && "is-best")}>
              <h3>{p.nome}</h3>
              {p.destaque && <p className="small">{p.destaque}</p>}
              <p className="price">
                <small>R$</small>
                {p.preco}
              </p>
              <p>
                {p.info[0]}
                <br />
                {p.info[1]}
              </p>
              <ul>
                {INCLUI.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="plans-note">A aula experimental é gratuita e não obriga a fechar plano.</p>
      </div>
    </section>
  );
}
