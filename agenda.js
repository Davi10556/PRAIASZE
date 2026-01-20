const SENHA_ADM = "senhaadm";
const dia = document.getElementById("dia");

function criarEvento() {
  const senha = prompt("Senha ADM:");
  if (senha !== SENHA_ADM) return alert("Senha incorreta");

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;

  evento.style.top = "600px";      // começa 10:00
  evento.style.height = "60px";    // 1h

  dia.appendChild(evento);

  arrastavel(evento);
}

function arrastavel(el) {
  let startY, startTop;

  el.onmousedown = e => {
    startY = e.clientY;
    startTop = parseInt(el.style.top);
    document.onmousemove = mover;
    document.onmouseup = parar;
  };

  function mover(e) {
    let novoTop = startTop + (e.clientY - startY);
    novoTop = Math.max(0, Math.min(1380, novoTop));
    el.style.top = novoTop + "px";
  }

  function parar() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
