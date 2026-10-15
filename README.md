# BrazaBrazil — site

Site estático (HTML + CSS + JS puro, sem build). Pronto para Cloudflare Pages via GitHub.

## Estrutura
```
index.html          páginas e seções
css/styles.css      visual (cores no topo, em :root)
js/config.js        WhatsApp, endereço, horários, entrega  ← editar
js/products.js      catálogo de produtos e guia de cortes   ← editar
js/i18n.js          textos do site nos 4 idiomas            ← editar
js/app.js           lógica da loja / carrinho (não precisa mexer)
assets/             logo, favicon e fotos dos produtos
```

## Idiomas
EN (UK), PT-BR, PT-PT e ES. O site escolhe sozinho pelo idioma do navegador do visitante;
o seletor de bandeira no topo troca na hora e lembra a escolha. Link direto: `?lang=pt-BR`, `?lang=pt-PT`, `?lang=es`, `?lang=en`.

## O que preencher antes de publicar
1. `js/config.js`: número de WhatsApp real, telefone, e-mail, endereço, link do Google Maps e horários.
2. `js/products.js`: preços reais (os atuais são exemplos) e produtos que a loja vende.
3. Fotos: coloque em `assets/products/` e preencha `image: "assets/products/picanha.jpg"` no produto.
   Sem foto, o card mostra a ilustração em traço fino.

## Deploy (Cloudflare Pages)
1. Suba esta pasta para um repositório no GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → escolha o repo.
3. Framework preset: **None** · Build command: *(vazio)* · Output directory: **/**
4. Custom domains → adicione `brazabrazil.co.uk` e `www.brazabrazil.co.uk`
   (com os nameservers da GoDaddy apontados para a Cloudflare).

Cada `git push` publica a nova versão automaticamente.
