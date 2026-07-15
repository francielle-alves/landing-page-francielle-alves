# Página hub de E-books (`ebooks.html`) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma página hub `ebooks.html` que lista todos os e-books e passa a ser o destino do item "E-books" em todo o site, tirando a `ebook-whatsapp.html` do estado órfão.

**Architecture:** Site estático (HTML/CSS/JS puro, GitHub Pages). Nova página no mesmo padrão estrutural das demais (head+GA, nav, whatsapp-float, main, site-footer, scripts). Estilos ficam em `css/modern-style.css` via classes semânticas novas (sem inline). Links de e-book do menu/rodapé de todas as páginas passam a apontar pro hub.

**Tech Stack:** HTML5, CSS3 (custom properties já existentes em `modern-style.css`), Font Awesome 6.4.0, `js/modern-script.js` (menu mobile). Sem test runner — verificação é por `grep` + navegador.

## Global Constraints

- Paleta/tokens já existentes: `--color-primary #3D4C35`, `--color-button #3D4C35`, `--color-button-hover #2b3824`, `--color-secondary #EFECE8`, `--color-gold #d7bc7a`, `--font-secondary 'Montserrat Alternates'`, `--box-shadow`, `--box-shadow-hover`, `--transition-fast`. Usar esses — não hardcodar nova paleta.
- Sem estilos inline no HTML novo — toda regra vai em `css/modern-style.css`.
- GA tracking ID: `G-V3M0E5KL9R` (mesmo snippet das outras páginas).
- Font Awesome deve manter o atributo `integrity`/`crossorigin` (SRI) igual ao das outras páginas.
- Não alterar `ebook-detox.html` / `ebook-whatsapp.html` além dos links de navegação/rodapé.
- Não tocar em `ebook-detox-novo.html`.
- Números de linha citados são do estado atual da branch `feat/ebooks-hub-page`; reconfirmar com `grep` antes de cada edição.

---

### Task 1: CSS do hub em `modern-style.css`

**Files:**
- Modify: `css/modern-style.css` (adicionar bloco ao final)

**Interfaces:**
- Produces (classes consumidas na Task 2): `ebooks-hero`, `ebooks-section`, `ebooks-grid`, `ebook-card`, `ebook-card-cover`, `ebook-card-cover--whatsapp`, `ebook-cover-icon`, `ebook-cover-title`, `ebook-card-badge` (+ `--free`, `--paid`), `ebook-card-body`, `ebook-card-audience`, `ebook-card-title`, `ebook-card-desc`, `ebook-card-cta`.

- [ ] **Step 1: Anexar o bloco de CSS ao final de `css/modern-style.css`**

```css

/* ===== Página hub de E-books (ebooks.html) ===== */
.ebooks-hero {
  background-color: var(--color-primary);
  color: #fff;
  text-align: center;
  padding: 140px 20px 70px;
}
.ebooks-hero h1 {
  font-family: var(--font-secondary);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  margin-bottom: 16px;
}
.ebooks-hero p {
  max-width: 620px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}
.ebooks-section {
  padding: 70px 0;
  background-color: var(--color-secondary);
}
.ebooks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}
.ebook-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition-fast);
}
.ebook-card:hover,
.ebook-card:focus-within {
  transform: translateY(-6px);
  box-shadow: var(--box-shadow-hover);
}
.ebook-card-cover {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.ebook-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ebook-card-cover--whatsapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px;
  text-align: center;
  background: linear-gradient(150deg, #3D4C35 0%, #2b3824 100%);
  color: #fff;
}
.ebook-card-cover--whatsapp .ebook-cover-icon {
  font-size: 3.4rem;
  color: #25D366;
}
.ebook-card-cover--whatsapp .ebook-cover-title {
  font-family: var(--font-secondary);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.95);
}
.ebook-card-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 2;
}
.ebook-card-badge--free {
  background-color: var(--color-primary);
  color: #fff;
}
.ebook-card-badge--paid {
  background-color: var(--color-gold);
  color: var(--color-primary);
}
.ebook-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 26px 24px 28px;
}
.ebook-card-audience {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gold);
  margin-bottom: 8px;
}
.ebook-card-title {
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}
.ebook-card-desc {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 24px;
}
.ebook-card-cta {
  margin-top: auto;
  align-self: flex-start;
  display: inline-block;
  padding: 12px 26px;
  border-radius: 999px;
  background-color: var(--color-button);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-fast);
}
.ebook-card-cta:hover,
.ebook-card-cta:focus {
  background-color: var(--color-button-hover);
}
@media (max-width: 600px) {
  .ebooks-hero { padding: 120px 20px 50px; }
  .ebooks-section { padding: 50px 0; }
}
```

