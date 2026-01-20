// ===== CONFIG =====
const SENHA_ADM = "senhaadm";
let dia = null;

// Garante que o DOM carregou
document.addEventListener("DOMContentLoaded", () => {
  dia = document.getElementById("dia");
});

// ===== CRIAR EVENTO =====
function criarEvento() {
  if (!dia) {
    alert("Agenda ainda não carregou. Abra a aba Eventos.");
    return;
  }

  const senha = prompt("Senha ADM:");
  if (senha !== SENHA_ADM) {
    alert("Senha ADM incorreta");
    return;
  }

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;

  // 1 hora = 60px | começa às 08:00
  evento.style.top = "480px";
  evento.style.height = "60px";

  dia.appendChild(evento);
  tornarArrastavel(evento);
}

// ===== ARRASTAR =====
function tornarArrastavel(el) {
  let startY = 0;
  let startTop = 0;

  el.addEventListener("mousedown", (e) => {
    startY = e.clientY;
    startTop = parseInt(el.style.top);
    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  });

  function mover(e) {
    let novoTop = startTop + (e.clientY - startY);
    novoTop = Math.max(0, Math.min(1380, novoTop));
    el.style.top = novoTop + "px";
  }

  function soltar() {
    document.removeEventListener("mousemove", mover);
    document.removeEventListener("mouseup", soltar);
  }
}
