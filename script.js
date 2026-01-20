/* SENHAS */
const SENHA_SITE = "sitePraia10";
const SENHA_ADM = "senhaadm";

/* LOGIN SITE */
function verificarSite() {
  const senha = document.getElementById("senhaSite").value;
  if (senha === SENHA_SITE) {
    document.getElementById("login-site").classList.add("hidden");
    document.getElementById("site").classList.remove("hidden");
  } else {
    document.getElementById("erroSite").innerText = "❌ Senha incorreta";
  }
}

/* NAVEGAÇÃO */
function mostrar(id) {
  document.querySelectorAll(".secao").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* EVENTOS */
function adicionarEvento() {
  const senha = document.getElementById("senhaAdm").value;

  if (senha !== SENHA_ADM) {
    document.getElementById("erroAdm").innerText = "❌ Senha ADM incorreta";
    return;
  }

  document.getElementById("erroAdm").innerText = "";

  const agora = new Date();
  const fim = new Date(agora.getTime() + 3 * 24 * 60 * 60 * 1000);

  const evento = document.createElement("div");
  evento.className = "evento";
  evento.innerHTML = `
    <strong>Evento Especial na Praia 🌴</strong><br>
    Início: ${agora.toLocaleString()}<br>
    Fim: ${fim.toLocaleString()}
  `;

  document.getElementById("listaEventos").appendChild(evento);
}
