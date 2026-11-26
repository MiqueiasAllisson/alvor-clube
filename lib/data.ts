
export const NAV = [
  { href: "#modalidades", label: "Modalidades" },
  { href: "#horarios", label: "Horários", opt: true },
  { href: "#planos", label: "Planos" },
  { href: "#professores", label: "Professores", opt: true },
  { href: "#espaco", label: "O espaço", opt: true },
  { href: "#como-chegar", label: "Como chegar" },
];

export type Modalidade = { nome: string; texto: string; img: string; alt: string; card: "mxc-l" | "mxc-x" | "mxc-a" };

export const MODALIDADES: Modalidade[] = [
  {
    nome: "Musculação com personal",
    texto: "Salão com aparelhos novos e área de peso livre. Tem professor no salão em todos os horários, e personal para quem quer treino individual.",
    img: "/img/musculacao-halteres.jpg",
    alt: "Aluno de boné preto levantando dois halteres de 45 libras do chão",
    card: "mxc-l",
  },
  {
    nome: "Funcional e HIIT",
    texto: "Turmas de até 12 pessoas, aula de 45 minutos com corda naval, kettlebell e trenó. Dá para começar sem nunca ter treinado.",
    img: "/img/funcional-cordas.jpg",
    alt: "Três alunos agachados batendo cordas navais no salão de funcional",
    card: "mxc-x",
  },
  {
    nome: "Jiu-jitsu, muay thai e boxe",
    texto: "Sala de lutas com tatame de 90 m², sacos e ringue. Luvas e kimono emprestados na aula experimental.",
    img: "/img/lutas-muay-thai.jpg",
    alt: "Aluno acertando um chute alto no saco de pancada",
    card: "mxc-a",
  },
  {
    nome: "Pilates e yoga",
    texto: "Estúdio com 6 reformers, turmas de yoga à noite e aos sábados. Bom para quem volta de lesão.",
    img: "/img/estudio-yoga.jpg",
    alt: "Estúdio de yoga com tapetes, blocos e tecidos suspensos",
    card: "mxc-l",
  },
  {
    nome: "Recovery",
    texto: "Sauna seca e banheira de gelo para depois do treino, incluídas em todos os planos.",
    img: "/img/recovery-sauna.jpg",
    alt: "Sauna seca de madeira com bancos em dois níveis",
    card: "mxc-x",
  },
];

export const DIAS = [
  { id: "seg", curto: "Seg", nome: "segunda" },
  { id: "ter", curto: "Ter", nome: "terça" },
  { id: "qua", curto: "Qua", nome: "quarta" },
  { id: "qui", curto: "Qui", nome: "quinta" },
  { id: "sex", curto: "Sex", nome: "sexta" },
  { id: "sab", curto: "Sáb", nome: "sábado" },
  { id: "dom", curto: "Dom", nome: "domingo" },
] as const;

export type DiaId = (typeof DIAS)[number]["id"];

export const FILTROS = [
  { id: "todas", label: "Todas" },
  { id: "funcional", label: "Funcional e HIIT" },
  { id: "lutas", label: "Lutas" },
  { id: "corpo", label: "Pilates e yoga" },
] as const;

export type FiltroId = (typeof FILTROS)[number]["id"];

export type Aula = { dia: DiaId; hora: string; nome: string; tipo: Exclude<FiltroId, "todas">; prof: string; sala: string };

const A = (dia: DiaId, hora: string, nome: string, tipo: Aula["tipo"], prof: string, sala: string): Aula => ({ dia, hora, nome, tipo, prof, sala });

