import { HORARIOS_CLUBE, NAV } from "@/lib/data";
import { Dot } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="tone-a">
      <div className="wrap">
        <div className="foot-cta">
          <p>Primeira aula por nossa conta.</p>
          <a className="btn" href="#agendar">
            Agendar aula experimental <Dot />
          </a>
        </div>
        <div className="foot-grid">
          <div>
            <a className="logo" href="#topo">
              Alvor<small>Clube</small>
            </a>
            <p style={{ marginTop: 16 }}>Clube de treino em Moinhos de Vento. Musculação com personal, lutas, funcional, pilates e recovery.</p>
          </div>
          <div>
            <h3>Endereço</h3>
            <p>
              Rua Padre Chagas
              <br />
              Moinhos de Vento, Porto Alegre
            </p>
            <p style={{ marginTop: 10 }}>
              <a href="#como-chegar">Como chegar</a>
            </p>
          </div>
          <div>
            <h3>Horários</h3>
            <dl className="foot-hours">
              {HORARIOS_CLUBE.map((h) => (
                <div key={h.d} style={{ display: "contents" }}>
                  <dt>{h.d}</dt>
                  <dd>{h.h}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>No site</h3>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <p>© 2026 Alvor Clube. Academia fictícia: preços e horários deste site são supostos.</p>
          <p>Vídeo: Dishant Babariya (Pexels). Fotos: Aaron Brogden (Unsplash) e demais a creditar.</p>
        </div>
      </div>
    </footer>
  );
}
