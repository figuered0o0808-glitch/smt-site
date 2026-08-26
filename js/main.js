// Menu mobile (a página do edital não tem menu; as guardas evitam quebrar lá)
const botaoMenu = document.querySelector(".topo__menu-botao");
const menu = document.getElementById("menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  });

  menu.addEventListener("click", (evento) => {
    if (evento.target.tagName === "A") {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    }
  });
}

// Faixa-índice viva + números que se entintam quando o bloco é lido
const trilho = document.querySelector(".faixa__trilho");
const linksFaixa = trilho ? [...trilho.querySelectorAll("a")] : [];
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const observadorBlocos = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("bloco--lido");
      const link = linksFaixa.find((a) => a.getAttribute("href") === "#" + entrada.target.id);
      if (!link) return;
      linksFaixa.forEach((a) => a.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "true");
      if (trilho.scrollWidth > trilho.clientWidth) {
        trilho.scrollTo({
          left: link.offsetLeft - trilho.clientWidth / 2 + link.clientWidth / 2,
          behavior: reduzMovimento ? "auto" : "smooth",
        });
      }
    });
  },
  { rootMargin: "-30% 0px -55%" }
);
document.querySelectorAll(".bloco").forEach((b) => observadorBlocos.observe(b));

// Fio de leitura: completa quando a página termina, rimando com o fio do rodapé
const fioLeitura = document.querySelector(".fio-leitura");
if (fioLeitura) {
  let agendado = false;
  const atualizar = () => {
    agendado = false;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    fioLeitura.style.transform = "scaleX(" + Math.min(window.scrollY / Math.max(total, 1), 1) + ")";
  };
  window.addEventListener("scroll", () => {
    if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  atualizar();
}

// Âncoras internas: rolam até a seção sem deixar #fragmento no endereço
document.querySelectorAll('a[href^="#"]').forEach((ancora) => {
  ancora.addEventListener("click", (evento) => {
    const alvo = document.getElementById(ancora.getAttribute("href").slice(1));
    if (!alvo) return;
    evento.preventDefault();
    alvo.scrollIntoView({ behavior: reduzMovimento ? "instant" : "smooth" });
    history.replaceState(null, "", window.location.pathname);
  });
});

// O post incorporado informa a própria altura: evita corte e sobra de branco.
// Se a mensagem não vier, vale a altura do CSS.
window.addEventListener("message", (evento) => {
  if (evento.origin !== "https://www.instagram.com") return;
  const quadro = document.querySelector(".midia--post iframe");
  if (!quadro || evento.source !== quadro.contentWindow) return;
  let dados = evento.data;
  if (typeof dados === "string") {
    try { dados = JSON.parse(dados); } catch (erro) { return; }
  }
  const altura = dados && dados.details && dados.details.height;
  if (altura > 200) quadro.style.height = altura + "px";
});

// Post de evento com prazo de validade: some sozinho depois da data,
// para o site estático nunca exibir evento que já passou
document.querySelectorAll("[data-evento-ate]").forEach((moldura) => {
  const limite = new Date(moldura.getAttribute("data-evento-ate") + "T23:59:59");
  if (!isNaN(limite) && new Date() > limite) moldura.remove();
});

// O site sempre abre no topo: link antigo com #fragmento não pode jogar a página lá embaixo
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

// Confirmação do formulário (volta do FormSubmit com ?enviado=1): aviso no alto, sem rolar a página
if (new URLSearchParams(window.location.search).has("enviado")) {
  const aviso = document.getElementById("aviso-recebido");
  if (aviso) aviso.hidden = false;
  history.replaceState(null, "", window.location.pathname);
}

// Para quem espia o código
console.log(
  "%cSe Mexa Também",
  'font: 800 20px "Baloo 2", sans-serif; background: linear-gradient(90deg, #ff00fa, #11cae2); color: #100023; padding: 8px 16px; border: 3px solid #000; border-radius: 12px;'
);
console.log("A transparência vale para o código também. Dúvidas: silentmajoritytalks2026@gmail.com");
