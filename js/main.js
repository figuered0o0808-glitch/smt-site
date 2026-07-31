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

// Para quem espia o código
console.log(
  "%cSe Meta Também",
  'font: 800 20px "Baloo 2", sans-serif; background: linear-gradient(90deg, #ff00fa, #11cae2); color: #100023; padding: 8px 16px; border: 3px solid #000; border-radius: 12px;'
);
console.log("A transparência vale para o código também. Dúvidas: [PLACEHOLDER: e-mail de contato]");
