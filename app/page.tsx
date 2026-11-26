import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Modalidades } from "@/components/site/modalidades";
import { Horarios } from "@/components/site/horarios";
import { Planos } from "@/components/site/planos";
import { Professores } from "@/components/site/professores";
import { Espaco } from "@/components/site/espaco";
import { ComoChegar } from "@/components/site/como-chegar";
import { Agendar } from "@/components/site/agendar";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="alv v8">
      <a className="sr-only" href="#modalidades">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="topo">
        <Hero />
        <Modalidades />
        <Horarios />
        <Planos />
        <Professores />
        <Espaco />
        <ComoChegar />
        <Agendar />
      </main>
      <Footer />
    </div>
  );
}
