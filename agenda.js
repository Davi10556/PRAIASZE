/* ===== CONFIG ===== */
const SENHA_ADM = "senhaadm";
const SNAP = 30;          // 30px = 30 minutos
const MAX = 1440;         // 24h
let diaAtual = 0;

/* ===== ELEMENTOS ===== */
const btnNovoEvento = document.getElementById("btnNovoEvento");
const dias = document.querySelectorAll(".dia");
const subabas = document.querySelectorAll(".subaba");

/* ===== TROCA DE DIA ===== */
subabas.forEach(btn => {
  btn.addEventListener("click", () => {
    subabas.forEach(b => b.classList.remove("ativa"));
    btn.classList.add("ativa");

    diaAtual = Number(btn.dataset.dia);

    dias.forEach(d => {
      d.style.display = Number(d.dataset.dia) === diaAtual ? "block" : "none";
    });
  });
});

/* ===== NOVO EVENTO ===== */
btnNovoEvento.addEventListener("click", () => {
  if (prompt("Senha ADM:") !== SENHA_ADM) {
    alert("Senha incorreta");
    return;
  }

  const nome = prompt("Nome do evento:");
  if (!nome) return;

  const cor = prompt(
    "Cor do evento (ex: red, blue, green, purple, #ff9900):",
    "#ff6b6b"
  );

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.textContent = nome;
  evento.style.setProperty("--cor", cor);
  evento.style.top = "480px";     // 08:00
  evento.style.height = "60px";  // 1 hora

  evento.innerHTML += `
    <div class="resize-top"></div>
    <div class="resize-bottom"></div>
    <div class="excluir">✖</div>
  `;

  dias[diaAtual].appendChild(evento);

  moverEvento(evento);
  resizeEvento(evento);
  atualizarHora(evento);

  evento.querySelector(".excluir").onclick = () => evento.remove();
});

/* ===== MOVER EVENTO ===== */
function moverEvento(el) {
  let startY, startTop;

  el.addEventListener("mousedown", e => {
    if (
      e.target.classList.contains("resize-top") ||
      e.target.classList.contains("resize-bottom") ||
      e.target.classList.contains("excluir")
    ) return;

    startY = e.clientY;
    startTop = el.offsetTop;

    document.onmousemove = ev => {
      let novoTop = startTop + (ev.clientY - startY);
      novoTop = Math.round(novoTop / SNAP) * SNAP;
      novoTop = Math.max(0, Math.min(MAX - el.offsetHeight, novoTop));

      el.style.top = novoTop + "px";
      atualizarHora(el);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}

/* ===== REDIMENSIONAR EVENTO ===== */
function resizeEvento(el) {
  const topHandle = el.querySelector(".resize-top");
  const bottomHandle = el.querySelector(".resize-bottom");

  topHandle.addEventListener("mousedown", e => iniciarResize(el, e, "top"));
  bottomHandle.addEventListener("mousedown", e => iniciarResize(el, e, "bottom"));
}

function iniciarResize(el, e, lado) {
  e.stopPropagation();

  const startY = e.clientY;
  const startTop = el.offsetTop;
  const startHeight = el.offsetHeight;

  document.onmousemove = ev => {
    const dy = ev.clientY - startY;

    if (lado === "bottom") {
      let novaAltura = startHeight + dy;
      novaAltura = Math.round(novaAltura / SNAP) * SNAP;
      novaAltura = Math.max(SNAP, novaAltura);
      novaAltura = Math.min(MAX - el.offsetTop, novaAltura);

      el.style.height = novaAltura + "px";
    } else {
      let novoTop = startTop + dy;
      novoTop = Math.round(novoTop / SNAP) * SNAP;
      let novaAltura = startHeight - dy;

      if (novaAltura >= SNAP && novoTop >= 0) {
        el.style.top = novoTop + "px";
        el.style.height = novaAltura + "px";
      }
    }

    atualizarHora(el);
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

/* ===== HORÁRIO ===== */
function atualizarHora(el) {
  const inicioPx = el.offsetTop;
  const fimPx = el.offsetTop + el.offsetHeight;

  const inicio = pxParaHora(inicioPx);
  const fim = pxParaHora(fimPx);

  el.dataset.hora = `${inicio} - ${fim}`;
}

function pxParaHora(px) {
  const h = Math.floor(px / 60);
  const m = px % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
