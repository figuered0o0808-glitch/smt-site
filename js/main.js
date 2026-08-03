// Menu mobile
const botaoMenu = document.querySelector(".topo__menu-botao");
const menu = document.getElementById("menu");

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

// Eixos de "O que defendemos": toque/clique fixa a fileira aberta
document.querySelectorAll(".eixo__topo").forEach((topo) => {
  topo.addEventListener("click", () => {
    const eixo = topo.closest(".eixo");
    const aberto = eixo.getAttribute("data-aberto") === "true";
    eixo.setAttribute("data-aberto", String(!aberto));
    topo.setAttribute("aria-expanded", String(!aberto));
  });
});

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

// Para quem espia o código
console.log(
  "%cSe Mexa Também",
  'font: 800 20px "Baloo 2", sans-serif; background: linear-gradient(90deg, #ff00fa, #11cae2); color: #100023; padding: 8px 16px; border: 3px solid #000; border-radius: 12px;'
);
console.log("A transparência vale para o código também. Dúvidas: [PLACEHOLDER: e-mail de contato]");
