const SENHA_ADM = "senhaadm";
const dia = document.getElementById("dia");
const btnNovoEvento = document.getElementById("btnNovoEvento");

const PIXELS_POR_HORA = 60;
const SNAP = 30; // 30px = 30min

btnNovoEvento.addEventListener("click", () => {
  const senha = prompt("Senha ADM:");
  if (senha !== SENHA_ADM) return alert("Senha incorreta");

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;

  evento.style.top = "480px"; // 08:00
  evento.style.height = "60px"; // 1h

  dia.appendChild(evento);

  atualizarHora(evento);
  tornarArrastavel(evento);
});

function tornarArrastavel(el) {
  let startY, startTop;

  el.onmousedown = e => {
    startY = e.clientY;
    startTop = el.offsetTop;
    document.onmousemove = mover;
    document.onmouseup = soltar;
  };

  function mover(e) {
    let novoTop = startTop + (e.clientY - startY);

    // snap de 30min
    novoTop = Math.round(novoTop / SNAP) * SNAP;

    // limites
    novoTop = Math.max(0, Math.min(1440 - el.offsetHeight, novoTop));

    el.style.top = novoTop + "px";
    atualizarHora(el);
  }

  function soltar() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function atualizarHora(el) {
  const inicioMin = Math.round(el.offsetTop);
  const duracaoMin = Math.round(el.offsetHeight);

  const inicio = minutosParaHora(inicioMin);
  const fim = minutosParaHora(inicioMin + duracaoMin);

  el.dataset.hora = `${inicio} - ${fim}`;
}

function minutosParaHora(px) {
  const totalMin = px;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}
