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

## Formulário de contato

O formulário na seção "Fale Conosco" não envia dados para nenhum servidor — ele
monta o texto digitado e abre o WhatsApp (botão "Enviar pelo WhatsApp") ou o
aplicativo de e-mail (botão "Enviar por e-mail") já com a mensagem pronta. Isso
mantém o site 100% estático, sem precisar de backend, conta em serviço de
formulário ou custo extra.

O número de WhatsApp usado pelo formulário está no atributo `data-whatsapp` da
tag `<form id="contact-form">`, em `index.html` — é o mesmo número que deve ser
atualizado em todos os outros lugares marcados com `EDITAR`.

## FAQ

As perguntas ficam direto no `index.html`, dentro de `<section id="faq">`, uma
por bloco `<details class="faq-item">...</details>`. Para adicionar uma
pergunta, copie um bloco inteiro e troque o texto do `<summary>` (pergunta) e do
`<p>` (resposta) — abre/fecha sozinho, sem precisar de JavaScript.

## Política de Privacidade e Termos de Uso

São rascunhos diretos e honestos sobre o que o site faz hoje (o formulário não
guarda dados em servidor — só abre o WhatsApp/e-mail). Se no futuro o site
ganhar um formulário que salva dados, uma newsletter ou uma ferramenta de
analytics, essas páginas precisam ser atualizadas — idealmente com apoio
jurídico, já que envolvem LGPD.

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