- [ ] **Step 2: Verificar que as classes existem no arquivo**

Run: `grep -c "ebook-card-cover--whatsapp\|ebooks-grid\|ebook-card-badge--paid" css/modern-style.css`
Expected: `3`

- [ ] **Step 3: Commit**

```bash
git add css/modern-style.css
git commit -m "feat: estilos da pagina hub de e-books"
```

---

### Task 2: Criar `ebooks.html`

**Files:**
- Create: `ebooks.html`

**Interfaces:**
- Consumes: classes CSS da Task 1.
- Produces: página em `ebooks.html` com nav "E-books" ativa, 2 cards e CTAs → `ebook-detox.html` e `ebook-whatsapp.html`.

- [ ] **Step 1: Criar `ebooks.html` com este conteúdo**

Montar o arquivo em 4 partes. As partes B (header/nav), C (whatsapp-float) e E (footer) são **copiadas verbatim do `index.html`** com os ajustes indicados; as partes A (head) e D (main) são o conteúdo abaixo.

**Parte A — `<head>` (usar exatamente isto):**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="E-books da Francielle Alves: material gratuito pra desinflamar o corpo em 15 dias e guia pra fechar pacotes de pós-operatório pelo WhatsApp.">
    <meta name="keywords" content="e-book estética, e-book detox, desinflamar corpo, pós-operatório whatsapp, Francielle Alves, esteticista jaguariúna">
    <meta name="author" content="Francielle Alves">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="E-books | Francielle Alves - Esteticista em Jaguariúna">
    <meta property="og:description" content="Material gratuito pra desinflamar o corpo e guia pra fechar pacotes de pós-operatório pelo WhatsApp.">
    <meta property="og:image" content="assets/icon/logo.png">
    <meta property="og:url" content="https://franciellealves.com/ebooks.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="E-books | Francielle Alves - Esteticista em Jaguariúna">
    <meta name="twitter:description" content="Material gratuito pra desinflamar o corpo e guia pra fechar pacotes de pós-operatório pelo WhatsApp.">
    <meta name="twitter:image" content="assets/icon/logo.png">
    <meta property="og:type" content="website">
    <title>E-books | Francielle Alves - Esteticista em Jaguariúna</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/icon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/icon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/icon/favicon-192x192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icon/apple-touch-icon.png">
    <link rel="canonical" href="https://franciellealves.com/ebooks.html">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V3M0E5KL9R"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-V3M0E5KL9R');
    </script>
    <link rel="stylesheet" href="css/modern-style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Montserrat+Alternates:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0" crossorigin="anonymous">
</head>
<body>
    <a href="#main-content" class="skip-link">Pular para o conteudo principal</a>
```

**Parte B — header/nav:** copiar de `index.html` o bloco do `<header>` até `</header>` (linhas ~655–684), **mudando somente** a linha do item E-books para:

```html
                <li><a href="ebooks.html" aria-current="page">E-books</a></li>
```

**Parte C — whatsapp-float:** copiar de `index.html` o bloco `<!-- WhatsApp floating button -->` + `<a ... class="whatsapp-float" ...>...</a>` (linhas ~686–689) verbatim.

**Parte D — `<main>` (usar exatamente isto):**

```html
    <main id="main-content">
        <section class="ebooks-hero">
            <h1>E-books</h1>
            <p>Materiais pra cuidar do seu corpo e evoluir no seu atendimento.</p>
        </section>

        <section class="ebooks-section">
            <div class="container">
                <div class="ebooks-grid">

                    <article class="ebook-card">
                        <div class="ebook-card-cover">
                            <span class="ebook-card-badge ebook-card-badge--free">Grátis</span>
                            <picture>
                                <source srcset="assets/banner-detox.webp" type="image/webp">
                                <img src="assets/banner-detox.png" alt="Capa do e-book Desinflamar Seu Corpo em 15 Dias" width="576" height="432" loading="lazy">
                            </picture>
                        </div>
                        <div class="ebook-card-body">
                            <p class="ebook-card-audience">Pra você</p>
                            <h2 class="ebook-card-title">Desinflamar Seu Corpo em 15 Dias</h2>
                            <p class="ebook-card-desc">Programa prático de 15 dias pra reduzir a inflamação e desinchar o corpo.</p>
                            <a href="ebook-detox.html" class="ebook-card-cta">Baixar grátis</a>
                        </div>
                    </article>

                    <article class="ebook-card">
                        <div class="ebook-card-cover ebook-card-cover--whatsapp">
                            <span class="ebook-card-badge ebook-card-badge--paid">R$47</span>
                            <i class="fab fa-whatsapp ebook-cover-icon" aria-hidden="true"></i>
                            <span class="ebook-cover-title">Fechar Pacotes de Pós-Operatório pelo WhatsApp</span>
                        </div>
                        <div class="ebook-card-body">
                            <p class="ebook-card-audience">Pra profissionais</p>
                            <h2 class="ebook-card-title">Fechar Pacotes de Pós-Operatório pelo WhatsApp</h2>
                            <p class="ebook-card-desc">Scripts prontos e gatilhos que transformam conversa no WhatsApp em pacote fechado.</p>
                            <a href="ebook-whatsapp.html" class="ebook-card-cta">Ver o e-book</a>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    </main>
