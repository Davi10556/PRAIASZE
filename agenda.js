const SENHA_ADM = "senhaadm";
const dia = document.getElementById("dia");
const btnNovoEvento = document.getElementById("btnNovoEvento");

const SNAP = 30; // 30px = 30min
const MAX_ALTURA = 1440;

btnNovoEvento.addEventListener("click", () => {
  const senha = prompt("Senha ADM:");
  if (senha !== SENHA_ADM) return alert("Senha incorreta");

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerText = nome;

  evento.style.top = "480px";     // 08:00
  evento.style.height = "60px";  // 1h

  const resize = document.createElement("div");
  resize.className = "resize";
  evento.appendChild(resize);

  dia.appendChild(evento);

  atualizarHora(evento);
  tornarArrastavel(evento);
  tornarRedimensionavel(evento, resize);
});

/* ===== ARRASTAR ===== */
function tornarArrastavel(el) {
  let startY, startTop;

  el.addEventListener("mousedown", e => {
    if (e.target.classList.contains("resize")) return;

    startY = e.clientY;
    startTop = el.offsetTop;

    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  });

  function mover(e) {
    let novoTop = startTop + (e.clientY - startY);
    novoTop = Math.round(novoTop / SNAP) * SNAP;
    novoTop = Math.max(0, Math.min(MAX_ALTURA - el.offsetHeight, novoTop));

    el.style.top = novoTop + "px";
    atualizarHora(el);
  }

  function soltar() {
    document.removeEventListener("mousemove", mover);
    document.removeEventListener("mouseup", soltar);
  }
}

/* ===== REDIMENSIONAR ===== */
function tornarRedimensionavel(el, handle) {
  let startY, startHeight;

  handle.addEventListener("mousedown", e => {
    e.stopPropagation();
    startY = e.clientY;
    startHeight = el.offsetHeight;

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", parar);
  });

  function resize(e) {
    let novaAltura = startHeight + (e.clientY - startY);
    novaAltura = Math.round(novaAltura / SNAP) * SNAP;
    novaAltura = Math.max(SNAP, novaAltura);
    novaAltura = Math.min(MAX_ALTURA - el.offsetTop, novaAltura);

    el.style.height = novaAltura + "px";
    atualizarHora(el);
  }

  function parar() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", parar);
  }
}

/* ===== HORAS ===== */
function atualizarHora(el) {
  const inicioPx = el.offsetTop;
  const duracaoPx = el.offsetHeight;

  const inicio = pxParaHora(inicioPx);
  const fim = pxParaHora(inicioPx + duracaoPx);

  el.dataset.hora = `${inicio} - ${fim}`;
}

function pxParaHora(px) {
  const totalMin = px;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}
