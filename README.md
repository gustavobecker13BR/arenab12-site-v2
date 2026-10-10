# Arena B12 — Site (v2)

Site institucional da Arena B12, em HTML/CSS/JS puro — sem framework, sem build step.

## Estrutura

```
index.html          → página única, todo o site
assets/
  logo-horizontal.png
  logo-stacked.png
  hero-bg.jpg
  quadra-society.jpg
  quadra-areia.jpg
  favicon.png
  fonts/             → Monument Extended (Regular, Light, Ultrabold, Black)
```

## Deploy

Publicado via Vercel, conectado a este repositório. Sem build command —
Framework preset "Other", output = raiz do projeto.

## Widget de reservas

O botão "Reservar" usa o widget da WebQuadras (`data-wq-anchor` +
`data-sportcenterid="arenab12"`). O script de carregamento fica no `<head>`
do `index.html` — não mover para o final do `<body>`, ele precisa carregar
antes dos botões serem clicados.