export const AULAS: Aula[] = [
  A("seg", "06:00", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("seg", "07:00", "Jiu-jitsu", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("seg", "09:00", "Pilates reformer", "corpo", "Helena Sartori", "Estúdio"),
  A("seg", "12:15", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("seg", "18:30", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("seg", "19:00", "Boxe", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("seg", "20:30", "Jiu-jitsu", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("ter", "06:30", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("ter", "07:00", "Muay thai", "lutas", "Rafael Lisboa", "Sala de lutas"),
  A("ter", "12:15", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("ter", "17:30", "Pilates reformer", "corpo", "Helena Sartori", "Estúdio"),
  A("ter", "18:00", "Yoga", "corpo", "Helena Sartori", "Estúdio"),
  A("ter", "20:00", "Muay thai", "lutas", "Rafael Lisboa", "Sala de lutas"),
  A("qua", "06:00", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("qua", "07:00", "Jiu-jitsu", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("qua", "09:00", "Pilates reformer", "corpo", "Helena Sartori", "Estúdio"),
  A("qua", "18:30", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("qua", "19:00", "Boxe", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("qua", "20:30", "Jiu-jitsu", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("qui", "06:30", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("qui", "07:00", "Muay thai", "lutas", "Rafael Lisboa", "Sala de lutas"),
  A("qui", "12:15", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("qui", "17:30", "Pilates reformer", "corpo", "Helena Sartori", "Estúdio"),
  A("qui", "18:00", "Yoga", "corpo", "Helena Sartori", "Estúdio"),
  A("qui", "20:00", "Muay thai", "lutas", "Rafael Lisboa", "Sala de lutas"),
  A("sex", "06:00", "Funcional e HIIT", "funcional", "Carla Menezes", "Salão 2"),
  A("sex", "07:00", "Jiu-jitsu", "lutas", "Tiago Bertoldo", "Sala de lutas"),
  A("sex", "09:00", "Pilates reformer", "corpo", "Helena Sartori", "Estúdio"),
  A("sex", "18:30", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("sab", "09:00", "Funcional e HIIT", "funcional", "Diego Paim", "Salão 2"),
  A("sab", "09:30", "Yoga", "corpo", "Helena Sartori", "Estúdio"),
  A("sab", "10:00", "Boxe", "lutas", "Tiago Bertoldo", "Sala de lutas"),
];

export const PLANOS = [
  { nome: "Mensal", preco: "179,90", info: ["por mês, sem fidelidade", "Adesão de R$ 49,90"] },
  { nome: "Trimestral", preco: "149,90", info: ["por mês, R$ 449,70 a cada 3 meses", "Adesão de R$ 49,90"] },
  { nome: "Anual", preco: "119,90", info: ["por mês, em 12 vezes no cartão", "Sem taxa de adesão"], destaque: "Menor preço por mês" },
];

export const INCLUI = ["Todas as modalidades e o recovery", "Avaliação física na entrada", "Toalha e armário com senha"];

export const PROFESSORES = [
  {
    nome: "Bruno Kroeff",
    papel: "Musculação",
    texto: "Coordena o salão, monta o seu treino na avaliação e revisa a cada 6 semanas.",
    quando: "No salão de manhã e à noite",
    img: "/img/professor-corrigindo.jpg",
    alt: "Professor de camiseta preta corrigindo o alongamento de uma aluna",
  },
  {
    nome: "Tiago Bertoldo",
    papel: "Jiu-jitsu e boxe",
    texto: "Faixa-preta, recebe iniciantes em turma própria desde a primeira semana.",
    quando: "Seg, qua e sex às 7h e 20h30",
    img: "/img/professor-jiujitsu.jpg",
    alt: "Retrato do professor de jiu-jitsu de kimono preto",
  },
  {
    nome: "Carla Menezes",
    papel: "Funcional e HIIT",
    texto: "Dá as turmas das 6h e do meio-dia e adapta cada exercício para quem está começando.",
    quando: "Seg a sex às 6h e 12h15",
    img: "/img/professora-funcional.jpg",
    alt: "Professora de braços cruzados sorrindo no salão",
  },
];

export const ESPACOS = [
  {
    nome: "Salão de musculação",
    texto: "Racks, plataformas de levantamento e aparelhos novos, com ripas de madeira e luz indireta.",
    img: "/img/salao-musculacao.jpg",
    alt: "Salão de musculação com racks pretos e ripas de madeira iluminadas",
  },
  {
    nome: "Área de peso livre",
    texto: "Halteres até 50 kg, anilhas emborrachadas e barras olímpicas. Magnésio liberado.",
    img: "/img/peso-livre-anilhas.jpg",
    alt: "Anilhas empilhadas com pó de magnésio no ar",
  },
  {
    nome: "Sala de lutas",
    texto: "Tatame de 90 m², sacos de pancada e ringue para jiu-jitsu, muay thai e boxe.",
    img: "/img/lutas-jiujitsu.jpg",
    alt: "Dois alunos de kimono treinando guarda no tatame",
  },
  {
    nome: "Vestiário",
    texto: "Armários com senha, toalha e secador. Ao lado, a sauna seca e a banheira de gelo.",
    img: "/img/vestiario.jpg",
    alt: "Vestiário com armários cinza e bancos de madeira",
  },
];

export const FATOS = [
  { t: "900 m²", d: "em dois andares, com salão, sala de lutas e estúdio" },
  { t: "Vestiário", d: "com toalha, secador e armário com senha" },
  { t: "Recovery", d: "sauna seca e banheira de gelo" },
  { t: "Bicicletário", d: "e estacionamento conveniado na mesma rua" },
];

export const HORARIOS_CLUBE = [
  { d: "Seg a sex", h: "5h30 às 23h" },
  { d: "Sábado", h: "7h às 18h" },
  { d: "Dom e feriados", h: "8h às 14h" },
];

export const MAPA_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua%20Padre%20Chagas%2C%20Moinhos%20de%20Vento%2C%20Porto%20Alegre";

export const MODS_FORM = [
  { v: "musculacao", l: "Musculação com personal" },
  { v: "funcional", l: "Funcional e HIIT" },
  { v: "jiujitsu", l: "Jiu-jitsu" },
  { v: "muaythai", l: "Muay thai" },
  { v: "boxe", l: "Boxe" },
  { v: "pilates", l: "Pilates reformer" },
  { v: "yoga", l: "Yoga" },
];

export const MOD_AULA: Record<string, string> = {
  funcional: "Funcional e HIIT",
  jiujitsu: "Jiu-jitsu",
  muaythai: "Muay thai",
  boxe: "Boxe",
  pilates: "Pilates reformer",
  yoga: "Yoga",
};

export const FAIXAS = [
  { v: "06:00", l: "Manhã, entre 6h e 12h" },
  { v: "12:00", l: "Tarde, entre 12h e 18h" },
  { v: "18:00", l: "Noite, entre 18h e 22h" },
];
