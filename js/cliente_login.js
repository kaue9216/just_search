document.getElementById("enviar").addEventListener("click", () => {
    login();
});

// Enter no campo de senha também faz login
document.getElementById("senha").addEventListener("keydown", (e) => {
    if (e.key === "Enter") login();
});

async function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const fd = new FormData();
    fd.append("usuario", usuario);
    fd.append("senha", senha);
    try {
        const retorno = await fetch("../php/cliente_login.php", {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        if (resposta.status === "ok") {
            window.location.href = "../home/";
        } else {
            alert("Credenciais invalidas.");
        }
    } catch (erro) {
        alert("ERRO: não foi possível falar com o servidor.");
        console.error(erro);
    }
}
