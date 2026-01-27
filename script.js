const SENHA_SITE = "sitePraia10";
const SENHA_ADM = "senhaadm";

document.addEventListener("DOMContentLoaded", () => {

    const btnEntrar = document.getElementById("btnEntrar");

    if (btnEntrar) {
        btnEntrar.addEventListener("click", entrarSite);
    }

});

function entrarSite() {
    const campoSenha = document.getElementById("senhaSite");

    if (!campoSenha) {
        alert("Erro interno: campo de senha não encontrado");
        return;
    }

    if (campoSenha.value === SENHA_SITE) {
        document.getElementById("login").style.display = "none";
        document.getElementById("site").style.display = "block";
    } else {
        alert("❌ Senha incorreta");
    }
}
