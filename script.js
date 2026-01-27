// ===== SENHAS =====
const SENHA_SITE = "sitePraia10";
const SENHA_ADM = "senhaadm";

// ===== LOGIN DO SITE =====
function entrarSite() {
    const senha = document.getElementById("senhaSite").value;

    if (senha === SENHA_SITE) {
        document.getElementById("login").style.display = "none";
        document.getElementById("site").style.display = "block";
    } else {
        alert("❌ Senha incorreta!");
    }
}

// ===== ABAS PRINCIPAIS =====
function mostrarAba(id) {
    document.querySelectorAll(".aba").forEach(aba => {
        aba.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

// ===== SUBABAS (DIAS) =====
function mostrarDia(numero) {
    document.querySelectorAll(".dia").forEach(dia => {
        dia.classList.remove("ativo");
    });

    document.getElementById("dia" + numero).classList.add("ativo");
}

// ===== PERMISSÃO ADM =====
function verificarAdm() {
    const senha = prompt("Senha de administrador:");
    return senha === SENHA_ADM;
}
