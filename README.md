# Site — Murupi Produções

Site estático (HTML/CSS/JS puro). Não precisa de build, servidor Node ou banco de
dados — funciona em qualquer hospedagem, bastando enviar esta pasta por FTP/painel
de hospedagem para a raiz do domínio `murupiproducoes.com.br`.

## Estrutura

```
index.html              → página principal (todas as seções)
privacidade.html        → Política de Privacidade
termos.html             → Termos de Uso
404.html                → página exibida quando um link quebrado é acessado
manifest.json           → metadados de "instalar como app" (ícone, cor)
robots.txt, sitemap.xml → arquivos técnicos de SEO
css/styles.css          → cores, tipografia, layout
js/main.js              → menu mobile, filtros do portfólio, lightbox, FAQ, formulário
js/portfolio-data.js    → lista de cases do portfólio (ver abaixo)
assets/img/brand/       → logo, favicon e ícones (inclui icon-192.png, icon-512.png, apple-touch-icon.png)
assets/img/portfolio/   → fotos do portfólio
assets/img/video/       → capas (pôsteres) dos vídeos
assets/img/og-image.jpg → imagem de compartilhamento (WhatsApp, redes sociais)
assets/video/           → vídeos (loop do topo + showreel + eventos)
```

## Contato no site

- **WhatsApp:** (21) 99554-1972 (`5521995541972` nos links `wa.me` e no `data-whatsapp` do formulário)
- **E-mail:** `contato@murupiproducoes.com.br` (atualizar se o endereço definitivo no Zoho for outro)
- **Instagram:** @murupiproducoes

O formulário em "Fale Conosco" não envia dados para nenhum servidor — monta a
mensagem e abre o WhatsApp ou o aplicativo de e-mail. Assim o site permanece
100% estático, sem backend.

## FAQ

As perguntas ficam direto no `index.html`, dentro de `<section id="faq">`, uma
por bloco `<details class="faq-item">...</details>`. Para adicionar uma
pergunta, copie um bloco inteiro e troque o texto do `<summary>` (pergunta) e do
`<p>` (resposta) — abre/fecha sozinho, sem precisar de JavaScript.

## Política de Privacidade e Termos de Uso

Descrevem o que o site faz hoje (formulário só abre WhatsApp/e-mail). Se no
futuro o site ganhar formulário que salva dados, newsletter ou analytics, essas
páginas precisam ser atualizadas — idealmente com apoio jurídico (LGPD).

## Vídeos

- `hero-loop.mp4` — trecho de 8s, sem áudio, que roda em loop no topo da página.
- `showreel.mp4`, `carros-encontro.mp4`, `carros-classicos.mp4` — vídeos da seção
  "Vídeos", com áudio; só carregam quando o visitante clica em play.

Para trocar um vídeo: exporte em MP4 (H.264), 1280px de largura para horizontais,
e substitua o arquivo mantendo o nome. Atualize também a capa correspondente em
`assets/img/video/`. Vídeos acima de ~15 MB deixam a página pesada.

## Domínio e SEO

O domínio `murupiproducoes.com.br` já está reservado, mas o DNS ainda não aponta
para nenhuma hospedagem — por isso URLs canônicas, Open Graph, JSON-LD,
`sitemap.xml` e `robots.txt` apontam hoje para o endereço do Vercel
(`https://murupi-producoes.vercel.app/`), que é o que está realmente no ar. Sem
isso, o preview de link no WhatsApp/redes sociais quebraria.

Assim que o domínio for publicado (DNS apontado para a hospedagem final), troque
essas URLs pelo domínio definitivo — procure por `<!-- EDITAR -->` em
`index.html`, `robots.txt` e `sitemap.xml`, e reative o link no rodapé
(`site-footer__contact`, hoje um `<span>` em vez de `<a>`).

## Como adicionar um novo case ao portfólio

Abra `js/portfolio-data.js`, copie um bloco `{ ... }` inteiro, cole no fim da lista
e troque os valores:

```js
{
  categoria: "shows",              // "shows", "campanhas" ou "carros"
  titulo: "Nome do evento",
  ano: "2025",                     // ou "" se não quiser mostrar o ano
  imagem: "assets/img/portfolio/novo-arquivo.jpg",
  descricao: "Uma ou duas linhas de contexto sobre o case."
}
```

Coloque a foto correspondente em `assets/img/portfolio/`. Não precisa mexer em
nenhum outro arquivo — o card aparece automaticamente na seção Portfólio, dentro
do filtro certo.

**Fotos:** use JPG, largura entre 1200–1600px já é suficiente para tela cheia.
Fotos muito grandes deixam o site lento. Quando chegarem fotos em resolução
maior, substitua o arquivo mantendo o mesmo nome (ou atualize o caminho em
`portfolio-data.js`).
