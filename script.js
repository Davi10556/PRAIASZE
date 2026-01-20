const SENHA_SITE = "sitePraia10";

document.getElementById("btnEntrar").onclick = () => {
  const senha = document.getElementById("senhaSite").value;
  if (senha === SENHA_SITE) {
    document.getElementById("login-site").classList.add("hidden");
    document.getElementById("site").classList.remove("hidden");
  } else {
    document.getElementById("erroSite").innerText = "Senha incorreta";
  }
};

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".secao").forEach(s => s.classList.add("hidden"));
    document.getElementById(btn.dataset.sec).classList.remove("hidden");
  };
});

