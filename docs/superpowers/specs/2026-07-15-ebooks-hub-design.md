# Design: Página hub de E-books (`ebooks.html`)

**Data:** 2026-07-15
**Branch alvo:** master (feature branch a criar)

## Problema

A página de vendas `ebook-whatsapp.html` (R$47, público profissional) está **órfã**: não é
referenciada em nenhum lugar do site, só abre por URL direta. Ao mesmo tempo, o item de menu
"E-books" (e os links de rodapé/menu "E-book Detox") apontam **direto** para um único e-book
(`ebook-detox.html`), sem um ponto central que reúna os materiais.

## Objetivo

Criar uma página hub `ebooks.html` que lista todos os e-books e passa a ser o destino do
item de navegação "E-books" em todo o site. Assim a `ebook-whatsapp.html` deixa de ser órfã e
o site ganha um lugar natural pra crescer o catálogo de e-books no futuro.

## Não-objetivos

- Não alterar o conteúdo/design das páginas de venda `ebook-detox.html` e `ebook-whatsapp.html`.
- Não mexer na `ebook-detox-novo.html` (página duplicada/órfã, fora do site vivo).
- Não criar novos assets de imagem (a capa do card de WhatsApp será feita em CSS).
- Sem mudança de checkout, preços ou fluxo de compra.

## Abordagem escolhida

**Página hub dedicada** (`ebooks.html`), no mesmo padrão estrutural e visual das demais páginas
do site, com o menu/rodapé de todas as páginas relevantes apontando pra ela. Descartadas:
dropdown no menu (complica o mobile, sem landing indexável) e converter o detox em hub
(perderia a página de vendas do detox).

## Design

### 1. Nova página `ebooks.html`

Espelha a estrutura das outras páginas:

- `<head>`: charset/viewport, meta description, OG/Twitter (`og:type=website`, `og:url` e
  canonical `https://franciellealves.com/ebooks.html`), favicons, Font Awesome 6.4.0 (com SRI,
  como nas outras páginas), `css/modern-style.css`, e o snippet do Google Analytics
  (`G-V3M0E5KL9R`).
- Skip-nav (`Pular para o conteúdo`), `header` + `nav.navbar` idênticos ao padrão, botão
  flutuante do WhatsApp (`whatsapp-float`).
- `<main id="main-content">` com hero curto + grid de cards.
- Rodapé `footer.site-footer` no padrão (footer-grid, footer-heading, etc.), com o item de
  e-books do rodapé já apontando pra `ebooks.html`.
- Scripts: `js/modern-script.js` (menu mobile etc.), na mesma ordem das outras páginas.

**Menu da própria `ebooks.html`:** usa o menu padrão do site (Perfil/Slim Shape/E-books/
Tratamentos/Contato/Curso de Taping/Curso VIP), com o item "E-books" marcado como página atual
(`aria-current="page"`).

#### Hero

```
<section class="ebooks-hero">
  <h1>E-books</h1>
  <p>Materiais pra cuidar do seu corpo e evoluir no seu atendimento.</p>
</section>
```

#### Grid de cards

`section.ebooks-section > div.ebooks-grid` com dois `article.ebook-card`. Lado a lado no
desktop, empilhados no mobile. Cada card:

- **Capa** (`.ebook-card-cover`), proporção fixa pros dois ficarem um conjunto.
- **Badge de preço** (`.ebook-card-badge`) sobreposto na capa.
- **Rótulo de público** (`.ebook-card-audience`).
- **Título** (`h2.ebook-card-title`) + **descrição curta** (`p.ebook-card-desc`).
- **CTA** (`a.ebook-card-cta`) pra página do e-book.

Conteúdo dos dois cards:

| Campo | E-book Detox | E-book WhatsApp |
|---|---|---|
| Capa | `<picture>` com `assets/banner-detox.webp` / `.png` (`loading="lazy"`, width/height) | Mini-capa em CSS (ver abaixo) |
| Badge | **Grátis** (variante verde, `.ebook-card-badge--free`) | **R$47** (variante dourada, `.ebook-card-badge--paid`) |
| Público | Pra você | Pra profissionais |
| Título | Desinflamar Seu Corpo em 15 Dias | Fechar Pacotes de Pós-Operatório pelo WhatsApp |
| Descrição | Programa prático de 15 dias pra reduzir a inflamação e desinchar o corpo. | Scripts prontos e gatilhos que transformam conversa no WhatsApp em pacote fechado. |
| CTA (texto → destino) | Baixar grátis → `ebook-detox.html` | Ver o e-book → `ebook-whatsapp.html` |

