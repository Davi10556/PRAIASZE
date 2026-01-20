const SENHA_ADM = "senhaadm";
const dia = document.getElementById("dia");
const btnNovoEvento = document.getElementById("btnNovoEvento");

btnNovoEvento.addEventListener("click", () => {
  const senha = prompt("Senha ADM:");
  if (senha !== SENHA_ADM) {
    alert("Senha incorreta");
    return;
  }

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;

  evento.style.top = "480px"; // 08:00
  dia.appendChild(evento);

  arrastar(evento);
});

function arrastar(el) {
  let startY, startTop;

  el.onmousedown = e => {
    startY = e.clientY;
    startTop = el.offsetTop;
    document.onmousemove = move;
    document.onmouseup = stop;
  };

  function move(e) {
    el.style.top = Math.max(0, startTop + e.clientY - startY) + "px";
  }

  function stop() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
