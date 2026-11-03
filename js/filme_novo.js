document.getElementById("enviar").addEventListener("click", () => {
    novo();
});

async function novo() {
    var titulo = document.getElementById("titulo").value;
    var sinopse = document.getElementById("sinopse").value;
    var diretor = document.getElementById("diretor").value;
    var genero = document.getElementById("genero").value;
    var ano = document.getElementById("ano").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("sinopse", sinopse);
    fd.append("diretor", diretor);
    fd.append("genero", genero);
    fd.append("ano", ano);

    const retorno = await fetch("../php/filme_novo.php", {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_filmes.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