> Os textos de descrição/CTA acima são a versão de referência; ajustes finos de copy são bem-vindos.

#### Mini-capa em CSS (card do WhatsApp)

Como não existe imagem estática, a capa é composta em CSS no mesmo espírito da própria
`ebook-whatsapp.html`: bloco com gradiente verde do site, um glifo de WhatsApp
(`fa-whatsapp`) e o título curto do e-book, enquadrado com a **mesma** moldura/raio/sombra da
capa do detox pra os dois cards lerem como um conjunto. Sem dependência de arquivo novo.

### 2. Mudanças de navegação (padronizar tudo)

Regra: **onde existir link de e-book no menu ou no rodapé, ele passa a ser rótulo "E-books" →
`ebooks.html`.**

Menu (topo) — trocar o `href` (e o rótulo pra "E-books" quando estiver como "E-book Detox"):

- `index.html:672` (rótulo já "E-books", só o href)
- `slimshape.html:64`
- `taping.html:675`
- `curso.html:55`
- `cursos-vip.html:55`
- `ebook-whatsapp.html:688`

Rodapé — trocar o `href` e o rótulo pra "E-books":

- `index.html:1091`
- `slimshape.html:640`
- `taping.html:1953`
- `curso.html:235`
- `cursos-vip.html:128`
- `ebook-whatsapp.html:1095`

Caso especial — `ebook-detox.html`: o menu é próprio (âncoras internas) e **não tem** item de
e-books; o rodapé também não. Pra padronizar e permitir descobrir o hub a partir do detox,
**adicionar** um item "E-books" → `ebooks.html` no menu da página; no rodapé, adicionar o link
na lista de links rápidos **se** houver uma equivalente (verificar a estrutura do rodapé do
detox na implementação; se não houver lista adequada, manter só o menu).

> Os números de linha são referência do estado atual da master; confirmar via grep antes de
> cada edição, pois podem mudar.

### 3. SEO

- Adicionar `<url>` de `ebooks.html` ao `sitemap.xml` (priority 0.9), seguindo o padrão das
  demais entradas.
- Canonical + OG próprios na página (já cobertos no `<head>` acima).

### 4. CSS

Adicionar classes semânticas novas em `css/modern-style.css` (sem estilos inline no HTML, em
linha com a migração que o projeto vem fazendo):

`ebooks-hero`, `ebooks-section`, `ebooks-grid`, `ebook-card`, `ebook-card-cover`,
`ebook-card-badge` (+ `--free` / `--paid`), `ebook-card-audience`, `ebook-card-title`,
`ebook-card-desc`, `ebook-card-cta`, e a mini-capa (`ebook-card-cover--whatsapp` + elementos
internos). Usar os tokens/paleta já existentes (`--color-primary` etc.). Estados de
hover/focus visíveis no card e no CTA (a11y).

## Acessibilidade

- Um único `<h1>` (o do hero); títulos dos cards em `<h2>`.
- Item de menu atual com `aria-current="page"`.
- Badges de preço com texto real (não só cor) e contraste adequado.
- Foco visível em cards e CTAs; imagem de capa com `alt` descritivo.

## Verificação

- Abrir `ebooks.html` no navegador (desktop + mobile ~375px): hero + 2 cards, sem overflow
  horizontal; menu mobile abre/fecha.
- Clicar cada CTA → chega na página de venda correta.
- A partir de `index`, `slimshape`, `taping`, `curso`, `cursos-vip`, `ebook-whatsapp` e
  `ebook-detox`: item "E-books" (menu e, onde aplicável, rodapé) leva ao hub.
- Conferir que nenhum link de e-book restante aponta pra `ebook-detox.html` de forma
  indevida (grep de verificação).
- Validar `sitemap.xml` (bem-formado, nova URL presente).

## Arquivos afetados

- **Novo:** `ebooks.html`
- **Editar:** `css/modern-style.css` (classes do hub), `sitemap.xml`
- **Editar (nav/rodapé):** `index.html`, `slimshape.html`, `taping.html`, `curso.html`,
  `cursos-vip.html`, `ebook-whatsapp.html`, `ebook-detox.html`

## Fora de escopo

- Geração de capa dedicada em imagem pro e-book de WhatsApp.
- Decisão sobre `ebook-detox.html` vs `ebook-detox-novo.html`.
- Qualquer mudança em checkout/preço.
