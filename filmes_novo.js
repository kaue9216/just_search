document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
});

// Mostra o nome do arquivo escolhido na área de upload
document.getElementById("capa").addEventListener("change", () => {
    var arquivo = document.getElementById("capa").files[0];
    document.getElementById("nome_arquivo").textContent =
        arquivo ? arquivo.name : "Clique para escolher a capa";
});

document.getElementById("enviar").addEventListener("click", () => {
    novo();
});

async function novo() {
    var titulo = document.getElementById("titulo").value;
    var sinopse = document.getElementById("sinopse").value;
    var diretor = document.getElementById("diretor").value;
    var genero = document.getElementById("genero").value;
    var ano = document.getElementById("ano").value;
    var capa = document.getElementById("capa").files[0];

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("sinopse", sinopse);
    fd.append("diretor", diretor);
    fd.append("genero", genero);
    fd.append("ano", ano);
    if (capa) {
        fd.append("capa", capa);
    }

    const retorno = await fetch("../php/filme_novo.php",
        {
            method: 'POST',
            body: fd
        });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "filmes.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
