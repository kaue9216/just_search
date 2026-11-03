document.getElementById("enviar").addEventListener("click", () => {
    novo();
});

async function novo() {
    var titulo = document.getElementById("titulo").value;
    var conteudo = document.getElementById("conteudo").value;
    var autor = document.getElementById("autor").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("conteudo", conteudo);
    fd.append("autor", autor);

    const retorno = await fetch("../php/game_novo.php", {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_games.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}