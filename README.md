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

Todas as cores, fontes e efeitos da marca estão nas variáveis CSS no bloco `:root` de `css/style.css`. Trocar um valor lá atualiza o site inteiro. Cores oficiais (manual de set/2026): magenta `#E936F1`, ciano `#0CC0DF`, amarelo `#FFBC3B` (acento sólido, nunca no degradê nem como texto sobre claro), grafite `#212121` e creme `#F4F3F1` (chão da página), com contornos pretos.

Fontes self-hosted em `assets/fonts/` via `@font-face`, sem chamadas ao Google Fonts. O manual pede Impact (destaques em caixa alta) e Garet (títulos e corpo), que não têm arquivo web licenciado: os stand-ins são **Anton** (papel do Impact) e **Figtree** variável (papel do Garet, com itálica). Se conseguirem os arquivos licenciados, basta colocá-los em `assets/fonts/`, declarar o `@font-face` e trocar `--fonte-dizeres` / `--fonte-titulo` / `--fonte-texto`.

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

## Texturas e formas do manual

`assets/texturas/` tem 5 arquivos gerados por `ferramentas/gera_texturas.py` (numpy + Pillow) a partir do recorte do papel preto amassado da prancha de texturas: `papel-preto.webp` (UM tile costurado por crossfade, sem espelho, brilho travado em #40), `papel-amarelo.webp` (mesmo relevo sobre #FFBC3B), `grao.png` (pontinhos em alfa por cima do papel), `nevoa-roxa.webp` e `nevoa-teal.webp` (névoa granulada sintetizada, RGBA). Onde entram: utilitário `.painel-papel` (hero e "O que defendemos" na home, abertura do concurso, 404), `.faixa-edital` em papel amarelo, `.edital-leitura` (folha branca sobre papel), formulário de influenciadores em papel amarelo quando a fita do concurso sai (`html.sem-faixa`). Regras: cor sólida (amarelo, magenta) só sobre o tile de papel preto; branco sobre qualquer papel; nenhum texto sobre o núcleo das névoas; no print tudo vira branco/tinta. `assets/formas/estrela.svg` é a única forma solta (o "agora" da linha do tempo). Se o designer mandar o papel original em alta (≥ 2000 px), basta rodar o script de novo com o novo recorte.

## Página do edital

`/edital/` publica o edital de eventos (fonte: doc "EDITAL - eventos SMT" no Drive). Texto na íntegra com três correções de digitação. O botão "Baixar em PDF" baixa o arquivo `/edital/edital-eventos-smt.pdf`, gerado a partir da versão de impressão da própria página. **Sempre que editar o conteúdo do edital, regenere o PDF** com o site rodando localmente:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf="edital/edital-eventos-smt.pdf" "http://localhost:4545/edital/"
```

O edital ENCERROU em 04/09/2026: a página segue no ar como documento de consulta (selo de encerrado, sem botões de envio) e a home voltou a apontar os CTAs de evento para o e-mail de contato. Se houver nova edição, restaurar a faixa da home e os botões pelo histórico do git.

## Página do concurso

`/concurso/` publica o Concurso de Conteúdo SMT (fonte: Google Doc "Edital SMT — Concurso de Conteúdo sobre Participacao politica", só o texto ACEITO; sugestões pendentes no Doc não entram). Logos dos parceiros em `assets/parceiros/` (Decisivas em SVG com viewBox recortado ao desenho; Brief em PNG claro e escuro). O prazo é automático: elementos com `data-ate` somem e os com `data-desde` aparecem no horário (01/10/2026, 21h de Brasília), sem precisar mexer no site; quem estiver com a página aberta recarrega sozinho no prazo. A faixa "Concurso aberto" da home segue a mesma regra. Imagem de compartilhamento: `assets/og-concurso.png`. **Se o texto do regulamento mudar, regenere o PDF** (`concurso/regulamento-concurso-smt.pdf`) com o mesmo comando do edital, trocando a URL para `/concurso/`.

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
4. **Fontes Impact e Garet**: sem arquivo licenciado; Anton e Figtree são os stand-ins (ver identidade visual acima).
5. **Analytics sem cookies**: snippet do Plausible comentado no `<head>`; se ativar, incluir https://plausible.io na CSP (script-src e connect-src).

Guardados para depois (removidos do site a pedido, fáceis de restaurar pelo histórico do git): a seção Quem faz com a equipe e fotos, e o bloco Núcleo de gestão do rodapé.

O kit oficial da marca está completo em `assets/marca/` (S e wordmark nas versões escura, branca, degradê, contorno e badge; sombra longa em `assets/logo-smt.png`). Favicon, apple-touch-icon e og.png são gerados a partir dele.