```

**Parte E — footer + scripts:** copiar de `index.html` o bloco `<footer class="site-footer">` até `</footer>` (linhas ~1066–1136) verbatim, **mudando somente** o link do e-book de `<a href="ebook-detox.html">E-book Detox</a>` para `<a href="ebooks.html">E-books</a>`. Em seguida fechar a página com:

```html
    <script src="js/modern-script.js" defer></script>
</body>
</html>
```

> Não incluir `BeerSlider.js`, `aos.js`, `index-page.js` nem o JSON-LD do index — não são usados aqui.

- [ ] **Step 2: Verificar estrutura mínima da página**

Run: `grep -c "ebooks-hero\|ebook-card-cta\|class=\"site-footer\"\|modern-script.js\|aria-current" ebooks.html`
Expected: `>= 5`

- [ ] **Step 3: Verificar os dois CTAs**

Run: `grep -oE "href=\"(ebook-detox|ebook-whatsapp)\.html\" class=\"ebook-card-cta\"" ebooks.html`
Expected: duas linhas (uma pra cada e-book).

- [ ] **Step 4: Abrir no navegador e conferir render**

Abrir `ebooks.html` localmente (desktop e ~375px de largura): hero verde + 2 cards lado a lado (empilhados no mobile), badge "Grátis" e "R$47" visíveis, sem overflow horizontal, menu mobile abre/fecha. Clicar cada CTA → chega na página de venda correta.

- [ ] **Step 5: Commit**

```bash
git add ebooks.html
git commit -m "feat: adicionar pagina hub de e-books"
```

---

### Task 3: Padronizar nav + rodapé nas 5 páginas uniformes

Páginas onde o link de e-book (menu **e** rodapé) é a string idêntica `<li><a href="ebook-detox.html">E-book Detox</a></li>`: `slimshape.html`, `taping.html`, `curso.html`, `cursos-vip.html`, `ebook-whatsapp.html`.

**Files:**
- Modify: `slimshape.html`, `taping.html`, `curso.html`, `cursos-vip.html`, `ebook-whatsapp.html`

- [ ] **Step 1: Verificar o estado atual (deve haver 2 ocorrências por página)**

Run: `for f in slimshape taping curso cursos-vip ebook-whatsapp; do echo -n "$f "; grep -c 'href="ebook-detox.html">E-book Detox' $f.html; done`
Expected: cada linha termina com `2`.

- [ ] **Step 2: Substituir em cada página (menu + rodapé de uma vez)**

Em cada um dos 5 arquivos, aplicar Edit com `replace_all: true`:
- old: `<li><a href="ebook-detox.html">E-book Detox</a></li>`
- new: `<li><a href="ebooks.html">E-books</a></li>`

- [ ] **Step 3: Verificar que não sobrou link antigo de e-book**

Run: `for f in slimshape taping curso cursos-vip ebook-whatsapp; do echo -n "$f detox="; grep -c 'href="ebook-detox.html"' $f.html; echo -n " hub="; grep -c 'href="ebooks.html">E-books' $f.html; done`
Expected: cada página com `detox=0` e `hub=2`.

- [ ] **Step 4: Commit**

```bash
git add slimshape.html taping.html curso.html cursos-vip.html ebook-whatsapp.html
git commit -m "feat: apontar link de e-books de 5 paginas para o hub"
```

---

### Task 4: Atualizar `index.html` (menu + rodapé)

**Files:**
- Modify: `index.html` (menu ~672, rodapé ~1091)

- [ ] **Step 1: Trocar o item de menu**

Edit em `index.html`:
- old: `<li><a href="ebook-detox.html">E-books</a></li>`
- new: `<li><a href="ebooks.html">E-books</a></li>`

- [ ] **Step 2: Trocar o link do rodapé**

Edit em `index.html`:
- old: `<a href="ebook-detox.html">E-book Detox</a>`
- new: `<a href="ebooks.html">E-books</a>`

- [ ] **Step 3: Verificar**

Run: `echo -n "detox="; grep -c 'href="ebook-detox.html"' index.html; echo -n "hub="; grep -c 'href="ebooks.html"' index.html`
Expected: `detox=0` e `hub=2`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: apontar link de e-books do index para o hub"
```

