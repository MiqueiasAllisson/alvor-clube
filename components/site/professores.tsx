import { PROFESSORES } from "@/lib/data";
import { asset } from "@/lib/utils";

export function Professores() {
  return (
    <section id="professores" className="tone-a">
      <div className="wrap">
        <div className="sec-head">
          <h2>Quem dá aula</h2>
          <p>Professores formados em Educação Física, com registro no conselho regional.</p>
        </div>
        <div className="pros">
          {PROFESSORES.map((p) => (
            <article key={p.nome} className="pro">
              <figure className="photo">
                <img src={asset(p.img)} alt={p.alt} loading="lazy" />
              </figure>
              <div className="pro-body">
                <h3>{p.nome}</h3>
                <p className="pro-role">{p.papel}</p>
                <p>{p.texto}</p>
                <p className="pro-when">{p.quando}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
