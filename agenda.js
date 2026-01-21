const SENHA_ADM = "senhaadm";
const SNAP = 30; // 30px = 30min
const MAX = 1440;

const btnNovoEvento = document.getElementById("btnNovoEvento");
const dias = document.querySelectorAll(".dia");

btnNovoEvento.onclick = () => {
  if (prompt("Senha ADM:") !== SENHA_ADM) return alert("Senha errada");

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const cor = prompt("Cor (red, blue, green, purple):", "red");

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;
  evento.style.setProperty("--cor", cor);
  evento.style.top = "480px";
  evento.style.height = "60px";

  evento.innerHTML += `
    <div class="resize-top"></div>
    <div class="resize-bottom"></div>
    <div class="excluir">✖</div>
  `;

  dias[0].appendChild(evento);

  moverEvento(evento);
  resizeEvento(evento);
  atualizarHora(evento);

  evento.querySelector(".excluir").onclick = () => evento.remove();
};

/* ===== MOVER ===== */
function moverEvento(el) {
  let startY, startTop;

  el.onmousedown = e => {
    if (e.target.classList.contains("resize-top") ||
        e.target.classList.contains("resize-bottom") ||
        e.target.classList.contains("excluir")) return;

    startY = e.clientY;
    startTop = el.offsetTop;

    document.onmousemove = ev => {
      let top = startTop + (ev.clientY - startY);
      top = Math.round(top / SNAP) * SNAP;
      top = Math.max(0, Math.min(MAX - el.offsetHeight, top));
      el.style.top = top + "px";
      atualizarHora(el);
    };

    document.onmouseup = () => document.onmousemove = null;
  };
}

/* ===== RESIZE ===== */
function resizeEvento(el) {
  const topHandle = el.querySelector(".resize-top");
  const bottomHandle = el.querySelector(".resize-bottom");

  bottomHandle.onmousedown = e => resize(el, e, "bottom");
  topHandle.onmousedown = e => resize(el, e, "top");
}

function resize(el, e, lado) {
  e.stopPropagation();
  let startY = e.clientY;
  let startTop = el.offsetTop;
  let startHeight = el.offsetHeight;

  document.onmousemove = ev => {
    let dy = ev.clientY - startY;

    if (lado === "bottom") {
      let h = startHeight + dy;
      h = Math.round(h / SNAP) * SNAP;
      el.style.height = Math.max(SNAP, h) + "px";
    } else {
      let newTop = startTop + dy;
      newTop = Math.round(newTop / SNAP) * SNAP;
      let newHeight = startHeight - dy;
      if (newHeight >= SNAP && newTop >= 0) {
        el.style.top = newTop + "px";
        el.style.height = newHeight + "px";
      }
    }
    atualizarHora(el);
  };

  document.onmouseup = () => document.onmousemove = null;
}

/* ===== HORA ===== */
function atualizarHora(el) {
  const inicio = pxHora(el.offsetTop);
  const fim = pxHora(el.offsetTop + el.offsetHeight);
  el.dataset.hora = `${inicio} - ${fim}`;
}

function pxHora(px) {
  const h = Math.floor(px / 60);
  const m = px % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