---

### Task 5: Adicionar item "E-books" na `ebook-detox.html` (menu + rodapé)

A `ebook-detox.html` tem menu próprio (âncoras internas) e não tinha item de e-books.

**Files:**
- Modify: `ebook-detox.html` (nav-links ~907–915, footer-link-list ~1310–1315)

- [ ] **Step 1: Adicionar item no menu**

Edit em `ebook-detox.html`:
- old:
```html
                <li><a href="index.html">Página Inicial</a></li>
                <li><a href="#receitas">Receitas</a></li>
```
- new:
```html
                <li><a href="index.html">Página Inicial</a></li>
                <li><a href="ebooks.html">E-books</a></li>
                <li><a href="#receitas">Receitas</a></li>
```

- [ ] **Step 2: Adicionar item no rodapé (lista "Links Rápidos")**

Edit em `ebook-detox.html`:
- old:
```html
                        <li><a href="taping.html">Curso de Taping</a></li>
                        <li><a href="slimshape.html">SlimShape</a></li>
                    </ul>
```
- new:
```html
                        <li><a href="taping.html">Curso de Taping</a></li>
                        <li><a href="slimshape.html">SlimShape</a></li>
                        <li><a href="ebooks.html">E-books</a></li>
                    </ul>
```

- [ ] **Step 3: Verificar**

Run: `grep -c 'href="ebooks.html">E-books' ebook-detox.html`
Expected: `2`

- [ ] **Step 4: Commit**

```bash
git add ebook-detox.html
git commit -m "feat: adicionar link para hub de e-books na pagina detox"
```

---

### Task 6: Adicionar `ebooks.html` ao `sitemap.xml`

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Inserir a entrada antes de `</urlset>`**

Edit em `sitemap.xml` — adicionar este bloco imediatamente antes da linha `</urlset>`:

```xml
  <url>
    <loc>https://franciellealves.com/ebooks.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
```

- [ ] **Step 2: Verificar presença e boa-formação**

Run: `grep -c "ebooks.html" sitemap.xml && (xmllint --noout sitemap.xml && echo "XML OK" || echo "checar XML manualmente")`
Expected: `1` seguido de `XML OK` (se `xmllint` não existir, inspecionar o arquivo manualmente).

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml
git commit -m "chore: adicionar ebooks.html ao sitemap"
```

---

### Task 7: Verificação final de ponta a ponta

**Files:** nenhum (checklist manual)

- [ ] **Step 1: Nenhum link de e-book "solto" restou apontando pro detox indevidamente**

Run: `grep -rn 'href="ebook-detox.html"' *.html`
Expected: só ocorrências legítimas — a `ebook-detox-novo.html` (fora de escopo) e, se houver, o CTA de download dentro da própria `ebook-detox.html`. Nenhuma em item de menu/rodapé rotulado como e-books.

- [ ] **Step 2: Click-through no navegador**

Abrir cada uma: `index`, `slimshape`, `taping`, `curso`, `cursos-vip`, `ebook-whatsapp`, `ebook-detox`. Em cada uma, clicar "E-books" no menu → cai em `ebooks.html`. Em `ebooks.html`, clicar os 2 CTAs → páginas de venda corretas.

- [ ] **Step 3: Responsivo**

Em `ebooks.html`, conferir 375px / 768px / 1440px: sem overflow horizontal; cards empilham no mobile; badges e capas legíveis; foco visível ao tabular nos cards/CTAs.

---

## Notas de execução

- Ao final, a branch `feat/ebooks-hub-page` terá ~6 commits. Abrir PR pra `master` (fora do escopo deste plano — decidir com o usuário).
- Se o `<header>`/`<footer>` do `index.html` divergir dos números de linha citados, localizar pelos marcadores (`<nav class="navbar"`, `<footer class="site-footer">`) — o conteúdo a copiar é o mesmo.
