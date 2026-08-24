# Se Mexa Também (SMT): site institucional

Site estático de página única do projeto Se Mexa Também, SMT (nome original em inglês: Silent Majority Talks). Sem backend, sem banco de dados, sem cookies de rastreamento.

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

Publicado via GitHub Pages: https://semexatambem.com/
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

O domínio próprio é https://semexatambem.com (DNS na Hostinger, 4 registros A + CNAME www; canonical, sitemap.xml e og:url já apontam para ele).

## Página do edital

`/edital/` publica o edital de eventos (fonte: doc "EDITAL - eventos SMT" no Drive). Texto na íntegra com três correções de digitação. O botão "Baixar em PDF" abre o diálogo de impressão (a folha de estilos tem versão de impressão limpa). Quando as inscrições encerrarem (02/09/2026), atualizar ou despublicar a página e os dois botões da home que apontam para ela.

## Segurança

O site é estático (sem servidor próprio, banco ou login), o que já elimina as classes mais comuns de ataque. Por cima disso:

- **Content-Security-Policy** via `<meta>` no `index.html` e no `404.html`: só recursos do próprio site, iframe apenas do Instagram e envio de formulário apenas para o FormSubmit. Regra de manutenção: **nada de script ou CSS inline** (tudo em `js/main.js` e `css/style.css`); qualquer inline novo será bloqueado pela CSP.
- **Anti-clickjacking**: script curtinho no topo do `<head>` que impede o site de ser embutido em iframe de terceiros. Se editar esse script (até um espaço), recalcule o hash e atualize na CSP: `printf '%s' "CONTEUDO" | openssl dgst -sha256 -binary | base64`.
- **Formulário com captcha do FormSubmit ligado** (padrão do serviço) + campo honeypot, contra spam automatizado.
- **GitHub**: branch `main` protegida contra force-push e deleção (ruleset "protege-main"), HTTPS forçado no Pages, secret scanning com push protection, Dependabot e canal privado de report de vulnerabilidade ativos. Commits futuros usam o e-mail noreply do GitHub.
- A conta do GitHub e a caixa do Gmail de contato devem ter **verificação em duas etapas** (isso não se configura pelo repositório).

## Conteúdos que ainda entram (sem placeholder no ar)

Os slots visuais existem, mas desde o lançamento do domínio o site não mostra mais "[PLACEHOLDER]" nenhum; quando o conteúdo chegar, é só preencher:

1. **Canal do videocast no YouTube**: entra na moldura 16:9 do bloco Videocast e volta como item na lista Redes do rodapé.
2. **Agenda de eventos**: entra na faixa do bloco Eventos presenciais.
3. **Alias do FormSubmit**: quando chegar o e-mail de ativação, trocar o e-mail no action do formulário pelo alias aleatório.
4. **Fonte de títulos "Fat"**: sem arquivo licenciável; Baloo 2 é o stand-in (ver identidade visual acima).
5. **Analytics sem cookies**: snippet do Plausible comentado no `<head>`; se ativar, incluir https://plausible.io na CSP (script-src e connect-src).

Guardados para depois (removidos do site a pedido, fáceis de restaurar pelo histórico do git): a seção Quem faz com a equipe e fotos, e o bloco Núcleo de gestão do rodapé.

O kit oficial da marca está completo em `assets/marca/` (S e wordmark nas versões escura, branca, degradê, contorno e badge; sombra longa em `assets/logo-smt.png`). Favicon, apple-touch-icon e og.png são gerados a partir dele.
