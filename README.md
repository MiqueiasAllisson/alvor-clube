# Alvor Clube

Site de uma academia **fictícia** em Moinhos de Vento, Porto Alegre: musculação com personal, funcional e HIIT, lutas, pilates e yoga, e recovery. Projeto de portfólio. Preços, horários, nomes e endereço exato são supostos.

**Site no ar:** https://miqueiasallisson.github.io/alvor-clube/

## Tecnologia

- **Next.js 16** (App Router) com **export estático**, publicado no **GitHub Pages**
- **React 19** e **TypeScript**
- **Tailwind CSS 4** com os tokens da paleta (`alvor-a`, `alvor-l`, `alvor-x`)
- Botão no padrão **shadcn/ui** (`class-variance-authority`, `@radix-ui/react-slot`, `tailwind-merge`)
- Fontes Barlow e Barlow Condensed hospedadas no próprio site via **Fontsource**
- Testes de ponta a ponta com **Playwright** em 1440, 820 e 390 px

## Paleta

| Papel | Cor |
|---|---|
| Fundo | `#FFFFFF` |
| Texto | `#17171C` |
| Destaque | `#2B50FF` |

## Rodar no seu computador

```bash
npm install
npm run dev          # http://localhost:3000
```

Build estático e testes:

```bash
npm run build        # gera a pasta out/
npx playwright install chromium
npm test             # serve out/ e roda os testes nas 3 larguras
```

Para testar com o mesmo caminho do GitHub Pages, rode os dois comandos com `NEXT_PUBLIC_BASE_PATH=/alvor-clube`.

## Publicação

A cada push na `main`, o workflow `.github/workflows/deploy.yml` roda o lint, gera o build, executa os testes do Playwright e publica a pasta `out/` no GitHub Pages.

## Estrutura

```
app/                 layout, página e CSS global
components/site/     seções do site (nav, hero, modalidades, horários, planos…)
components/ui/       botão no padrão shadcn/ui
lib/data.ts          todo o conteúdo (modalidades, grade, planos, professores)
e2e/                 testes Playwright
public/img, video    fotos e vídeo do topo
```

## O que a academia real precisa preencher

- Nome, CNPJ e endereço completo com número
- Telefone, WhatsApp, e-mail e redes sociais
- Preços, taxa de adesão e condições de cada plano
- Horário de funcionamento e grade real de aulas
- Nome, foto e registro no CREF de cada professor
- Fotos do espaço real (as atuais são de banco de imagens)
- Destino do formulário (hoje o envio é simulado, sem back-end)
- Política de privacidade (LGPD) para os dados do formulário

## Créditos das imagens

- Vídeo do topo: Dishant Babariya, Pexels
- Foto do formulário: Aaron Brogden, Unsplash
- Demais fotos: bancos de imagens gratuitos; créditos a completar
