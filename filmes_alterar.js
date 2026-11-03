document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

async function buscar(id) {
    const retorno = await fetch("../php/filme_get.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        var registro = resposta.data[0];
        document.getElementById("titulo").value = registro.titulo;
        document.getElementById("sinopse").value = registro.sinopse;
        document.getElementById("diretor").value = registro.diretor;
        document.getElementById("genero").value = registro.genero;
        document.getElementById("ano").value = registro.ano ?? "";
        document.getElementById("id").value = id;

        if (registro.capa) {
            var img = document.getElementById("preview");
            img.src = "../uploads/" + registro.capa;
            img.hidden = false;
            document.getElementById("nome_arquivo").textContent = "Clique para trocar a capa";
        }
    } else {
        alert("ERRO:" + resposta.mensagem);
        window.location.href = "filmes.html";
    }
}

document.getElementById("capa").addEventListener("change", () => {
    var arquivo = document.getElementById("capa").files[0];
    document.getElementById("nome_arquivo").textContent =
        arquivo ? arquivo.name : "Clique para trocar a capa";
});

document.getElementById("enviar").addEventListener("click", () => {
    alterar();
});

async function alterar() {
    var titulo = document.getElementById("titulo").value;
    var sinopse = document.getElementById("sinopse").value;
    var diretor = document.getElementById("diretor").value;
    var genero = document.getElementById("genero").value;
    var ano = document.getElementById("ano").value;
    var id = document.getElementById("id").value;
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

    const retorno = await fetch("../php/filme_alterar.php?id=" + id,
        {
            method: 'POST',
            body: fd
        });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = 'filmes.html';
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
