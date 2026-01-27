document.addEventListener("DOMContentLoaded", () => {
    iniciarAgenda();
});

function iniciarAgenda() {
    const agenda = document.getElementById("agenda");

    if (!agenda) return; // 👈 evita crash

const SENHA_SITE = "sitePraia10";

function entrarSite() {
    const senha = document.getElementById("senhaSite").value;

    if (senha === SENHA_SITE) {
        document.getElementById("login").style.display = "none";
        document.getElementById("site").style.display = "block";
    } else {
        alert("Senha incorreta!");
    }
}

function mostrarAba(id) {
    document.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");
}

function mostrarDia(n) {
    document.querySelectorAll(".dia").forEach(d => d.classList.remove("ativo"));
    document.getElementById("dia" + n).classList.add("ativo");
}

