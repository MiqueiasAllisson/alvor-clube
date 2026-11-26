import { HORARIOS_CLUBE, MAPA_URL } from "@/lib/data";

export function ComoChegar() {
  return (
    <section id="como-chegar" className="tone-a">
      <div className="wrap">
        <div className="sec-head">
          <h2>Como chegar</h2>
          <p>Em Moinhos de Vento, a poucas quadras do Parcão.</p>
        </div>
        <div className="where3">
          <div className="wcard">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 36s11-10.2 11-19a11 11 0 0 0-22 0c0 8.8 11 19 11 19z" />
              <circle className="dot" cx="20" cy="17" r="4" />
            </svg>
            <h3>Rua Padre Chagas</h3>
            <p>Moinhos de Vento, Porto Alegre. Entrada pela calçada, no térreo.</p>
            <a className="btn btn-line" href={MAPA_URL} target="_blank" rel="noopener noreferrer">
              Abrir no mapa
            </a>
          </div>
          <div className="wcard">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="15" />
              <path d="M20 11v9l6 4" />
              <circle className="dot" cx="20" cy="20" r="2.5" />
            </svg>
            <h3>Horários</h3>
            <dl className="hours">
              {HORARIOS_CLUBE.map((h) => (
                <div key={h.d} style={{ display: "contents" }}>
                  <dt>{h.d}</dt>
                  <dd>{h.h}</dd>
                </div>
              ))}
            </dl>
            <p className="small">Horários supostos, a confirmar.</p>
          </div>
          <div className="wcard">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="9" cy="31" r="4" />
              <circle className="dot" cx="31" cy="9" r="4" />
              <path d="M13 31h12a6 6 0 0 0 0-12H15a6 6 0 0 1 0-12h12" />
            </svg>
            <h3>Chegando lá</h3>
            <ul>
              <li>
                <b>Ônibus</b>Linhas da Av. 24 de Outubro e da Av. Independência.
              </li>
              <li>
                <b>Carro</b>Estacionamento conveniado na mesma rua.
              </li>
              <li>
                <b>Bicicleta</b>Bicicletário na entrada.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
