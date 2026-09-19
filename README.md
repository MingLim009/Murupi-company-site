# Site — Murupi Produções

Site estático (HTML/CSS/JS puro). Não precisa de build, servidor Node ou banco de
dados — funciona em qualquer hospedagem, bastando enviar esta pasta por FTP/painel
de hospedagem para a raiz do domínio `murupiproducoes.com.br`.

## Estrutura

```
index.html              → todo o conteúdo e a estrutura das seções
css/styles.css          → cores, tipografia, layout
js/main.js              → menu mobile, filtros do portfólio, lightbox
js/portfolio-data.js    → lista de cases do portfólio (ver abaixo)
assets/img/brand/       → logo e favicon
assets/img/portfolio/   → fotos do portfólio
assets/img/video/       → capas (pôsteres) dos vídeos
assets/img/og-image.jpg → imagem de compartilhamento (WhatsApp, redes sociais)
assets/video/           → vídeos (loop do topo + showreel + eventos)
```

## Vídeos

- `hero-loop.mp4` — trecho de 8s, sem áudio, que roda em loop no topo da página.
- `showreel.mp4`, `carros-encontro.mp4`, `carros-classicos.mp4` — vídeos da seção
  "Vídeos", com áudio; só carregam quando o visitante clica em play.

Para trocar um vídeo: exporte em MP4 (H.264), 1280px de largura para horizontais,
e substitua o arquivo mantendo o nome. Atualize também a capa correspondente em
`assets/img/video/`. Vídeos acima de ~15 MB deixam a página pesada.

## Ao publicar no domínio final

No `index.html`, troque as URLs `https://murupi-producoes.vercel.app/...` das tags
`og:image` e `og:url` (topo do arquivo) pelo endereço definitivo — é o que define a
prévia do link quando o site é compartilhado no WhatsApp ou redes sociais.

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
Fotos muito grandes deixam o site lento.

## Pontos marcados como `EDITAR` no `index.html`

Alguns trechos ainda dependem de confirmação com a cliente antes de publicar —
procure por `<!-- EDITAR: ... -->` no código:

- Texto de "Quem Somos" (missão/valores) — redigido a partir do que foi
  conversado; vale confirmar com a Murupi antes de publicar.
- WhatsApp, e-mail e Instagram reais, na seção de Contato (hoje estão com
  valores de exemplo).

## Fotos do portfólio em resolução melhor

As imagens usadas hoje foram extraídas dos vídeos e do material enviado pelo
cliente. Quando chegarem fotos em resolução maior, é só substituir o arquivo
correspondente dentro de `assets/img/portfolio/` mantendo o mesmo nome (ou
atualizar o caminho em `portfolio-data.js`).
