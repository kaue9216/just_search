// Ao clicar em Enviar, chama a função que cadastra a série
document.getElementById("enviar").addEventListener("click", () => {
    novo();
});

async function novo() {
    // Pega o que o usuário digitou em cada campo
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var categoria = document.getElementById("categoria").value;
    var ano = document.getElementById("ano").value;

    // FormData monta os dados como um formulário, para o PHP ler em $_POST
    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("autor", autor);
    fd.append("categoria", categoria);
    fd.append("ano", ano);

    const retorno = await fetch("../php/serie_novo.php", {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_series.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
