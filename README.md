# Silent Majority Talks: site institucional

Site estático de página única do projeto Silent Majority Talks (carinhosamente traduzido, "Se Meta Também"). Sem backend, sem banco de dados, sem cookies de rastreamento.

## Estrutura

```
index.html      todo o conteúdo e as seções do site
404.html        página de erro (Netlify, Vercel e GitHub Pages servem sozinhos)
css/style.css   estilos; o tema fica no bloco :root no topo
js/main.js      menu mobile e animações de entrada
robots.txt      liberado para buscadores (com um oi para quem espia)
humans.txt      tradição antiga da web feita com carinho
assets/         fontes, favicons, og.png e o kit oficial da marca em assets/marca/
```

## Como editar os textos

Todo o texto está em `index.html`, organizado por seção com comentários (`<!-- ==== HERO ==== -->` etc.). Edite direto no HTML. Regras de escrita do projeto: sem travessões como pontuação, sem nomes de participantes, sem valores ou financiadores, sem nomes de candidaturas ou partidos.

## Como ajustar a identidade visual

Todas as cores, fontes e efeitos da marca estão nas variáveis CSS no bloco `:root` de `css/style.css`. Trocar um valor lá atualiza o site inteiro. Cores oficiais: magenta `#ff00fa` e ciano `#11cae2`, com contornos pretos.

Fontes self-hosted em `assets/fonts/` via `@font-face`, sem chamadas ao Google Fonts (a promessa de zero rastreio vale para a tipografia também): Bebas Neue nos dizeres e destaques curtos (oficial da marca), Inter no corpo de texto (legibilidade em parágrafos longos, já que a Bebas é só caixa alta) e Baloo 2 nos títulos como aproximação da fonte oficial "Fat" (fonte da Canva, sem arquivo licenciável). Se conseguirem o arquivo da Fat (woff2/otf), basta colocá-lo em `assets/fonts/`, declarar o `@font-face` e trocar `--fonte-titulo`.

## Como rodar localmente

Qualquer servidor estático serve. Exemplo:

```
python3 -m http.server 8080
```

E abra `http://localhost:8080`.

## Site no ar

Publicado via GitHub Pages: https://figuered0o0808-glitch.github.io/smt-site/
Repositório: https://github.com/figuered0o0808-glitch/smt-site

Para atualizar o site publicado, depois de editar os arquivos:

```
git add -A && git commit -m "descreva a mudança" && git push
```

O GitHub Pages republica sozinho em um ou dois minutos.

## Como fazer deploy (alternativas)

- **Netlify**: arraste a pasta do projeto em https://app.netlify.com/drop, pronto.
- **Vercel**: `vercel` na raiz do projeto (ou importe o repositório no painel).
- **GitHub Pages**: suba o repositório e ative Pages na branch principal (Settings, Pages, Deploy from branch).

Após o deploy, preencha o `og:url` no `<head>` com o domínio final.

## Placeholders pendentes

1. **E-mail de contato**: seção Contato (`#contato`), console do navegador (`js/main.js`) e nota de privacidade. Dica: ao preencher, usar `mailto:` com assunto pronto, por exemplo `?subject=Quero%20me%20meter%20nesse%20papo`.
2. **Links de redes sociais**: rodapé (TikTok e YouTube; o Instagram já está no ar: instagram.com/semetatambem, com embed sob demanda no bloco Redes sociais).
3. **Videocast**: moldura 16:9 do bloco Videocast na seção O que fazemos (`#o-que-fazemos`).
4. **Agenda de eventos**: slot na seção O que fazemos (`#o-que-fazemos`).
5. **Link do grupo no Telegram e QR code**: moldura de conversa do bloco Comunidade digital (`#comunidade`); ao preencher, apontar também o botão "Entrar na comunidade" para o link do grupo.
6. **`og:url`**: domínio final do site no `<head>`.
7. **Fonte de títulos "Fat"**: sem arquivo licenciável por enquanto; Baloo 2 é o stand-in (ver seção de identidade visual acima).
8. **Analytics sem cookies**: snippet do Plausible preparado e comentado no `<head>`, ativar se quiserem métricas.

Guardados para depois (removidos do site a pedido, fáceis de restaurar pelo histórico do git): a seção Quem faz com a equipe e fotos, e o bloco Núcleo de gestão do rodapé.

Quando o e-mail de contato existir, os três cards de "Portas de entrada" podem virar links `mailto:` com assunto pré-preenchido (um por porta), em vez de apontarem para `#contato`.

O kit oficial da marca está completo em `assets/marca/` (S e wordmark nas versões escura, branca, degradê, contorno e badge; sombra longa em `assets/logo-smt.png`). Favicon, apple-touch-icon e og.png são gerados a partir dele.
